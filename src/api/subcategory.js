import client from './client';

export const addSubcategory = (data) => client.post('/api/subcategory/add', data);
