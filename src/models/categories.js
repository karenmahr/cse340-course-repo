import db from './db.js'

const getAllCategories = async () => {
    const query = `
        SELECT
            categories.categories_name
            FROM public.categories
    `;

    const result = await db.query(query);

    return result.rows;
}

export { getAllCategories }