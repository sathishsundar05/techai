"use client";

import QuizComponent from "@/components/quiz/";
import QuizInformation from "@/components/quiz/QuizInformation"
import { useState, useRef, useEffect } from "react";

export default function Home() {
  const [startQuizToggle, SetStartQuizToggle] = useState(false);
  const QUIZ_TIME = useRef(60);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [timeLeft, setTimeLeft] = useState(QUIZ_TIME.current);
  const [isFetching, setIsFetching] = useState(true);

  const startQuiz = () => {
    SetStartQuizToggle(true);
  }

  const getQuestionConfig = async () => {
    try {
      const response = await fetch("https://skillades.com/qna_config.json");

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setQuizQuestions(data.qna);
      QUIZ_TIME.current = data.timelimit;
      setTimeLeft(data.timelimit);
      setIsFetching(false);
    } catch (error) {
      console.error("Error fetching the Config:", error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    getQuestionConfig();
  }, [])

  return (
    <main className="flex justify-center px-4 items-center h-[100vh] bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 font-[family-name:var(--font-geist-sans)]">
      {startQuizToggle && (<QuizComponent quizQuestions={quizQuestions} timeLimit={timeLeft}></QuizComponent>)}
      {!startQuizToggle && (<QuizInformation isLoading={isFetching} timeLeft={timeLeft} totalQuestions={quizQuestions.length} onButtonClick={startQuiz}></QuizInformation>)}
    </main>
  );
}
