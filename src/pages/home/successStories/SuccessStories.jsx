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
        "With Scholar Stream, I successfully secured a Japanese government scholarship. The platform truly supports students’ dreams.",
    },
  ];
  return (
    <div
      className="bg-teal-100 text-gray-600 dark:text-gray-300  dark:bg-gray-900"
      id="reviews"
    >
      <div className="w-11/12 md:w-10/12 mx-auto py-8 md:py-16">
        <div className="mb-10 space-y-4 px-6 md:px-0">
          <h2 className="text-center text-2xl md:text-4xl  font-bold text-gray-800">
            Success Stories
          </h2>
          <p className="mt-2 text-center text-gray-600">
            Real experiences from students who achieved their dreams
          </p>
        </div>

        <div className="md:columns-2 lg:columns-3 gap-8 space-y-8">
          {stories.map((story) => (
            <div
              key={story.name}
              className="p-8 border border-gray-100 rounded-3xl bg-white dark:bg-gray-800 dark:border-gray-700
               shadow-2xl shadow-gray-600/10 dark:shadow-none
               flex flex-col justify-between "
            >
              <div>
                <div className="flex gap-4">
                  <img
                    className="w-12 h-12 rounded-full object-cover"
                    src={story.imgUrl}
                    alt={story.name}
                    loading="lazy"
                  />
                  <div>
                    <h6 className="text-lg font-medium text-gray-700 dark:text-white">
                      {story.name}
                    </h6>
                    <p className="text-sm text-gray-500 dark:text-gray-300">
                      {story.country}
                    </p>
                  </div>
                </div>

                <p className="mt-6 text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-3">
                  {story.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SuccessStories;
