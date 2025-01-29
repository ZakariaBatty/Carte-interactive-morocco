"use client"

import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { MoroccoMap } from "@/components/morocco-map"

export default function Page() {
  const [showMap, setShowMap] = useState(false)
  const [hideContent, setHideContent] = useState(false)

  const handleCircleClick = () => {
    setHideContent(true)
    setTimeout(() => setShowMap(true), 2000)
  }


  const handleResetClick = () => {
    setShowMap(false);
    setHideContent(false);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#0A3B44] overflow-hidden">
      {/* World Map Background */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1 }}
        animate={{
          scale: showMap ? 3 : 1,
          opacity: showMap ? 0 : 0.2,
        }}
        transition={{
          duration: 3,
          ease: "easeInOut",
        }}
        style={{
          backgroundImage:
            'url("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Z0slCNEGKRRNuJDG7udCYD6hpC9JJe.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "grayscale(1) brightness(0.7)",
        }}
      />

      {/* Initial Content */}
      <AnimatePresence>
        {!hideContent && (
          <motion.div
            className="relative z-10 flex flex-col items-center justify-between min-h-screen py-8"
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 1 }}
          >
            {/* Logo */}
            <motion.div
              className="w-full max-w-xl px-4"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Image src="/Logo.svg" alt="ANDA Logo" width={300} height={100} className="mx-auto" />
            </motion.div>

            {/* Main Content */}
            <div className="flex flex-col items-center justify-center flex-1 px-4">
              <motion.h1
                className="mb-16 text-4xl font-light text-[#E5B975] tracking-[0.2em]"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                VIVEZ L&apos;EXPÉRIENCE
              </motion.h1>

              {/* Animated Circles */}
              <motion.button onClick={handleCircleClick} className="relative group" whileHover={{ scale: 1.05 }}>
                <motion.div
                  className="w-32 h-32 border-2 border-[#E5B975] rounded-full"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                />
                <motion.div
                  className="absolute inset-0 w-24 h-24 m-auto border-2 border-[#E5B975] rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.2 }}
                />
                <motion.div
                  className="absolute inset-0 w-16 h-16 m-auto border-2 border-[#E5B975] rounded-full cursor-pointer"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.4 }}
                >
                  <ChevronDown className="absolute inset-0 m-auto text-[#E5B975]" />
                </motion.div>
              </motion.button>
            </div>

            {/* Footer */}
            <motion.div
              className="w-full text-center"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <h2 className="text-xl font-light text-white tracking-[0.15em]">SECTEUR ET OFFRE AQUACOLE</h2>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Morocco Map */}
      <AnimatePresence>{showMap && <MoroccoMap />}</AnimatePresence>

      {/* Reset Button (Only visible when the map is shown) */}
      {showMap && (
        <button
          onClick={handleResetClick}
          className="absolute bottom-10 left-[10%] transform -translate-x-1/2 bg-[#E5B975] text-[#0A3B44] px-6 py-2 rounded-full shadow-md"
        >
          Reset Experience
        </button>
      )}
    </div>
  )
}

