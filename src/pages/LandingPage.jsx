import React from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;

  // Logic remains untouched
  if (inView) {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    });
  }

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    // Global container is now a clean white background
    <div className="bg-white text-gray-900">
      
      {/* Main Landing Page Section (Hero) */}
      {/* Clean White Background, focus on content and contrast */}
      <div className="h-[90vh] relative overflow-hidden bg-white">
        
        {/* Decorative Splash (Subtle accent) */}
        <div className="absolute top-0 right-0 h-4/5 w-4/5 bg-blue-50/50 rounded-bl-full pointer-events-none"></div>

        {/* Hero Section */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            {/* Title - Bold, Black text, using Blue Accent */}
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-6xl md:text-7xl lg:text-8xl font-extrabold mb-6 text-gray-900 leading-tight" 
            >
              Welcome to <span className="text-blue-600">BlogVibes</span>
            </motion.h1>

            {/* Subtitle - Reduced visual weight to prioritize title */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-xl md:text-2xl mb-12 text-gray-600 max-w-3xl mx-auto font-medium" 
            >
              Unlock the world of knowledge and inspiration. Join today for
              exclusive features and community benefits!
            </motion.p>

            {/* Buttons - Clean, rounded, high contrast */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="flex flex-col md:flex-row justify-center gap-4"
            >
              <Link to="/register">
                {/* Primary CTA: Solid Blue background, minimal shadow, strong hover effect */}
                <button className="bg-blue-600 text-white hover:bg-blue-700 px-10 py-4 rounded-full font-bold text-lg transition duration-300 shadow-lg hover:shadow-xl shadow-blue-500/50">
                  Create Your Free Account
                </button>
              </Link>
              <Link to="/login">
                {/* Secondary CTA: Subtle outline style */}
                <button className="bg-white border-2 border-gray-300 text-gray-700 hover:border-blue-600 hover:text-blue-600 px-10 py-4 rounded-full font-bold text-lg transition duration-300">
                  Log In
                </button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating Illustration (Positioned on the side for asymmetric balance) */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-0 right-0 w-1/3 md:w-1/4 lg:w-1/5 opacity-80 hidden md:block"
        >
          <img
            src="/img/landing.svg"
            alt="Illustration"
            className="w-full h-auto"
          />
        </motion.div>
      </div>

      {/* Why Choose BlogVibes Section - Using subtle light gray background for visual separation */}
      <section className="bg-gray-50 text-gray-900 py-24 px-6 md:px-16 lg:px-24">
        <motion.div
          className="container mx-auto text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Title with Blue Accent */}
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Why Choose <span className="text-blue-600">BlogVibes?</span>
          </h2>
          <p className="text-lg md:text-xl mb-16 text-gray-600">
            Unlock the ultimate blogging experience with BlogVibes. Here's why
            we're the best choice for readers and writers alike.
          </p>
        </motion.div>

        {/* Feature Cards - Super clean, elevated look on a light background */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 container mx-auto">
          {/* Centralized Feature Data */}
          {[
            { iconClass: "fas fa-globe", title: "Global Reach", color: "text-blue-600" },
            { iconClass: "fas fa-pencil-alt", title: "Easy to Use", color: "text-green-500" },
            { iconClass: "fas fa-heart", title: "Community Focused", color: "text-pink-500" },
            { iconClass: "fas fa-shield-alt", title: "Secure Platform", color: "text-yellow-500" },
            { iconClass: "fas fa-bolt", title: "Fast & Reliable", color: "text-red-500" },
            { iconClass: "fas fa-star", title: "Exclusive Features", color: "text-purple-600" },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl flex flex-col items-center 
                         hover:translate-y-[-2px] transition duration-300 border border-gray-100" // New: Clean white card, subtle shadow, and gentle lift on hover
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              {/* Icon Container - White background, colored icons */}
              <div className={`bg-gray-50 p-4 rounded-full mb-6 ${feature.color}`}>
                <i className={`${feature.iconClass} text-3xl`}></i>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">
                {feature.title}
              </h3>
              <p className="text-gray-500 text-center leading-relaxed">
                {/* Content shortened for readability */}
                {(feature.title === "Global Reach" && "Share your blogs with a worldwide audience and connect with readers globally.") ||
                 (feature.title === "Easy to Use" && "Effortlessly create, edit, and publish blogs with our intuitive interface.") ||
                 (feature.title === "Community Focused" && "Engage with a supportive community of writers and readers who share your passion.") ||
                 (feature.title === "Secure Platform" && "Your data is safe with us. We prioritize your privacy and security.") ||
                 (feature.title === "Fast & Reliable" && "Experience lightning-fast page loads and seamless browsing.") ||
                 (feature.title === "Exclusive Features" && "Enjoy unique features designed to elevate your blogging experience.")}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials Section - Back to clean white for contrast with the feature section */}
      <section className="bg-white text-gray-900 py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-extrabold mb-12">
            See What Our Users Are <span className="text-blue-600">Saying</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Testimonial Card Styling - Very subtle shadow, clean borders */}
            <div className="bg-gray-50 p-8 rounded-xl border border-gray-200 shadow-sm">
              <i className="fas fa-quote-left text-blue-600 text-2xl mb-4 block"></i>
              <p className="text-gray-700 italic">
                "BlogVibes has completely transformed how I consume content. It's
                an amazing platform with a fantastic, clean interface."
              </p>
              <span className="block mt-6 text-gray-900 font-semibold">- John Doe, Avid Reader</span>
            </div>
            {/* Card 2 */}
            <div className="bg-gray-50 p-8 rounded-xl border border-gray-200 shadow-sm">
              <i className="fas fa-quote-left text-blue-600 text-2xl mb-4 block"></i>
              <p className="text-gray-700 italic">
                "The personalized recommendations are so helpful. I love the
                community here, it feels welcoming and supportive."
              </p>
              <span className="block mt-6 text-gray-900 font-semibold">- Jane Smith, New Writer</span>
            </div>
            {/* Card 3 */}
            <div className="bg-gray-50 p-8 rounded-xl border border-gray-200 shadow-sm">
              <i className="fas fa-quote-left text-blue-600 text-2xl mb-4 block"></i>
              <p className="text-gray-700 italic">
                "BlogVibes makes blogging easy and fun. The platform is incredibly
                stable and lightning-fast."
              </p>
              <span className="block mt-6 text-gray-900 font-semibold">- Alex Brown, Tech Blogger</span>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call-to-Action Section (Final CTA) - Uses the subtle gray background again */}
      <div className="bg-gray-50 text-gray-900 py-20 px-6 md:px-16 lg:px-24">
        <motion.div
          className="container mx-auto text-center p-10 rounded-xl bg-white shadow-xl" // The CTA block is elevated on the gray background
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
            Ready to Join <span className="text-blue-600">BlogVibes</span>?
          </h2>
          <p className="text-lg md:text-xl mb-10 text-gray-600">
            Start your blogging journey today! Sign in or create an account to
            explore endless possibilities.
          </p>
          <div className="flex justify-center gap-6">
            
            {/* Sign Up Button (Primary, Blue) */}
            <Link to={"/register"}>
              <motion.button
                className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold py-3 px-8 rounded-full shadow-lg shadow-blue-500/50 transition duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Sign Up Now
              </motion.button>
            </Link>

            {/* Log In Button (Secondary, Outline) */}
            <Link to={"/login"}>
              <motion.button
                className="bg-transparent border-2 border-gray-300 hover:border-blue-600 hover:text-blue-600 text-gray-700 font-bold py-3 px-8 rounded-full transition duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Log In
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LandingPage;