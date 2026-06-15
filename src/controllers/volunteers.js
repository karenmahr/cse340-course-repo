import {
    addVolunteer,
    removeVolunteer,
    getVolunteer,
    checkVolunteer
} from '../models/volunteers.js';
import {
    getProjectDetails as getProjectById 
} from '../models/projects.js';

const getProjectDetails = async (req, res, next) => {
    const project_id = req.params.id;
    const user = req.session?.user;

    try {
        const project = await getProjectById(project_id);

        if (!project) {
            return res.status(404).send('Project not found');
        }

        let isVolunteer = false;

        if (user) {
            const result = await checkVolunteer(user.user_id, project_id);
            isVolunteer = result.length > 0;
        }

        res.render('project', {
            title: project.title,
            project,
            user,
            isLoggedIn: !!user,
            isVolunteer
        });

    } catch (error) {
        next(error);
    }
};

const addVolunteerController = async (req, res, next) => {
    const user = req.session?.user;
    const project_id = req.params.id;
    try {
        await addVolunteer(user.user_id, project_id);

        if (req.flash) req.flash('success', 'You are now volunteering for this project.');

        res.redirect(`/projects/${project_id}`);
    } catch (error) {
        next(error);
    }
};

const removeVolunteerController = async (req, res, next) => {
    const user = req.session?.user;
    const project_id = req.params.id;

    try {
        await removeVolunteer(user.user_id, project_id);

        if (req.flash) req.flash('success', 'You are no longer volunteering.');

        const redirectTo = req.query.from === 'dashboard' ? '/dashboard' : `/projects/${project_id}`;
        res.redirect(redirectTo);
    } catch (error) {
        next(error);
    }
};

const getDashboard = async (req, res, next) => {

    try {
        const user = req.session?.user;
        const projects = await getVolunteer(user.user_id);

        res.render('dashboard', {
            title: 'Dashboard',
            user,
            projects
        });
    } catch (error) {
        next(error);
    }
};

export {
    getProjectDetails,
    addVolunteerController,
    removeVolunteerController,
    getDashboard
};