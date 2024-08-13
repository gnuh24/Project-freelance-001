import React from 'react';
import ShippingFeeTable from '../../components/admin/shippingFeeComponents/ShippingFeeTable.jsx'; // Adjust import path as needed

const ShippingFees = () => {
    return (
        <div className="h-[90.2vh]">
            <div className="p-4 bg-white border-b border-gray-200 lg:mt-1.5 dark:bg-gray-700 dark:border-gray-700">
                <div className="mb-4">
                    <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                        Quản lý phí vận chuyển
                    </h1>
                </div>
            </div>
            <ShippingFeeTable />
        </div>
    );
};

export default ShippingFees;
