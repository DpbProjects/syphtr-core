import { useState, useEffect } from "react";

const useScrollBackground = (topOffset = 50) => {
  const [showBackground, setShowBackground] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackground(window.scrollY >= topOffset);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [topOffset]);

  return showBackground;
};

export default useScrollBackground;
