import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Spline from "@splinetool/react-spline";
import { useInView } from "framer-motion";
import { useRef } from "react";

const LandingPage = () => {
  const navigate = useNavigate();
  const aboutRef = useRef(null);
  const testimonialsRef = useRef(null);
  const contactRef = useRef(null);

  const isAboutInView = useInView(aboutRef, { once: true, margin: "-100px" });
  const isTestimonialsInView = useInView(testimonialsRef, {
    once: true,
    margin: "-100px",
  });
  const isContactInView = useInView(contactRef, {
    once: true,
    margin: "-100px",
  });

  return (
    <div className="min-h-screen bg-gradient-to-br bg-white">
      {/* Hero Section */}
      <nav className="fixed w-full p-6 flex justify-between items-center z-50">
        <img
          src="https://res.cloudinary.com/diwdkifv7/image/upload/v1741210986/kc_lmhfm3.png"
          alt="Logo"
          className="h-9"
        />
        <div className="space-x-4">
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-2 text-white bg-[#B592F4] rounded-full hover:bg-white hover:text-[#B592F4] transition-colors border-2 border-[#B592F4]"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/register")}
            className="px-6 py-2 bg-white text-[#B592F4] rounded-full hover:bg-white border-2 border-[#B592F4] transition-colors"
          >
            Sign Up
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 relative">
        {/* Spline animation container */}
        <div className="absolute inset-0 z-40">
          <Spline scene="https://prod.spline.design/G7s-w750jRbqPupb/scene.splinecode" />
        </div>

        {/* Content overlay */}
        <motion.div
          className="relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-8xl font-thin text-black mb-6 tracking-tighter">
            Connecting <span className="text-[#B592F4]">Parents</span> to What
            Matters Most!
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            Empowering parents and healthcare providers with seamless child
            health record management
          </p>
          <button
            onClick={() => navigate("/register")}
            className="px-8 py-3 bg-[#B592F4] text-white rounded-full text-lg font-semibold hover:bg-orange-50 transition-colors z-40"
          >
            Get Started Free
          </button>
        </motion.div>

        {/* New Button at Bottom Right */}
        <button
          onClick={() => navigate("/some-path")}
          className="absolute bottom-4 right-4 px-12 py-3 bg-[#B592F4] text-white rounded-full text-lg font-semibold hover:bg-orange-50 transition-colors z-50 w-58"
        >
          AlgogenZ
        </button>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white" id="about" ref={aboutRef}>
        <motion.div
          className="max-w-6xl mx-auto px-4"
          initial={{ opacity: 0, y: 50 }}
          animate={isAboutInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Why Choose Us?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Secure Records",
                description:
                  "Your child's health data is protected with enterprise-grade security",
              },
              {
                title: "Easy Access",
                description:
                  "Access records anytime, anywhere with our cloud-based solution",
              },
              {
                title: "Healthcare Integration",
                description: "Seamless collaboration with healthcare providers",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="p-9 rounded-3xl border-2 border-[#B592F4] relative"
                initial={{
                  opacity: 0,
                  y: 30,
                  rotateX: -90,
                  perspective: 1000,
                }}
                animate={
                  isAboutInView
                    ? {
                        opacity: 1,
                        y: 0,
                        rotateX: 0,
                      }
                    : {
                        opacity: 0,
                        y: 30,
                        rotateX: -90,
                      }
                }
                transition={{
                  duration: 0.8,
                  delay: index * 0.2,
                  type: "spring",
                  stiffness: 100,
                }}
                whileHover={{
                  rotateY: 10,
                  scale: 1.05,
                  boxShadow:
                    "0 20px 25px -5px rgba(181, 146, 244, 0.2), 0 10px 10px -5px rgba(181, 146, 244, 0.08)",
                }}
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                <motion.h3
                  className="text-xl font-semibold mb-3 text-[#B592F4]"
                  whileHover={{ color: "#9B6EE9" }}
                >
                  {feature.title}
                </motion.h3>
                <motion.p
                  className="text-gray-600"
                  whileHover={{ color: "#4B5563" }}
                >
                  {feature.description}
                </motion.p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Testimonials */}
      <section
        className="py-20 bg-[#E3EDFE]"
        id="testimonials"
        ref={testimonialsRef}
      >
        <motion.div
          className="max-w-6xl mx-auto px-4"
          initial={{ opacity: 0, y: 50 }}
          animate={
            isTestimonialsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
          }
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            What Parents Say
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                quote:
                  "This platform has made managing my children's health records so much easier!",
                author: "Sarah Johnson",
                role: "Parent of 2",
              },
              {
                quote:
                  "The best solution for keeping track of vaccinations and medical history.",
                author: "Michael Chen",
                role: "Parent of 3",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                className="p-8 bg-white rounded-3xl shadow-sm relative overflow-hidden"
                initial={{ opacity: 0, x: index === 0 ? -50 : 50 }}
                animate={
                  isTestimonialsInView
                    ? { opacity: 1, x: 0 }
                    : { opacity: 0, x: index === 0 ? -50 : 50 }
                }
                transition={{ duration: 0.5, delay: index * 0.2 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow:
                    "0 20px 25px -5px rgba(181, 146, 244, 0.2), 0 10px 10px -5px rgba(181, 146, 244, 0.08)",
                  y: -10,
                }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Decorative quote mark */}
                <motion.div
                  className="absolute top-4 left-4 text-[#B592F4] opacity-20 text-6xl font-serif"
                  initial={{ opacity: 0.2 }}
                  whileHover={{ opacity: 0.3, scale: 1.1 }}
                >
                  "
                </motion.div>

                <motion.p
                  className="text-gray-600 mb-4 relative z-10"
                  whileHover={{ color: "#4B5563" }}
                >
                  "{testimonial.quote}"
                </motion.p>

                <motion.div className="relative z-10" whileHover={{ x: 10 }}>
                  <motion.p
                    className="font-semibold text-[#B592F4]"
                    whileHover={{ color: "#9B6EE9" }}
                  >
                    {testimonial.author}
                  </motion.p>
                  <motion.p
                    className="text-sm text-gray-500"
                    whileHover={{ color: "#6B7280" }}
                  >
                    {testimonial.role}
                  </motion.p>
                </motion.div>

                {/* Hover effect background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-[#B592F4]/5 to-transparent opacity-0"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white" id="contact" ref={contactRef}>
        <motion.div
          className="max-w-4xl mx-auto px-4 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={
            isContactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
          }
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold mb-8 text-gray-800">
            Get in Touch
          </h2>
          <p className="text-gray-600 mb-8">
            Have questions? We're here to help!
          </p>
          <div className="flex justify-center space-x-6">
            <motion.a
              href="mailto:karthikeyar1811@gmail.com"
              className="text-[#B592F4] hover:text-black"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              karthikeyar1811@gmail.com
            </motion.a>
            <span className="text-gray-300">|</span>
            <motion.a
              href="tel:+1234567890"
              className="text-[#B592F4] hover:text-black"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              +91 999999999
            </motion.a>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-[#B592F4] text-white py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p>© 2024 Your Application. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
