import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-900">
      <div className="relative w-64 h-64">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-32 h-32 relative">
            <Image
              src="/logo.svg"
              alt="Loading"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
        <motion.svg
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-full h-full"
          viewBox="0 0 100 100"
        >
          <circle
            cx="50"
            cy="50"
            r="48"
            fill="none"
            stroke="#4ade80"
            strokeWidth="4"
            strokeDasharray="50 10 0 10"
            strokeLinecap="round"
          />
        </motion.svg>
      </div>
      <div className="text-white text-xl font-semibold pt-3">Loading...</div>
    </div>
  );
};

export default LoadingScreen;
