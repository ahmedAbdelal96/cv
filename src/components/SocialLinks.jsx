/**
 * Social links component
 * Displays social media icons with hover animations
 */
"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Twitter, Instagram, Mail } from "lucide-react"

const socialLinks = [
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/johnwatson",
    icon: Linkedin,
    color: "hover:text-blue-600",
  },
  {
    name: "GitHub",
    href: "https://github.com/johnwatson",
    icon: Github,
    color: "hover:text-gray-900 dark:hover:text-gray-100",
  },
  {
    name: "Twitter",
    href: "https://twitter.com/johnwatson",
    icon: Twitter,
    color: "hover:text-blue-400",
  },
  {
    name: "Instagram",
    href: "https://instagram.com/johnwatson",
    icon: Instagram,
    color: "hover:text-pink-500",
  },
  {
    name: "Email",
    href: "mailto:john@example.com",
    icon: Mail,
    color: "hover:text-primary",
  },
]

export default function SocialLinks({ className = "" }) {
  return (
    <div className={`flex items-center space-x-4 ${className}`}>
      {socialLinks.map((social, index) => {
        const Icon = social.icon
        return (
          <motion.a
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`text-muted-foreground transition-colors ${social.color}`}
            aria-label={social.name}
          >
            <Icon className="h-5 w-5" />
          </motion.a>
        )
      })}
    </div>
  )
}
