import React from "react";
import HeroSection from "../components/HeroSection/HeroSection";
import PopularCategories from "../components/PopularCategories/PopularCategories";
import HomePageJob from "../components/HomePageJob/HomePageJob";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <PopularCategories />
      <HomePageJob/>
    </div>
  );
};

export default HomePage;
