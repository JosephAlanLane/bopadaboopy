import React from "react";
import { Navbar } from "@/components/Navbar";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-200">
      <Navbar />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto p-8">
          <div className="bg-white rounded-lg shadow-sm p-8 space-y-6">
            <h1 className="text-4xl font-bold text-primary mb-6">Our Story</h1>
            <div className="prose prose-lg">
              <p className="text-gray-700 leading-relaxed">
                Growing up, I was blessed with the most incredible gift anyone could ask for – Italian grandparents who filled our home with the warmth of traditional cooking and the joy of family gatherings. Every Sunday, the kitchen would come alive with the rich aroma of simmering marinara sauce, the sound of my nonno's hearty laughter, and the sight of my nonna teaching us the secrets of authentic Italian cuisine.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                These cherished memories inspired me to create Babada Boopie – a heartfelt tribute to my Italian heritage and a way to share the magic of having an Italian grandparent with everyone. I wanted to capture not just the recipes, but the love, wisdom, and tradition that made those family meals so special.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                Through Babada Boopie, I hope to bring a piece of that Italian family experience to your kitchen. Whether you're planning your weekly meals or discovering new recipes, consider this your virtual Italian nonno, always ready to share a delicious recipe and a warm "mangia, mangia!"
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