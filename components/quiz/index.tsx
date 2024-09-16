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

interface QuizQuestion {
  correctAnswer: string;
  question: string;
  options: string[];
}

interface QuizComponentProps {
  quizQuestions: QuizQuestion[];
  timeLimit: number;
  // retryQuiz: () => void;
}

const QuizComponent: React.FC<QuizComponentProps> = ({
  quizQuestions,
  timeLimit,
  // retryQuiz
}) => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(timeLimit);

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

  const calculateScore = (): number => {
    return answers.reduce((score, answer, index) => {
      return answer === quizQuestions[index]?.correctAnswer ? score + 1 : score;
    }, 0);
  };

  const progressPercentage = (timeLeft / timeLimit) * 100;

  const getTimeClass = (timeLeft: number, totalTime: number): string => {
    const percentageRemaining = (timeLeft / totalTime) * 100;
    
    if (percentageRemaining < 10) return '-red-500';
    if (percentageRemaining < 25) return '-yellow-500';
    return '-green-500';
  };

  return (
    <Card className="w-full md:w-1/2 lg:w-1/2 bg-white max-h-[calc(100vh-50px)] overflow-y-auto overflow-x-hidden">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          {!showResults ? "Quiz Time!" : "Quiz Results"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!showResults && (
          <>
            <Progress value={progressPercentage} className="mb-4" />
            <p className={`text-center mb-4 text${getTimeClass(timeLeft, timeLimit)}`}>
              Time left:{" "}
              {timeLeft < 60
                ? `${timeLeft} seconds`
                : `${Math.floor(timeLeft / 60)} minutes ${timeLeft % 60} seconds`}
            </p>
          </>
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
                {quizQuestions[currentQuestion]?.question}
              </h2>
              <RadioGroup
                value={answers[currentQuestion] || ''}
                onValueChange={handleAnswer}
                className="space-y-2"
              >
                {quizQuestions[currentQuestion]?.options.map((option, index) => (
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
                    <span className={answers[index] === q.correctAnswer ? "text-green-600" : "text-red-600"}>
                      {answers[index] || "Not answered"}
                    </span>
                  </p>
                  <p className="text-sm text-green-600">
                    Correct answer: {q.correctAnswer}
                  </p>
                </div>
              ))}
              {/* <Button onClick={retryQuiz} className="w-full mt-4">
                Retry
              </Button> */}
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
};

export default QuizComponent;
