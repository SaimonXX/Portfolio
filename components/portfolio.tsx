"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import {
  Moon,
  Sun,
  Linkedin,
  Phone,
  Mail,
  Menu,
  X,
  ChevronDown,
  ArrowUp,
  ZoomIn,
  FileText,
  Globe,
  ChevronLeft,
  ChevronRight,
  Link,
} from "lucide-react";
import { SiGithub } from "react-icons/si";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  motion,
  useAnimation,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useInView } from "react-intersection-observer";
import CertificatesCarousel from "@/components/ui/certificatesCarousel";
import LoadingScreen from "@/components/ui/loadingScreen";

export default function Component() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState("home");
  const [displayText, setDisplayText] = useState("Simon H.");
  const [isHovering, setIsHovering] = useState(false);
  const [isWriting, setIsWriting] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const [zoomedProjectIndex, setZoomedProjectIndex] = useState<number | null>(
    null
  );
  const [homeAnimationCompleted, setHomeAnimationCompleted] = useState(false);
  const [aboutMeAnimationCompleted, setAboutMeAnimationCompleted] =
    useState(false);
  const [language, setLanguage] = useState("en");
  const [showPhoneMenu, setShowPhoneMenu] = useState(false);
  const fullText = "Simon H.";
  const sectionsRef = useRef<{ [key: string]: HTMLElement | null }>({});
  const homeRef = useRef<HTMLElement | null>(null);
  const phoneMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulate content loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const { scrollYProgress } = useScroll();
  const blurValue = useTransform(scrollYProgress, [0, 1], [5, 0]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleLanguage = () => {
    setLanguage((lang) => (lang === "en" ? "es" : "en"));
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 100);
      setShowPhoneMenu(false);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        phoneMenuRef.current &&
        !phoneMenuRef.current.contains(event.target as Node)
      ) {
        setShowPhoneMenu(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleNameClick = () => {
    if (!isWriting) {
      setIsWriting(true);
      setDisplayText("");

      const mostrarTexto = (index: number) => {
        if (index < fullText.length) {
          setDisplayText((prev) => prev + fullText.charAt(index));
          setTimeout(() => {
            mostrarTexto(index + 1);
          }, 100);
        } else setIsWriting(false);
      };

      setTimeout(() => {
        mostrarTexto(0);
      }, 100);
    }
    scrollToSection("home");
  };

  const scrollToSection = (sectionId: string) => {
    sectionsRef.current[sectionId]?.scrollIntoView({ behavior: "smooth" });
    setActiveSection(sectionId);
    setIsMenuOpen(false);
    setShowPhoneMenu(false);
  };

  const projects = [
    {
      title: "EcoRail",
      description:
        language === "en"
          ? '"EcoRail is a technological proposal to improve the Cundinamarca and Boyacá regions by reducing deforestation and emissions through the enhancement of railway infrastructure."'
          : '"EcoRail es una propuesta tecnológica para mejorar la zona de Cundinamarca y Boyacá, reduciendo la deforestación y las emisiones a través de la mejora de la infraestructura ferroviaria."',
      technologies: [
        "Java",
        "MySQL",
        "Spring Boot",
        "Next.js",
        "Tailwind",
        "TypeScript",
      ],
      images: [
        "/projects/ecoRail/img1.png",
        "/projects/ecoRail/img2.png",
        "/projects/ecoRail/img3.png",
      ],
      link: "#",
    },
    {
      title: "Portfolio",
      description:
        language === "en"
          ? '"I showcase my full-stack projects and skills, highlighting my dedication to technology and innovation in every aspect of development."'
          : '"Presento mis proyectos y habilidades como desarrollador full stack, destacando mi dedicación a la tecnología y la innovación en cada aspecto del desarrollo."',
      technologies: [
        "TypeScript",
        "React",
        "Next.js",
        ,
        "Node",
        "UI/UX",
        "ESLint",
        "Shadcn/UI",
      ],
      images: [
        "/projects/portfolio/img1.png",
        "/projects/portfolio/img2.png",
        "/projects/portfolio/img3.png",
      ],
      link: "#",
    },
    {
      title: language === "en" ? "Project 3" : "Proyecto 3",
      description: language === "en" ? "..." : "...",
      technologies: ["..."],
      images: [
        "/unvalible.png",
        // "/projects/./img1.png",
        // "/projects/./img2.png",
        // "/projects/./img3.png",
      ],
      link: "#",
    },
    {
      title: language === "en" ? "Project 4" : "Proyecto 4",
      description: language === "en" ? "..." : "...",
      technologies: ["..."],
      images: [
        "/unvalible.png",
        // "/projects/./img1.png",
        // "/projects/./img2.png",
        // "/projects/./img3.png",
      ],
      link: "#",
    },
  ];

  const [currentImageIndices, setCurrentImageIndices] = useState(
    projects.map(() => 0)
  );

  const changeProjectImage = (
    projectIndex: number,
    direction: "next" | "prev"
  ) => {
    setCurrentImageIndices((prevIndices) => {
      const newIndices = [...prevIndices];
      if (direction === "next") {
        newIndices[projectIndex] =
          (newIndices[projectIndex] + 1) % projects[projectIndex].images.length;
      } else {
        newIndices[projectIndex] =
          (newIndices[projectIndex] -
            1 +
            projects[projectIndex].images.length) %
          projects[projectIndex].images.length;
      }
      return newIndices;
    });
  };

  const resetProjectImage = (projectIndex: number) => {
    setCurrentImageIndices((prevIndices) => {
      const newIndices = [...prevIndices];
      newIndices[projectIndex] = 0;
      return newIndices;
    });
  };

  const TypewriterEffect = ({
    text,
    className,
    speed = 50,
    onComplete,
  }: {
    text: string;
    className?: string;
    speed?: number;
    onComplete?: () => void;
  }) => {
    const controls = useAnimation();
    const [ref, inView] = useInView({
      triggerOnce: true,
    });

    useEffect(() => {
      if (inView) {
        controls
          .start((i) => ({
            opacity: 1,
            color: ["#4ade80", "inherit"],
            transition: {
              delay: (i * speed) / 1000,
              color: { duration: 0.5 },
            },
          }))
          .then(() => {
            if (onComplete) onComplete();
          });
      }
    }, [controls, inView, speed, onComplete]);

    return (
      <span ref={ref} className={className}>
        {text.split("").map((char, i) => (
          <motion.span
            key={`${char}-${i}`}
            custom={i}
            animate={controls}
            initial={{ opacity: 0, color: "#4ade80" }}
          >
            {char}
          </motion.span>
        ))}
      </span>
    );
  };

  const timelineEvents = [
    {
      year: "2018",
      description:
        language === "en"
          ? "Discovered my passion for programming, starting an exciting journey in the world of development."
          : "Descubrí mi pasión por la programación, iniciando un viaje emocionante en el mundo del desarrollo.",
    },
    {
      year: "2019-2021",
      description:
        language === "en"
          ? "Created my first project: an educational web app about space and celestial bodies, presented at my graduation."
          : "Creé mi primer proyecto: una app web educativa sobre el espacio y cuerpos celestes, presentada en mi graduación.",
    },
    {
      year: "2022-2023",
      description:
        language === "en"
          ? "Started as a freelancer, developing solutions for small businesses and expanding my skills."
          : "Comencé como freelance, desarrollando soluciones para pequeñas empresas y ampliando mis habilidades.",
    },
    {
      year: "2024",
      description:
        language === "en"
          ? "Focused on FullStack development and started exploring the fascinating field of Artificial Intelligence."
          : "Me enfoqué en el desarrollo FullStack e inicié mi exploración en el fascinante campo de la Inteligencia Artificial.",
    },
    {
      year: "...",
      description:
        language === "en"
          ? "The journey continues, always learning and growing in the tech world."
          : "El viaje continúa, siempre aprendiendo y creciendo en el mundo tech.",
    },
  ];

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <motion.div
      key="content"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`min-h-screen transition-colors duration-500 ${
        isDarkMode
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 text-gray-900"
      } text-base md:text-lg`}
      style={{ filter: `blur(${blurValue}px)` }}
    >
      <style jsx global>{`
        @keyframes borderAnimation {
          0%,
          100% {
            width: 0;
          }
          50% {
            width: 100%;
          }
        }
        @keyframes blink {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }
        .animate-blink {
          animation: blink 1.5s infinite;
        }
        ::selection {
          background-color: rgba(74, 222, 128, 0.3);
        }
        html {
          font-size: 18px;
        }
        @media (max-width: 768px) {
          html {
            font-size: 16px;
          }
        }
      `}</style>
      <style jsx global>{`
        /* Webkit browsers (Chrome, Safari, newer versions of Edge) */
        ::-webkit-scrollbar {
          width: 8px;
        }

        .scroll-container::-webkit-scrollbar-thumb {
          background-color: ${isDarkMode ? "#4ade80" : "#3b82f6"};
          border-radius: 10px;
          border: 3px solid transparent;
          background-clip: content-box;
        }

        ::-webkit-scrollbar-thumb {
          background: ${isDarkMode ? "#4ade80" : "#3b82f6"};
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: ${isDarkMode ? "#22c55e" : "#2563eb"};
        }

        /* Firefox */
        * {
          scrollbar-width: thin;
          scrollbar-color: ${isDarkMode
            ? "#4ace80 transparent"
            : "#3b82f6 transparent"};
        }

        /* For mobile devices */
        @media (max-width: 768px) {
          ::-webkit-scrollbar {
            width: 4px;
          }
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        .animate-spin {
          animation: spin 2s linear infinite;
        }
      `}</style>
      <header className="fixed top-0 left-0 right-0 z-50 py-4 px-4 sm:px-6 lg:px-8 backdrop-blur-md bg-opacity-70 bg-gray-900">
        <nav className="flex justify-between items-center">
          <div
            className="text-2xl md:text-3xl font-bold cursor-pointer transition-all duration-300 ease-in-out select-none"
            onClick={handleNameClick}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <span
              className={`transition-all duration-300 ease-in-out ${
                isHovering ? "text-green-400" : "text-white"
              }`}
            >
              {displayText}
            </span>
            {isWriting && (
              <span className="text-green-400 animate-blink">|</span>
            )}
          </div>
          <div className="hidden md:flex items-center space-x-4">
            {[
              {
                id: "about",
                text: language === "en" ? "About Me" : "Sobre Mí",
              },
              {
                id: "experience",
                text: language === "en" ? "Experience" : "Experiencia",
              },
              {
                id: "contact",
                text: language === "en" ? "Contact" : "Contacto",
              },
            ].map((section) => (
              <Button
                key={section.id}
                variant="ghost"
                onClick={() => scrollToSection(section.id)}
                className="relative overflow-hidden group text-white hover:text-black text-base md:text-lg"
              >
                <span className="relative z-10">{section.text}</span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-green-500 transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
              </Button>
            ))}
            <Button
              variant="outline"
              size="icon"
              onClick={toggleTheme}
              className={`relative overflow-hidden transition-all duration-500 ease-in-out ${
                isDarkMode ? "bg-white text-black" : "bg-gray-900 text-white"
              } border-none`}
            >
              <Sun
                className={`h-[1.2rem] w-[1.2rem] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-500 ${
                  isDarkMode ? "opacity-100" : "opacity-0"
                }`}
              />
              <Moon
                className={`h-[1.2rem] w-[1.2rem] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-500 ${
                  isDarkMode ? "opacity-0" : "opacity-100"
                }`}
              />
            </Button>
          </div>
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isMenuOpen ? (
                <X className="h-6 w-6 text-white transition-transform duration-300 transform rotate-90" />
              ) : (
                <Menu className="h-6 w-6 text-white transition-transform duration-300" />
              )}
            </Button>
          </div>
        </nav>
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-2">
            {[
              {
                id: "about",
                text: language === "en" ? "About Me" : "Sobre Mí",
              },
              {
                id: "experience",
                text: language === "en" ? "Experience" : "Experiencia",
              },
              {
                id: "contact",
                text: language === "en" ? "Contact" : "Contacto",
              },
            ].map((section) => (
              <Button
                key={section.id}
                variant="ghost"
                onClick={() => scrollToSection(section.id)}
                className="w-full relative overflow-hidden group text-white hover:text-black text-base"
              >
                <span className="relative z-10">{section.text}</span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-green-500 transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
              </Button>
            ))}
            <Button
              variant="outline"
              onClick={toggleTheme}
              className={`w-full ${
                isDarkMode
                  ? "bg-gray-800 text-white hover:bg-gray-700"
                  : "bg-white text-gray-900 hover:bg-gray-100"
              } text-base`}
            >
              {isDarkMode
                ? language === "en"
                  ? "Light Mode"
                  : "Modo Claro"
                : language === "en"
                ? "Dark Mode"
                : "Modo Oscuro"}
            </Button>
          </div>
        )}
      </header>

      <main className="">
        <motion.section
          ref={(el) => {
            sectionsRef.current["home"] = el;
            homeRef.current = el;
          }}
          className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute top-20 right-4 flex items-center space-x-2 opacity-70 hover:opacity-100 transition-opacity duration-300">
            <span className="text-sm md:text-base">
              {language === "en" ? "Cambiar idioma" : "Change language"}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={toggleLanguage}
              className={`${
                isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
              }`}
            >
              <Globe className="h-[1.2rem] w-[1.2rem]" />
            </Button>
          </div>
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              {!homeAnimationCompleted && (
                <>
                  <TypewriterEffect
                    text={
                      language === "en"
                        ? "Welcome, I'm ..."
                        : "Bienvenido, soy ..."
                    }
                    className="block text-xl md:text-2xl mb-2"
                    onComplete={() => setHomeAnimationCompleted(true)}
                  />
                  <TypewriterEffect
                    text="Simon Hernandez"
                    className={`relative ${
                      isDarkMode ? "text-white" : "text-black"
                    }`}
                    onComplete={() => setHomeAnimationCompleted(true)}
                  />
                </>
              )}
              {homeAnimationCompleted && (
                <>
                  <span className="block text-xl md:text-2xl mb-2">
                    {language === "en"
                      ? "Welcome, I'm ..."
                      : "Bienvenido, soy ..."}
                  </span>
                  <span
                    className={`relative ${
                      isDarkMode ? "text-white" : "text-black"
                    }`}
                  >
                    Simon Hernandez
                  </span>
                </>
              )}
            </h2>
            <div className="text-lg md:text-xl mb-8 p-4 rounded-lg bg-gray-800 overflow-hidden inline-block">
              {!homeAnimationCompleted ? (
                <TypewriterEffect
                  text={
                    language === "en"
                      ? '"FullStack.Developer"'
                      : '"Desarrollador.FullStack"'
                  }
                  className={`token string ${
                    isDarkMode ? "text-green-400" : "text-green-600"
                  }`}
                  onComplete={() => setHomeAnimationCompleted(true)}
                />
              ) : (
                <span
                  className={`token string ${
                    isDarkMode ? "text-green-400" : "text-green-600"
                  }`}
                >
                  {language === "en"
                    ? '"FullStack.Developer"'
                    : '"Desarrollador.FullStack"'}
                </span>
              )}
            </div>
            <div className="flex justify-center space-x-6 mb-8">
              <a
                href="mailto:simon2005hernandez@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-colors duration-500 animate-blink ${
                  isDarkMode
                    ? "text-red-400 hover:text-red-300"
                    : "text-red-600 hover:text-red-500"
                }`}
              >
                <Mail className="h-8 w-8" />
              </a>
              <a
                href="https://linkedin.com/in/simon-hernandez-b6babb307/"
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-colors duration-500 animate-blink ${
                  isDarkMode
                    ? "text-blue-400 hover:text-blue-300"
                    : "text-blue-600 hover:text-blue-500"
                }`}
              >
                <Linkedin className="h-8 w-8" />
              </a>
              <a
                href="https://github.com/SaimonAHG"
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-colors duration-500 animate-blink ${
                  isDarkMode
                    ? "text-gray-400 hover:text-gray-300"
                    : "text-gray-600 hover:text-gray-500"
                }`}
              >
                <SiGithub className="h-8 w-8" />
              </a>
              <div className="relative " ref={phoneMenuRef}>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowPhoneMenu(!showPhoneMenu)}
                  className={`transition-colors duration-500 animate-blink hover:bg-transparent ${
                    isDarkMode
                      ? "text-green-400 hover:text-green-300"
                      : "text-green-600 hover:text-green-500"
                  } ${showPhoneMenu ? "ring-2 ring-green-500" : ""}`}
                >
                  <Phone className="h-8 w-8" />
                </Button>
                {showPhoneMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg ${
                      isDarkMode ? "bg-gray-800" : "bg-white"
                    } ring-1 ring-black ring-opacity-5 z-50`}
                  >
                    <div
                      className="py-1"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="options-menu"
                    >
                      <a
                        href="tel:+573236095929"
                        className={`block px-4 py-2 text-sm ${
                          isDarkMode
                            ? "text-white hover:bg-gray-700"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                        role="menuitem"
                      >
                        {language === "en" ? "Call" : "Llamar"}
                      </a>
                      <a
                        href="https://wa.me/+573236095929"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`block px-4 py-2 text-sm ${
                          isDarkMode
                            ? "text-white hover:bg-gray-700"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                        role="menuitem"
                      >
                        WhatsApp
                      </a>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
            <div className="space-x-4">
              <Button
                onClick={() => scrollToSection("about")}
                className={`transition-all duration-500 ${
                  isDarkMode
                    ? "bg-blue-700 hover:bg-blue-600"
                    : "bg-blue-600 hover:bg-blue-500"
                }`}
              >
                <ChevronDown className="h-6 w-6 animate-bounce" />
              </Button>
              <Button
                onClick={() => window.open("/path-to-your-cv.pdf", "_blank")}
                className={`transition-all duration-500 animate-blink ${
                  isDarkMode
                    ? "bg-green-700 hover:bg-green-600"
                    : "bg-green-600 hover:bg-green-500"
                }`}
              >
                <FileText className="h-6 w-6 mr-2" />
                {language === "en" ? "View CV" : "Ver CV"}
              </Button>
            </div>
          </div>
        </motion.section>

        <motion.section
          ref={(el) => {
            sectionsRef.current["about"] = el;
          }}
          className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center max-w-4xl">
            <h2 className="text-4xl font-bold mb-8 text-blue-500">
              {language === "en" ? "About Me" : "Sobre Mí"}
            </h2>
            <div
              className={`text-lg mb-4 p-6 rounded-lg ${
                isDarkMode ? "bg-gray-800" : "bg-white shadow-md"
              }`}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {!aboutMeAnimationCompleted && (
                  <TypewriterEffect
                    text={
                      language === "en"
                        ? "\"Hello! Welcome to my tech world. I'm a passionate FullStack developer in constant learning. Here you'll find my journey in the fascinating universe of development, from my beginnings to my current interest in Artificial Intelligence. Join me on this journey of innovation and growth!\""
                        : '"¡Hola! Bienvenido a mi mundo tecnológico. Soy un apasionado desarrollador FullStack en constante aprendizaje. Aquí encontrarás mi trayectoria en el fascinante universo del desarrollo, desde mis inicios hasta mi actual interés en la Inteligencia Artificial. ¡Acompáñame en este viaje de innovación y crecimiento!"'
                    }
                    className={`block mb-4 text-left text-sm ${
                      isDarkMode ? "text-green-400" : "text-green-700"
                    }`}
                    speed={10}
                    onComplete={() => setAboutMeAnimationCompleted(true)}
                  />
                )}
                {aboutMeAnimationCompleted && (
                  <p
                    className={`block mb-4 text-left text-sm ${
                      isDarkMode ? "text-green-400" : "text-green-700"
                    }`}
                  >
                    {language === "en"
                      ? "\"Hello! Welcome to my tech world. I'm a passionate FullStack developer in constant learning. Here you'll find my journey in the fascinating universe of development, from my beginnings to my current interest in Artificial Intelligence. Join me on this journey of innovation and growth!\""
                      : '"¡Hola! Bienvenido a mi mundo tecnológico. Soy un apasionado desarrollador FullStack en constante aprendizaje. Aquí encontrarás mi trayectoria en el fascinante universo del desarrollo, desde mis inicios hasta mi actual interés en la Inteligencia Artificial. ¡Acompáñame en este viaje de innovación y crecimiento!"'}
                  </p>
                )}
                <motion.div
                  className="w-full h-px bg-gray-600 my-4"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.5, delay: 1 }}
                />
                <div className="relative">
                  <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-600 hidden md:block"></div>
                  <motion.div
                    className="space-y-4"
                    initial="hidden"
                    animate="visible"
                    variants={{
                      visible: {
                        transition: {
                          staggerChildren: 0.1,
                          delayChildren: 1.5,
                        },
                      },
                    }}
                  >
                    {timelineEvents.map((event, index) => (
                      <motion.div
                        key={event.year}
                        className={`text-left text-sm p-2 rounded ${
                          isDarkMode ? "bg-gray-700" : "bg-gray-200"
                        } md:w-[calc(50%-1rem)] ${
                          index % 2 === 0 ? "md:mr-auto" : "md:ml-auto"
                        }`}
                        variants={{
                          hidden: { opacity: 0, y: 20 },
                          visible: { opacity: 1, y: 0 },
                        }}
                      >
                        <div className="hidden md:block absolute left-1/2 top-1/2 w-3 h-3 bg-blue-500 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                        <span
                          className={`font-bold ${
                            isDarkMode ? "text-blue-400" : "text-blue-600"
                          }`}
                        >
                          {event.year}:
                        </span>{" "}
                        {event.description}
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
              <CertificatesCarousel
                isDarkMode={isDarkMode}
                language={language}
              ></CertificatesCarousel>
            </div>
          </div>
        </motion.section>

        <motion.section
          ref={(el) => {
            sectionsRef.current["experience"] = el;
          }}
          className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h2 className="text-4xl font-bold mb-8 text-center text-blue-500">
              {language === "en" ? "Experience" : "Experiencia"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  className={`p-4 rounded-lg hover:text-green-200 ${
                    isDarkMode ? "bg-gray-800" : "bg-white shadow-md"
                  } group`}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onMouseLeave={() => resetProjectImage(index)}
                >
                  <h3 className="text-2xl font-semibold mb-2 text-green-300 group-hover:text-green-500 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="mb-2">{project.description}</p>
                  <div className="flex flex-wrap gap-2 my-3">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className={`px-2 py-1 rounded-full text-sm ${
                          isDarkMode
                            ? "bg-gray-700 text-white"
                            : "bg-gray-200 text-gray-800"
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="relative group">
                    <Image
                      src={project.images[currentImageIndices[index]]}
                      alt={`${
                        language === "en" ? "Preview of" : "Vista previa de"
                      } ${project.title}`}
                      width={300}
                      height={200}
                      className="w-full h-40 object-cover rounded-md transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button
                        variant="secondary"
                        size="icon"
                        onClick={() => {
                          setZoomedImage(
                            project.images[currentImageIndices[index]]
                          );
                          setZoomedProjectIndex(index);
                        }}
                        className="bg-black bg-opacity-50 text-white hover:bg-opacity-75 hover:text-black"
                      >
                        <ZoomIn className="h-6 w-6" />
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`absolute bg-black bg-opacity-50 right-60 top-1/2 transform -translate-y-1/2 ${
                        isDarkMode ? "text-white" : "text-black"
                      } opacity-60 group-hover:opacity-100 transition-opacity duration-300`}
                      onClick={() => changeProjectImage(index, "prev")}
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`absolute bg-black bg-opacity-50 left-60 top-1/2 transform -translate-y-1/2 ${
                        isDarkMode ? "text-white" : "text-black"
                      } opacity-60 group-hover:opacity-100 transition-opacity duration-300`}
                      onClick={() => changeProjectImage(index, "next")}
                    >
                      <ChevronRight className="h-6 w-6" />
                    </Button>
                  </div>
                  <a
                    // href= {project.link}
                    // target="_blank"
                    className="inline-flex text-base mt-5 font-semibold mb-1 text-green-400 hover:underline hover:text-blue-500 hover:text-lg transition-all duration-200"
                  >
                    {language == "en" ? "Visit project" : "Abrir proyecto"}{" "}
                    <Link className="ml-2"></Link>
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section
          ref={(el) => {
            sectionsRef.current["contact"] = el;
          }}
          className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-8 text-blue-500">
              {language === "en" ? "Contact" : "Contacto"}
            </h2>
            <p className="text-lg mb-4">
              {language === "en"
                ? "I'm always open to new opportunities and collaborations. Don't hesitate to reach out!"
                : "Siempre estoy abierto a nuevas oportunidades y colaboraciones. ¡No dudes en contactarme!"}
            </p>
            <div className="flex flex-col items-center space-y-4">
              <motion.div
                className="flex items-center space-x-2"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Mail
                  className={`h-6 w-6 ${
                    isDarkMode ? "text-red-400" : "text-red-600"
                  } transition-colors duration-500`}
                />
                <a
                  href="mailto:simon2005hernandez@gmail.com"
                  className="text-sm text-green-500 hover:underline"
                >
                  simon2005hernandez@gmail.com
                </a>
              </motion.div>
              <motion.div
                className="flex items-center space-x-2"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Linkedin
                  className={`h-6 w-6 ${
                    isDarkMode ? "text-blue-400" : "text-blue-600"
                  } transition-colors duration-500`}
                />
                <a
                  href="https://linkedin.com/in/simon-hernandez-b6babb307/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-green-500 hover:underline"
                >
                  {language === "en"
                    ? "Visit my LinkedIn"
                    : "Visita mi LinkedIn"}
                </a>
              </motion.div>
              <motion.div
                className="flex items-center space-x-2"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <SiGithub
                  className={`h-6 w-6 ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  } transition-colors duration-500`}
                />
                <a
                  href="https://github.com/SaimonAH"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-green-500 hover:underline"
                >
                  github.com/SaimonAH
                </a>
              </motion.div>
              <motion.div
                className="flex items-center space-x-2"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Phone
                  className={`h-6 w-6 ${
                    isDarkMode ? "text-green-400" : "text-green-600"
                  } transition-colors duration-500`}
                />
                <a
                  href="tel:+573236095929"
                  className="text-sm text-green-500 hover:underline"
                >
                  (+57) - 323 609 5929
                </a>
              </motion.div>
            </div>
          </div>
        </motion.section>
      </main>

      {showScrollTop && (
        <Button
          variant="outline"
          size="icon"
          className={`fixed bottom-4 left-4 z-40 ${
            isDarkMode ? "bg-white text-black" : "bg-gray-900 text-white"
          }`}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <ArrowUp className="h-4 w-4" />
        </Button>
      )}

      {zoomedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={() => {
            setZoomedImage(null);
            setZoomedProjectIndex(null);
          }}
        >
          <div className="relative">
            <Image
              src={zoomedImage}
              alt={
                language === "en"
                  ? "Zoomed project preview"
                  : "Vista previa ampliada del proyecto"
              }
              width={800}
              height={600}
              className="max-w-full max-h-full object-contain"
            />
            {zoomedProjectIndex !== null && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute bg-black bg-opacity-50 right--10 top-1/2 transform -translate-y-1/2 text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    changeProjectImage(zoomedProjectIndex, "prev");
                    setZoomedImage(
                      projects[zoomedProjectIndex].images[
                        currentImageIndices[zoomedProjectIndex]
                      ]
                    );
                  }}
                >
                  <ChevronLeft className="h-8 w-8" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute bg-black bg-opacity-50 right-0 top-1/2 transform -translate-y-1/2 text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    changeProjectImage(zoomedProjectIndex, "next");
                    setZoomedImage(
                      projects[zoomedProjectIndex].images[
                        currentImageIndices[zoomedProjectIndex]
                      ]
                    );
                  }}
                >
                  <ChevronRight className="h-8 w-8" />
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
}
