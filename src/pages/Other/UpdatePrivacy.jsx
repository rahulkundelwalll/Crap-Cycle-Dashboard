import React, { useState, useEffect } from 'react';
import Sidebar from '../../component/Sidebar';
import * as otherApi from '../../api/other';

export default function Updateprivacy() {
    const [privacy, setprivacy] = useState(''); // State to hold the privacy text
    const [isEditing, setIsEditing] = useState(false); // State to toggle between view and edit mode

    useEffect(() => {
        // Fetch the existing privacy from the backend
        const fetchprivacy = async () => {
            try {
                const response = await otherApi.getPrivacy();
                setprivacy(response.data.privacy); // Adjusted to access 'privacy' field from the response
            } catch (error) {
                console.error('Error fetching privacy:', error);
            }
        };

        fetchprivacy();
    }, []);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = async () => {
        try {
            await otherApi.updatePrivacy(privacy); // Posting the updated privacy to the backend
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating privacy:', error);
        }
    };

    return (
        <Sidebar page="Update privacy">
            <div className="container mx-auto pt-10">
                
                <div className="bg-white p-6 rounded-lg shadow-md">
                    {isEditing ? (
                        <textarea
                            className="w-full h-64 p-4 border border-gray-300 rounded-lg"
                            value={privacy}
                            onChange={(e) => setprivacy(e.target.value)}
                        />
                    ) : (
                        <p className="whitespace-pre-wrap">{privacy}</p> // Displaying privacy text
                    )}

                    <div className="mt-4">
                        {isEditing ? (
                            <button
                                onClick={handleSaveClick}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition ease-in-out duration-300"
                            >
                                Save
                            </button>
                        ) : (
                            <button
                                onClick={handleEditClick}
                                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition ease-in-out duration-300"
                            >
                                Edit
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </Sidebar>
    );
}
