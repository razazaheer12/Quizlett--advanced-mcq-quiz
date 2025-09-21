"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Moon, Sun, Trophy, Star, Award, Brain, Code, BookOpen, Home } from "lucide-react"

// Theme Context
interface ThemeContextType {
  theme: string
  setTheme: (theme: string) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<string>("light")

  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem("theme") || "light"
    setTheme(savedTheme)

    // Apply theme to document
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [])

  const updateTheme = (newTheme: string) => {
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  return <ThemeContext.Provider value={{ theme, setTheme: updateTheme }}>{children}</ThemeContext.Provider>
}

function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}

// Types
interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

interface UserAnswer {
  questionId: number
  selectedAnswer: number
  isCorrect: boolean
}

interface SectionResult {
  section: string
  score: number
  totalQuestions: number
  answers: UserAnswer[]
}

interface Achievement {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  earned: boolean
}

// Achievement definitions (without React components)
const ACHIEVEMENT_DEFINITIONS = {
  math_whiz: {
    name: "Math Whiz",
    description: "Score 10/10 in Mathematics",
  },
  code_master: {
    name: "Code Master",
    description: "Score 10/10 in Programming",
  },
  knowledge_guru: {
    name: "Knowledge Guru",
    description: "Score 10/10 in General Knowledge",
  },
  quiz_master: {
    name: "Quiz Master",
    description: "Complete all sections",
  },
  perfectionist: {
    name: "Perfectionist",
    description: "Score 30/30 overall",
  },
}

