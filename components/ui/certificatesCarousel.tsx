import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Award,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  ZoomIn,
  Grid,
  LayoutGrid,
} from "lucide-react";
import Image from "next/image";

interface Certificate {
  title: string;
  issuer: string;
  date: string;
  position: string;
  image: string;
}

interface CertificatesCarouselProps {
  isDarkMode: boolean;
  language: String;
}

export default function CertificatesCarousel({
  isDarkMode,
  language,
}: CertificatesCarouselProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const [isGridView, setIsGridView] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const certificates: Certificate[] = [
    {
      title:
        language === "en" ? "Test Automation" : "Automatización de Pruebas",
      issuer: "Platzi",
      date: "2023",
      position: "1",
      image: "/certificates/automatizacion-pruebas.webp",
    },
    {
      title:
        language === "en"
          ? "Advanced Internet Networks"
          : "Avanzado en Redes de Internet",
      issuer: "Platzi",
      date: "2022",
      position: "2",
      image: "/certificates/avanzado-redes.webp",
    },
    {
      title: "JavaScript",
      issuer: "Platzi",
      date: "2022",
      position: "3",
      image: "/certificates/basico-javascript.webp",
    },
    {
      title: language === "en" ? "Programming" : "Programación",
      issuer: "Platzi",
      date: "2022",
      position: "4",
      image: "/certificates/basico-programacion.webp",
    },
    {
      title: language === "en" ? "Clean Code C#" : "Código Limpio C#",
      issuer: "Platzi",
      date: "2023",
      position: "5",
      image: "/certificates/clean-code-csharp.webp",
    },
    {
      title: language === "en" ? "Basic Computing" : "Computación Básica",
      issuer: "Platzi",
      date: "2022",
      position: "6",
      image: "/certificates/computacion-basica-2019.webp",
    },
    {
      title: "C#",
      issuer: "Platzi",
      date: "2023",
      position: "7",
      image: "/certificates/csharp.webp",
    },
    {
      title: "C# Poo",
      issuer: "Platzi",
      date: "2023",
      position: "8",
      image: "/certificates/c-sharp-poo.webp",
    },
    {
      title:
        language === "en"
          ? "Terminal and Command Line"
          : "Terminal y Línea de Comandos",
      issuer: "Platzi",
      date: "2022",
      position: "9",
      image: "/certificates/terminal.webp",
    },
    {
      title:
        language === "en"
          ? "Design for Programmers"
          : "Diseño para Programadores",
      issuer: "Platzi",
      date: "2022",
      position: "10",
      image: "/certificates/diseno-programadores.webp",
    },
    {
      title: language === "en" ? "English" : "Inglés",
      issuer: "Platzi",
      date: "2022",
      position: "11",
      image: "/certificates/estrategias-ingles-2020.webp",
    },
    {
      title:
        language === "en" ? "Information Security" : "Seguridad Informática",
      issuer: "Platzi",
      date: "2022",
      position: "12",
      image: "/certificates/guia-seguridad-informatica.webp",
    },
    {
      title: language === "en" ? "Engineering" : "Ingeniería",
      issuer: "Platzi",
      date: "2023",
      position: "13",
      image: "/certificates/ingenieria.webp",
    },
    {
      title: language === "en" ? "Logical Thinking" : "Pensamiento Lógico",
      issuer: "Platzi",
      date: "2022",
      position: "14",
      image: "/certificates/pensamiento-logico.webp",
    },
    {
      title:
        language === "en"
          ? "Logical Thinking with Data Structures"
          : "Pensamiento Lógico con Estructuras de Datos",
      issuer: "Platzi",
      date: "2022",
      position: "15",
      image: "/certificates/pensamiento-logico-estructuras.webp",
    },
    {
      title:
        language === "en"
          ? "Logical Thinking with Programming Languages"
          : "Pensamiento Lógico con Lenguajes de Programación",
      issuer: "Platzi",
      date: "2022",
      position: "16",
      image: "/certificates/pensamiento-logico-lenguajes.webp",
    },
    {
      title: language === "en" ? "Linux Prework" : "Prework de Linux",
      issuer: "Platzi",
      date: "2022",
      position: "17",
      image: "/certificates/prework-linux.webp",
    },
    {
      title: language === "en" ? "MacOS Prework" : "Prework de MacOS",
      issuer: "Platzi",
      date: "2022",
      position: "18",
      image: "/certificates/prework-macos.webp",
    },
    {
      title: language === "en" ? "Windows Prework" : "Prework de Windows",
      issuer: "Platzi",
      date: "2022",
      position: "19",
      image: "/certificates/prework-windows.webp",
    },
    {
      title:
        language === "en"
          ? "Structured Programming"
          : "Programación Estructurada",
      issuer: "Platzi",
      date: "2023",
      position: "20",
      image: "/certificates/programacion-estructurada.webp",
    },
    {
      title: language === "en" ? "Networks" : "Redes",
      issuer: "Platzi",
      date: "2022",
      position: "21",
      image: "/certificates/redes.webp",
    },
    {
      title:
        language === "en" ? "Security in Enterprises" : "Seguridad en Empresas",
      issuer: "Platzi",
      date: "2022",
      position: "22",
      image: "/certificates/seguridad-empresas-old.webp",
    },
  ];

  const nextCertificate = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % certificates.length);
  };

  const prevCertificate = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + certificates.length) % certificates.length
    );
  };

  useEffect(() => {
    if (isOpen && !isPaused && !isGridView) {
      intervalRef.current = setInterval(nextCertificate, 5000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isOpen, isPaused, isGridView]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMouseEnter = () => {
    setIsPaused(true);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(nextCertificate, 5000);
  };

  const visibleCertificates = () => {
    const isMobile = window.innerWidth < 768;
    const visibleCount = isMobile ? 1 : 3;
    const result = [];
    for (let i = 0; i < certificates.length; i++) {
      const index = (currentIndex + i) % certificates.length;
      result.push(certificates[index]);
    }
    return result;
  };

  const toggleView = () => {
    setIsGridView(!isGridView);
  };

  return (
    <div
      ref={menuRef}
      className={`pt-6 w-full overflow-y-hidden max-w-6xl mx-auto ${
        isDarkMode ? "bg-gray-800" : "bg-white"
      } rounded-lg shadow-md overflow-hidden`}
    >
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex justify-between items-center p-4 ${
          isDarkMode
            ? "bg-green-500 bg-opacity-80 text-white hover:bg-opacity-100 hover:bg-green-500"
            : "bg-blue-600 text-white hover:bg-blue-500"
        } transition-colors duration-300`}
      >
        <Award></Award>
        <span className="text-lg font-semibold">
          {language === "en" ? "Certificates" : "Certificados"}
        </span>
        {isOpen ? (
          <ChevronUp className="h-5 w-5" />
        ) : (
          <ChevronDown className="h-5 w-5" />
        )}
      </Button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
            style={{ height: "calc(100vh - 100px)" }}
          >
            <div className="relative p-4 h-full" ref={carouselRef}>
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-center mb-4">
                  {!isGridView && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`${
                        isDarkMode
                          ? "text-white hover:bg-gray-700"
                          : "text-gray-800 hover:bg-gray-200"
                      }`}
                      onClick={prevCertificate}
                    >
                      <ChevronLeft className="h-6 w-6" />
                      <span className="sr-only">
                        {language === "en"
                          ? "Previous certificates"
                          : "Certificados anteriores"}
                      </span>
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    onClick={toggleView}
                    className={`${
                      isDarkMode
                        ? "text-white hover:bg-gray-700"
                        : "text-gray-800 hover:bg-gray-200"
                    }`}
                  >
                    {isGridView ? (
                      <>
                        <LayoutGrid className="h-5 w-5 mr-2" />
                        {language === "en" ? "Carousel View" : "Vista Carrusel"}
                      </>
                    ) : (
                      <>
                        <Grid className="h-5 w-5 mr-2" />
                        {language === "en" ? "Grid View" : "Vista Cuadrícula"}
                      </>
                    )}
                  </Button>
                  {!isGridView && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`${
                        isDarkMode
                          ? "text-white hover:bg-gray-700"
                          : "text-gray-800 hover:bg-gray-200"
                      }`}
                      onClick={nextCertificate}
                    >
                      <ChevronRight className="h-6 w-6" />
                      <span className="sr-only">
                        {language === "en"
                          ? "Next certificates"
                          : "Siguientes certificados"}
                      </span>
                    </Button>
                  )}
                </div>
                <div className="flex-grow overflow-y-auto">
                  {isGridView ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {certificates.map((cert, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3 }}
                          className={`flex flex-col p-4 rounded-lg ${
                            isDarkMode
                              ? "bg-gray-700 hover:bg-gray-600"
                              : "bg-gray-100 hover:bg-gray-200"
                          } transition-colors duration-300`}
                        >
                          <p
                            className={`text-sm mb-2 ${
                              isDarkMode ? "text-gray-400" : "text-gray-500"
                            }`}
                          >
                            {cert.position}
                          </p>
                          <h3
                            className={`font-semibold text-base mb-2 ${
                              isDarkMode ? "text-green-400" : "text-green-600"
                            }`}
                          >
                            {cert.title}
                          </h3>
                          <p
                            className={`text-sm ${
                              isDarkMode ? "text-gray-300" : "text-gray-600"
                            }`}
                          >
                            {cert.issuer}
                          </p>
                          <p
                            className={`text-sm mb-2 ${
                              isDarkMode ? "text-gray-400" : "text-gray-500"
                            }`}
                          >
                            {cert.date}
                          </p>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="mt-auto"
                            onClick={() => setZoomedImage(cert.image)}
                          >
                            <ZoomIn className="h-4 w-4 mr-2" />
                            {language === "en"
                              ? "View Certificate"
                              : "Ver Certificado"}
                          </Button>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col md:flex-row justify-center items-stretch space-y-4 md:space-y-0 md:space-x-4 h-full">
                      {visibleCertificates().map((cert, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.3 }}
                          className={`flex flex-col p-4 rounded-lg ${
                            isDarkMode
                              ? "bg-gray-700 hover:bg-gray-600"
                              : "bg-gray-100 hover:bg-gray-200"
                          } transition-colors duration-300 w-full md:w-1/3`}
                          onMouseEnter={handleMouseEnter}
                          onMouseLeave={handleMouseLeave}
                        >
                          <p
                            className={`text-sm mb-2 ${
                              isDarkMode ? "text-gray-400" : "text-gray-500"
                            }`}
                          >
                            {cert.position}
                          </p>
                          <div className="relative w-full h-40 mb-1 overflow-hidden rounded-md group">
                            <Image
                              src={cert.image}
                              alt={cert.title}
                              layout="fill"
                              objectFit="cover"
                              className="transition-transform duration-300 transform group-hover:scale-110"
                            />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50">
                              <ZoomIn
                                className="h-8 w-8 text-white cursor-pointer"
                                onClick={() => setZoomedImage(cert.image)}
                              />
                            </div>
                          </div>
                          <h3
                            className={`font-semibold text-base mb-2 ${
                              isDarkMode ? "text-green-400" : "text-green-600"
                            }`}
                          >
                            ______________________
                            <br />
                            {cert.title}
                          </h3>
                          <p
                            className={`text-sm ${
                              isDarkMode ? "text-gray-300" : "text-gray-600"
                            }`}
                          >
                            {cert.issuer}
                          </p>
                          <p
                            className={`text-sm ${
                              isDarkMode ? "text-gray-400" : "text-gray-500"
                            }`}
                          >
                            {cert.date}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            {!isGridView && (
              <div className="flex justify-center pb-4">
                {certificates.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 w-2 rounded-full mx-1 ${
                      index === currentIndex
                        ? isDarkMode
                          ? "bg-green-400"
                          : "bg-blue-600"
                        : isDarkMode
                        ? "bg-gray-600"
                        : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      {zoomedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={() => setZoomedImage(null)}
        >
          <div className="relative max-w-4xl max-h-full p-4">
            <Image
              src={zoomedImage}
              alt={
                language === "en"
                  ? "Zoomed certificate"
                  : "Certificado ampliado"
              }
              width={800}
              height={600}
              objectFit="contain"
            />
            <Button
              variant="secondary"
              size="sm"
              className="absolute top-6 right-6 bg-green-400 bg-opacity-50 hover:bg-green-400 hover:bg-opacity-90"
              onClick={() => setZoomedImage(null)}
            >
              {language === "en" ? "Close" : "Cerrar"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
