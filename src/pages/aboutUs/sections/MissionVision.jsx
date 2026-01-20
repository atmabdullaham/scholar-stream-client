import { FaBullseye, FaLightbulb } from "react-icons/fa";

const MissionVision = () => {
  return (
    <section className="bg-teal-50 ">
      <div className="w-11/12 md:w-10/12 mx-auto py-8 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Mission */}
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <FaBullseye className="text-teal-600 text-4xl mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-3xl font-bold text-teal-700 mb-3">
                  Our Mission
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  To empower students worldwide by providing access to quality
                  scholarships and educational opportunities, breaking barriers
                  and enabling dreams through transparent, secure, and
                  innovative solutions.
                </p>
              </div>
            </div>
          </div>

          {/* Vision */}
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <FaLightbulb className="text-indigo-600 text-4xl mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-3xl font-bold text-indigo-700 mb-3">
                  Our Vision
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  A world where merit and determination, not financial
                  constraints, determine educational success. Where every
                  deserving student has access to world-class education and
                  opportunities for personal and professional growth.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
