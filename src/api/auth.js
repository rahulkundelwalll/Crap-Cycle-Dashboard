import client from './client';

export const checkAuth = () => client.get('/api/Autharization/checkAuth');
export const login = (email, password) => client.post('/api/Autharization/login', { email, password });
export const logout = () => client.post('/api/Autharization/logout');
export const getInterestedVendorCount = () => client.get('/api/Autharization/interested-vendor-count');
export const markAllNotificationsRead = () => client.post('/api/Autharization/mark-all-unread');
export const getSignUpRequests = () => client.get('/api/Autharization/signUp-get');
