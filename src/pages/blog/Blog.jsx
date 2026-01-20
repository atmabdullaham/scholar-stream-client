import { motion } from "motion/react";
import { FaClock, FaUser } from "react-icons/fa";

const Blog = () => {
  const articles = [
    {
      id: 1,
      title: "Top 10 Tips for Writing a Winning Scholarship Essay",
      excerpt:
        "Learn the secrets to crafting a compelling scholarship essay that stands out from thousands of applications.",
      author: "Sarah Johnson",
      date: "Jan 15, 2024",
      category: "Tips & Tricks",
      image: "https://images.unsplash.com/photo-1507842217343-583f20270319?w=500&h=300&fit=crop",
    },
    {
      id: 2,
      title: "Scholarship Application Timeline: Plan Your Success",
      excerpt:
        "Create the perfect scholarship application strategy with this comprehensive timeline and checklist.",
      author: "Ahmed Khan",
      date: "Jan 10, 2024",
      category: "Planning",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop",
    },
    {
      id: 3,
      title: "Financial Aid vs Scholarships: What's the Difference?",
      excerpt:
        "Understand the differences between various types of financial aid and how scholarships fit into your education funding.",
      author: "Emma Williams",
      date: "Jan 5, 2024",
      category: "Education",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=300&fit=crop",
    },
    {
      id: 4,
      title: "Study Abroad: Your Scholarship Guide to International Education",
      excerpt:
        "Everything you need to know about finding and applying for scholarships to study abroad.",
      author: "James Chen",
      date: "Dec 28, 2023",
      category: "Study Abroad",
      image: "https://images.unsplash.com/photo-1427504494926-eae34ca8edd7?w=500&h=300&fit=crop",
    },
    {
      id: 5,
      title: "Common Scholarship Application Mistakes to Avoid",
      excerpt:
        "Don't let these common mistakes cost you a scholarship. Learn what to avoid during the application process.",
      author: "Sarah Johnson",
      date: "Dec 20, 2023",
      category: "Mistakes",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=300&fit=crop",
    },
    {
      id: 6,
      title: "After Getting Accepted: What Happens Next?",
      excerpt:
        "Congratulations on your scholarship! Here's what to expect and how to prepare for your new academic journey.",
      author: "Emma Williams",
      date: "Dec 15, 2023",
      category: "Tips & Tricks",
      image: "https://images.unsplash.com/photo-1507842217343-583f20270319?w=500&h=300&fit=crop",
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      {/* Hero */}
      <section className="w-11/12 md:w-10/12 mx-auto py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Scholarship Tips & Articles
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Learn insider tips, success stories, and strategies to ace your
            scholarship applications
          </p>
        </motion.div>
      </section>

      {/* Blog Posts Grid */}
      <section className="w-11/12 md:w-10/12 mx-auto py-12 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-teal-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {article.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-teal-600 transition-colors">
                  {article.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                  {article.excerpt}
                </p>

                {/* Meta */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <FaUser size={14} />
                    <span>{article.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaClock size={14} />
                    <span>{article.date}</span>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="bg-gradient-to-r from-teal-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 py-16 md:py-24">
        <div className="w-11/12 md:w-10/12 mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Stay Updated with New Articles
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Subscribe to get the latest scholarship tips, success stories, and
              exclusive advice delivered to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-600"
              />
              <button
                type="submit"
                className="px-8 py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg transition"
              >
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
