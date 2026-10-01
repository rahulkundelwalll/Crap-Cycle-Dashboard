import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../component/Sidebar';
import { FaStore, FaUsers, FaTruck, FaClipboardList, FaBoxOpen, FaHandshake, FaPlus, FaExclamationTriangle } from 'react-icons/fa';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const STATUS_COLORS = {
    pending: 'bg-yellow-400',
    confirmed: 'bg-blue-400',
    cancelled: 'bg-red-400',
    delivered: 'bg-green-500',
};

function statusColor(status) {
    return STATUS_COLORS[(status || '').toLowerCase()] || 'bg-gray-400';
}

function StatCard({ icon, label, value, loading, accent, onClick }) {
    return (
        <button
            onClick={onClick}
            className="bg-white rounded-2xl shadow-md p-5 flex items-center space-x-4 text-left hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 disabled:cursor-default"
            disabled={!onClick}
        >
            <div className={`flex items-center justify-center w-14 h-14 rounded-xl text-2xl text-white ${accent}`}>
                {icon}
            </div>
            <div>
                <p className="text-sm font-medium text-gray-500">{label}</p>
                <p className="text-2xl font-bold text-gray-800">
                    {loading ? <span className="inline-block w-10 h-6 bg-gray-200 rounded animate-pulse" /> : value}
                </p>
            </div>
        </button>
    );
}

