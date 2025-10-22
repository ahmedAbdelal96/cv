/**
 * Download CV button component
 * Handles CV download with tracking and animations
 */
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Download, FileText } from "lucide-react"
import { motion } from "framer-motion"

export default function DownloadCVButton({ className = "" }) {
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownload = async () => {
    setIsDownloading(true)

    try {
      // Track the download
      const response = await fetch("/api/download-cv", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (response.ok) {
        const data = await response.json()

        // Create download link
        const link = document.createElement("a")
        link.href = data.data.url
        link.download = "John_Watson_CV.pdf"
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }
    } catch (error) {
      console.error("Error downloading CV:", error)
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
      <Button
        onClick={handleDownload}
        disabled={isDownloading}
        className={`bg-primary hover:bg-primary/90 text-primary-foreground ${className}`}
      >
        {isDownloading ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            <FileText className="mr-2 h-4 w-4" />
          </motion.div>
        ) : (
          <Download className="mr-2 h-4 w-4" />
        )}
        {isDownloading ? "Downloading..." : "Download CV"}
      </Button>
    </motion.div>
  )
}
