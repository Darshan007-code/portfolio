import { ArrowUpRight, Menu, X, FileText, ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Routes, Route, Link } from "react-router-dom";
const base = import.meta.env.BASE_URL;
const favicon = `${base}favicon.png`;

import heroEye from "@/assets/hero-eye.png";

import WelcomeScreen from "@/components/WelcomeScreen";
import FrontendDeveloperSection from "@/components/FrontendDeveloperSection";
import Showcase from "./components/Showcase";
import ContactSection from "@/components/ContactSection";
import About from "./pages/About";


const logos = ["DARSHAN PATIL", "SOFTWARE ENGINEER", "FULL STACK", "AI & WEB SYSTEMS"];

export default function App() {
  const [showWelcome, setShowWelcome] = useState(() => {
    return !sessionStorage.getItem("portfolio_welcomed");
  });
  const [time, setTime] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");
  const [showBackToTop, setShowBackToTop] = useState(false);

  const text = "DARSHAN";
  const [displayed, setDisplayed] = useState("");
  const [colorMode, setColorMode] = useState(0);

  const colors = [
    "bg-gradient-to-b from-white via-gray-200 via-gray-500 to-black text-transparent bg-clip-text",
    "text-white",
    "bg-gradient-to-b from-black via-gray-500 via-gray-200 to-white text-transparent bg-clip-text",
  ];

  const handleSkipWelcome = () => {
    setShowWelcome(false);
    sessionStorage.setItem("portfolio_welcomed", "true");
  };

  useEffect(() => {
    if (!showWelcome) return;
    const timer = setTimeout(() => {
      setShowWelcome(false);
      sessionStorage.setItem("portfolio_welcomed", "true");
    }, 2800);
    return () => clearTimeout(timer);
  }, [showWelcome]);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);

      const sections = ["Home", "about", "showcase", "contact"];
      const scrollPos = window.scrollY + 250;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (showWelcome || mobileMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showWelcome, mobileMenu]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setDisplayed("");
    let i = 0;
    function type() {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i < text.length) setTimeout(type, 200);
    }
    type();
  }, []);

  return (
    <Routes>
      <Route path="/" element={
        <div className="min-h-screen bg-black text-white overflow-x-hidden">
          <AnimatePresence>
            {showWelcome && <WelcomeScreen onSkip={handleSkipWelcome} />}
          </AnimatePresence>

          <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 md:py-5 backdrop-blur-xl bg-black/40 border-b border-white/10 transition-all duration-300">
            <div className="flex items-center gap-3">
              <img
                src={favicon}
                alt="Logo"
                className="w-8 h-8 rounded-full object-cover border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
              />

              <span className="text-[10px] md:text-xs tracking-[0.3em] text-white/80 uppercase font-medium">
                DARSHAN · PATIL
              </span>
            </div>

            <ul className="hidden md:flex items-center gap-8 lg:gap-10 text-xs tracking-widest uppercase">
              <li
                onClick={() =>
                  document.getElementById("Home")?.scrollIntoView({
                    behavior: "smooth",
                  })
                }
                className={`relative transition-colors cursor-pointer py-1 ${
                  activeSection === "Home" ? "text-white font-semibold" : "text-white/60 hover:text-white"
                } after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:bg-white after:transition-all after:duration-300 ${
                  activeSection === "Home" ? "after:w-full" : "after:w-0 hover:after:w-full"
                }`}
              >
                Home
              </li>

              <li
                onClick={() =>
                  document.getElementById("about")?.scrollIntoView({
                    behavior: "smooth",
                  })
                }
                className={`relative transition-colors cursor-pointer py-1 ${
                  activeSection === "about" ? "text-white font-semibold" : "text-white/60 hover:text-white"
                } after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:bg-white after:transition-all after:duration-300 ${
                  activeSection === "about" ? "after:w-full" : "after:w-0 hover:after:w-full"
                }`}
              >
                About
              </li>

              <li
                onClick={() =>
                  document.getElementById("showcase")?.scrollIntoView({
                    behavior: "smooth",
                  })
                }
                className={`relative transition-colors cursor-pointer py-1 ${
                  activeSection === "showcase" ? "text-white font-semibold" : "text-white/60 hover:text-white"
                } after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:bg-white after:transition-all after:duration-300 ${
                  activeSection === "showcase" ? "after:w-full" : "after:w-0 hover:after:w-full"
                }`}
              >
                Showcase
              </li>

              <li
                onClick={() =>
                  document.getElementById("contact")?.scrollIntoView({
                    behavior: "smooth",
                  })
                }
                className={`relative transition-colors cursor-pointer py-1 ${
                  activeSection === "contact" ? "text-white font-semibold" : "text-white/60 hover:text-white"
                } after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:bg-white after:transition-all after:duration-300 ${
                  activeSection === "contact" ? "after:w-full" : "after:w-0 hover:after:w-full"
                }`}
              >
                Contact
              </li>
            </ul>

            <div className="hidden md:flex items-center gap-4">
              <a
                href={`${base}Darshan_Patil_Resume_SE.pdf`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-white/20 bg-white/5 hover:bg-white hover:text-black transition-all duration-300 text-[11px] font-bold tracking-widest uppercase text-white shadow-[0_0_15px_rgba(255,255,255,0.06)]"
              >
                <FileText size={13} />
                <span>Resume</span>
                <ArrowUpRight size={13} />
              </a>

              <div className="text-[10px] tracking-[0.3em] text-white/50 uppercase font-mono">
                {time}
              </div>
            </div>

            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className="md:hidden text-white z-50 p-2 cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenu ? <X size={24} /> : <Menu size={24} />}
            </button>
          </nav>


          {mobileMenu && (
            <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-8 text-white uppercase tracking-[0.3em] text-sm md:hidden">

              <div className="absolute top-20 text-center">
                <p className="text-[10px] text-white/40 tracking-[0.3em] mb-1 font-mono">
                  CURRENT TIME
                </p>

                <h2 className="text-xl tracking-widest font-semibold font-mono text-white/90">
                  {time}
                </h2>
              </div>

              <button
                onClick={() => {
                  document.getElementById("Home")?.scrollIntoView({
                    behavior: "smooth",
                  });
                  setMobileMenu(false);
                }}
                className="relative py-2 after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-white after:transition-all hover:after:w-full cursor-pointer"
              >
                Home
              </button>

              <button
                onClick={() => {
                  document.getElementById("about")?.scrollIntoView({
                    behavior: "smooth",
                  });
                  setMobileMenu(false);
                }}
                className="relative py-2 after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-white after:transition-all hover:after:w-full cursor-pointer"
              >
                About
              </button>

              <button
                onClick={() => {
                  document.getElementById("showcase")?.scrollIntoView({
                    behavior: "smooth",
                  });
                  setMobileMenu(false);
                }}
                className="relative py-2 after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-white after:transition-all hover:after:w-full cursor-pointer"
              >
                Showcase
              </button>

              <button
                onClick={() => {
                  document.getElementById("contact")?.scrollIntoView({
                    behavior: "smooth",
                  });
                  setMobileMenu(false);
                }}
                className="relative py-2 after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-white after:transition-all hover:after:w-full cursor-pointer"
              >
                Contact
              </button>

              <div className="flex flex-col items-center gap-3 mt-4 pt-6 border-t border-white/10 w-48">
                <a
                  href={`${base}Darshan_Patil_Resume_SE.pdf`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-full bg-white text-black text-xs font-bold tracking-widest uppercase shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                >
                  <FileText size={14} />
                  <span>Resume</span>
                  <ArrowUpRight size={14} />
                </a>

                <Link
                  to="/about"
                  onClick={() => setMobileMenu(false)}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-full border border-white/20 text-white/90 text-xs font-medium tracking-widest uppercase hover:bg-white/10"
                >
                  <span>Full Bio Page</span>
                </Link>
              </div>
            </div>
          )}

          <section
            id="Home"
            className="relative w-full h-screen min-h-[640px] overflow-hidden bg-black"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <img
                src={heroEye}
                alt="Hero"
                className="h-[90%] w-[90%] object-contain object-center"
              />
            </div>

            <div className="relative z-10 w-full h-full flex flex-col justify-between px-6 md:px-12 pt-24 pb-10">
              <h1
                onClick={() => setColorMode((prev) => (prev + 1) % colors.length)}
                className={`font-display uppercase leading-[0.85] tracking-[-0.03em] text-[22vw] md:text-[14vw] lg:text-[13rem] cursor-pointer transition-all duration-300 ${colors[colorMode]}`}
              >
                {displayed || "\u00A0"}
              </h1>

              <p className="md:absolute md:top-28 md:right-12
mt-4 md:mt-0
text-right
text-3xl md:text-4xl lg:text-5xl
leading-[1.05]
max-w-md
font-[Poppins] font-bold
tracking-wide
text-transparent bg-clip-text
bg-[length:200%_auto]
bg-gradient-to-r
from-white via-white/60 to-white
animate-[shine_4s_linear_infinite]">
                Creating
                <br />
                Websites
                <br />
                That Feel
                <br />
                Alive.
              </p>

              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mt-auto">
                <p className="relative text-sm sm:text-base lg:text-xl
    leading-relaxed max-w-md
    font-[Poppins] font-medium
    tracking-wide
    text-transparent bg-clip-text
    bg-[length:200%_auto]
    bg-gradient-to-r
    from-white via-white/60 to-white
    animate-[shine_4s_linear_infinite]">
                  Turning creative ideas into interactive and{" "} <br />
                  <em className="not-italic text-white">
                    high-quality web experiences.
                  </em>
                </p>

                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={`${base}Darshan_Patil_Resume_SE.pdf`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="inline-flex items-center gap-2.5 bg-white text-black px-6 py-3 text-xs tracking-[0.2em] uppercase font-bold hover:bg-zinc-200 hover:scale-105 active:scale-95 transition-all duration-300 rounded-full shadow-[0_0_25px_rgba(255,255,255,0.2)] cursor-pointer">
                      <FileText size={15} />
                      RESUME
                      <ArrowUpRight size={15} />
                    </button>
                  </a>

                  <a
                    href="https://github.com/Darshan007-code"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="inline-flex items-center gap-2.5 border border-white/20 text-white px-6 py-3 text-xs tracking-[0.2em] uppercase font-semibold hover:bg-white/10 hover:border-white/40 hover:scale-105 active:scale-95 transition-all duration-300 rounded-full cursor-pointer">
                      VIEW GITHUB
                      <ArrowUpRight size={15} />
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </section>

          <div className="bg-black border-t border-white/10 py-5 overflow-hidden">
            <div className="flex items-center gap-16 animate-marquee whitespace-nowrap">
              {[...logos, ...logos, ...logos].map((logo, i) => (
                <span
                  key={i}
                  className="text-white/40 text-xs tracking-[0.3em] uppercase font-medium"
                >
                  {logo}
                </span>
              ))}
            </div>
          </div>


          <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .animate-marquee {
          animation: marquee 10s linear infinite;
        }
      `}</style>

          <section id="about">
            <FrontendDeveloperSection />
          </section>
          <section id="showcase">
            <Showcase />
          </section>
          <section id="contact">
            <ContactSection />
          </section>

          {showBackToTop && (
            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              className="fixed bottom-6 right-6 z-40 p-3 rounded-full border border-white/20 bg-black/80 backdrop-blur-xl text-white/70 hover:text-white hover:border-white/40 hover:bg-white/10 hover:scale-110 active:scale-95 transition-all shadow-[0_0_25px_rgba(255,255,255,0.12)] cursor-pointer"
            >
              <ChevronUp size={20} />
            </button>
          )}
        </div>
      } 
    />

      <Route path="/about" element={<About />} />
    </Routes>

  );
}