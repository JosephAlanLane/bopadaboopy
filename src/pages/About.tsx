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
                Growing up in an Italian household, some of my fondest memories revolve around my Nonna's kitchen. The warm, inviting aroma of fresh herbs and simmering sauces would fill the entire house, drawing everyone to gather around her as she worked her culinary magic. My Nonna wasn't just a cook; she was a storyteller, a teacher, and the heart of our family gatherings.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                Every Sunday afternoon was a sacred time when Nonna would teach me her treasured recipes, passed down through generations. From rolling out fresh pasta dough to stirring the perfect marinara sauce, each lesson was filled with love, laughter, and little secrets that made her dishes special. She always said, "Cooking isn't just about following recipes; it's about putting your heart into every dish."
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                Now, with Babada Boopie, I want to share that same warmth and love that I experienced in my Nonna's kitchen. This isn't just a recipe collection; it's a tribute to the countless hours I spent watching her cook, learning her techniques, and understanding that food is more than sustenance – it's about bringing family together and creating memories that last a lifetime.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                Whether you're learning to make your first lasagna or perfecting your tiramisu, I hope these recipes bring the same joy and connection to your kitchen that my Nonna brought to ours. As she would say, "Mangia, mangia! In questa casa non si spreca il cibo!" (Eat, eat! In this house, we don't waste food!)
              </p>
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-white border-t mt-8">
        <div className="max-w-[1800px] mx-auto py-6 px-4">
          <div className="text-center text-gray-600">
            Made with ❤️ and Nonna's recipes
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;