// Quiz Data
const quizData = {
  mathematics: [
    {
      id: 1,
      question: "What is the derivative of x²?",
      options: ["x", "2x", "x²", "2x²"],
      correctAnswer: 1,
      explanation: "The derivative of x² is 2x using the power rule: d/dx(xⁿ) = n·xⁿ⁻¹",
    },
    {
      id: 2,
      question: "What is the value of π (pi) approximately?",
      options: ["3.14159", "2.71828", "1.41421", "1.61803"],
      correctAnswer: 0,
      explanation:
        "π (pi) is approximately 3.14159, representing the ratio of a circle's circumference to its diameter",
    },
    {
      id: 3,
      question: "What is the solution to the equation 2x + 5 = 15?",
      options: ["x = 5", "x = 10", "x = 7.5", "x = 20"],
      correctAnswer: 0,
      explanation: "Solving 2x + 5 = 15: subtract 5 from both sides (2x = 10), then divide by 2 (x = 5)",
    },
    {
      id: 4,
      question: "What is the area of a circle with radius 3?",
      options: ["6π", "9π", "18π", "3π"],
      correctAnswer: 1,
      explanation: "Area of a circle = πr². With radius 3: π × 3² = 9π",
    },
    {
      id: 5,
      question: "What is the square root of 144?",
      options: ["11", "12", "13", "14"],
      correctAnswer: 1,
      explanation: "√144 = 12 because 12 × 12 = 144",
    },
    {
      id: 6,
      question: "What is 7! (7 factorial)?",
      options: ["49", "343", "5040", "720"],
      correctAnswer: 2,
      explanation: "7! = 7 × 6 × 5 × 4 × 3 × 2 × 1 = 5040",
    },
    {
      id: 7,
      question: "What is the slope of the line y = 3x + 2?",
      options: ["2", "3", "5", "1"],
      correctAnswer: 1,
      explanation: "In the equation y = mx + b, m is the slope. Here, m = 3",
    },
    {
      id: 8,
      question: "What is sin(90°)?",
      options: ["0", "1", "0.5", "√3/2"],
      correctAnswer: 1,
      explanation: "sin(90°) = 1. This is a fundamental trigonometric value",
    },
    {
      id: 9,
      question: "What is the sum of interior angles in a triangle?",
      options: ["90°", "180°", "270°", "360°"],
      correctAnswer: 1,
      explanation: "The sum of interior angles in any triangle is always 180°",
    },
    {
      id: 10,
      question: "What is the quadratic formula?",
      options: [
        "x = -b ± √(b² - 4ac) / 2a",
        "x = b ± √(b² + 4ac) / 2a",
        "x = -b ± √(b² + 4ac) / 2a",
        "x = b ± √(b² - 4ac) / 2a",
      ],
      correctAnswer: 0,
      explanation: "The quadratic formula is x = (-b ± √(b² - 4ac)) / 2a for equations of the form ax² + bx + c = 0",
    },
  ],
  programming: [
    {
      id: 11,
      question: "What does 'DOM' stand for in web development?",
      options: ["Document Object Model", "Data Object Management", "Dynamic Object Method", "Document Oriented Model"],
      correctAnswer: 0,
      explanation: "DOM stands for Document Object Model, which represents the structure of HTML documents as objects",
    },
    {
      id: 12,
      question: "Which of these is NOT a JavaScript data type?",
      options: ["String", "Boolean", "Float", "Symbol"],
      correctAnswer: 2,
      explanation: "JavaScript doesn't have a 'Float' data type. Numbers in JavaScript are all of type 'Number'",
    },
    {
      id: 13,
      question: "What is the time complexity of binary search?",
      options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
      correctAnswer: 1,
      explanation:
        "Binary search has O(log n) time complexity because it eliminates half of the search space in each iteration",
    },
    {
      id: 14,
      question: "Which HTTP method is used to update existing data?",
      options: ["GET", "POST", "PUT", "DELETE"],
      correctAnswer: 2,
      explanation: "PUT is typically used to update existing resources, while POST creates new resources",
    },
    {
      id: 15,
      question: "What does 'SQL' stand for?",
      options: [
        "Structured Query Language",
        "Simple Query Language",
        "Standard Query Language",
        "Sequential Query Language",
      ],
      correctAnswer: 0,
      explanation: "SQL stands for Structured Query Language, used for managing relational databases",
    },
    {
      id: 16,
      question: "In object-oriented programming, what is encapsulation?",
      options: [
        "Hiding implementation details",
        "Creating multiple objects",
        "Inheriting from parent class",
        "Overriding methods",
      ],
      correctAnswer: 0,
      explanation:
        "Encapsulation is the principle of hiding internal implementation details and exposing only necessary interfaces",
    },
    {
      id: 17,
      question: "What is the output of console.log(typeof null) in JavaScript?",
      options: ["null", "undefined", "object", "boolean"],
      correctAnswer: 2,
      explanation:
        "This is a known JavaScript quirk: typeof null returns 'object', though null is not actually an object",
    },
    {
      id: 18,
      question: "Which data structure follows LIFO (Last In, First Out)?",
      options: ["Queue", "Stack", "Array", "Linked List"],
      correctAnswer: 1,
      explanation: "Stack follows LIFO principle - the last element added is the first one to be removed",
    },
    {
      id: 19,
      question: "What does 'API' stand for?",
      options: [
        "Application Programming Interface",
        "Automated Program Integration",
        "Advanced Programming Implementation",
        "Application Process Integration",
      ],
      correctAnswer: 0,
      explanation:
        "API stands for Application Programming Interface, which defines how software components communicate",
    },
    {
      id: 20,
      question: "Which of these is a NoSQL database?",
      options: ["MySQL", "PostgreSQL", "MongoDB", "SQLite"],
      correctAnswer: 2,
      explanation: "MongoDB is a NoSQL (document-based) database, while the others are relational (SQL) databases",
    },
  ],
  generalKnowledge: [
    {
      id: 21,
      question: "What is the capital of Australia?",
      options: ["Sydney", "Melbourne", "Canberra", "Perth"],
      correctAnswer: 2,
      explanation: "Canberra is the capital of Australia, though Sydney and Melbourne are larger cities",
    },
    {
      id: 22,
      question: "Who painted the Mona Lisa?",
      options: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Michelangelo"],
      correctAnswer: 1,
      explanation: "Leonardo da Vinci painted the Mona Lisa between 1503-1519, and it's housed in the Louvre Museum",
    },
    {
      id: 23,
      question: "What is the largest planet in our solar system?",
      options: ["Saturn", "Jupiter", "Neptune", "Earth"],
      correctAnswer: 1,
      explanation:
        "Jupiter is the largest planet in our solar system, with a mass greater than all other planets combined",
    },
    {
      id: 24,
      question: "In which year did World War II end?",
      options: ["1944", "1945", "1946", "1947"],
      correctAnswer: 1,
      explanation: "World War II ended in 1945 with Japan's surrender on September 2, 1945",
    },
    {
      id: 25,
      question: "What is the chemical symbol for gold?",
      options: ["Go", "Gd", "Au", "Ag"],
      correctAnswer: 2,
      explanation: "Au is the chemical symbol for gold, derived from the Latin word 'aurum'",
    },
    {
      id: 26,
      question: "Which ocean is the largest?",
      options: ["Atlantic", "Indian", "Arctic", "Pacific"],
      correctAnswer: 3,
      explanation: "The Pacific Ocean is the largest ocean, covering about 46% of the world's water surface",
    },
    {
      id: 27,
      question: "Who wrote 'Romeo and Juliet'?",
      options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
      correctAnswer: 1,
      explanation: "William Shakespeare wrote 'Romeo and Juliet' around 1594-1596",
    },
    {
      id: 28,
      question: "What is the hardest natural substance on Earth?",
      options: ["Gold", "Iron", "Diamond", "Platinum"],
      correctAnswer: 2,
      explanation: "Diamond is the hardest natural substance on Earth, rating 10 on the Mohs hardness scale",
    },
    {
      id: 29,
      question: "How many continents are there?",
      options: ["5", "6", "7", "8"],
      correctAnswer: 2,
      explanation:
        "There are 7 continents: Asia, Africa, North America, South America, Antarctica, Europe, and Australia",
    },
    {
      id: 30,
      question: "What is the smallest country in the world?",
      options: ["Monaco", "Vatican City", "San Marino", "Liechtenstein"],
      correctAnswer: 1,
      explanation: "Vatican City is the smallest country in the world, with an area of just 0.17 square miles",
    },
  ],
}

