"use client";

import { useGetAllPaymentQuery } from "@/app/redux/api/baseApi";

const PaymentHistory = () => {
    // Fetch payments data from the API
    const { data: payments, isLoading, isError } = useGetAllPaymentQuery({});
    console.log(payments);

    // Loading and Error handling
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error fetching payment history</div>;
    }

    type Payment = {
        _id: string;
        postId: string;
        amount: number;
        currency: string;
        paymentStatus: string;
    };

    return (
        <div className="my-20">
            <div className="overflow-x-auto">
                <table className="min-w-full border-collapse table-auto">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="px-4 py-2 text-left text-sm md:text-base">Post ID</th>
                            <th className="px-4 py-2 text-left text-sm md:text-base">Amount</th>
                            <th className="px-4 py-2 text-left text-sm md:text-base">Currency</th>
                            <th className="px-4 py-2 text-left text-sm md:text-base">Payment Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments?.data?.map((payment: Payment) => (
                            <tr key={payment._id} className="border-b">
                                <td className="px-4 py-2 text-sm md:text-base">{payment.postId}</td>
                                <td className="px-4 py-2 text-sm md:text-base">{payment.amount}</td>
                                <td className="px-4 py-2 text-sm md:text-base">{payment.currency}</td>
                                <td className="px-4 py-2">
                                    <span
                                        className={`px-2 py-1 rounded-full text-white text-sm md:text-base ${payment.paymentStatus === "paid"
                                            ? "bg-green-500"
                                            : "bg-red-500"
                                            }`}
                                    >
                                        {payment.paymentStatus}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;
