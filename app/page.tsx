import AnimatedQuiz from "@/components/quiz";

export default function Home() {
  return (
      <main className="flex justify-center items-center h-[100vh] bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 font-[family-name:var(--font-geist-sans)]">
        <AnimatedQuiz></AnimatedQuiz>
      </main>
  );
}
