import client from './client';

export const getVendors = () => client.get('/api/vendor/get-vendors');
export const getVendorDetail = (id) => client.get(`/api/vendor/vender-detail/${id}`);
export const saveVendor = (formData, config) => client.post('/api/vendor/save-vendor', formData, config);
export const updateVendor = (id, formData, config) => client.put(`/api/vendor/edit/${id}`, formData, config);
export const deleteVendor = (id) => client.delete(`/api/vendor/delete-vendor/${id}`);
export const getVendorPassword = (email) => client.get(`/api/vendor/get-password?email=${email}`);