export default function DashBoard() {
    const navigate = useNavigate();
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(false);
    const [stats, setStats] = React.useState({
        vendors: 0,
        buyers: 0,
        agents: 0,
        pendingRequirements: 0,
        pendingSupply: 0,
        interestedVendors: 0,
    });
    const [orders, setOrders] = React.useState([]);

    React.useEffect(() => {
        const fetchAll = async () => {
            setLoading(true);
            const results = await Promise.allSettled([
                axios.get(`${BACKEND_URL}/api/vendor/get-vendors`),
                axios.get(`${BACKEND_URL}/api/buyer/allbuyer`),
                axios.get(`${BACKEND_URL}/api/delivery/get-all-agent`),
                axios.get(`${BACKEND_URL}/api/requirement/pending-requirement`),
                axios.get(`${BACKEND_URL}/api/supply/pending-supply`),
                axios.get(`${BACKEND_URL}/api/Autharization/interested-vendor-count`),
                axios.get(`${BACKEND_URL}/api/order/get-current-order`),
            ]);

            const [vendorsRes, buyersRes, agentsRes, reqRes, supplyRes, interestedRes, ordersRes] = results;

            setStats({
                vendors: vendorsRes.status === 'fulfilled' ? (vendorsRes.value.data.data?.length ?? 0) : 0,
                buyers: buyersRes.status === 'fulfilled' ? (buyersRes.value.data.data?.length ?? 0) : 0,
                agents: agentsRes.status === 'fulfilled' ? (agentsRes.value.data.data?.length ?? 0) : 0,
                pendingRequirements: reqRes.status === 'fulfilled' ? (reqRes.value.data.results?.length ?? 0) : 0,
                pendingSupply: supplyRes.status === 'fulfilled' ? (supplyRes.value.data.results?.length ?? 0) : 0,
                interestedVendors: interestedRes.status === 'fulfilled' ? (interestedRes.value.data.data?.count ?? 0) : 0,
            });

            setOrders(ordersRes.status === 'fulfilled' ? (ordersRes.value.data.data ?? []) : []);
            setError(results.every(r => r.status === 'rejected'));
            setLoading(false);
        };

        fetchAll();
    }, []);

    const statusCounts = orders.reduce((acc, item) => {
        const key = item.order_status || 'Unknown';
        acc[key] = (acc[key] || 0) + 1;
        return acc;
    }, {});
    const totalOrders = orders.length;
    const recentOrders = orders.slice(0, 6);

    return (
        <Sidebar page={'Dashboard'}>
            <div className="px-5 pb-10 pt-5 space-y-6">
                {error && (
                    <div className="flex items-center space-x-2 bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3">
                        <FaExclamationTriangle />
                        <span>Could not reach the server. Showing partial or empty data.</span>
                    </div>
                )}

                {/* KPI cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                    <StatCard
                        icon={<FaStore />}
                        label="Vendors"
                        value={stats.vendors}
                        loading={loading}
                        accent="bg-customTeal"
                        onClick={() => navigate('/dashboard/vendor/vendors')}
                    />
                    <StatCard
                        icon={<FaUsers />}
                        label="Buyers"
                        value={stats.buyers}
                        loading={loading}
                        accent="bg-green-500"
                        onClick={() => navigate('/dashboard/buyer/buyers')}
                    />
                    <StatCard
                        icon={<FaTruck />}
                        label="Delivery Agents"
                        value={stats.agents}
                        loading={loading}
                        accent="bg-sky-500"
                        onClick={() => navigate('/dashboard/delivery_agent/allgents')}
                    />
                    <StatCard
                        icon={<FaClipboardList />}
                        label="Pending Requirements"
                        value={stats.pendingRequirements}
                        loading={loading}
                        accent="bg-amber-500"
                        onClick={() => navigate('/dashboard/requirement/allrequirement')}
                    />
                    <StatCard
                        icon={<FaBoxOpen />}
                        label="Pending Supply"
                        value={stats.pendingSupply}
                        loading={loading}
                        accent="bg-purple-500"
                        onClick={() => navigate('/dashboard/supplytable')}
                    />
                    <StatCard
                        icon={<FaHandshake />}
                        label="Interested Vendors"
                        value={stats.interestedVendors}
                        loading={loading}
                        accent="bg-rose-500"
                        onClick={() => navigate('/dashboard/interested-vendor')}
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Order status breakdown */}
                    <div className="bg-white rounded-2xl shadow-md p-6 lg:col-span-1">
                        <h2 className="text-lg font-bold text-gray-800 mb-4">Active Orders by Status</h2>
                        {loading ? (
                            <div className="space-y-3">
                                {[1, 2, 3].map(i => <div key={i} className="h-5 bg-gray-200 rounded animate-pulse" />)}
                            </div>
                        ) : totalOrders === 0 ? (
                            <p className="text-gray-400 text-sm">No active orders right now.</p>
                        ) : (
                            <div className="space-y-4">
                                {Object.entries(statusCounts).map(([status, count]) => (
                                    <div key={status}>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="font-medium text-gray-600">{status}</span>
                                            <span className="text-gray-500">{count}</span>
                                        </div>
                                        <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full rounded-full ${statusColor(status)}`}
                                                style={{ width: `${(count / totalOrders) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Recent orders */}
                    <div className="bg-white rounded-2xl shadow-md p-6 lg:col-span-2">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-bold text-gray-800">Recent Orders</h2>
                            <button
                                className="text-sm font-medium text-customTeal hover:underline"
                                onClick={() => navigate('/dashboard/maintable')}
                            >
                                View all
                            </button>
                        </div>
                        {loading ? (
                            <div className="space-y-3">
                                {[1, 2, 3, 4].map(i => <div key={i} className="h-10 bg-gray-200 rounded animate-pulse" />)}
                            </div>
                        ) : recentOrders.length === 0 ? (
                            <p className="text-gray-400 text-sm">No orders to show yet.</p>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="min-w-full text-sm">
                                    <thead>
                                        <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                                            <th className="py-2 pr-4">Order ID</th>
                                            <th className="py-2 pr-4">Category</th>
                                            <th className="py-2 pr-4">Quantity</th>
                                            <th className="py-2 pr-4">Status</th>
                                            <th className="py-2"></th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {recentOrders.map((row) => (
                                            <tr key={row.order_id} className="hover:bg-gray-50">
                                                <td className="py-2 pr-4 font-medium text-gray-700">{row.order_id}</td>
                                                <td className="py-2 pr-4 text-gray-600">{row.cat_name}</td>
                                                <td className="py-2 pr-4 text-gray-600">{row.order_qty} kg</td>
                                                <td className="py-2 pr-4">
                                                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs text-white ${statusColor(row.order_status)}`}>
                                                        {row.order_status}
                                                    </span>
                                                </td>
                                                <td className="py-2 text-right">
                                                    <button
                                                        className="text-blue-500 hover:underline text-xs"
                                                        onClick={() => navigate(`/dashboard/order-mangagement/${row.order_id}`)}
                                                    >
                                                        View
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>

                {/* Quick actions */}
                <div className="bg-white rounded-2xl shadow-md p-6">
                    <h2 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h2>
                    <div className="flex flex-wrap gap-3">
                        {[
                            { label: 'Add Vendor', path: '/dashboard/vendor/add' },
                            { label: 'Add Buyer', path: '/dashboard/buyer/add' },
                            { label: 'Add Delivery Agent', path: '/dashboard/delivery_agent/add' },
                            { label: 'Add Requirement', path: '/dashboard/requirement/addrequirement' },
                        ].map(action => (
                            <button
                                key={action.path}
                                onClick={() => navigate(action.path)}
                                className="flex items-center space-x-2 bg-gradient-to-r from-customTeal to-green-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
                            >
                                <FaPlus className="text-xs" />
                                <span>{action.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </Sidebar>
    );
}
