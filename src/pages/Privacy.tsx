import React from "react";
import { Navbar } from "@/components/Navbar";

const Privacy = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
      <Navbar />
      <main className="flex-1">
        <div className="max-w-4xl mx-auto p-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
            <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
            <div className="prose dark:prose-invert max-w-none">
              <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>
              
              <h2 className="text-2xl font-semibold mt-6 mb-4">1. Introduction</h2>
              <p>Welcome to Bopada Boopy ("we," "our," or "us"). We respect your privacy and are committed to protecting your personal data.</p>
              
              <h2 className="text-2xl font-semibold mt-6 mb-4">2. Information We Collect</h2>
              <p>We collect information that you provide directly to us when you:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Create an account</li>
                <li>Use our meal planning features</li>
                <li>Save or share recipes</li>
                <li>Contact us</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mt-6 mb-4">3. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Provide and maintain our services</li>
                <li>Personalize your experience</li>
                <li>Improve our services</li>
                <li>Communicate with you</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mt-6 mb-4">4. Data Security</h2>
              <p>We implement appropriate security measures to protect your personal information.</p>
              
              <h2 className="text-2xl font-semibold mt-6 mb-4">5. Third-Party Services</h2>
              <p>We use Google Sign-In for authentication. When you use Google Sign-In, you are subject to Google's Privacy Policy and Terms of Service.</p>
              
              <h2 className="text-2xl font-semibold mt-6 mb-4">6. Your Rights</h2>
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Access your personal data</li>
                <li>Correct your personal data</li>
                <li>Delete your personal data</li>
                <li>Object to processing of your personal data</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mt-6 mb-4">7. Contact Us</h2>
              <p>If you have any questions about this Privacy Policy, please contact us at privacy@bopadaboopy.com</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Privacy;