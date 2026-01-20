import { motion } from "framer-motion";

const AboutHero = () => {
  return (
    <section className="bg-gradient-to-r from-teal-600 to-indigo-600 text-white ">
      <div className="w-11/12 md:w-10/12 mx-auto py-8 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="space-y-6"
          >
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              About Scholar Stream
            </h1>
            <p className="text-lg text-teal-50 leading-relaxed">
              Founded in 2020, Scholar Stream has been revolutionizing
              scholarship discovery for students worldwide. We believe education
              should be accessible to everyone, regardless of financial
              circumstances.
            </p>
            <div className="flex gap-4 pt-4">
              <div className="text-center">
                <p className="text-3xl font-bold">500+</p>
                <p className="text-teal-100">Scholarships</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold">50K+</p>
                <p className="text-teal-100">Success Stories</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold">150+</p>
                <p className="text-teal-100">Universities</p>
              </div>
            </div>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="text-8xl">🎓</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
