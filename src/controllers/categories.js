import {
    getAllCategories,
    getCategoryDetails,
    getProjectsByCategoryId,
} from '../models/categories.js';
import { 
    body, 
    validationResult 
} from 'express-validator';

const categoryValidationRules = [
    body('categories_name')
        .trim()
        .notEmpty()
        .withMessage('Category name is required')
        .isLength({ max: 150 })
        .withMessage('Category name must be 150 characters or less')
];

const showCategoriesPage = async (req, res) => {
    const categories = await getAllCategories();
    const title = 'Service Categories';
    res.render('categories', { title, categories });
};

const showCategoryDetailsPage = async (req, res) => {
    const categoryId = req.params.id;

    const category = await getCategoryDetails(categoryId);

    const projects = await getProjectsByCategoryId(categoryId);

    const title = category.categories_name;

    res.render('category', { title, category, projects });
};

const showAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;

    const projectDetails = await getProjectDetails(projectId);
    const categories = await getAllCategories();
    const assignedCategories = await getCategoriesByServiceProjectId(projectId);

    const title = 'Assign Categories to Project';

    res.render('assign-categories', { title, projectId, projectDetails, categories, assignedCategories });
};

const processAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;
    const selectedCategoryIds = req.body.categoryIds || [];

    // Ensure selectedCategoryIds is an array
    const categoryIdsArray = Array.isArray(selectedCategoryIds) ? selectedCategoryIds : [selectedCategoryIds];
    await updateCategoryAssignments(projectId, categoryIdsArray);
    req.flash('success', 'Categories updated successfully.');
    res.redirect(`/project/${projectId}`);
};

const showNewCategoryForm = (req, res) => {
    const title = 'Create New Category';

    res.render('new-category', { title });
};

const processNewCategoryForm = async (req, res) => {
    // Check for validation errors
    const results = validationResult(req);
    if (!results.isEmpty()) {
        // Validation failed - loop through errors
        results.array().forEach((error) => {
            req.flash('error', error.msg);
        });

        return res.redirect('/new-category');
    }
    const { categories_name } = req.body;

    const categoryId = await createCategory(name);
    req.flash('success', 'Category added successfully!');
    res.redirect(`/categories/${categoryId}`);
};

const showEditCategoryForm = async (req, res) => {
    const categoryId = req.params.id;

    const categoryDetails =
        await getCategoryDetails(categoryId);

    const title = 'Edit Category';

    res.render('edit-category', {
        title,
        categoryDetails
    });
};

const processEditCategoryForm = async (req, res) => {
    const results = validationResult(req);
    if (!results.isEmpty()) {
        results.array().forEach((error) => {
            req.flash('error', error.msg);
        });

        return res.redirect(
            '/edit-category/' + req.params.id
        );
    }
    const categoryId = req.params.id;
    const { name } = req.body;
    await updateCategory(categoryId,name);
    req.flash('success','Category updated successfully!');
    res.redirect('/categories/' + categoryId);
};

export { 
    showCategoriesPage, 
    showCategoryDetailsPage, 
    showAssignCategoriesForm, 
    processAssignCategoriesForm, 
    showNewCategoryForm,
    processNewCategoryForm,
    categoryValidationRules,
    processEditCategoryForm,
    showEditCategoryForm };
