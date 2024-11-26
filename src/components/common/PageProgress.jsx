import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const PageProgress = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    const totalHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const currentPosition = window.scrollY;
    const scrollPercent = (currentPosition / totalHeight) * 100;
    setScrollPosition(scrollPercent);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Box
      position={"fixed"}
      top={0}
      left={0}
      width={`${scrollPosition}%`}
      height={1}
      background={"linear-gradient(90deg, #FF6B6B, #FFA07A, #FF69B4)"}
      borderRadius={"0 5px 5px 0"}
      boxShadow={"0 2px 4px rgba(0, 0, 0, 0.2)"}
      zIndex={1000}
    />
  );
};

export default PageProgress;
