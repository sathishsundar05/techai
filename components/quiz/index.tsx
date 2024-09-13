"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

const quizQuestions = [
  {
    "question": "What does the <a> tag in HTML stand for?",
    "options": ["Anchor", "Article", "Address", "Align"],
    "correctAnswer": "Anchor"
  },
  {
    "question": "Which HTML attribute specifies an alternate text for an image if the image cannot be displayed?",
    "options": ["src", "title", "alt", "href"],
    "correctAnswer": "alt"
  },
  {
    "question": "How do you create a numbered list in HTML?",
    "options": ["<ul>", "<li>", "<ol>", "<list>"],
    "correctAnswer": "<ol>"
  },
  {
    "question": "Which tag is used to define a table in HTML?",
    "options": ["<table>", "<tab>", "<tbl>", "<tr>"],
    "correctAnswer": "<table>"
  },
  {
    "question": "What is the correct HTML element for inserting a line break?",
    "options": ["<lb>", "<break>", "<br>", "<hr>"],
    "correctAnswer": "<br>"
  },
  {
    "question": "Which CSS property is used to change the background color of an element?",
    "options": ["color", "bgcolor", "background-color", "bg-color"],
    "correctAnswer": "background-color"
  },
  {
    "question": "How do you select an element with the class name 'example' in CSS?",
    "options": [".example", "#example", "example", "*example"],
    "correctAnswer": ".example"
  },
  {
    "question": "What is the default value of the 'position' property in CSS?",
    "options": ["static", "relative", "absolute", "fixed"],
    "correctAnswer": "static"
  },
  {
    "question": "Which CSS property controls the text size?",
    "options": ["font-size", "text-size", "text-font", "font-style"],
    "correctAnswer": "font-size"
  },
  {
    "question": "How do you apply styles to multiple elements using the same CSS rule?",
    "options": ["Separate selectors with a comma", "Use a single selector with multiple classes", "Use multiple <style> tags", "Apply inline styles to each element"],
    "correctAnswer": "Separate selectors with a comma"
  }
];

const QUIZ_TIME = 120;

export default function AnimatedQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(Array(quizQuestions.length).fill(""));
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(QUIZ_TIME);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setShowResults(true);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    return answers.reduce((score, answer, index) => {
      return answer === quizQuestions[index].correctAnswer ? score + 1 : score;
    }, 0);
  };

  const progressPercentage = (timeLeft / QUIZ_TIME) * 100;

  return (
    <Card className="w-1/2 bg-white max-h-[calc(100vh-50px)] overflow-y-auto overflow-x-hidden">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          {!showResults ? "Quiz Time!" : "Quiz Results"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!showResults && (
          <Progress value={progressPercentage} className="mb-4" />
        )}
        {!showResults && (
          <p className="text-center mb-4">Time left: {timeLeft} seconds</p>
        )}
        <AnimatePresence mode="wait">
          {!showResults ? (
            <motion.div
              key={currentQuestion}
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              <h2 className="text-xl font-semibold mb-4">
                {quizQuestions[currentQuestion].question}
              </h2>
              <RadioGroup
                value={answers[currentQuestion]}
                onValueChange={handleAnswer}
                className="space-y-2"
              >
                {quizQuestions[currentQuestion].options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem value={option} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`}>{option}</Label>
                  </div>
                ))}
              </RadioGroup>
            </motion.div>
          ) : (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              <p className="text-lg mb-2">
                Your score: {calculateScore()} / {quizQuestions.length}
              </p>
              {quizQuestions.map((q, index) => (
                <div key={index} className="mb-2">
                  <p className="font-medium">{q.question}</p>
                  <p className="text-sm">
                    Your answer:{" "}
                    <span
                      className={
                        answers[index] === q.correctAnswer
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      {answers[index] || "Not answered"}
                    </span>
                  </p>
                  <p className="text-sm text-green-600">
                    Correct answer: {q.correctAnswer}
                  </p>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
      <CardFooter>
        {!showResults && (
          <Button onClick={handleNext} className="w-full">
            {currentQuestion < quizQuestions.length - 1
              ? "Next Question"
              : "Finish Quiz"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
