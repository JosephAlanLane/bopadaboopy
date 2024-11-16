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
                Growing up in an Italian household, the heart of our family was always the kitchen, where my beloved Nonna (grandmother) reigned supreme. Her gentle hands and warm smile turned every meal into a celebration of love and tradition. The aroma of fresh herbs, garlic, and tomato sauce would fill our home, drawing everyone to gather around her as she worked her culinary magic.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                My childhood memories are filled with moments spent beside her, learning the secrets of perfect pasta, the patience needed for a rich marinara sauce, and the joy of sharing meals with family. She taught me that cooking wasn't just about following recipes - it was about putting your heart into every dish and creating moments of joy for those you love.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                Now, I want to share these precious memories and recipes with you. Through this collection, I hope to pass on not just the techniques and ingredients that made my Nonna's cooking special, but also the warmth and love that made every meal in her kitchen feel like coming home. Let these recipes bring a little bit of my Nonna's magic into your kitchen, just as she brought magic into mine.
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