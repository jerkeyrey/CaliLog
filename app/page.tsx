import Navbar from "../components/navbar";
import Link from "next/link";
import { Github, Instagram, Twitter, Facebook, Linkedin } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <Navbar />
      <main className="flex-grow p-6 flex flex-col items-center text-center">
        {/* Hero Section */}
        <section className="mt-32 max-w-4xl">
          <h2 className="text-6xl font-extrabold leading-tight">
            Track Your Calories{" "}
            <span className="text-blue-500">Effortlessly</span>
          </h2>
          <p className="mt-6 text-2xl text-gray-300">
            CaliLog helps you monitor your daily food intake, stay on top of
            your fitness goals, and make healthier choices.
          </p>
          <Link
            href="/user-form"
            className="mt-10 inline-block bg-blue-500 hover:bg-blue-600 px-10 py-4 rounded-full text-xl font-semibold"
          >
            Get Started
          </Link>
        </section>

        {/* Features Section */}
        <section className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl">
          <div className="bg-blue-500 p-8 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
            <h3 className="text-2xl font-bold text-white">Log Your Meals</h3>
            <p className="mt-4 text-white">
              Easily add meals and track your daily calorie intake with a simple
              and intuitive interface.
            </p>
          </div>
          <div className="bg-green-500 p-8 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
            <h3 className="text-2xl font-bold text-white">Set Goals</h3>
            <p className="mt-4 text-white">
              Customize your calorie goals based on your fitness needs and stay
              motivated to achieve them.
            </p>
          </div>
          <div className="bg-purple-500 p-8 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
            <h3 className="text-2xl font-bold text-white">Monitor Progress</h3>
            <p className="mt-4 text-white">
              View your history, analyze trends, and celebrate your achievements
              over time.
            </p>
          </div>
        </section>

        {/* Join Our Community Section */}
        <section className="mt-20 max-w-6xl bg-gray-800 p-10 rounded-lg shadow-lg">
          <h2 className="text-4xl font-bold text-blue-400">
            Join Our Community
          </h2>
          <p className="mt-4 text-lg text-gray-300">
            Become a part of a vibrant community of fitness enthusiasts. Share
            your progress, exchange tips, and stay motivated with like-minded
            individuals.
          </p>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-700 p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-white">Connect</h3>
              <p className="mt-2 text-gray-300">
                Interact with others, share your journey, and inspire each other
                to achieve your goals.
              </p>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-white">Learn</h3>
              <p className="mt-2 text-gray-300">
                Access exclusive tips, tricks, and resources shared by the
                community to enhance your fitness journey.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="w-full bg-gray-900 text-gray-300 mt-20 border-t border-gray-800">
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* Company Info */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">CaliLog</h3>
                <p className="text-gray-400 mb-6">
                  Making calorie tracking simple and effective for everyone.
                </p>
                <div className="flex items-center justify-center md:justify-start gap-6">
                  <Facebook
                    className="w-6 h-6 text-gray-400 hover:text-blue-500 cursor-default transition-colors"
                    aria-hidden="true"
                  />
                  <Twitter
                    className="w-6 h-6 text-gray-400 hover:text-blue-400 cursor-default transition-colors"
                    aria-hidden="true"
                  />
                  <Instagram
                    className="w-6 h-6 text-gray-400 hover:text-pink-500 cursor-default transition-colors"
                    aria-hidden="true"
                  />
                  <Github
                    className="w-6 h-6 text-gray-400 hover:text-white cursor-default transition-colors"
                    aria-hidden="true"
                  />
                  <Linkedin
                    className="w-6 h-6 text-gray-400 hover:text-blue-600 cursor-default transition-colors"
                    aria-hidden="true"
                  />
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">
                  Quick Links
                </h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/about"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/features"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/privacy"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/terms"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      Terms of Service
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Contact Info */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">
                  Contact Us
                </h3>
                <div className="space-y-2">
                  <p className="text-gray-400">Email: support@calilog.com</p>
                  <p className="text-gray-400">Phone: (555) 123-4567</p>
                  <p className="text-gray-400">Location: San Francisco, CA</p>
                </div>
              </div>
            </div>

            {/* Copyright */}
            <div className="border-t border-gray-800 mt-8 pt-8 text-center">
              <p className="text-gray-500">
                © {new Date().getFullYear()} CaliLog. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
