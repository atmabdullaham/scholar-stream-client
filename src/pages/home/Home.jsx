import ContactUs from "./contactUs/ContactUs";
import Hero from "./hero/Hero";
import SuccessStories from "./successStories/SuccessStories";
import TopScholarships from "./topScholarships/TopScholarships";

const Home = () => {
  return (
    <div>
      <Hero></Hero>
      <TopScholarships></TopScholarships>
      <SuccessStories></SuccessStories>
      <ContactUs></ContactUs>
    </div>
  );
};

export default Home;
