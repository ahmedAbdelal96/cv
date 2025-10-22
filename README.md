# 🚀 Professional CV Portfolio & Admin Dashboard

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![NextAuth.js](https://img.shields.io/badge/NextAuth.js-5-000000?style=for-the-badge&logo=next.js)

A modern, full-featured portfolio website with a powerful admin dashboard. Built with Next.js 15, featuring dark/light themes, multi-language support (English/Arabic/French), complete CMS functionality, and real-time email notifications.

[Live Demo](#) | [Documentation](#installation) | [Report Bug](#troubleshooting) | [Request Feature](#contributing)

</div>

---

## ✨ Features

### � **Frontend Features**

- ✅ **Modern Responsive Design** - Mobile-first approach with Tailwind CSS
- 🌙 **Dark/Light Mode** - Seamless theme switching with system preference detection
- 🌍 **Multi-language Support** - English, Arabic (RTL), and French with automatic detection
- � **Smooth Animations** - Framer Motion for elegant transitions
- 📊 **Interactive Charts** - Skills visualization with Recharts
- 🖼️ **Project Showcase** - Image galleries with lightbox functionality
- 📝 **Blog System** - Full-featured blog with Markdown support and syntax highlighting
- 💬 **Contact Form** - Real-time Gmail notifications using Nodemailer
- ⭐ **Reviews System** - Public testimonials with admin moderation
- 🔍 **SEO Optimized** - Dynamic meta tags, sitemap, and structured data
- ♿ **Accessibility** - WCAG compliant with keyboard navigation

### �️ **Admin Dashboard**

- 🔐 **Secure Authentication** - NextAuth.js v5 with JWT sessions
- 📧 **Message Management** - View, reply, and mark messages as read/unread
- 📁 **Project Management** - Full CRUD operations with image uploads
- ✍️ **Blog Management** - Create, edit, and publish articles with Markdown editor
- 🌟 **Review Moderation** - Approve, edit, or delete user reviews
- � **Analytics Dashboard** - View statistics and recent activity
- 🎨 **Modern UI** - Clean, intuitive interface with Heroicons
- 📱 **Responsive Sidebar** - Collapsible navigation for mobile devices

### 🔧 **Technical Features**

- ⚡ **Next.js 15 App Router** - Latest features with Server Components
- 🗄️ **MongoDB Integration** - Mongoose ODM with connection pooling
- 📧 **Email Notifications** - Gmail SMTP integration for contact forms
- 🖼️ **File Uploads** - Multer integration for project images
- 🔄 **API Routes** - RESTful API for all CRUD operations
- 🌐 **Internationalization** - next-intl with route-based localization
- 🎯 **Middleware** - Automatic locale detection and redirection
- � **Protected Routes** - Server-side authentication checks
- 📦 **Optimized Bundle** - Code splitting and lazy loading

## 🛠️ Tech Stack

### **Core Framework**

- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - UI library with Server Components
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety for middleware

### **Styling & UI**

- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - Reusable component library
- **[Heroicons](https://heroicons.com/)** - Beautiful hand-crafted SVG icons
- **[Framer Motion](https://www.framer.com/motion/)** - Animation library

### **Database & Backend**

- **[MongoDB](https://www.mongodb.com/)** - NoSQL database
- **[Mongoose](https://mongoosejs.com/)** - MongoDB object modeling
- **[NextAuth.js v5](https://next-auth.js.org/)** - Authentication solution
- **[Nodemailer](https://nodemailer.com/)** - Email sending library
- **[Multer](https://github.com/expressjs/multer)** - File upload middleware

### **Forms & Validation**

- **[React Hook Form](https://react-hook-form.com/)** - Form management
- **[Zod](https://zod.dev/)** - Schema validation

### **Internationalization**

- **[next-intl](https://next-intl-docs.vercel.app/)** - Internationalization for Next.js
- **[React i18next](https://react.i18next.com/)** - Translation framework

### **Content & Markdown**

- **[react-markdown](https://github.com/remarkjs/react-markdown)** - Markdown rendering
- **[Prism.js](https://prismjs.com/)** - Syntax highlighting
- **[sanitize-html](https://github.com/apostrophecms/sanitize-html)** - HTML sanitization

### **Data Visualization**

- **[Recharts](https://recharts.org/)** - Charting library
- **[SWR](https://swr.vercel.app/)** - Data fetching hooks

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.0 or higher ([Download](https://nodejs.org/))
- **npm** or **pnpm** package manager
- **MongoDB Atlas** account ([Sign up free](https://www.mongodb.com/cloud/atlas))
- **Git** version control ([Download](https://git-scm.com/))
- **Gmail Account** (for email notifications)

## 🚀 Quick Start

### 1️⃣ Clone the Repository

\`\`\`bash
git clone https://github.com/AhmedAbdelal57/cv-portfolio.git
cd cv-portfolio
\`\`\`

### 2️⃣ Install Dependencies

\`\`\`bash
npm install

# or

pnpm install
\`\`\`

### 3️⃣ Environment Configuration

Create a `.env` file in the root directory:

\`\`\`bash

# MongoDB Database

MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority

# NextAuth Configuration (v5)

NEXTAUTH_SECRET=generate-a-secure-random-string-here
NEXTAUTH_URL=http://localhost:3000

# Admin Credentials

ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your-secure-password

# Contact Information

WHATSAPP_NUMBER=+1234567890

# Gmail Configuration (for Contact Form)

GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-gmail-app-password

# Optional: Email Settings (if not using Gmail)

EMAIL_FROM=noreply@yourdomain.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
\`\`\`

#### 🔑 **Generating Secure Keys**

\`\`\`bash

# Generate NEXTAUTH_SECRET

node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
\`\`\`

#### 📧 **Gmail App Password Setup**

1. Enable 2-Factor Authentication on your Google Account
2. Go to [Google App Passwords](https://myaccount.google.com/apppasswords)
3. Create a new app password for "Mail"
4. Copy the 16-character password (without spaces)
5. Use it as `GMAIL_APP_PASSWORD` in your `.env`

### 4️⃣ Database Setup

The app will automatically create collections when you first run it. Optionally, seed with sample data:

\`\`\`bash
npm run seed
\`\`\`

This creates:

- ✅ Sample projects
- ✅ Blog articles
- ✅ Reviews/testimonials
- ✅ Admin user account

**Note**: Check console output for admin login credentials!

### 5️⃣ Start Development Server

\`\`\`bash
npm run dev
\`\`\`

The application will be available at:

- 🌐 **Frontend**: [http://localhost:3000](http://localhost:3000)
- 🔐 **Admin Login**: [http://localhost:3000/en/auth/login](http://localhost:3000/en/auth/login)
- 📊 **Admin Dashboard**: [http://localhost:3000/en/admin](http://localhost:3000/en/admin)

### 6️⃣ Default Admin Access

After seeding, use these credentials:

- **Email**: Value from `ADMIN_EMAIL` in `.env`
- **Password**: Value from `ADMIN_PASSWORD` in `.env`

## 📂 Project Structure

\`\`\`
cv-portfolio/
├── 📁 public/ # Static assets
│ ├── locales/ # Translation files (en, ar, fr)
│ ├── uploads/ # Uploaded images
│ └── cv.pdf # Your CV file
│
├── 📁 src/
│ ├── 📁 app/ # Next.js App Router
│ │ ├── [local]/ # Internationalized routes
│ │ │ ├── (public)/ # Public pages
│ │ │ │ ├── page.js # Home page
│ │ │ │ ├── about/ # About page
│ │ │ │ ├── projects/ # Projects listing & detail
│ │ │ │ ├── blog/ # Blog listing & articles
│ │ │ │ ├── contact/ # Contact page
│ │ │ │ └── reviews/ # Reviews page
│ │ │ │
│ │ │ ├── (dashboard)/ # Protected admin routes
│ │ │ │ ├── layout.js # Dashboard layout with auth
│ │ │ │ └── admin/ # Admin pages
│ │ │ │ ├── page.js # Dashboard overview
│ │ │ │ ├── messages/ # Message management
│ │ │ │ ├── projects/ # Project CRUD
│ │ │ │ ├── blog/ # Blog CRUD
│ │ │ │ └── reviews/ # Review moderation
│ │ │ │
│ │ │ └── auth/ # Authentication pages
│ │ │ ├── login/ # Login page
│ │ │ └── error/ # Auth error page
│ │ │
│ │ ├── api/ # API Routes
│ │ │ ├── auth/ # NextAuth endpoints
│ │ │ ├── contact/ # Contact form handler
│ │ │ ├── projects/ # Project API
│ │ │ ├── articles/ # Blog API
│ │ │ ├── reviews/ # Review API
│ │ │ ├── upload/ # File upload
│ │ │ └── download-cv/ # CV download
│ │ │
│ │ ├── globals.css # Global styles
│ │ └── layout.js # Root layout
│ │
│ ├── 📁 components/ # React Components
│ │ ├── common/ # Shared components
│ │ │ ├── ThemeToggleButton.jsx
│ │ │ ├── LanguageSwitcher.jsx
│ │ │ ├── Breadcrumbs.jsx
│ │ │ └── DownloadCVButton.jsx
│ │ │
│ │ ├── dashboard/ # Admin dashboard components
│ │ │ ├── DashboardSidebar.jsx
│ │ │ └── DashboardHeader.jsx
│ │ │
│ │ ├── header/ # Header component
│ │ ├── footer/ # Footer component
│ │ ├── layout/ # Layout components
│ │ │
│ │ └── pages/ # Page-specific components
│ │ ├── homePage/
│ │ ├── aboutPage/
│ │ ├── projectsPage/
│ │ ├── blogPage/
│ │ └── contactPage/
│ │
│ ├── 📁 lib/ # Utility Functions
│ │ ├── db.js # MongoDB connection
│ │ ├── i18n.js # Internationalization config
│ │ └── utils.js # Helper functions
│ │
│ ├── 📁 models/ # Mongoose Models
│ │ ├── Article.js # Blog post schema
│ │ ├── Message.js # Contact message schema
│ │ ├── Project.js # Project schema
│ │ ├── Review.js # Review schema
│ │ ├── User.js # User schema
│ │ └── View.js # Page view tracking
│ │
│ ├── 📁 i18n/ # i18n Configuration
│ │ ├── routing.js # Route configuration
│ │ └── request.js # Request handler
│ │
│ ├── 📁 messages/ # Translation Messages
│ │ ├── en.json # English
│ │ ├── ar.json # Arabic
│ │ └── fr.json # French
│ │
│ ├── 📁 scripts/ # Utility Scripts
│ │ └── seed.js # Database seeding
│ │
│ └── middleware.ts # Next.js Middleware (locale detection)
│
├── 📄 .env # Environment variables (create this)
├── 📄 .env.example # Environment template
├── 📄 package.json # Dependencies & scripts
├── 📄 tailwind.config.ts # Tailwind configuration
├── 📄 next.config.mjs # Next.js configuration
└── 📄 README.md # This file
\`\`\`

## 🎯 Available Scripts

| Command          | Description                                     |
| ---------------- | ----------------------------------------------- |
| `npm run dev`    | 🚀 Start development server at `localhost:3000` |
| `npm run build`  | 🏗️ Build optimized production bundle            |
| `npm run start`  | ▶️ Start production server                      |
| `npm run lint`   | 🔍 Run ESLint to check code quality             |
| `npm run format` | ✨ Format code with Prettier                    |
| `npm run seed`   | 🌱 Seed database with sample data               |

## 🔌 API Routes

### Public Endpoints

| Method | Endpoint               | Description             |
| ------ | ---------------------- | ----------------------- |
| `GET`  | `/api/projects`        | Fetch all projects      |
| `GET`  | `/api/projects/[id]`   | Fetch single project    |
| `GET`  | `/api/articles`        | Fetch all blog articles |
| `GET`  | `/api/articles/[slug]` | Fetch single article    |
| `GET`  | `/api/reviews`         | Fetch approved reviews  |
| `POST` | `/api/contact`         | Submit contact form     |
| `POST` | `/api/reviews`         | Submit new review       |
| `GET`  | `/api/download-cv`     | Download CV file        |

### Protected Endpoints (Requires Authentication)

| Method   | Endpoint               | Description                  |
| -------- | ---------------------- | ---------------------------- |
| `GET`    | `/api/contact`         | Get all messages (admin)     |
| `PUT`    | `/api/contact/[id]`    | Update message status        |
| `DELETE` | `/api/contact/[id]`    | Delete message               |
| `POST`   | `/api/projects`        | Create new project           |
| `PUT`    | `/api/projects/[id]`   | Update project               |
| `DELETE` | `/api/projects/[id]`   | Delete project               |
| `POST`   | `/api/articles`        | Create new article           |
| `PUT`    | `/api/articles/[slug]` | Update article               |
| `DELETE` | `/api/articles/[slug]` | Delete article               |
| `PUT`    | `/api/reviews/[id]`    | Update review (approve/edit) |
| `DELETE` | `/api/reviews/[id]`    | Delete review                |
| `POST`   | `/api/upload`          | Upload images                |

## 🗄️ Database Schema

### Message Model

\`\`\`javascript
{
name: String (required),
email: String (required),
subject: String,
message: String (required),
isRead: Boolean (default: false),
createdAt: Date (auto),
}
\`\`\`

### Project Model

\`\`\`javascript
{
title: String (required),
description: String (required),
longDescription: String,
technologies: [String],
images: [String],
demoUrl: String,
githubUrl: String,
category: String,
featured: Boolean (default: false),
order: Number (default: 0),
createdAt: Date (auto),
}
\`\`\`

### Article Model

\`\`\`javascript
{
title: String (required, unique),
slug: String (required, unique),
excerpt: String,
content: String (required),
coverImage: String,
author: String (default: 'Admin'),
tags: [String],
category: String,
published: Boolean (default: false),
views: Number (default: 0),
createdAt: Date (auto),
updatedAt: Date (auto),
}
\`\`\`

### Review Model

\`\`\`javascript
{
name: String (required),
email: String (required),
company: String,
position: String,
rating: Number (1-5, required),
review: String (required),
avatar: String,
approved: Boolean (default: false),
featured: Boolean (default: false),
createdAt: Date (auto),
}
\`\`\`

## 🚢 Deployment

### **Vercel (Recommended)**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. **Push to GitHub**
   \`\`\`bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   \`\`\`

2. **Import to Vercel**
   - Visit [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New Project"
   - Import your GitHub repository

3. **Configure Environment Variables**
   Add all variables from your `.env` file in Vercel dashboard

4. **Deploy!**
   Vercel will automatically build and deploy your app

**⚠️ Important Notes:**

- File uploads to `/public/uploads` are **temporary** on Vercel
- For production, integrate **AWS S3**, **Cloudinary**, or **UploadThing**
- Update `NEXTAUTH_URL` to your production domain
- Ensure MongoDB Atlas allows Vercel's IP addresses

### **Other Platforms (Netlify, Railway, DigitalOcean)**

1. **Build the project**
   \`\`\`bash
   npm run build
   \`\`\`

2. **Start the server**
   \`\`\`bash
   npm start
   \`\`\`

3. **Environment Variables**
   - Set all variables from `.env` in platform dashboard
   - Update `NEXTAUTH_URL` to your domain

### **MongoDB Atlas Network Access**

Add your deployment platform's IP addresses:

- **Vercel**: Add `0.0.0.0/0` (or specific IPs)
- **Other platforms**: Check their documentation for IP ranges

## 📸 Screenshots

### Home Page

![Home Page](docs/screenshots/home.png)

### Admin Dashboard

![Dashboard](docs/screenshots/dashboard.png)

### Project Management

![Projects](docs/screenshots/projects.png)

### Blog Management

![Blog](docs/screenshots/blog.png)

### Dark Mode

![Dark Mode](docs/screenshots/dark-mode.png)

## ⚙️ Configuration & Customization

### 📝 **Adding Your Content**

#### 1. Access Admin Dashboard

- Navigate to `/en/auth/login`
- Login with credentials from `.env` file
- You'll be redirected to `/en/admin`

#### 2. Add Projects

- Go to **Admin → Projects → Add New**
- Upload images (multiple supported)
- Add title, description, technologies
- Include demo URL and GitHub link
- Mark as "Featured" to show on homepage

#### 3. Write Blog Posts

- Go to **Admin → Blog → Write New Post**
- Write in Markdown format
- Add cover image and tags
- Preview before publishing
- Toggle "Published" when ready

#### 4. Manage Reviews

- Reviews submitted publicly need approval
- Go to **Admin → Reviews**
- Approve, edit, or delete reviews
- Mark important ones as "Featured"

#### 5. Handle Messages

- Check **Admin → Messages** for contact form submissions
- Mark as read/unread
- Delete spam or resolved messages

#### 6. Replace CV File

\`\`\`bash

# Replace the CV file in public folder

cp /path/to/your-cv.pdf public/cv.pdf
\`\`\`

### 🎨 **Theme Customization**

#### Colors

Edit `src/app/globals.css`:

\`\`\`css
:root {
--primary: 220 90% 56%; /_ Blue _/
--secondary: 280 90% 56%; /_ Purple _/
--accent: 160 90% 56%; /_ Green _/
/_ ... _/
}
\`\`\`

#### Fonts

Edit `src/app/layout.js`:

\`\`\`javascript
import { Inter, Roboto } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
\`\`\`

#### Logo & Branding

- Replace logo in `public/logo.png`
- Update site metadata in `src/app/layout.js`
- Modify footer content in `src/components/footer/`

### 🌐 **Translations**

Translation files are in `src/messages/`:

\`\`\`javascript
// src/messages/en.json
{
"home": {
"title": "Welcome to My Portfolio",
"subtitle": "Full-Stack Developer"
}
}
\`\`\`

Add new language:

1. Create `src/messages/es.json` (for Spanish)
2. Add `'es'` to `src/i18n/routing.js`:
   \`\`\`javascript
   export const routing = {
   locales: ['en', 'ar', 'fr', 'es'],
   defaultLocale: 'en'
   };
   \`\`\`

### 🔒 **Security Best Practices**

1. **Change Default Credentials**
   \`\`\`bash
   ADMIN_EMAIL=your-real-email@domain.com
   ADMIN_PASSWORD=use-strong-password-here
   \`\`\`

2. **Secure NextAuth Secret**
   \`\`\`bash
   NEXTAUTH_SECRET=$(openssl rand -base64 32)
   \`\`\`

3. **MongoDB Security**
   - Use strong database password
   - Enable IP whitelist in MongoDB Atlas
   - Never commit `.env` file to Git

4. **Production Checklist**
   - [ ] Update `NEXTAUTH_URL` to production domain
   - [ ] Use environment-specific secrets
   - [ ] Enable rate limiting on API routes
   - [ ] Set up CORS properly
   - [ ] Use HTTPS only

## 🎯 Usage Guide

### **For Developers**

#### Creating New Pages

\`\`\`bash

# Create new route

src/app/[local]/(public)/services/page.js
\`\`\`

#### Adding New API Endpoint

\`\`\`javascript
// src/app/api/services/route.js
export async function GET(request) {
// Your logic
return Response.json({ data: [] });
}
\`\`\`

#### Adding Database Model

\`\`\`javascript
// src/models/Service.js
import mongoose from 'mongoose';

const ServiceSchema = new mongoose.Schema({
title: { type: String, required: true },
// ... other fields
});

export default mongoose.models.Service ||
mongoose.model('Service', ServiceSchema);
\`\`\`

### **For Content Managers**

#### Daily Tasks

1. Check **Messages** for new inquiries
2. Review pending **Reviews** for approval
3. Monitor **Analytics** dashboard
4. Respond to important messages

#### Weekly Tasks

1. Publish new blog post
2. Update project portfolio
3. Review and moderate comments
4. Check site performance

### **Internationalization Flow**

1. User visits site
2. Middleware detects preferred language (cookie → browser → default)
3. Redirects to `/en/`, `/ar/`, or `/fr/` routes
4. Components load translated content from `src/messages/{locale}.json`
5. Language switcher updates cookie and reloads

## ✅ Testing Checklist

### Initial Setup

- [ ] Node.js 18+ installed
- [ ] MongoDB Atlas account created
- [ ] Gmail App Password generated
- [ ] Dependencies installed successfully
- [ ] `.env` file configured with all variables
- [ ] Database seeded with sample data

### Frontend Testing

- [ ] Home page loads correctly
- [ ] About page displays information
- [ ] Projects page shows all projects
- [ ] Project detail pages work
- [ ] Blog page lists articles
- [ ] Article pages render Markdown correctly
- [ ] Contact form submits successfully
- [ ] Review submission works
- [ ] CV download functions properly

### Admin Dashboard

- [ ] Can access login page at `/en/auth/login`
- [ ] Login with admin credentials works
- [ ] Dashboard overview displays stats
- [ ] Can create new project
- [ ] Can edit existing project
- [ ] Can delete project
- [ ] Can upload project images
- [ ] Can create blog post with Markdown
- [ ] Can publish/unpublish articles
- [ ] Can view all messages
- [ ] Can mark messages as read/unread
- [ ] Can approve/reject reviews
- [ ] Can logout successfully

### Responsive Design

- [ ] Works on mobile (< 640px)
- [ ] Works on tablet (640px - 1024px)
- [ ] Works on desktop (> 1024px)
- [ ] Navigation menu responsive
- [ ] Admin sidebar collapsible on mobile
- [ ] Images scale properly
- [ ] Forms usable on all devices

### Theme & i18n

- [ ] Dark mode toggle works
- [ ] Light mode displays correctly
- [ ] Theme preference persists
- [ ] Can switch to English
- [ ] Can switch to Arabic (RTL works)
- [ ] Can switch to French
- [ ] Language preference persists
- [ ] Translations load correctly

### Email Notifications

- [ ] Contact form sends email to admin
- [ ] Email contains all form data
- [ ] Sender email is correct
- [ ] Subject line is appropriate

### SEO & Performance

- [ ] Meta tags appear correctly
- [ ] Open Graph tags work
- [ ] Twitter cards work
- [ ] Sitemap generates correctly
- [ ] Images are optimized
- [ ] Pages load quickly (< 3s)
- [ ] Lighthouse score > 90

### Accessibility

- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] ARIA labels present
- [ ] Alt text on images
- [ ] Color contrast sufficient
- [ ] Screen reader compatible

## 🐛 Troubleshooting

### MongoDB Connection Issues

**Error**: `MongooseServerSelectionError: Could not connect to any servers`

**Solutions**:

1. Check `MONGODB_URI` format:
   \`\`\`
   mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
   \`\`\`
2. Verify username and password don't contain special characters (URL encode if needed)
3. Check MongoDB Atlas:
   - Network Access → Add your IP address or `0.0.0.0/0`
   - Database Access → Ensure user has read/write permissions
4. Test connection:
   \`\`\`bash
   mongosh "mongodb+srv://your-connection-string"
   \`\`\`

### NextAuth Errors

**Error**: `[next-auth][error][SIGNIN_EMAIL_ERROR]`

**Solutions**:

1. Ensure `NEXTAUTH_SECRET` is set (32+ random characters)
2. Check `NEXTAUTH_URL`:
   - Development: `http://localhost:3000`
   - Production: `https://yourdomain.com`
3. Clear cookies and try again
4. Check if NextAuth v5 is installed:
   \`\`\`bash
   npm list next-auth
   \`\`\`

### Email Not Sending

**Error**: `Invalid login: 535-5.7.8 Username and Password not accepted`

**Solutions**:

1. Enable 2FA on Google account
2. Generate new App Password (not regular password)
3. Use 16-character App Password without spaces:
   \`\`\`
   GMAIL_APP_PASSWORD=abcdefghijklmnop
   \`\`\`
4. Check Gmail settings allow "Less secure apps" (if not using App Password)
5. Test SMTP credentials:
   \`\`\`javascript
   const nodemailer = require('nodemailer');
   const transporter = nodemailer.createTransport({
   service: 'gmail',
   auth: { user: 'your@gmail.com', pass: 'app-password' }
   });
   transporter.verify().then(console.log).catch(console.error);
   \`\`\`

### Build Errors

**Error**: `Module not found` or `Cannot find module`

**Solutions**:

1. Clear Next.js cache:
   \`\`\`bash
   rm -rf .next
   \`\`\`
2. Reinstall dependencies:
   \`\`\`bash
   rm -rf node_modules package-lock.json
   npm install
   \`\`\`
3. Check imports use correct casing (Next.js is case-sensitive)

**Error**: `Error: ENOSPC: System limit for number of file watchers reached`

**Solution** (Linux):
\`\`\`bash
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
\`\`\`

### Image Upload Issues

**Error**: Images not appearing after upload

**Solutions**:

1. Check `public/uploads` directory exists
2. Ensure write permissions on `public/uploads`
3. Verify Multer configuration in `/api/upload/route.js`
4. For production (Vercel), integrate cloud storage (S3, Cloudinary)

### Locale/i18n Issues

**Error**: `404` on locale routes or locale not detected

**Solutions**:

1. Check `src/i18n/routing.js` config
2. Verify middleware in `src/middleware.ts`
3. Ensure locale folders exist: `src/app/[local]/`
4. Check translation files: `src/messages/{locale}.json`
5. Clear cookies and reload

### Performance Issues

**Problem**: Slow page loads or build times

**Solutions**:

1. Optimize images:
   \`\`\`javascript
   import Image from 'next/image';
   <Image src="..." width={800} height={600} />
   \`\`\`
2. Enable static generation where possible
3. Use dynamic imports:
   \`\`\`javascript
   const Component = dynamic(() => import('./Component'));
   \`\`\`
4. Check MongoDB queries use indexes
5. Implement caching with SWR

### Database Seeding Fails

**Error**: Seed script errors or doesn't create data

**Solutions**:

1. Check MongoDB connection first
2. Ensure models are correct in `/src/models/`
3. Run with debug:
   \`\`\`bash
   NODE_ENV=development node src/scripts/seed.js
   \`\`\`
4. Check console output for specific errors

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

### Reporting Bugs

1. Check if the bug is already reported in [Issues](../../issues)
2. Create a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Your environment (OS, Node version, browser)

### Suggesting Features

1. Open an issue with the `enhancement` label
2. Describe the feature and its benefits
3. Explain why it's needed
4. Provide examples if possible

### Pull Requests

1. **Fork the repository**
   \`\`\`bash
   git clone https://github.com/AhmedAbdelal57/cv-portfolio.git
   cd cv-portfolio
   \`\`\`

2. **Create a feature branch**
   \`\`\`bash
   git checkout -b feature/amazing-feature
   \`\`\`

3. **Make your changes**
   - Follow existing code style
   - Add comments for complex logic
   - Update documentation if needed

4. **Test your changes**
   \`\`\`bash
   npm run lint
   npm run build
   npm run dev # Test manually
   \`\`\`

5. **Commit with clear messages**
   \`\`\`bash
   git commit -m "feat: add amazing feature"
   git commit -m "fix: resolve login issue"
   git commit -m "docs: update README"
   \`\`\`

6. **Push and create PR**
   \`\`\`bash
   git push origin feature/amazing-feature
   \`\`\`
   Then open a Pull Request on GitHub

### Commit Convention

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting)
- `refactor:` Code refactoring
- `test:` Adding tests
- `chore:` Maintenance tasks

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

### MIT License Summary

- ✅ Commercial use
- ✅ Modification
- ✅ Distribution
- ✅ Private use
- ❌ Liability
- ❌ Warranty

## 👨‍💻 Author

**Your Name**

- GitHub: [@AhmedAbdelal57](https://github.com/AhmedAbdelal57)
- LinkedIn: [Ahmed Abdelal](https://linkedin.com/in/ahmed-abdelal-6b0450334)AhmedAbdelal57
- Email: your.email@example.com
- Portfolio: [AhmedAbdelal.com](https://AhmedAbdelal.com)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [shadcn/ui](https://ui.shadcn.com/) - UI Components
- [NextAuth.js](https://next-auth.js.org/) - Authentication
- [MongoDB](https://www.mongodb.com/) - Database
- [Vercel](https://vercel.com/) - Hosting Platform
- [Heroicons](https://heroicons.com/) - Icons

## 📊 Project Status

![Maintenance](https://img.shields.io/badge/Maintained-Yes-green.svg)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)
![License](https://img.shields.io/badge/License-MIT-blue.svg)

**Current Version**: 1.0.0
**Last Updated**: October 2025

## 🗺️ Roadmap

### Phase 1 (Current)

- [x] Core portfolio functionality
- [x] Admin dashboard
- [x] Blog system
- [x] Contact form with email
- [x] Multi-language support
- [x] Dark/Light theme

### Phase 2 (Planned)

- [ ] Blog comments system
- [ ] Search functionality
- [ ] Advanced analytics
- [ ] Email newsletter
- [ ] Social media integration
- [ ] Portfolio export (PDF)

### Phase 3 (Future)

- [ ] Multi-user support
- [ ] Role-based permissions
- [ ] Advanced SEO tools
- [ ] A/B testing
- [ ] Performance monitoring
- [ ] AI-powered content suggestions

## 💡 Tips & Best Practices

### Development

- Use TypeScript for new components
- Follow React best practices (hooks, composition)
- Keep components small and focused
- Use Server Components where possible
- Optimize images with Next.js Image component

### Security

- Never commit `.env` file
- Use strong passwords
- Enable CSRF protection
- Sanitize user inputs
- Keep dependencies updated

### Performance

- Use `next/image` for all images
- Implement lazy loading
- Minimize client-side JavaScript
- Use static generation when possible
- Enable caching strategies

### SEO

- Add meta descriptions to all pages
- Use semantic HTML
- Implement structured data
- Create XML sitemap
- Optimize for Core Web Vitals

## 📞 Support

Need help? Here's how to get support:

- 📖 **Documentation**: Read this README thoroughly
- 🐛 **Bug Reports**: [Open an issue](../../issues/new)
- 💬 **Questions**: [Start a discussion](../../discussions)
- 📧 **Email**: your.email@example.com

## ⭐ Show Your Support

If this project helped you, please give it a ⭐️ on GitHub!

---

<div align="center">

**Made with ❤️ using Next.js**

[⬆ Back to Top](#-professional-cv-portfolio--admin-dashboard)

</div>
