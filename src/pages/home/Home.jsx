import ContactUs from "./contactUs/ContactUs";
import FAQ from "./faq/FAQ";
import Features from "./features/Features";
import Hero from "./hero/Hero";
import Newsletter from "./newsletter/Newsletter";
import Statistics from "./statistics/Statistics";
import SuccessStories from "./successStories/SuccessStories";
import TopScholarships from "./topScholarships/TopScholarships";

const Home = () => {
  return (
    <div>
      <Hero />
      <TopScholarships />
      <Features />
      <Statistics />
      {/* <Testimonials /> */}
      <FAQ />
      <Newsletter />
      {/* <CallToAction /> */}
      <SuccessStories />
      <ContactUs />
    </div>
  );
};

export default Home;
