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
                Growing up in an Italian household, the heart of our family was always the kitchen, where my beloved Nonna (grandmother) worked her culinary magic. Her hands, weathered by years of kneading pasta dough and stirring rich marinara sauces, created dishes that weren't just meals – they were expressions of love that brought our family together.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                Every Sunday afternoon, the house would fill with the intoxicating aromas of garlic, basil, and slowly simmering sauces. My Nonna would let me stand beside her on a little stool, teaching me the secrets passed down through generations. She never used recipes or measurements – everything was "a pinch of this" or "until it feels right." Her wisdom wasn't just about cooking; it was about nurturing both the body and soul.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                Now, with Babada Boopie, I want to share that same warmth and love that filled my Nonna's kitchen. While nothing can replace the experience of cooking alongside a real Italian grandmother, I hope to bring a piece of that magic into your home. Every recipe here carries the spirit of those Sunday afternoons, the laughter, the stories, and most importantly, the love that made every meal special.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                Just like my Nonna would say, "Mangiare è una cosa seria" (eating is a serious matter), but it should also bring joy and bring people together. So welcome to my virtual kitchen – let's create some memories together!
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