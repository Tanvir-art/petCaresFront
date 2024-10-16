"use client";

import { useGetUserInfoQuery } from '@/app/redux/api/baseApi';

const AdminDashboard: React.FC = () => {
  const { data: authorData } = useGetUserInfoQuery({});
  // // const { data: payments, error: paymentError } = useGetPaymentHistoryQuery();

  // // const [publishPost] = usePublishPostMutation();
  // // const [unpublishPost] = useUnpublishPostMutation();

  // const handlePublish = async (id: string) => {
  //   await publishPost(id);
  // };

  // const handleUnpublish = async (id: string) => {
  //   await unpublishPost(id);
  // };

  return (
    <div >
      <div className='flex justify-center items-center h-screen'>
        <h1 className='text-3xl font-bold text-gray-600'>Welcome to Admin Dashboard Mr. {authorData?.data?.name}</h1>
      </div>

    </div>
  );
};

export default AdminDashboard;
