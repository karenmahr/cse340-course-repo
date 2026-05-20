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

export { getAllCategories }

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

export { getCategoryDetails };

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

export { getCategoriesByProjectId };

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

export { getProjectsByCategoryId };