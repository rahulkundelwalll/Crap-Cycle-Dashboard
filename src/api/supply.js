import client from './client';

export const getPendingSupply = () => client.get('/api/supply/pending-supply');
export const getCompletedSupply = () => client.get('/api/supply/complete-supply');
