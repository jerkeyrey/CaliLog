import Navbar from "../components/navbar";

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
          <a
            href="/register"
            className="mt-10 inline-block bg-blue-500 hover:bg-blue-600 px-10 py-4 rounded-full text-xl font-semibold"
          >
            Get Started
          </a>
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
          <a
            href="/register"
            className="mt-8 inline-block bg-blue-500 hover:bg-blue-600 px-8 py-4 rounded-full text-xl font-semibold text-white"
          >
            Join Now
          </a>
        </section>

        {/* Call to Action */}
        <section className="mt-20 bg-blue-500 text-white py-16 px-6 rounded-lg shadow-lg max-w-6xl">
          <h2 className="text-4xl font-extrabold mb-6">
            Start Your Journey Today!
          </h2>
          <p className="text-lg mb-8">
            Take the first step towards a healthier lifestyle. Join CaliLog and
            start tracking your calories, setting goals, and achieving your
            fitness dreams.
          </p>
          <a
            href="/register"
            className="inline-block bg-white text-blue-500 hover:bg-gray-100 px-10 py-4 rounded-full text-xl font-semibold shadow-md transition"
          >
            Sign Up for Free
          </a>
        </section>
      </main>
    </div>
  );
}
