import client from './client';

export const getCurrentOrders = () => client.get('/api/order/get-current-order');
export const getOrderHistory = () => client.get('/api/order/get-order-history');
export const getOrderDetail = (id) => client.get(`/api/order/get-order-detail/${id}`);
export const getRequirementOrders = (reqId) => client.get(`/api/order/get-requirement-order/${reqId}`);
export const getRequiredOrder = (id) => client.get(`/api/order/get-required-order/${id}`);
export const addOrder = (data) => client.post('/api/order/add-order', data);
export const assignDeliveryAgent = (orderId, data) => client.patch(`/api/order/assign-deleveryagent/${orderId}`, data);
export const removeAgent = (orderId, data) => client.post(`/api/order/remove-agent/${orderId}`, data);
export const changeOrderStatus = (orderId, data) => client.patch(`/api/order/changestatus/${orderId}`, data);
export const addTransitionId = (orderId, data) => client.patch(`/api/order/add-transitionId/${orderId}`, data);
