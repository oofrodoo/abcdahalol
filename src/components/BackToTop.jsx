import React, { useEffect } from "react";
import "../css/backToTop.css";

export default function BackToTop() {
  const [visible, setVisible] = React.useState(false);

  const handleScroll = () => {
    if (window.scrollY > 200) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <a
      className={`back-to-top ${visible ? "d-block" : "d-none"}`}
      onClick={handleClick}
    >
      <i className="fa fa-chevron-up"></i>
    </a>
  );
}
