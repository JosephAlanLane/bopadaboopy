import React from "react";
import { Navbar } from "@/components/Navbar";

const SubscriptionCancel = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar />
      <div className="container max-w-2xl mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-6">Subscription Cancelled</h1>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            We're sorry to see you go! Your subscription has been cancelled successfully.
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            You'll continue to have access to your subscription benefits until the end of your current billing period.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionCancel;