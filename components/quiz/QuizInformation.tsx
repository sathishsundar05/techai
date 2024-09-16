"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import QuizInformationSkeleton from "@/components/ui/skeletons/QuizInformationSkeleton"

interface QuizInformationProps {
    isLoading: boolean;
    timeLeft: number;
    totalQuestions: number;
  onButtonClick: () => void;
}

const QuizInformation: React.FC<QuizInformationProps> = ({isLoading, timeLeft, totalQuestions, onButtonClick}) => {
  return (
    <>
    {isLoading && (<QuizInformationSkeleton></QuizInformationSkeleton>)}
    {!isLoading && (<Card className="w-full md:w-1/2 lg:w-1/2 bg-white max-h-[calc(100vh-50px)] overflow-y-auto overflow-x-hidden">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Get ready
        </CardTitle>
      </CardHeader>
      <CardContent>
        <h1 className="text-xl font-bold text-gray-800 mb-4">
          Welcome to the Quiz!
        </h1>
        <p className="text-gray-600 mb-6">
          Test your knowledge and challenge yourself. Answer the questions
          within the time limit and aim for the top score. Once you start,
          there’s no turning back!
        </p>
        <ul className="text-left text-gray-700 mb-6">
          <li className="mb-2">
            <span className="font-semibold pr-2">Total Questions:</span>{totalQuestions}
          </li>
          <li className="mb-2">
            <span className="font-semibold pr-2">Time Limit:</span>{timeLeft / 60} Minutes
          </li>
        </ul>
      </CardContent>
      <CardFooter>
        <Button onClick={onButtonClick} className="w-full">
          Start Quiz
        </Button>
      </CardFooter>
    </Card>)}
    </>
  );
}

export default QuizInformation;