export default function QuizApp() {
  return (
    <ThemeProvider>
      <QuizAppContent />
    </ThemeProvider>
  )
}

function QuizAppContent() {
  const { theme, setTheme } = useTheme()
  const [currentView, setCurrentView] = useState<"home" | "math" | "programming" | "gk" | "summary">("home")
  const [currentMathQuestion, setCurrentMathQuestion] = useState(0)
  const [showMathFeedback, setShowMathFeedback] = useState(false)
  const [mathFeedback, setMathFeedback] = useState<{ correct: boolean; explanation?: string } | null>(null)
  const [programmingAnswers, setProgrammingAnswers] = useState<{ [key: number]: number }>({})
  const [gkAnswers, setGkAnswers] = useState<{ [key: number]: number }>({})
  const [results, setResults] = useState<SectionResult[]>([])
  const [totalScore, setTotalScore] = useState(0)
  const [earnedAchievements, setEarnedAchievements] = useState<string[]>([])

  // Create achievements with icons
  const achievements: Achievement[] = [
    {
      id: "math_whiz",
      name: ACHIEVEMENT_DEFINITIONS.math_whiz.name,
      description: ACHIEVEMENT_DEFINITIONS.math_whiz.description,
      icon: <Brain className="h-4 w-4" />,
      earned: earnedAchievements.includes("math_whiz"),
    },
    {
      id: "code_master",
      name: ACHIEVEMENT_DEFINITIONS.code_master.name,
      description: ACHIEVEMENT_DEFINITIONS.code_master.description,
      icon: <Code className="h-4 w-4" />,
      earned: earnedAchievements.includes("code_master"),
    },
    {
      id: "knowledge_guru",
      name: ACHIEVEMENT_DEFINITIONS.knowledge_guru.name,
      description: ACHIEVEMENT_DEFINITIONS.knowledge_guru.description,
      icon: <BookOpen className="h-4 w-4" />,
      earned: earnedAchievements.includes("knowledge_guru"),
    },
    {
      id: "quiz_master",
      name: ACHIEVEMENT_DEFINITIONS.quiz_master.name,
      description: ACHIEVEMENT_DEFINITIONS.quiz_master.description,
      icon: <Trophy className="h-4 w-4" />,
      earned: earnedAchievements.includes("quiz_master"),
    },
    {
      id: "perfectionist",
      name: ACHIEVEMENT_DEFINITIONS.perfectionist.name,
      description: ACHIEVEMENT_DEFINITIONS.perfectionist.description,
      icon: <Star className="h-4 w-4" />,
      earned: earnedAchievements.includes("perfectionist"),
    },
  ]

  // Load saved progress
  useEffect(() => {
    const savedProgress = localStorage.getItem("quizProgress")
    if (savedProgress) {
      const progress = JSON.parse(savedProgress)
      setCurrentMathQuestion(progress.currentMathQuestion || 0)
      setProgrammingAnswers(progress.programmingAnswers || {})
      setGkAnswers(progress.gkAnswers || {})
      setResults(progress.results || [])
      setTotalScore(progress.totalScore || 0)
      setEarnedAchievements(progress.earnedAchievements || [])
    }
  }, [])

  // Save progress (without achievements)
  const saveProgress = () => {
    const progress = {
      currentMathQuestion,
      programmingAnswers,
      gkAnswers,
      results,
      totalScore,
      earnedAchievements, // Only save the IDs, not the full objects
    }
    localStorage.setItem("quizProgress", JSON.stringify(progress))
  }

  useEffect(() => {
    saveProgress()
  }, [currentMathQuestion, programmingAnswers, gkAnswers, results, totalScore, earnedAchievements])

  // Check achievements whenever results change
  useEffect(() => {
    if (results.length > 0) {
      checkAchievements()
    }
  }, [results])

  // Check achievements when viewing summary
  useEffect(() => {
    if (currentView === "summary") {
      checkAchievements()
    }
  }, [currentView])

  const handleMathAnswer = (selectedAnswer: number) => {
    const question = quizData.mathematics[currentMathQuestion]
    const isCorrect = selectedAnswer === question.correctAnswer

    setMathFeedback({
      correct: isCorrect,
      explanation: isCorrect ? undefined : question.explanation,
    })
    setShowMathFeedback(true)

    // Update results
    const mathResult = results.find((r) => r.section === "mathematics") || {
      section: "mathematics",
      score: 0,
      totalQuestions: 10,
      answers: [],
    }

    const answerIndex = mathResult.answers.findIndex((a) => a.questionId === question.id)
    const newAnswer: UserAnswer = {
      questionId: question.id,
      selectedAnswer,
      isCorrect,
    }

    if (answerIndex >= 0) {
      mathResult.answers[answerIndex] = newAnswer
    } else {
      mathResult.answers.push(newAnswer)
    }

    mathResult.score = mathResult.answers.filter((a) => a.isCorrect).length

    const newResults = results.filter((r) => r.section !== "mathematics")
    newResults.push(mathResult)
    setResults(newResults)
  }

  const nextMathQuestion = () => {
    setShowMathFeedback(false)
    setMathFeedback(null)
    if (currentMathQuestion < quizData.mathematics.length - 1) {
      setCurrentMathQuestion(currentMathQuestion + 1)
    } else {
      // Math section completed
      checkAchievements()
      setCurrentView("home")
    }
  }

  const submitProgrammingQuiz = () => {
    const answers: UserAnswer[] = []
    let score = 0

    quizData.programming.forEach((question) => {
      const selectedAnswer = programmingAnswers[question.id]
      const isCorrect = selectedAnswer === question.correctAnswer
      if (isCorrect) score++

      answers.push({
        questionId: question.id,
        selectedAnswer: selectedAnswer || -1,
        isCorrect,
      })
    })

    const result: SectionResult = {
      section: "programming",
      score,
      totalQuestions: 10,
      answers,
    }

    const newResults = results.filter((r) => r.section !== "programming")
    newResults.push(result)
    setResults(newResults)
    checkAchievements()
  }

  const submitGKQuiz = () => {
    const answers: UserAnswer[] = []
    let score = 0

    quizData.generalKnowledge.forEach((question) => {
      const selectedAnswer = gkAnswers[question.id]
      const isCorrect = selectedAnswer === question.correctAnswer
      if (isCorrect) score++

      answers.push({
        questionId: question.id,
        selectedAnswer: selectedAnswer || -1,
        isCorrect,
      })
    })

    const result: SectionResult = {
      section: "generalKnowledge",
      score,
      totalQuestions: 10,
      answers,
    }

    const newResults = results.filter((r) => r.section !== "generalKnowledge")
    newResults.push(result)
    setResults(newResults)
    checkAchievements()
  }

  const checkAchievements = () => {
    const newEarnedAchievements = [...earnedAchievements]

    // Check section-specific achievements
    results.forEach((result) => {
      if (result.score === 10) {
        if (result.section === "mathematics" && !newEarnedAchievements.includes("math_whiz")) {
          newEarnedAchievements.push("math_whiz")
        } else if (result.section === "programming" && !newEarnedAchievements.includes("code_master")) {
          newEarnedAchievements.push("code_master")
        } else if (result.section === "generalKnowledge" && !newEarnedAchievements.includes("knowledge_guru")) {
          newEarnedAchievements.push("knowledge_guru")
        }
      }
    })

    // Check quiz master (all sections completed) - Fixed: Check if all sections are completed
    const allSectionsCompleted = results.length === 3 &&
      results.some(r => r.section === "mathematics") &&
      results.some(r => r.section === "programming") &&
      results.some(r => r.section === "generalKnowledge")

    if (allSectionsCompleted && !newEarnedAchievements.includes("quiz_master")) {
      newEarnedAchievements.push("quiz_master")
    }

    // Check perfectionist (30/30)
    const total = results.reduce((sum, result) => sum + result.score, 0)
    if (total === 30 && !newEarnedAchievements.includes("perfectionist")) {
      newEarnedAchievements.push("perfectionist")
    }

    setTotalScore(total)
    setEarnedAchievements(newEarnedAchievements)
  }

  const resetQuiz = () => {
    setCurrentView("home")
    setCurrentMathQuestion(0)
    setShowMathFeedback(false)
    setMathFeedback(null)
    setProgrammingAnswers({})
    setGkAnswers({})
    setResults([])
    setTotalScore(0)
    setEarnedAchievements([])
    localStorage.removeItem("quizProgress")
  }

  const getSectionProgress = (section: string) => {
    if (section === "mathematics") {
      return (currentMathQuestion / quizData.mathematics.length) * 100
    }
    return 0
  }

  const getSectionStatus = (section: string) => {
    const result = results.find((r) => r.section === section)
    if (result) return `Completed: ${result.score}/10`
    if (section === "mathematics" && currentMathQuestion > 0) {
      return `In Progress: ${currentMathQuestion}/10`
    }
    return "Not Started"
  }

  if (currentView === "home") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">Quizlett</h1>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                Test your knowledge across Mathematics, Programming, and General Knowledge
              </p>
            </div>
            <Button variant="outline" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardContent className="p-6 text-center">
                <Trophy className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
                <div className="text-2xl font-bold">{totalScore}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Total Score</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Award className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                <div className="text-2xl font-bold">{achievements.filter((a) => a.earned).length}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Achievements</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Star className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                <div className="text-2xl font-bold">{results.length}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Sections Completed</div>
              </CardContent>
            </Card>
          </div>

          {/* Quiz Sections */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
            {/* Mathematics */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-blue-500" />
                  Mathematics
                </CardTitle>
                <CardDescription>10 questions • One-by-one with instant feedback</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>{getSectionStatus("mathematics")}</span>
                  </div>
                  <Progress value={getSectionProgress("mathematics")} className="h-2" />
                </div>
                <Button
                  onClick={() => setCurrentView("math")}
                  className="w-full"
                  disabled={results.some((r) => r.section === "mathematics")}
                >
                  {results.some((r) => r.section === "mathematics") ? "Completed" : "Start Quiz"}
                </Button>
              </CardContent>
            </Card>

            {/* Programming */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5 text-green-500" />
                  Programming
                </CardTitle>
                <CardDescription>10 questions • Batch submission</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>{getSectionStatus("programming")}</span>
                  </div>
                  <Progress value={results.some((r) => r.section === "programming") ? 100 : 0} className="h-2" />
                </div>
                <Button
                  onClick={() => setCurrentView("programming")}
                  className="w-full"
                  disabled={results.some((r) => r.section === "programming")}
                >
                  {results.some((r) => r.section === "programming") ? "Completed" : "Start Quiz"}
                </Button>
              </CardContent>
            </Card>

            {/* General Knowledge */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-purple-500" />
                  General Knowledge
                </CardTitle>
                <CardDescription>10 questions • Batch submission</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>{getSectionStatus("generalKnowledge")}</span>
                  </div>
                  <Progress value={results.some((r) => r.section === "generalKnowledge") ? 100 : 0} className="h-2" />
                </div>
                <Button
                  onClick={() => setCurrentView("gk")}
                  className="w-full"
                  disabled={results.some((r) => r.section === "generalKnowledge")}
                >
                  {results.some((r) => r.section === "generalKnowledge") ? "Completed" : "Start Quiz"}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Achievements */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Achievements</CardTitle>
              <CardDescription>Unlock badges by completing challenges</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`flex items-center gap-3 p-3 rounded-lg border ${
                      achievement.earned
                        ? "bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800"
                        : "bg-gray-50 border-gray-200 dark:bg-gray-800 dark:border-gray-700"
                    }`}
                  >
                    <div
                      className={`p-2 rounded-full ${
                        achievement.earned
                          ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-800 dark:text-yellow-300"
                          : "bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-500"
                      }`}
                    >
                      {achievement.icon}
                    </div>
                    <div>
                      <div
                        className={`font-medium ${achievement.earned ? "text-yellow-800 dark:text-yellow-200" : "text-gray-600 dark:text-gray-400"}`}
                      >
                        {achievement.name}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{achievement.description}</div>
                    </div>
                    {achievement.earned && (
                      <Badge variant="secondary" className="ml-auto">
                        Earned
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center">
            {results.length === 3 && (
              <Button onClick={() => setCurrentView("summary")} size="lg">
                View Final Summary
              </Button>
            )}
            {(results.length > 0 || currentMathQuestion > 0) && (
              <Button onClick={resetQuiz} variant="outline" size="lg">
                Reset Quiz
              </Button>
            )}
          </div>
        </div>
      </div>
    )
  }

  if (currentView === "math") {
    const question = quizData.mathematics[currentMathQuestion]

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <Button variant="outline" onClick={() => setCurrentView("home")}>
              <Home className="h-4 w-4 mr-2" />
              Home
            </Button>
            <Button variant="outline" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </div>

          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between text-sm mb-2">
              <span className="font-medium">Mathematics Section</span>
              <span>
                {currentMathQuestion + 1} of {quizData.mathematics.length}
              </span>
            </div>
            <Progress value={((currentMathQuestion + 1) / quizData.mathematics.length) * 100} className="h-3" />
          </div>

          {/* Question Card */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Question {currentMathQuestion + 1}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-base sm:text-lg mb-6">{question.question}</p>

              {!showMathFeedback ? (
                <div className="space-y-3">
                  {question.options.map((option, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full text-left justify-start h-auto p-4 bg-transparent text-sm sm:text-base"
                      onClick={() => handleMathAnswer(index)}
                    >
                      <span className="font-medium mr-3">{String.fromCharCode(65 + index)}.</span>
                      {option}
                    </Button>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Feedback */}
                  <div
                    className={`p-4 rounded-lg ${
                      mathFeedback?.correct
                        ? "bg-green-50 border border-green-200 dark:bg-green-900/20 dark:border-green-800"
                        : "bg-red-50 border border-red-200 dark:bg-red-900/20 dark:border-red-800"
                    }`}
                  >
                    <div
                      className={`font-medium ${
                        mathFeedback?.correct ? "text-green-800 dark:text-green-200" : "text-red-800 dark:text-red-200"
                      }`}
                    >
                      {mathFeedback?.correct ? "✓ Correct!" : "✗ Incorrect"}
                    </div>
                    {mathFeedback?.explanation && (
                      <div className="mt-2 text-sm text-red-700 dark:text-red-300">
                        <strong>Explanation:</strong> {mathFeedback.explanation}
                      </div>
                    )}
                  </div>

                  {/* Correct Answer */}
                  <div className="space-y-2">
                    <p className="font-medium">Correct Answer:</p>
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg dark:bg-green-900/20 dark:border-green-800">
                      <span className="font-medium mr-3">{String.fromCharCode(65 + question.correctAnswer)}.</span>
                      {question.options[question.correctAnswer]}
                    </div>
                  </div>

                  <Button onClick={nextMathQuestion} className="w-full h-12 text-base">
                    {currentMathQuestion < quizData.mathematics.length - 1 ? "Next Question" : "Complete Section"}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (currentView === "programming") {
    const programmingResult = results.find((r) => r.section === "programming")

    if (programmingResult) {
      // Show results
      return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 p-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <Button variant="outline" onClick={() => setCurrentView("home")}>
                <Home className="h-4 w-4 mr-2" />
                Home
              </Button>
              <Button variant="outline" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
            </div>

            <Card className="mb-6">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl flex items-center justify-center gap-2">
                  <Code className="h-6 w-6 text-green-500" />
                  Programming Results
                </CardTitle>
                <CardDescription>
                  You scored {programmingResult.score} out of {programmingResult.totalQuestions}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-green-600 dark:text-green-400">
                    {Math.round((programmingResult.score / programmingResult.totalQuestions) * 100)}%
                  </div>
                  <Progress
                    value={(programmingResult.score / programmingResult.totalQuestions) * 100}
                    className="mt-2"
                  />
                </div>

                <div className="space-y-4">
                  {quizData.programming.map((question, index) => {
                    const userAnswer = programmingResult.answers.find((a) => a.questionId === question.id)
                    const isCorrect = userAnswer?.isCorrect || false

                    return (
                      <div
                        key={question.id}
                        className={`p-4 rounded-lg border ${
                          isCorrect
                            ? "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800"
                            : "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${
                              isCorrect ? "bg-green-500 text-white" : "bg-red-500 text-white"
                            }`}
                          >
                            {isCorrect ? "✓" : "✗"}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium mb-2">{question.question}</p>
                            <div className="text-sm space-y-1">
                              <div>
                                <strong>Your answer:</strong>{" "}
                                {userAnswer?.selectedAnswer !== undefined && userAnswer.selectedAnswer >= 0
                                  ? question.options[userAnswer.selectedAnswer]
                                  : "Not answered"}
                              </div>
                              <div>
                                <strong>Correct answer:</strong> {question.options[question.correctAnswer]}
                              </div>
                              {!isCorrect && (
                                <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded dark:bg-blue-900/20 dark:border-blue-800">
                                  <strong>Explanation:</strong> {question.explanation}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 p-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <Button variant="outline" onClick={() => setCurrentView("home")}>
              <Home className="h-4 w-4 mr-2" />
              Home
            </Button>
            <Button variant="outline" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <Code className="h-5 w-5 text-green-500" />
                Programming Section
              </CardTitle>
              <CardDescription>Answer all 10 questions and submit at the end</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {quizData.programming.map((question, index) => (
                  <div key={question.id} className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-3 text-sm sm:text-base">
                      {index + 1}. {question.question}
                    </h3>
                    <div className="space-y-3">
                      {question.options.map((option, optionIndex) => (
                        <label key={optionIndex} className="flex items-center space-x-3 cursor-pointer p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-800">
                          <input
                            type="radio"
                            name={`question-${question.id}`}
                            value={optionIndex}
                            checked={programmingAnswers[question.id] === optionIndex}
                            onChange={() =>
                              setProgrammingAnswers({
                                ...programmingAnswers,
                                [question.id]: optionIndex,
                              })
                            }
                            className="w-5 h-5 sm:w-4 sm:h-4"
                          />
                          <span className="text-sm sm:text-base">
                            {String.fromCharCode(65 + optionIndex)}. {option}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <Button
                  onClick={submitProgrammingQuiz}
                  size="lg"
                  disabled={Object.keys(programmingAnswers).length < quizData.programming.length}
                  className="w-full sm:w-auto h-12 text-base"
                >
                  Submit Programming Quiz
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (currentView === "gk") {
    const gkResult = results.find((r) => r.section === "generalKnowledge")

    if (gkResult) {
      // Show results
      return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-gray-800 p-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <Button variant="outline" onClick={() => setCurrentView("home")}>
                <Home className="h-4 w-4 mr-2" />
                Home
              </Button>
              <Button variant="outline" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
            </div>

            <Card className="mb-6">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl flex items-center justify-center gap-2">
                  <BookOpen className="h-6 w-6 text-purple-500" />
                  General Knowledge Results
                </CardTitle>
                <CardDescription>
                  You scored {gkResult.score} out of {gkResult.totalQuestions}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-purple-600 dark:text-purple-400">
                    {Math.round((gkResult.score / gkResult.totalQuestions) * 100)}%
                  </div>
                  <Progress value={(gkResult.score / gkResult.totalQuestions) * 100} className="mt-2" />
                </div>

                <div className="space-y-4">
                  {quizData.generalKnowledge.map((question, index) => {
                    const userAnswer = gkResult.answers.find((a) => a.questionId === question.id)
                    const isCorrect = userAnswer?.isCorrect || false

                    return (
                      <div
                        key={question.id}
                        className={`p-4 rounded-lg border ${
                          isCorrect
                            ? "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800"
                            : "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${
                              isCorrect ? "bg-green-500 text-white" : "bg-red-500 text-white"
                            }`}
                          >
                            {isCorrect ? "✓" : "✗"}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium mb-2">{question.question}</p>
                            <div className="text-sm space-y-1">
                              <div>
                                <strong>Your answer:</strong>{" "}
                                {userAnswer?.selectedAnswer !== undefined && userAnswer.selectedAnswer >= 0
                                  ? question.options[userAnswer.selectedAnswer]
                                  : "Not answered"}
                              </div>
                              <div>
                                <strong>Correct answer:</strong> {question.options[question.correctAnswer]}
                              </div>
                              {!isCorrect && (
                                <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded dark:bg-blue-900/20 dark:border-blue-800">
                                  <strong>Explanation:</strong> {question.explanation}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-gray-800 p-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <Button variant="outline" onClick={() => setCurrentView("home")}>
              <Home className="h-4 w-4 mr-2" />
              Home
            </Button>
            <Button variant="outline" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <BookOpen className="h-5 w-5 text-purple-500" />
                General Knowledge Section
              </CardTitle>
              <CardDescription>Answer all 10 questions and submit at the end</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {quizData.generalKnowledge.map((question, index) => (
                  <div key={question.id} className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-3 text-sm sm:text-base">
                      {index + 1}. {question.question}
                    </h3>
                    <div className="space-y-3">
                      {question.options.map((option, optionIndex) => (
                        <label key={optionIndex} className="flex items-center space-x-3 cursor-pointer p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-800">
                          <input
                            type="radio"
                            name={`question-${question.id}`}
                            value={optionIndex}
                            checked={gkAnswers[question.id] === optionIndex}
                            onChange={() =>
                              setGkAnswers({
                                ...gkAnswers,
                                [question.id]: optionIndex,
                              })
                            }
                            className="w-5 h-5 sm:w-4 sm:h-4"
                          />
                          <span className="text-sm sm:text-base">
                            {String.fromCharCode(65 + optionIndex)}. {option}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <Button
                  onClick={submitGKQuiz}
                  size="lg"
                  disabled={Object.keys(gkAnswers).length < quizData.generalKnowledge.length}
                  className="w-full sm:w-auto h-12 text-base"
                >
                  Submit General Knowledge Quiz
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (currentView === "summary") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 dark:from-gray-900 dark:to-gray-800 p-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <Button variant="outline" onClick={() => setCurrentView("home")}>
              <Home className="h-4 w-4 mr-2" />
              Home
            </Button>
            <Button variant="outline" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </div>

          {/* Final Summary */}
          <Card className="mb-8">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl sm:text-3xl flex items-center justify-center gap-2">
                <Trophy className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-500" />
                Quiz Complete!
              </CardTitle>
              <CardDescription className="text-base sm:text-lg">Congratulations on completing all sections</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-8">
                <div className="text-4xl sm:text-6xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">{totalScore}/30</div>
                <div className="text-lg sm:text-xl text-gray-600 dark:text-gray-400">
                  Overall Score: {Math.round((totalScore / 30) * 100)}%
                </div>
                <Progress value={(totalScore / 30) * 100} className="mt-4 h-4" />
              </div>

              {/* Section Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
                {results.map((result) => {
                  const sectionInfo = {
                    mathematics: { name: "Mathematics", icon: <Brain className="h-5 w-5" />, color: "blue" },
                    programming: { name: "Programming", icon: <Code className="h-5 w-5" />, color: "green" },
                    generalKnowledge: {
                      name: "General Knowledge",
                      icon: <BookOpen className="h-5 w-5" />,
                      color: "purple",
                    },
                  }[result.section] || { name: result.section, icon: null, color: "gray" }

                  return (
                    <Card key={result.section}>
                      <CardContent className="p-4 sm:p-6 text-center">
                        <div
                          className={`inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full mb-3 ${
                            sectionInfo.color === "blue"
                              ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
                              : sectionInfo.color === "green"
                                ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300"
                                : sectionInfo.color === "purple"
                                  ? "bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300"
                                  : "bg-gray-100 text-gray-600 dark:bg-gray-900 dark:text-gray-300"
                          }`}
                        >
                          {sectionInfo.icon}
                        </div>
                        <h3 className="font-semibold mb-2 text-sm sm:text-base">{sectionInfo.name}</h3>
                        <div className="text-xl sm:text-2xl font-bold mb-1">
                          {result.score}/{result.totalQuestions}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {Math.round((result.score / result.totalQuestions) * 100)}%
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>

              {/* Achievements Earned */}
              <div className="mb-8">
                <h3 className="text-lg sm:text-xl font-semibold mb-4 text-center">Achievements Earned</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {achievements
                    .filter((a) => a.earned)
                    .map((achievement) => (
                      <div
                        key={achievement.id}
                        className="flex items-center gap-3 p-3 sm:p-4 bg-yellow-50 border border-yellow-200 rounded-lg dark:bg-yellow-900/20 dark:border-yellow-800"
                      >
                        <div className="p-2 bg-yellow-100 text-yellow-600 rounded-full dark:bg-yellow-800 dark:text-yellow-300">
                          {achievement.icon}
                        </div>
                        <div>
                          <div className="font-medium text-yellow-800 dark:text-yellow-200 text-sm sm:text-base">{achievement.name}</div>
                          <div className="text-xs text-yellow-600 dark:text-yellow-400">{achievement.description}</div>
                        </div>
                      </div>
                    ))}
                </div>
                {achievements.filter((a) => a.earned).length === 0 && (
                  <p className="text-center text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                    No achievements earned yet. Try again to unlock badges!
                  </p>
                )}
              </div>

              {/* Performance Message */}
              <div className="text-center">
                {totalScore === 30 && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg dark:bg-green-900/20 dark:border-green-800">
                    <h4 className="font-bold text-green-800 dark:text-green-200 mb-2 text-base sm:text-lg">Perfect Score! 🎉</h4>
                    <p className="text-green-700 dark:text-green-300">
                      Outstanding! You've achieved a perfect score across all sections. You're a true quiz master!
                    </p>
                  </div>
                )}
                {totalScore >= 24 && totalScore < 30 && (
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg dark:bg-blue-900/20 dark:border-blue-800">
                    <h4 className="font-bold text-blue-800 dark:text-blue-200 mb-2">Excellent Performance! 🌟</h4>
                    <p className="text-blue-700 dark:text-blue-300">
                      Great job! You've demonstrated strong knowledge across all areas.
                    </p>
                  </div>
                )}
                {totalScore >= 18 && totalScore < 24 && (
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg dark:bg-yellow-900/20 dark:border-yellow-800">
                    <h4 className="font-bold text-yellow-800 dark:text-yellow-200 mb-2">Good Work! 👍</h4>
                    <p className="text-yellow-700 dark:text-yellow-300">
                      Well done! You've shown solid understanding. Keep practicing to improve further.
                    </p>
                  </div>
                )}
                {totalScore < 18 && (
                  <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg dark:bg-orange-900/20 dark:border-orange-800">
                    <h4 className="font-bold text-orange-800 dark:text-orange-200 mb-2">Keep Learning! 📚</h4>
                    <p className="text-orange-700 dark:text-orange-300">
                      Great effort! Review the explanations and try again to improve your score.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center">
            <Button onClick={resetQuiz} size="lg">
              Take Quiz Again
            </Button>
            <Button onClick={() => setCurrentView("home")} variant="outline" size="lg">
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return null
}
