import express from 'express';
import {
    showProjectDetailsPage,
    showNewProjectForm,
    processNewProjectForm,
    projectValidation,
    processEditProjectForm,
    showEditProjectForm
}
    from './controllers/projects.js';
import {
    showCategoryDetailsPage,
    showAssignCategoriesForm,
    processAssignCategoriesForm,
    showNewCategoryForm,
    processNewCategoryForm,
    categoryValidationRules,
    processEditCategoryForm,
    showEditCategoryForm
} from './controllers/categories.js';
import {
    showOrganizationDetailsPage,
    showNewOrganizationForm,
    processNewOrganizationForm,
    organizationValidation,
    showEditOrganizationForm,
    processEditOrganizationForm,
} from './controllers/organizations.js';

import {
    showUserRegistrationForm,
    processUserRegistrationForm,
    showLoginForm,
    processLogout,
    processLoginForm,
    requireLogin,
    showDashboard,
    requireRole
} from './controllers/users.js';


import { showHomePage } from './controllers/index.js';
import { showOrganizationsPage } from './controllers/organizations.js';
import { showProjectsPage } from './controllers/projects.js';
import { showCategoriesPage } from './controllers/categories.js';
import { testErrorPage } from './controllers/errors.js';

const router = express.Router();

router.get('/', showHomePage);
router.get('/organizations', showOrganizationsPage);
router.get('/projects', showProjectsPage);
router.get('/categories', showCategoriesPage);
router.get('/test-error', testErrorPage);
router.get('/organization/:id', showOrganizationDetailsPage);
router.get('/project/:id', showProjectDetailsPage);
router.get('/category/:id', showCategoryDetailsPage);
router.get('/new-organization', showNewOrganizationForm);
router.get('/edit-organization/:id', requireRole('admin'), showEditOrganizationForm);
router.get('/new-project', requireRole('admin'), showNewProjectForm);
router.get('/assign-categories/:projectId', requireRole('admin'), showAssignCategoriesForm);
router.get('/edit-project/:id', showEditProjectForm);
router.get('/new-category', requireRole('admin'), showNewCategoryForm);
router.get('/edit-category/:id', requireRole('admin'), showEditCategoryForm);
router.get('/register', showUserRegistrationForm);
router.get('/login', showLoginForm);
router.get('/logout', processLogout);
router.get('/dashboard', requireLogin, showDashboard);
router.get('/new-organization', requireRole('admin'), showNewOrganizationForm);

router.post('/new-project', projectValidation, processNewProjectForm);
router.post('/new-organization', requireRole('admin'), organizationValidation, processNewOrganizationForm);
router.post('/edit-organization/:id', requireRole('admin'), organizationValidation, processEditOrganizationForm);
router.post('/assign-categories/:projectId', requireRole('admin'), processAssignCategoriesForm);
router.post('/edit-project/:id', processEditProjectForm);
router.post('/new-cat egory', requireRole('admin'), categoryValidationRules, processNewCategoryForm);
router.post('/edit-category/:id', requireRole('admin'), categoryValidationRules, processEditCategoryForm);
router.post('/register', processUserRegistrationForm);
router.post('/login', processLoginForm);
router.post('/new-organization', requireRole('admin'), organizationValidation, processNewOrganizationForm); 


export default router;