import React from 'react';
import Header2 from '../../components/Header2';
import FooterBK from '../../components/FooterBK';

export default function PaymentSuccess() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Header2 />
            <main className="flex-grow flex flex-col justify-center items-center py-12">
                <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
                    <h1 className="text-3xl font-bold text-green-500 mb-4">Payment Successful</h1>
                    <p className="text-lg text-gray-700 mb-6">
                        Your payment has been successfully processed. You can now view your order.
                    </p>
                    <a
                        href="/orders" // Link to view orders
                        className="inline-block bg-green-500 text-white font-semibold rounded-md px-6 py-2 transition duration-300 hover:bg-green-600"
                    >
                        View Your Order
                    </a>
                </div>
            </main>
            <FooterBK />
        </div>
    );
}
