import client from './client';

export const getDeactivatedAccountInfo = () => client.get('/api/other/deactivated-account-info');
export const getPrivacy = () => client.get('/api/other/privacy');
export const updatePrivacy = (privacy) => client.post('/api/other/privacy', { privacy });
export const getTnc = () => client.get('/api/other/tnc');
export const updateTnc = (tnc) => client.post('/api/other/tnc', { tnc });
export const getContact = () => client.get('/api/other/contact');
export const updateContact = (contactInfo) => client.post('/api/other/contact', contactInfo);
