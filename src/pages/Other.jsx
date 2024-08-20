import React from 'react';
import Sidebar from '../component/Sidebar';
import { Link } from 'react-router-dom';

export default function UpdateLinks() {
    return (
        <Sidebar page="Update Information">
            <div className="container mx-auto pt-10">
                <h2 className="text-2xl font-bold mb-5">Manage Updates</h2>
                <div className="flex flex-col space-y-4">
                    <Link 
                        to="/update-tnc" 
                        className="px-4 py-2 border border-gray-400 rounded-full text-gray-700 hover:text-black hover:border-black transition ease-in-out duration-300"
                    >
                        Update TNC
                    </Link>
                    <Link 
                        to="/update-privacy" 
                        className="px-4 py-2 border border-gray-400 rounded-full text-gray-700 hover:text-black hover:border-black transition ease-in-out duration-300"
                    >
                        Update Privacy
                    </Link>
                    <Link 
                        to="/update-contact" 
                        className="px-4 py-2 border border-gray-400 rounded-full text-gray-700 hover:text-black hover:border-black transition ease-in-out duration-300"
                    >
                        Update Contact
                    </Link>
                </div>
            </div>
        </Sidebar>
    );
}
