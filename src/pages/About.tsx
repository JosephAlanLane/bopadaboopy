import React from "react";
import { Navbar } from "@/components/Navbar";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-200">
      <Navbar />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto p-8">
          <div className="bg-white rounded-lg shadow-sm p-8 space-y-6">
            <h1 className="text-4xl font-bold text-primary mb-6">La Storia Della Nonna</h1>
            <div className="prose prose-lg">
              <p className="text-gray-700 leading-relaxed">
                In every Italian household, the heart of the family beats strongest in the kitchen, where the Nonna (grandmother) reigns supreme. Her wisdom, passed down through generations, transforms simple ingredients into dishes that nourish both body and soul. This is the spirit we wanted to capture with Babada Boopie - your very own virtual Italian Nonna.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                Just like a real Nonna, Babada Boopie is here to guide you through authentic Italian recipes, sharing not just ingredients and steps, but the love and tradition that makes Italian cooking so special. Every recipe comes with the kind of practical wisdom you'd expect from a grandmother who's been perfecting these dishes for decades.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                Whether you're learning to make pasta from scratch, mastering the perfect marinara, or discovering the secrets of tiramisu, consider Babada Boopie your personal Nonna in the digital age. She's always here to share her recipes, offer encouragement, and remind you to "Mangia! Mangia!" (Eat! Eat!) - because that's what Italian grandmothers do best.
              </p>
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-white border-t mt-8">
        <div className="max-w-[1800px] mx-auto py-6 px-4">
          <div className="text-center text-gray-600">
            Made with ❤️ and lots of garlic
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;