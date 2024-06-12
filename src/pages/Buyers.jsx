import React from 'react';
import Sidebar from './../component/Sidebar';

export default function Buyers() {
    return (
        <Sidebar page={'Buyers'}>
            <div className='flex justify-end text-xl font-bold mt-5 '>
                <button class=" bg-green-700 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-3xl me-3">
                    + Add Vendor
                </button>
            </div>

        </Sidebar>

    )
}