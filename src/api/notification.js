import client from './client';

export const sendNotification = (data) => client.post('/api/notification/new-notification', data);
