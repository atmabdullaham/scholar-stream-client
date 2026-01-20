import { motion } from "motion/react";

const SuccessStories = () => {
  const stories = [
    {
      name: "Ayesha Rahman",
      country: "Germany",
      scholarshipType: "Full Fund",
      imgUrl: "https://i.pravatar.cc/150?img=32",
      message:
        "Scholar Stream helped me secure a fully funded scholarship for my Master's degree in Germany. The process was simple and transparent.",
    },
    {
      name: "Rakib Hasan",
      country: "Canada",
      scholarshipType: "Partial Fund",
      imgUrl:
        "https://img.freepik.com/free-photo/portrait-teenage-boy_23-2148105585.jpg?semt=ais_hybrid&w=740&q=80",
      message:
        "Thanks to Scholar Stream, I found a partial scholarship in Canada at the right time. The reviews and guidance were extremely helpful.",
    },
    {
      name: "Nusrat Jahan",
      country: "Australia",
      scholarshipType: "Self Fund",
      imgUrl: "https://i.pravatar.cc/150?img=45",
      message:
        "Scholar Stream guided me through self-funded options in Australia. It saved me time and helped me make informed decisions.",
    },
    {
      name: "Tanvir Ahmed",
      country: "United Kingdom",
      scholarshipType: "Full Fund",
      imgUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMEDWHO3SrnAfS75Tm2flhwVWxZhwwFEwygA&s",
      message:
        "I received a full-funded PhD offer in the UK through Scholar Stream. The platform is trustworthy and well-organized.",
    },
    {
      name: "Sadia Akter",
      country: "Malaysia",
      scholarshipType: "Partial Fund",
      imgUrl:
        "https://img.freepik.com/free-photo/young-beautiful-woman-smiling-posing-purple-wall_176420-2852.jpg",
      message:
        "Scholar Stream made it easy to compare partial scholarships in Malaysia. I felt confident throughout the application process.",
    },
    {
      name: "Mahmudul Hasan",
      country: "Japan",
      scholarshipType: "Full Fund",
      imgUrl:
        "https://www.shutterstock.com/image-photo/portrait-one-young-happy-cheerful-600nw-1980856400.jpg",
      message:
        "With Scholar Stream, I successfully secured a Japanese government scholarship. The platform truly supports students' dreams.",
    },
  ];

  return (
    <section className="bg-gray-50 dark:bg-gray-800 transition-colors duration-300 py-16 md:py-24">
      <div className="w-11/12 md:w-10/12 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Success Stories
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Real experiences from students who achieved their dreams with
            Scholar Stream
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story, index) => (
            <motion.div
              key={story.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex gap-4 mb-4">
                <img
                  className="w-12 h-12 rounded-full object-cover"
                  src={story.imgUrl}
                  alt={story.name}
                  loading="lazy"
                />
                <div>
                  <h6 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {story.name}
                  </h6>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {story.country}
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 text-xs font-semibold rounded-full">
                  {story.scholarshipType}
                </span>
              </div>

              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                "{story.message}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
