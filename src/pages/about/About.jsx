import { motion } from "motion/react";
import { Link } from "react-router";
import { FaAward, FaChartLine, FaGlobe, FaUsers } from "react-icons/fa";

const About = () => {
  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image: "https://i.pravatar.cc/150?img=20",
    },
    {
      name: "Ahmed Khan",
      role: "CTO",
      image: "https://i.pravatar.cc/150?img=21",
    },
    {
      name: "Emma Williams",
      role: "Operations Manager",
      image: "https://i.pravatar.cc/150?img=22",
    },
    {
      name: "James Chen",
      role: "Lead Developer",
      image: "https://i.pravatar.cc/150?img=23",
    },
  ];

  const stats = [
    { icon: FaUsers, label: "Students Helped", value: "10K+" },
    { icon: FaGlobe, label: "Universities", value: "150+" },
    { icon: FaChartLine, label: "Scholarships", value: "500+" },
    { icon: FaAward, label: "Success Rate", value: "92%" },
  ];

  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="w-11/12 md:w-10/12 mx-auto py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            About Scholar Stream
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Connecting dreams with opportunities. Scholar Stream is dedicated to
            making quality education accessible to every deserving student
            worldwide.
          </p>
        </motion.div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-gray-50 dark:bg-gray-800 py-16 md:py-24">
        <div className="w-11/12 md:w-10/12 mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Our Mission
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                To democratize access to scholarships by providing a transparent,
                secure, and user-friendly platform that connects deserving
                students with financial aid opportunities from leading
                universities and organizations worldwide.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Our Vision
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                A world where financial constraints never hinder educational
                aspirations. We envision Scholar Stream as the global gateway to
                scholarship opportunities, empowering millions of students to
                pursue their dreams regardless of their socioeconomic background.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="w-11/12 md:w-10/12 mx-auto py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <Icon className="text-teal-600 dark:text-teal-400 text-4xl mx-auto mb-4" />
                <p className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {stat.value}
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-gray-50 dark:bg-gray-800 py-16 md:py-24">
        <div className="w-11/12 md:w-10/12 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Meet Our Team
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Dedicated professionals working to make education accessible
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  {member.name}
                </h3>
                <p className="text-teal-600 dark:text-teal-400">
                  {member.role}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-11/12 md:w-10/12 mx-auto py-16 md:py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Ready to Find Your Scholarship?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Join thousands of students who have already achieved their dreams
            with Scholar Stream
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/all-scholarships">
              <button className="px-8 py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg transition">
                Explore Scholarships
              </button>
            </Link>
            <Link to="/contact">
              <button className="px-8 py-3 border-2 border-teal-600 text-teal-600 hover:bg-teal-50 dark:hover:bg-gray-800 font-semibold rounded-lg transition">
                Contact Us
              </button>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default About;
