# Portfolio Website

A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS. This project showcases professional experience, skills, achievements, and contact information in a clean, accessible design.

## 🌐 Live Demo

**[View Live Portfolio →](https://WiseRandr.github.io/portfolio/)**

The portfolio is automatically deployed to GitHub Pages and updates with every push to the main branch.

## 🛠️ Technology Stack

- **Frontend Framework:** React 18.3.1
- **Language:** TypeScript
- **Build Tool:** Vite 5.4.2
- **Styling:** Tailwind CSS 3.4.1
- **Icons:** Lucide React
- **CSS Processing:** PostCSS with Autoprefixer
- **Linting:** ESLint
- **Deployment:** GitHub Pages

## 📁 Project Structure

```
src/
├── App.tsx              # Main application component
├── main.tsx            # Application entry point
├── index.css           # Global styles and Tailwind imports
├── vite-env.d.ts       # Vite type definitions
└── components/
    ├── Header.tsx      # Navigation header
    ├── Hero.tsx        # Hero/landing section
    ├── About.tsx       # About section
    ├── Experience.tsx  # Work experience
    ├── Skills.tsx      # Technical skills
    ├── Achievements.tsx # Achievements/projects
    ├── Contact.tsx     # Contact information
    └── Footer.tsx      # Site footer
```

## 🚀 Getting Started

### Prerequisites

- Node.js (version 20 or higher)
- npm package manager

### Installation

1. Clone the repository:

```bash
git clone https://github.com/WiseRandr/portfolio.git
cd portfolio
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run deploy` - Deploy to GitHub Pages

## 🎨 Features

- **Responsive Design:** Optimized for all device sizes
- **Modern UI:** Clean, professional design with Tailwind CSS
- **Fast Performance:** Built with Vite for optimal bundle size and loading speed
- **Type Safety:** Full TypeScript implementation
- **Accessible:** Built with accessibility best practices (WCAG compliant)
- **SEO Optimized:** Comprehensive SEO implementation including:
  - Structured data (JSON-LD schema)
  - Open Graph and Twitter Card meta tags
  - Optimized meta descriptions and keywords
  - Sitemap and robots.txt
  - Canonical URLs
  - Image alt text optimization
  - Semantic HTML structure
  - Performance optimizations with preload hints

## 🌐 Deployment

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Automatic Deployment

- Every push to the `main` branch triggers an automatic deployment
- The site is built using Node.js 20 and deployed to GitHub Pages
- No manual deployment steps required

### Manual Deployment (Alternative)

If you want to deploy manually using the gh-pages package:

```bash
npm run deploy
```

**Live Site:** [https://WiseRandr.github.io/portfolio/](https://WiseRandr.github.io/portfolio/)

### Deployment Configuration

- **Source:** GitHub Actions
- **Build Tool:** Vite
- **Base Path:** `/portfolio/` (configured for GitHub Pages subdirectory)
- **Output Directory:** `dist/`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

## 📧 Contact

For any questions or inquiries, please use the contact form on the website or reach out through the provided contact information.
