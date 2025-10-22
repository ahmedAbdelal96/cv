/**
 * Sitemap generation API route
 * Generates XML sitemap for SEO
 */
import { NextResponse } from "next/server"
import connectDB from "@/lib/db"
import Project from "@/models/Project"
import Article from "@/models/Article"

// GET /api/sitemap - Generate sitemap.xml
export async function GET() {
  try {
    await connectDB()

    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000"

    // Static pages
    const staticPages = [
      { url: "", priority: "1.0", changefreq: "weekly" },
      { url: "/about", priority: "0.8", changefreq: "monthly" },
      { url: "/projects", priority: "0.8", changefreq: "weekly" },
      { url: "/blog", priority: "0.8", changefreq: "weekly" },
      { url: "/contact", priority: "0.7", changefreq: "monthly" },
      { url: "/submit-review", priority: "0.6", changefreq: "monthly" },
    ]

    // Get dynamic pages
    const projects = await Project.find({}).select("_id createdAt").lean()
    const articles = await Article.find({ published: true }).select("slug publishedDate").lean()

    // Build sitemap XML
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`

    // Add static pages
    staticPages.forEach((page) => {
      sitemap += `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <priority>${page.priority}</priority>
    <changefreq>${page.changefreq}</changefreq>
  </url>
`
    })

    // Add project pages
    projects.forEach((project) => {
      sitemap += `  <url>
    <loc>${baseUrl}/projects/${project._id}</loc>
    <lastmod>${project.createdAt.toISOString()}</lastmod>
    <priority>0.7</priority>
    <changefreq>monthly</changefreq>
  </url>
`
    })

    // Add blog articles
    articles.forEach((article) => {
      sitemap += `  <url>
    <loc>${baseUrl}/blog/${article.slug}</loc>
    <lastmod>${article.publishedDate.toISOString()}</lastmod>
    <priority>0.6</priority>
    <changefreq>monthly</changefreq>
  </url>
`
    })

    sitemap += `</urlset>`

    return new NextResponse(sitemap, {
      headers: {
        "Content-Type": "application/xml",
      },
    })
  } catch (error) {
    console.error("Error generating sitemap:", error)
    return NextResponse.json({ success: false, error: "Failed to generate sitemap" }, { status: 500 })
  }
}
