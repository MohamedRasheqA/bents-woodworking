import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, LayoutDashboard } from 'lucide-react';

function ToolRecommendationLogo({ className = "w-12 h-12" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14 5L21 3V19L14 21V5Z"
        fill="#4A5568"
        stroke="#2D3748"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 5L10 3V19L3 21V5Z"
        fill="#4A5568"
        stroke="#2D3748"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 12H21"
        stroke="#2D3748"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="7" cy="9" r="1" fill="#2D3748" />
      <circle cx="17" cy="15" r="1" fill="#2D3748" />
    </svg>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
      <div className="text-black mb-4">{icon}</div>
      <h3 className="text-black text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-700">{description}</p>
    </div>
  );
}

export default function Section1() {
  return (
    <div className="pt-16"> {/* Added padding-top to prevent overlap with fixed header */}
      <section className="bg-black text-white">
        <div className="container mx-auto px-4 py-16 flex flex-col items-center text-center min-h-[calc(50vh-4rem)]">
          <h1 className="text-[rgba(23,155,215,255)] text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Welcome to Bent's Woodworking Assistant
          </h1>
          <p className="text-white text-lg md:text-xl lg:text-2xl mb-8 max-w-3xl">
            Your AI-powered companion for all things woodworking. Get expert advice, tool recommendations, and shop improvement tips.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/chat" className="inline-block bg-[rgba(23,155,215,255)] text-black font-semibold py-3 px-6 rounded-lg hover:bg-[rgba(20,139,193,255)] transition duration-300">
              Start Chatting
            </Link>
            <Link to="/shop" className="inline-block bg-black text-white font-semibold py-3 px-6 rounded-lg border-2 border-white hover:bg-white hover:text-black transition duration-300">
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-black text-3xl md:text-4xl font-bold mb-12 text-center">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<MessageSquare size={40} />}
              title="Expert Advice"
              description="Get instant answers to your woodworking questions from our AI assistant."
            />
            <FeatureCard 
              icon={<ToolRecommendationLogo className="w-10 h-10" />}
              title="Tool Recommendations"
              description="Discover the best tools for your projects with personalized suggestions."
            />
            <FeatureCard 
              icon={<LayoutDashboard size={40} />}
              title="Shop Improvement"
              description="Learn how to optimize your workspace for better efficiency and safety."
            />
          </div>
        </div>
      </section>

      <section className="bg-gray-200 py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 lg:pr-8 mb-8 lg:mb-0">
              <h2 className="text-black text-3xl md:text-4xl font-bold mb-6">
                About Bent's Woodworking Assistant
              </h2>
              <p className="text-black text-lg leading-relaxed">
                Bent's Woodworking Assistant is an AI-powered tool designed to help woodworkers of all skill levels. Whether you're a beginner looking for guidance or an experienced craftsman seeking to optimize your workflow, our assistant is here to help.
              </p>
              <p className="text-black text-lg leading-relaxed mt-4">
                With a vast knowledge base covering techniques, tools, and shop management, we're your go-to resource for all things woodworking.
              </p>
            </div>
            <div className="lg:w-1/2">
              <img
                src="../bents-image.jpg"
                alt="Woodworking Workshop"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[rgba(23,155,215,255)] py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-black text-3xl md:text-4xl font-bold mb-8 text-center">Contact Us</h2>
          <form className="max-w-lg mx-auto">
            <div className="mb-4">
              <label htmlFor="name" className="block text-black font-semibold mb-2">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgba(23,155,215,255)]"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-black font-semibold mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgba(23,155,215,255)]"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="subject" className="block text-black font-semibold mb-2">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgba(23,155,215,255)]"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-black font-semibold mb-2">Your Message</label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgba(23,155,215,255)]"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white font-semibold py-2 px-4 rounded-md hover:bg-gray-800 transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}