# Quizlett - Advanced MCQ Quiz Application

<img width="601" height="416" alt="image" src="https://github.com/user-attachments/assets/4335a4d1-f34c-4b61-8f07-06ade2ed34fd" />

A modern, interactive multiple-choice quiz application built with Next.js, featuring three comprehensive quiz sections: Mathematics, Programming, and General Knowledge. Test your knowledge with instant feedback, progress tracking, achievements, and a beautiful dark/light theme interface.

## 🌟 Features

### Core Functionality
- **Three Quiz Sections**: Mathematics (10 questions), Programming (10 questions), General Knowledge (10 questions)
- **Multiple Quiz Modes**:
  - Mathematics: One-by-one questions with instant feedback
  - Programming & General Knowledge: Batch submission with comprehensive results
- **Progress Tracking**: Visual progress bars and completion status for each section
- **Local Storage**: Automatically saves progress and resumes where you left off
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### User Experience
- **Dark/Light Theme**: Toggle between themes with persistent preference
- **Instant Feedback**: Immediate correct/incorrect responses with detailed explanations
- **Achievement System**: Unlock badges for perfect scores and milestones
- **Comprehensive Results**: Detailed breakdown of answers with explanations
- **Score Analytics**: Percentage scores and performance insights

### Technical Features
- **TypeScript**: Full type safety and better development experience
- **Modern UI Components**: Built with shadcn/ui and Radix UI primitives
- **Tailwind CSS**: Utility-first styling with custom design system
- **Accessibility**: ARIA-compliant components and keyboard navigation
- **Performance Optimized**: Fast loading with Next.js optimizations

## 🛠️ Tech Stack

### Frontend Framework
- **Next.js 15.2.4** - React framework with App Router
- **React 19** - UI library with concurrent features
- **TypeScript 5** - Type-safe JavaScript

### UI & Styling
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **shadcn/ui** - Modern component library
- **Radix UI** - Unstyled, accessible UI primitives
- **Lucide React** - Beautiful icon library
- **next-themes** - Theme switching for Next.js

### Form & Validation
- **React Hook Form 7.54.1** - Performant forms with easy validation
- **Zod 3.24.1** - TypeScript-first schema validation

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (version 18.0 or higher) - [Download here](https://nodejs.org/)
- **pnpm** (recommended) or npm - [Install pnpm](https://pnpm.io/installation)
- **Git** - For version control

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/advanced-mcq-quiz.git
   cd advanced-mcq-quiz
   ```

2. **Install dependencies**
   ```bash
   # Using pnpm (recommended)
   pnpm install

   # Or using npm
   npm install
   ```

3. **Start the development server**
   ```bash
   # Using pnpm
   pnpm dev

   # Or using npm
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

## 📖 Usage

### Getting Started
1. **Home Page**: View your progress, achievements, and available quiz sections
2. **Theme Toggle**: Click the sun/moon icon to switch between light and dark themes
3. **Quiz Sections**: Choose from Mathematics, Programming, or General Knowledge

### Taking Quizzes

#### Mathematics Section
- Questions are presented one at a time
- Select your answer and receive immediate feedback
- View detailed explanations for incorrect answers
- Progress through all 10 questions sequentially

#### Programming & General Knowledge Sections
- Answer all questions before submitting
- Review your answers and submit the entire quiz
- View comprehensive results with detailed feedback
- See explanations for all incorrect answers

### Achievements
Unlock badges by achieving specific milestones:
- **Math Whiz**: Score 10/10 in Mathematics
- **Code Master**: Score 10/10 in Programming
- **Knowledge Guru**: Score 10/10 in General Knowledge
- **Quiz Master**: Complete all sections
- **Perfectionist**: Score 30/30 overall

### Progress Persistence
- Your progress is automatically saved to local storage
- Resume quizzes from where you left off
- Reset progress anytime to start fresh

## 📁 Project Structure

```
advanced-mcq-quiz/
├── app/                          # Next.js App Router
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Main quiz application
├── components/                   # Reusable components
│   ├── theme-provider.tsx       # Theme context provider
│   └── ui/                      # shadcn/ui components
│       ├── button.tsx
│       ├── card.tsx
│       ├── progress.tsx
│       └── ... (other UI components)
├── hooks/                       # Custom React hooks
│   ├── use-mobile.tsx
│   └── use-toast.ts
├── lib/                         # Utility functions
│   └── utils.ts
├── public/                      # Static assets
│   ├── placeholder-logo.png
│   ├── placeholder-logo.svg
│   └── ... (other assets)
├── styles/                      # Additional styles
│   └── globals.css
├── .gitignore                   # Git ignore rules
├── components.json              # shadcn/ui configuration
├── next.config.mjs              # Next.js configuration
├── package.json                 # Dependencies and scripts
├── pnpm-lock.yaml               # pnpm lock file
├── postcss.config.mjs           # PostCSS configuration
├── tailwind.config.ts           # Tailwind CSS configuration
└── tsconfig.json                # TypeScript configuration
```

## 📜 Scripts

The following scripts are available in the project:

```bash
# Development
pnpm dev          # Start development server
npm run dev       # Alternative with npm

# Building
pnpm build        # Build for production
npm run build     # Alternative with npm

# Production
pnpm start        # Start production server
npm run start     # Alternative with npm

# Linting
pnpm lint         # Run ESLint
npm run lint      # Alternative with npm
```

## 🎯 Quiz Content

### Mathematics (10 Questions)
- Calculus (derivatives)
- Algebra (equations, factorials)
- Geometry (area, angles)
- Trigonometry (sine, cosine)
- Statistics (mean, median, mode)

### Programming (10 Questions)
- Web Development (DOM, HTML, CSS)
- Data Structures (stacks, queues, arrays)
- Algorithms (time complexity, binary search)
- Databases (SQL, NoSQL)
- Programming Concepts (OOP, APIs)

### General Knowledge (10 Questions)
- Geography (capitals, continents)
- History (World War II, famous events)
- Science (physics, chemistry, biology)
- Arts (famous paintings, literature)
- World Facts (countries, oceans, elements)

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Test your changes**
5. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
6. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

### Development Guidelines
- Use TypeScript for all new code
- Follow the existing code style and conventions
- Add proper TypeScript types
- Test your changes thoroughly
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **shadcn/ui** for the beautiful component library
- **Radix UI** for accessible UI primitives
- **Tailwind CSS** for the styling framework
- **Lucide** for the icon set
- **Next.js** for the amazing React framework

## 📞 Support

If you have any questions or need help:

- Open an issue on GitHub
- Check the documentation
- Review the code comments

---

**Happy quizzing! 🧠✨**
