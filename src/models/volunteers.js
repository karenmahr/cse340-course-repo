import db from './db.js'

const addVolunteer = async (user_id, project_id) => {
    const query = `
        INSERT INTO public.registered_users (user_id, project_id)
        VALUES ($1, $2)
        ON CONFLICT DO NOTHING -- Evita duplicados si hacen doble clic
        RETURNING *
    `;
    const result = await db.query(query, [user_id, project_id]);
    return result.rows[0];
};

const removeVolunteer = async (user_id, project_id) => {
    const query = `
        DELETE FROM public.registered_users
        WHERE user_id = $1 AND project_id = $2
        RETURNING *
    `;
    const result = await db.query(query, [user_id, project_id]);
    return result.rows[0];
};

const getVolunteer = async (user_id) => {
    const query = `
        SELECT
            sp.project_id,
            sp.title,
            sp.description,
            sp.location,
            sp.date,
            o.name AS organization_name
        FROM public.service_projects sp
        JOIN public.registered_users ru ON sp.project_id = ru.project_id
        JOIN public.organization o ON sp.organization_id = o.organization_id
        WHERE ru.user_id = $1
    `;
    const result = await db.query(query, [user_id]);
    return result.rows;
};

const checkVolunteer = async (user_id, project_id) => {
    const query = `
        SELECT 1 FROM public.registered_users 
        WHERE user_id = $1 AND project_id = $2
    `;
    const result = await db.query(query, [user_id, project_id]);
    return result.rows;
};

export {
    addVolunteer,
    removeVolunteer,
    getVolunteer, 
    checkVolunteer
};