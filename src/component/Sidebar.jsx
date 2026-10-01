import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import * as authApi from '../api/auth';
import { FaLaptopHouse, FaUserCircle } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import { GiNotebook } from "react-icons/gi";
import { DiCodepen } from "react-icons/di";
import { IoExitSharp } from "react-icons/io5";
import { BsChevronCompactRight, BsChevronCompactLeft } from "react-icons/bs";
import { FaRegUserCircle } from "react-icons/fa";
import { FaLink } from 'react-icons/fa';
import { FaHandshake } from 'react-icons/fa';
import AuthContext from '../context/AuthContext';
import 'react-toastify/dist/ReactToastify.css';
import { FaUserAltSlash } from "react-icons/fa";
import { useLocation } from 'react-router-dom';

const NAV_ITEMS = [
    { id: 'dashboard', label: 'Dashboard', icon: FaLaptopHouse, path: '/' },
    {
        id: 'userManagement',
        label: 'User Management',
        icon: FaUserCircle,
        children: [
            { label: 'Vendors', path: '/dashboard/vendor/vendors' },
            { label: 'Buyers', path: '/dashboard/buyer/buyers' },
            { label: 'Delivery Agent', path: '/dashboard/delivery_agent/allgents' },
        ],
    },
    { id: 'category', label: 'Category Management', icon: BiSolidCategory, path: '/dashboard/category/category' },
    {
        id: 'orderManagement',
        label: 'Order Management',
        icon: DiCodepen,
        children: [
            { label: 'Supply', path: '/dashboard/supplytable' },
            { label: 'Requirement', path: '/dashboard/requirement/allrequirement' },
            { label: 'MainOrder Table', path: '/dashboard/maintable' },
        ],
    },
    {
        id: 'orderHistory',
        label: 'Order History',
        icon: DiCodepen,
        children: [
            { label: 'Supply', path: '/dashboard/history/supplytable' },
            { label: 'Requirement', path: '/dashboard/history/requirementtable' },
            { label: 'MainOrder Table', path: '/dashboard/history/maintable' },
        ],
    },
    { id: 'addRequirement', label: 'Add Requirement', icon: GiNotebook, path: '/dashboard/requirement/addrequirement' },
    { id: 'updateLinks', label: 'Update Links', icon: FaLink, path: '/dashboard/update-links' },
    { id: 'deactivateAccount', label: 'Deactivated Account', icon: FaUserAltSlash, path: '/dashboard/deactivateaccount' },
];

export default function Sidebar({ children, page }) {
    const [sideButton, setSideButton] = React.useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const [interestedVendorNotifications, setInterestedVendorNotifications] = useState(0);
    const [expandedGroups, setExpandedGroups] = useState(() => {
        const initial = {};
        NAV_ITEMS.forEach((item) => {
            if (item.children) {
                initial[item.id] = localStorage.getItem(`expand_${item.id}`) === 'true';
            }
        });
        return initial;
    });
    const { logout } = React.useContext(AuthContext);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const res = await authApi.getInterestedVendorCount();
                setInterestedVendorNotifications(res.data.data.count);
            } catch (err) {
                console.error('Error fetching notifications:', err);
            }
        };

        fetchNotifications();
    }, []);

    const handleInterestedVendorClick = async () => {
        try {
            await authApi.markAllNotificationsRead();
            setInterestedVendorNotifications(0);
            navigate('/dashboard/interested-vendor');
        } catch (err) {
            console.error('Error marking notifications as unread:', err);
        }
    };

    const toggleGroup = (id) => {
        setExpandedGroups((prev) => {
            const next = { ...prev, [id]: !prev[id] };
            localStorage.setItem(`expand_${id}`, next[id]);
            return next;
        });
    };

    const sideButtonFunction = () => {
        setSideButton((prev) => !prev);
    };

    const handleLogout = async () => {
        const res = await logout();
        if (res.status === 200) {
            alert("logout successful");
            navigate('/login');
        } else {
            alert(res.data.message);
        }
    };

    const isActive = (path) => (location.pathname === path ? { color: 'red', fontWeight: 'bold' } : { color: 'white' });

    return (
        <>
            <div className='flex  h-screen'>
                <div className={`ps-10 bg-gradient-to-r from-customTeal to-green-500  flex flex-col justify-around w-3/12 rounded-e-3xl shadow-2xl ${sideButton ? 'hidden' : ""}`}>

                    <div className='box-border text-center '>
                        <h2 className='box-border font-bold text-start text-white text-xl'>Welcome Back,</h2>
                        <h1 className='text-xl font-bold text-start text-white'>Pawan Mishra!</h1>
                    </div>
                    <div className='h-150'>
                        <ul className='align flex flex-col space-y-4 '>
                            {NAV_ITEMS.map((item) => {
                                const Icon = item.icon;
                                if (item.children) {
                                    return (
                                        <li key={item.id} className="flexspace-x-2 cursor-pointer flex-col">
                                            <div className='flex text-white items-center hover:text-black' onClick={() => toggleGroup(item.id)}>
                                                <Icon className="text-xl" />
                                                <span className="text-xl">{item.label}</span>
                                            </div>
                                            <ul className={expandedGroups[item.id] ? 'text-white flex flex-col justify-center ms-10 text-sm' : 'hidden'}>
                                                {item.children.map((child) => (
                                                    <Link key={child.path} to={child.path} style={isActive(child.path)}>
                                                        <li className='hover:text-black'>&#x2022;{child.label}</li>
                                                    </Link>
                                                ))}
                                            </ul>
                                        </li>
                                    );
                                }
                                return (
                                    <Link key={item.id} to={item.path} style={isActive(item.path)}>
                                        <li className="hover:text-black flex items-center space-x-2 cursor-pointer">
                                            <Icon className="text-xl" />
                                            <span className="text-xl">{item.label}</span>
                                        </li>
                                    </Link>
                                );
                            })}
                            <li className=" hover:text-black flex items-center space-x-2 cursor-pointer" style={isActive('/dashboard/interested-vendor')} onClick={handleInterestedVendorClick}>
                                <FaHandshake className="text-xl" />
                                <span className="text-xl">Interested Vendor</span>
                                {interestedVendorNotifications > 0 && (
                                    <div className="relative">
                                        <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                                            <span className="text-white font-bold text-sm">
                                                {interestedVendorNotifications}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </li>
                        </ul>
                    </div>
                    <div className="pb-10">
                        <div className="flex items-center text-white hover:text-black space-x-2 cursor-pointer" onClick={handleLogout}>
                            <IoExitSharp className="text-4xl" />
                            <span className="text-xl">logout</span>
                        </div>
                    </div>

                </div>
                <div className={sideButton ? "flex justify-start items-center h-screen" : 'self-center flex justify-center'}>
                    <button className='text-4xl rounded-e-3xl h-40 bg-gradient-to-r from-customTeal to-green-500 shadow-left hover:text-white' onClick={sideButtonFunction}>
                        {sideButton ? <BsChevronCompactRight /> : <BsChevronCompactLeft />}
                    </button>
                </div>
                <div className='w-full'>

                    <div className='flex items-center text-3xl font-bold mt-10 ms-5'>
                        <FaRegUserCircle style={{ color: 'green' }} className='text-3xl items-center mt-1 ' />
                        <h1 style={{ color: 'green' }}>{page}</h1>
                    </div>
                    <div style={{ height: "90%" }} className=' overflow-auto'>
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
}

Sidebar.propTypes = {
    children: PropTypes.node,
    page: PropTypes.string,
};
