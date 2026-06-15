import db from './db.js'

const getAllCategories = async () => {
    const query = `
        SELECT
            categories.categories_id,
            categories.categories_name
            FROM public.categories
    `;

    const result = await db.query(query);

    return result.rows;
}

const getCategoryDetails = async (id) => {
    const query = `
        SELECT 
            c.categories_id,
            c.categories_name
        FROM public.categories c
        WHERE c.categories_id = $1;
    `;
    const queryParams = [id];
    const result = await db.query(query, queryParams);
    return result.rows.length > 0 ? result.rows[0] : null;
};

const getCategoriesByProjectId = async (projectId) => {
    const query = `
        SELECT
            c.categories_id,
            c.categories_name
        FROM categories c
        JOIN project_categories pc
        ON c.categories_id = pc.categories_id
        WHERE pc.project_id = $1
    `;

    const result = await db.query(query, [projectId]);

    return result.rows;
};

const getProjectsByCategoryId = async (categoryId) => {
    const query = `
    SELECT
    sp.project_id,
            sp.title,
            sp.description,
            sp.date,
            sp.location,
            sp.organization_id
            FROM public.service_projects sp
        JOIN public.project_categories pc
            ON sp.project_id = pc.project_id
        WHERE pc.categories_id = $1
        ORDER BY sp.date
    `;

    const result = await db.query(query, [categoryId]);

    return result.rows;
};

const assignCategoryToProject = async (categoryId, projectId) => {
    const query = `
        INSERT INTO project_category (category_id, project_id)
        VALUES ($1, $2);
    `;

    await db.query(query, [categoryId, projectId]);
};

const updateCategoryAssignments = async (projectId, categoryIds) => {
    const deleteQuery = `
        DELETE FROM project_category
        WHERE project_id = $1;
    `;
    await db.query(deleteQuery, [projectId]);

    for (const categoryId of categoryIds) {
        await assignCategoryToProject(categoryId, projectId);
    }
};

const createCategory = async (name) => {
  const query = `
      INSERT INTO categories (categories_name)
      VALUES ($1)
      RETURNING categories_id;
  `;

  const result = await db.query(query, [name]);

  if (result.rows.length === 0) {
    throw new Error('Failed to create category');
  }

  return result.rows[0].categories_id;
};

const updateCategory = async (
    categoryId,
    name
) => {

    const query = `
        UPDATE categories
        SET categories_name = $1
        WHERE categories_id = $2
        RETURNING categories_id;
    `;

    const queryParams = [
        name,
        categoryId
    ];

    const result =
        await db.query(query, queryParams);

    if (result.rows.length === 0) {
        throw new Error(
            'Category not found'
        );
    }

    return result.rows[0].categories_id;
};

export { 
    getAllCategories, 
    getCategoryDetails, 
    getCategoriesByProjectId, 
    getProjectsByCategoryId, 
    updateCategoryAssignments, 
    createCategory,
    updateCategory };