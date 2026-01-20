import AboutHero from "./sections/AboutHero";
import MissionVision from "./sections/MissionVision";
import Team from "./sections/Team";
import WhyChooseUs from "./sections/WhyChooseUs";

const AboutUs = () => {
  return (
    <div className="bg-white">
      <AboutHero />
      <MissionVision />
      <Team />
      <WhyChooseUs />
      {/* <TestimonialsAbout /> */}
    </div>
  );
};

export default AboutUs;
