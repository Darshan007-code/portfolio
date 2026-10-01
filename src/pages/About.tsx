import { motion } from "framer-motion";
import {
  ArrowLeft,
  Download,
  Briefcase,
  GraduationCap,
  Code2,
  Award,
  Sparkles,
  CheckCircle2,
  Cpu,
  Layers,
  ArrowUpRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  playResumeClick,
  playResumeHover,
  playCountdownTick,
  playDownloadSuccess,
} from "@/utils/audio";

const base = import.meta.env.BASE_URL;

export default function About() {
  const navigate = useNavigate();
  const text = "About Myself";

  const [displayedText, setDisplayedText] = useState("");
  const [countdown, setCountdown] = useState<number | null>(null);
  const [downloading, setDownloading] = useState(false);

  // TYPING EFFECT
  useEffect(() => {
    let index = 0;
    let interval: ReturnType<typeof setInterval>;

    const startTyping = () => {
      setDisplayedText("");
      interval = setInterval(() => {
        index++;
        setDisplayedText(text.slice(0, index));

        if (index === text.length) {
          clearInterval(interval);
          setTimeout(() => {
            index = 0;
            startTyping();
          }, 5000);
        }
      }, 120);
    };

    startTyping();
    return () => clearInterval(interval);
  }, []);

  // DOWNLOAD RESUME FUNCTION
  const handleDownload = () => {
    if (downloading) return;

    playResumeClick();
    setDownloading(true);
    setCountdown(3);
    playCountdownTick(3);

    let time = 3;

    const timer = setInterval(() => {
      time--;
      setCountdown(time);

      if (time > 0) {
        playCountdownTick(time);
      } else {
        clearInterval(timer);
        playDownloadSuccess();

        const a = document.createElement("a");
        a.href = `${base}Darshan_Patil_Resume_SE.pdf`;
        a.download = "Darshan_Patil_Resume_SE.pdf";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        window.open(`${base}Darshan_Patil_Resume_SE.pdf`, "_blank");

        setDownloading(false);
        setCountdown(null);
      }
    }, 1000);
  };

  const skillsData = [
    {
      category: "Frontend Development",
      icon: Layers,
      items: ["React.js", "Next.js", "JavaScript (ES6+)", "TypeScript", "HTML5", "CSS3", "Tailwind CSS", "Responsive Design"],
    },
    {
      category: "Backend & Real-Time",
      icon: Cpu,
      items: ["Node.js", "Express.js", "REST APIs", "WebSockets", "Socket.io"],
    },
    {
      category: "Databases & Storage",
      icon: Code2,
      items: ["MongoDB", "Mongoose", "SQL", "Database Design"],
    },
    {
      category: "AI & Data Tools",
      icon: Sparkles,
      items: ["Python", "OpenCV", "Pandas", "Computer Vision", "Machine Learning Fundamentals"],
    },
  ];

  return (
    <div className="relative min-h-screen bg-black overflow-hidden text-white px-4 sm:px-6 py-10">
      {/* ANIMATED BACKGROUND EFFECTS */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-white/5 rounded-full blur-3xl opacity-20" />
      </div>

      {/* BACK BUTTON */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        onClick={() => navigate(-1)}
        className="
          fixed
          top-5
          left-5
          z-50
          flex
          items-center
          gap-2
          px-4
          py-2
          rounded-full
          border
          border-white/15
          bg-white/8
          backdrop-blur-xl
          hover:bg-white/15
          hover:border-white/30
          transition-all
          duration-300
          shadow-lg
        "
      >
        <ArrowLeft size={18} />
        <span className="hidden sm:inline">Back</span>
      </motion.button>

      {/* MAIN CONTENT */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen gap-8">

        {/* IMAGE SECTION */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="flex flex-col items-center"
        >
          <img
            src={`${base}assets/darshan.png`}
            alt="Darshan Patil"
            className="
              w-[200px]
              sm:w-[280px]
              md:w-[320px]
              rounded-2xl
              border
              border-white/15
              object-cover
              shadow-[0_20px_60px_rgba(0,0,0,0.6)]
              hover:border-white/25
              transition-all
              duration-300
            "
          />

          {/* DIVIDER LINE */}
          <div
            className="
              mt-6
              h-[1px]
              bg-gradient-to-r
              from-transparent
              via-white/20
              to-transparent
              w-[90vw]
              sm:w-[400px]
              md:w-[500px]
            "
          />
        </motion.div>

        {/* GLASS BOX CONTAINER */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            delay: 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            relative
            w-full
            max-w-4xl
            h-[560px]
            sm:h-[620px]
            md:h-[680px]
            rounded-3xl
            border
            border-white/10
            bg-white/5
            backdrop-blur-3xl
            overflow-hidden
            shadow-[0_20px_70px_rgba(0,0,0,0.5)]
            group
          "
        >
          {/* GLASS LIGHT EFFECT */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/8 via-transparent to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

          {/* HEADER SECTION */}
          <div
            className="
              relative
              z-20
              flex
              items-center
              justify-center
              px-6
              py-6
              sm:py-7
              border-b
              border-white/10
              bg-black/30
              backdrop-blur-2xl
            "
          >
            <h1
              className="
                text-3xl
                sm:text-4xl
                md:text-5xl
                font-extrabold
                tracking-tight
              "
            >
              {displayedText}
              <span className="animate-pulse ml-2">|</span>
            </h1>
          </div>

          {/* SCROLLABLE CONTENT */}
          <div
            className="
              relative
              z-10
              h-[calc(100%-80px)]
              overflow-y-auto
              px-6
              sm:px-10
              md:px-12
              py-8
              scrollbar-thin
              scrollbar-track-transparent
              scrollbar-thumb-white/10
              hover:scrollbar-thumb-white/20
              space-y-10
            "
          >
            {/* QUICK STATS HIGHLIGHTS */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-center hover:border-white/20 transition-all duration-300">
                <p className="text-2xl sm:text-3xl font-bold text-white tracking-tight">2+</p>
                <p className="text-xs text-white/50 tracking-wider uppercase mt-1">Internships</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-center hover:border-white/20 transition-all duration-300">
                <p className="text-2xl sm:text-3xl font-bold text-white tracking-tight">7.6</p>
                <p className="text-xs text-white/50 tracking-wider uppercase mt-1">BE CGPA</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-center hover:border-white/20 transition-all duration-300">
                <p className="text-2xl sm:text-3xl font-bold text-white tracking-tight">95.8%</p>
                <p className="text-xs text-white/50 tracking-wider uppercase mt-1">Young Turks</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-center hover:border-white/20 transition-all duration-300">
                <p className="text-2xl sm:text-3xl font-bold text-white tracking-tight">5+</p>
                <p className="text-xs text-white/50 tracking-wider uppercase mt-1">Projects</p>
              </div>
            </div>

            {/* BIO NARRATIVE */}
            <div className="space-y-4">
              <h2 className="text-lg sm:text-xl font-bold flex items-center gap-2 text-white">
                <Sparkles size={18} className="text-white/80" />
                Who I Am & What I Do
              </h2>
              <div className="text-white/70 text-sm sm:text-base leading-8 tracking-wide space-y-4">
                <p>
                  I am a Software Engineer and Computer Science graduate from BLDEA's V P Dr PG Halakatti College of Engineering & Technology, passionate about building clean, high-performance web applications and intelligent systems.
                </p>
                <p>
                  My expertise spans full-stack engineering, real-time web applications, and applied machine learning. With hands-on internship experience delivering production-grade features at Suprmentr and LaunchEd Global, I specialize in modern architectures using React, Next.js, Node.js, Express, and Python.
                </p>
                <p>
                  Beyond full-stack development, I am deeply fascinated by system architecture, real-time protocols with WebSockets, and computer vision with OpenCV. Building scalable solutions that solve real-world problems and creating smooth, intuitive user experiences is what drives me every day.
                </p>
              </div>
            </div>

            {/* EXPERIENCE SECTION */}
            <div className="space-y-4">
              <h2 className="text-lg sm:text-xl font-bold flex items-center gap-2 text-white">
                <Briefcase size={18} className="text-white/80" />
                Professional Experience
              </h2>
              <div className="space-y-4">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6 hover:border-white/20 transition-all duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3">
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-white">Full Stack Web Development Intern</h3>
                      <p className="text-sm text-white/70">SuprMentr Technologies &bull; VTU, Belagavi</p>
                    </div>
                    <span className="text-xs font-mono text-white/40 tracking-wider uppercase">Feb 2026 – May 2026</span>
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm text-white/60 leading-relaxed">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={15} className="text-white/40 mt-1 shrink-0" />
                      <span>Engineered full-stack features in MERN domain and developed a comprehensive capstone project titled <strong>Real-Time Chat App</strong>.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={15} className="text-white/40 mt-1 shrink-0" />
                      <span>Designed and integrated REST APIs to enable reliable, real-time data flow between client and server, reducing data inconsistency issues.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={15} className="text-white/40 mt-1 shrink-0" />
                      <span>Partnered with mentors and stakeholders to convert functional requirements into shipped, working features within tight delivery deadlines.</span>
                    </li>
                  </ul>
                  <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[11px] font-mono text-white/40">Credential ID: SM26VFSWD1071</span>
                    <a
                      href={`${base}Darshan_Patil_SuprMentr_Internship_Certificate.jpeg`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/15 bg-white/[0.05] hover:bg-white/15 text-xs text-white/90 hover:text-white transition-all duration-200"
                    >
                      <span>View Certificate</span>
                      <ArrowUpRight size={13} />
                    </a>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6 hover:border-white/20 transition-all duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3">
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-white">Web Development Intern</h3>
                      <p className="text-sm text-white/70">LaunchEd Global &bull; Deevelo X</p>
                    </div>
                    <span className="text-xs font-mono text-white/40 tracking-wider uppercase">Feb 2025 – Mar 2025</span>
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm text-white/60 leading-relaxed">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={15} className="text-white/40 mt-1 shrink-0" />
                      <span>Delivered responsive, cross-device web pages using HTML5, CSS3, JavaScript, and React.js, improving consistency of user experience across platforms.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={15} className="text-white/40 mt-1 shrink-0" />
                      <span>Engineered reusable, modular frontend components integrated with REST APIs, reducing duplicate code and streamlining communication.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={15} className="text-white/40 mt-1 shrink-0" />
                      <span>Diagnosed and resolved UI defects through systematic root-cause analysis, improving application stability and cross-browser performance.</span>
                    </li>
                  </ul>
                  <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[11px] font-mono text-white/40">Credential ID: LEDINT02-WD004</span>
                    <a
                      href={`${base}Darshan_Patil_LaunchedGlobal_Certificate.pdf`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/15 bg-white/[0.05] hover:bg-white/15 text-xs text-white/90 hover:text-white transition-all duration-200"
                    >
                      <span>View Certificate</span>
                      <ArrowUpRight size={13} />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* EDUCATION SECTION */}
            <div className="space-y-4">
              <h2 className="text-lg sm:text-xl font-bold flex items-center gap-2 text-white">
                <GraduationCap size={18} className="text-white/80" />
                Education
              </h2>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6 hover:border-white/20 transition-all duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white">Bachelor of Engineering (BE) in Computer Science & Engineering</h3>
                    <p className="text-sm text-white/70">BLDEA's V P Dr PG Halakatti College of Engineering & Technology</p>
                  </div>
                  <span className="text-xs font-mono text-white/40 tracking-wider uppercase">Dec 2022 – Jun 2026</span>
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-semibold text-white">CGPA: 7.6 / 10</span>
                  <span className="text-xs text-white/50">Core: DSA, DBMS, Operating Systems, Computer Networks, Machine Learning</span>
                </div>
              </div>
            </div>

            {/* SKILLS MATRIX */}
            <div className="space-y-4">
              <h2 className="text-lg sm:text-xl font-bold flex items-center gap-2 text-white">
                <Code2 size={18} className="text-white/80" />
                Technical Competencies
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {skillsData.map((cat, i) => {
                  const Icon = cat.icon;
                  return (
                    <div key={i} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 hover:border-white/20 transition-all duration-300">
                      <div className="flex items-center gap-2 mb-3">
                        <Icon size={16} className="text-white/70" />
                        <h3 className="text-sm font-semibold text-white tracking-wide">{cat.category}</h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {cat.items.map((skill, si) => (
                          <span
                            key={si}
                            className="px-2.5 py-1 rounded-lg border border-white/10 bg-white/[0.04] text-xs text-white/75 hover:bg-white/10 transition-colors"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* HONORS & CERTIFICATIONS */}
            <div className="space-y-4">
              <h2 className="text-lg sm:text-xl font-bold flex items-center gap-2 text-white">
                <Award size={18} className="text-white/80" />
                Certifications & Achievements
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 flex items-start gap-3">
                  <Award size={20} className="text-amber-300 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-semibold text-white">Naukri Campus Young Turks 2025</h3>
                    <p className="text-xs text-white/60 mt-0.5">Scored 95.80 percentile; ranked top 30,000 of 6,00,000+ national candidates.</p>
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 flex items-start gap-3">
                  <Sparkles size={20} className="text-sky-300 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-semibold text-white">GitHub Copilot: Write Software with AI</h3>
                    <p className="text-xs text-white/60 mt-0.5">Official AI & developer tooling certification (September 2025).</p>
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 flex items-start justify-between gap-3 group hover:border-white/20 transition-all duration-300">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-emerald-300 shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-semibold text-white">Full Stack Web Development (MERN) Internship</h3>
                      <p className="text-xs text-white/60 mt-0.5">SuprMentr Technologies &bull; VTU Belagavi (ID: SM26VFSWD1071 &bull; May 2026).</p>
                    </div>
                  </div>
                  <a
                    href={`${base}Darshan_Patil_SuprMentr_Internship_Certificate.jpeg`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 p-2 rounded-xl border border-white/10 bg-white/[0.04] text-white/60 hover:text-white hover:border-white/30 hover:bg-white/10 transition-all duration-200"
                    title="View Certificate"
                  >
                    <ArrowUpRight size={15} />
                  </a>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 flex items-start justify-between gap-3 group hover:border-white/20 transition-all duration-300">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-emerald-300 shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-semibold text-white">Web Development Internship Certificate</h3>
                      <p className="text-xs text-white/60 mt-0.5">Deevelo X in association with Launched Global &bull; ID: LEDINT02-WD004 (March 2025).</p>
                    </div>
                  </div>
                  <a
                    href={`${base}Darshan_Patil_LaunchedGlobal_Certificate.pdf`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 p-2 rounded-xl border border-white/10 bg-white/[0.04] text-white/60 hover:text-white hover:border-white/30 hover:bg-white/10 transition-all duration-200"
                    title="View Certificate"
                  >
                    <ArrowUpRight size={15} />
                  </a>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 flex items-start justify-between gap-3 group hover:border-white/20 transition-all duration-300">
                  <div className="flex items-start gap-3">
                    <Award size={20} className="text-amber-300 shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-semibold text-white">Certificate of Appreciation – Brand Executive</h3>
                      <p className="text-xs text-white/60 mt-0.5">LaunchEd Global &amp; Kshitij IIT Kharagpur &bull; June 2025 (Wipro DICE ID Verified).</p>
                    </div>
                  </div>
                  <a
                    href={`${base}Darshan_Patil_Brand_Executive_Certificate.pdf`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 p-2 rounded-xl border border-white/10 bg-white/[0.04] text-white/60 hover:text-white hover:border-white/30 hover:bg-white/10 transition-all duration-200"
                    title="View Certificate"
                  >
                    <ArrowUpRight size={15} />
                  </a>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 flex items-start gap-3">
                  <Code2 size={20} className="text-purple-300 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-semibold text-white">TCS CodeVita Season 13 Participant</h3>
                    <p className="text-xs text-white/60 mt-0.5">National Science Day Poster Presentation & algorithmic competition participant.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </motion.div>

        {/* DOWNLOAD BUTTON */}
        <motion.button
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            delay: 0.4,
          }}
          onClick={handleDownload}
          onMouseEnter={playResumeHover}
          disabled={downloading}
          className="
            group
            relative
            overflow-hidden
            flex
            items-center
            justify-center
            gap-3
            px-8
            sm:px-10
            py-3
            sm:py-4
            rounded-2xl
            border
            border-white/15
            bg-white/8
            backdrop-blur-xl
            hover:bg-white/15
            hover:border-white/30
            disabled:opacity-50
            disabled:cursor-not-allowed
            transition-all
            duration-300
            shadow-[0_10px_40px_rgba(0,0,0,0.4)]
            hover:shadow-[0_15px_50px_rgba(255,255,255,0.08)]
          "
        >
          {/* BUTTON GLOW EFFECT */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-all duration-500" />

          {/* BUTTON CONTENT */}
          <div className="relative z-10 flex items-center gap-3">
            <Download
              size={20}
              className="
                group-hover:scale-110
                group-hover:-translate-y-1
                transition-all
                duration-300
              "
            />
            <span className="font-semibold tracking-wide">
              {downloading ? `Downloading in ${countdown}s` : "Download Resume"}
            </span>
          </div>
        </motion.button>
      </div>
    </div>
  );
}