import client from './client';

export const getAgents = () => client.get('/api/delivery/get-all-agent');
export const getAgentDetail = (id) => client.get(`/api/delivery/agent-detail/${id}`);
export const addAgent = (data, config) => client.post('/api/delivery/add-agent', data, config);
export const updateAgent = (id, data, config) => client.put(`/api/delivery/edit/${id}`, data, config);
export const deleteAgent = (id) => client.delete(`/api/delivery/delete/${id}`);
