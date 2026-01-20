const Team = () => {
  const team = [
    {
      id: 1,
      name: "Ahmed Hassan",
      role: "CEO & Founder",
      image: "👨‍💼",
      bio: "Visionary leader with 10+ years in education technology",
    },
    {
      id: 2,
      name: "Fatima Ahmed",
      role: "Head of Operations",
      image: "👩‍💼",
      bio: "Expert in scholarship coordination and student support",
    },
    {
      id: 3,
      name: "Muhammad Ali",
      role: "Technical Director",
      image: "👨‍💻",
      bio: "Tech innovator building secure, scalable platforms",
    },
    {
      id: 4,
      name: "Saira Khan",
      role: "Student Advisor",
      image: "👩‍🎓",
      bio: "Dedicated to student success and career guidance",
    },
  ];

  return (
    <section className="bg-teal-100 ">
      <div className="w-11/12 md:w-10/12 mx-auto py-8 md:py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-teal-700 mb-3">
            Meet Our Team
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Dedicated professionals committed to transforming education through
            innovation and excellence
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 text-center border border-teal-100"
            >
              <div className="text-6xl mb-4">{member.image}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-1">
                {member.name}
              </h3>
              <p className="text-teal-600 font-semibold mb-3">{member.role}</p>
              <p className="text-gray-600 text-sm">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
