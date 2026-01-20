import { motion } from "framer-motion";
import { FaArrowRight, FaCalendar, FaUser } from "react-icons/fa";

const BlogHero = () => {
  return (
    <section className="bg-gradient-to-r from-teal-600 to-indigo-600 text-white py-16 md:py-24">
      <div className="w-11/12 md:w-10/12 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center space-y-4"
        >
          <h1 className="text-4xl md:text-5xl font-bold">Blog & Help Center</h1>
          <p className="text-lg text-teal-50 max-w-2xl mx-auto">
            Tips, guides, and insights to help you succeed in your scholarship
            journey
          </p>
        </motion.div>
      </div>
    </section>
  );
};

const FeaturedArticles = () => {
  const featured = [
    {
      id: 1,
      title: "10 Proven Tips to Stand Out in Scholarship Applications",
      excerpt:
        "Learn the secrets that helped thousands of students win scholarships...",
      author: "Sarah Johnson",
      date: "Jan 15, 2024",
      category: "Tips & Tricks",
      image: "📝",
    },
    {
      id: 2,
      title: "Understanding Scholarship Requirements: A Complete Guide",
      excerpt:
        "Breaking down complex scholarship criteria into simple steps...",
      author: "Dr. Ahmed Khan",
      date: "Jan 10, 2024",
      category: "Guides",
      image: "📚",
    },
  ];

  return (
    <section className="bg-teal-50 py-16 md:py-20">
      <div className="w-11/12 md:w-10/12 mx-auto">
        <h2 className="text-4xl font-bold text-teal-700 mb-12 text-center">
          Featured Articles
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featured.map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-teal-200 group cursor-pointer"
            >
              <div className="text-6xl p-6 bg-gradient-to-r from-teal-100 to-indigo-100 flex items-center justify-center">
                {article.image}
              </div>
              <div className="p-6">
                <span className="text-xs bg-teal-100 text-teal-700 px-3 py-1 rounded-full font-semibold">
                  {article.category}
                </span>
                <h3 className="text-xl font-bold text-gray-800 mt-3 mb-2 group-hover:text-teal-600 transition">
                  {article.title}
                </h3>
                <p className="text-gray-600 mb-4">{article.excerpt}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex gap-3">
                    <span className="flex items-center gap-1">
                      <FaUser className="text-xs" /> {article.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaCalendar className="text-xs" /> {article.date}
                    </span>
                  </div>
                  <FaArrowRight className="group-hover:translate-x-1 transition" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Categories = () => {
  const categories = [
    { name: "Scholarship Tips", count: 24, icon: "💡" },
    { name: "Application Guides", count: 18, icon: "📋" },
    { name: "Student Stories", count: 32, icon: "🎓" },
    { name: "Career Advice", count: 15, icon: "🚀" },
  ];

  return (
    <section className="bg-white py-16 md:py-20">
      <div className="w-11/12 md:w-10/12 mx-auto">
        <h2 className="text-4xl font-bold text-teal-700 mb-12 text-center">
          Browse by Category
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-br from-teal-50 to-indigo-50 rounded-lg p-6 text-center border border-teal-200 hover:shadow-lg transition cursor-pointer"
            >
              <div className="text-4xl mb-3">{cat.icon}</div>
              <h3 className="font-bold text-gray-800 mb-1">{cat.name}</h3>
              <p className="text-teal-600 font-semibold">
                {cat.count} articles
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const RecentPosts = () => {
  const posts = [
    {
      id: 1,
      title: "How to Write a Winning Personal Statement",
      date: "Jan 12, 2024",
    },
    {
      id: 2,
      title: "Financial Aid vs Scholarships: What's the Difference?",
      date: "Jan 8, 2024",
    },
    {
      id: 3,
      title: "5 Common Mistakes Students Make in Applications",
      date: "Jan 5, 2024",
    },
    {
      id: 4,
      title: "Maximizing Your GPA for Scholarship Eligibility",
      date: "Jan 1, 2024",
    },
  ];

  return (
    <section className="bg-teal-50 py-16 md:py-20">
      <div className="w-11/12 md:w-10/12 mx-auto">
        <h2 className="text-4xl font-bold text-teal-700 mb-12 text-center">
          Latest Posts
        </h2>

        <div className="max-w-3xl mx-auto space-y-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white p-6 rounded-lg shadow-sm border border-teal-200 hover:shadow-md transition flex items-center justify-between cursor-pointer group"
            >
              <div>
                <h3 className="text-lg font-bold text-gray-800 group-hover:text-teal-600 transition mb-1">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-500">
                  <FaCalendar className="inline mr-2" />
                  {post.date}
                </p>
              </div>
              <FaArrowRight className="text-teal-600 group-hover:translate-x-1 transition" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// const BlogNewsletter = () => {
//   return (
//     <section className="bg-white py-16 md:py-20">
//       <div className="w-11/12 md:w-10/12 mx-auto">
//         <div className="max-w-2xl mx-auto bg-gradient-to-r from-teal-600 to-indigo-600 rounded-xl p-10 text-white text-center">
//           <h3 className="text-3xl font-bold mb-3">Stay Updated</h3>
//           <p className="text-teal-50 mb-6">
//             Subscribe to get the latest scholarship tips and success stories
//           </p>
//           <div className="flex gap-2">
//             <input
//               type="email"
//               placeholder="Enter your email"
//               className="input flex-1 px-4"
//             />
//             <button className="btn btn-primary text-white font-bold">
//               Subscribe
//             </button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

const Blog = () => {
  return (
    <div className="bg-white">
      <BlogHero />
      <FeaturedArticles />
      <Categories />
      <RecentPosts />
      {/* <BlogNewsletter /> */}
    </div>
  );
};

export default Blog;
