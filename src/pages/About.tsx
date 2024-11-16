import React from "react";
import { Navbar } from "@/components/Navbar";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-200">
      <Navbar />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto p-8">
          <div className="bg-white rounded-lg shadow-sm p-8 space-y-6">
            <h1 className="text-4xl font-bold text-primary mb-6">The Magic of Family Meals</h1>
            <div className="prose prose-lg">
              <p className="text-gray-700 leading-relaxed">
                Growing up, the heart of our family was always the kitchen, where our beloved Nonna (grandmother) made meal planning and cooking feel effortless. Her gentle guidance turned every meal preparation into a celebration of togetherness, creating precious memories that would last a lifetime. The kitchen wasn't just a place to cook; it was where stories were shared, laughter echoed, and bonds grew stronger.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                In today's busy world, planning and preparing meals can feel overwhelming. That's why we created this platform - to bring back the joy and simplicity of family meal planning. We want to help you create those same magical moments around the dinner table, where conversations flow naturally and memories are made. Whether you're cooking traditional family recipes or exploring new cuisines from around the world, our goal is to make the experience of planning and preparing meals together something to look forward to.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                Through this platform, we hope to share the warmth and love that made every meal in Nonna's kitchen feel special. Let these recipes and meal plans help you bring your family together, creating your own traditions and precious memories around the dinner table. Because at the end of the day, it's not just about the food - it's about the joy of cooking together and the bonds we strengthen when we share a meal.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4 italic">
                "Mangia, mangia! You're too skinny!" - Every Italian Nonna ever
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