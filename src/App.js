import React, { useRef, useEffect, useState } from "react";
import "./App.css";

const getDimensions = ele => {
  const { height } = ele.getBoundingClientRect();
  const offsetTop = ele.offsetTop;
  const offsetBottom = offsetTop + height;

  return {
    height,
    offsetTop,
    offsetBottom,
  };
};

const scrollTo = ele => {
  ele.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

function App() {
  const [visibleSection, setVisibleSection] = useState();

  const headerRef = useRef(null);
  const redRef = useRef(null);
  const providerRef = useRef(null);
  const blueRef = useRef(null);

  const sectionRefs = [
    { section: "red", ref: redRef },
    { section: "green", ref: providerRef },
    { section: "blue", ref: blueRef },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const { height: headerHeight } = getDimensions(headerRef.current);
      const scrollPosition = window.scrollY + headerHeight;

      const selected = sectionRefs.find(({ section, ref }) => {
        const ele = ref.current;
        if (ele) {
          const { offsetBottom, offsetTop } = getDimensions(ele);
          return scrollPosition > offsetTop && scrollPosition < offsetBottom;
        }
      });

      if (selected && selected.section !== visibleSection) {
        setVisibleSection(selected.section);
      } else if (!selected && visibleSection) {
        setVisibleSection(undefined);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [visibleSection]);
  return (
    <div className="App">
      <div className="top-spacer" />

      <div className="content">
        <div className="sticky">
          <div className="header" ref={headerRef}>
            <button
              type="button"
              className={`header_text ${visibleSection === "red" ? "selected" : ""}`}
              onClick={() => {
                scrollTo(redRef.current);
              }}
            >
              Red
            </button>
            <button
              type="button"
              className={`header_text ${visibleSection === "green" ? "selected" : ""}`}
              onClick={() => {
                scrollTo(providerRef.current);
              }}
            >
              Green
            </button>
            <button
              type="button"
              className={`header_text ${visibleSection === "blue" ? "selected" : ""}`}
              onClick={() => {
                scrollTo(blueRef.current);
              }}
            >
              Blue
            </button>
          </div>
        </div>
        <div className="section" id="red" ref={redRef} />
        <div className="section" id="green" ref={providerRef} />
        <div className="section" id="blue" ref={blueRef} />
      </div>

      <div className="bottom-spacer" />
    </div>
  );
}

export default App;
