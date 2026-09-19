import { useEffect, useState } from "react";
import Hero from "../../components/Hero/Hero";
import Features from "../../components/Features/Features";
import HowItWorks from "../../components/HowItWorks/HowItWorks";
import FAQ from "../../components/FAQ/FAQ";
import { getHomeContent } from "../../api/home";

function Home() {
  const [homeContent, setHomeContent] = useState(null);

  useEffect(() => {
    getHomeContent()
      .then((data) => setHomeContent(data))
      .catch(() => {
        setHomeContent(null);
      });
  }, []);

  return (
    <>
      <Hero content={homeContent} />
      <Features />
      <HowItWorks />
      <FAQ />
    </>
  );
}

export default Home;
