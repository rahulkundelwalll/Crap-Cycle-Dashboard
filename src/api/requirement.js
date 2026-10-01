import client from './client';

export const getAllRequirements = () => client.get('/api/requirement/all-requirement');
export const getPendingRequirements = () => client.get('/api/requirement/pending-requirement');
export const getCompletedRequirements = () => client.get('/api/requirement/complete-requirement');
export const getRequirementDetail = (id) => client.get(`/api/requirement/requirement-detail/${id}`);
export const addRequirement = (data, config) => client.post('/api/requirement/add-requirement', data, config);
export const updateRequirement = (id, data, config) => client.put(`/api/requirement/edit/${id}`, data, config);
export const deleteRequirement = (id) => client.delete(`/api/requirement/delete/${id}`);
export const updateRequirementStatus = (reqId, data) => client.patch(`/api/requirement/requirementstatus/${reqId}`, data);
