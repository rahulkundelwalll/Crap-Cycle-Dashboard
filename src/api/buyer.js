import client from './client';

export const getBuyers = () => client.get('/api/buyer/allbuyer');
export const getBuyerDetail = (id) => client.get(`/api/buyer/getbuyer/${id}`);
export const addBuyer = (formData, config) => client.post('/api/buyer/addbuyer', formData, config);
export const updateBuyer = (id, formData, config) => client.put(`/api/buyer/edit/${id}`, formData, config);
export const deleteBuyer = (id) => client.delete(`/api/buyer/deletbuyer/${id}`);
