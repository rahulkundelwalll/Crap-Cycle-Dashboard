import client from './client';

export const getCategories = () => client.get('/api/category/categories');
export const getLeafCategories = () => client.get('/api/category/leaf-category');
export const getCategoryBidden = () => client.get('/api/category/category-bidden');
export const getCategory = (id) => client.get(`/api/category/category/${id}`);
export const getSubcategories = (id) => client.get(`/api/category/get-subcat/${id}`);
export const getHierarchicalCategory = (id) => client.get(`/api/category/hierarchical-cat/${id}`);
export const addCategory = (formData, config) => client.post('/api/category/add', formData, config);
export const updateCategory = (id, formData, config) => client.put(`/api/category/edit/${id}`, formData, config);
export const deleteCategory = (id) => client.delete(`/api/category/delete-cat/${id}`);
