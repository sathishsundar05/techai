const QuizInformationSkeleton = () => {
  return (
    <div className="w-full md:w-1/2 lg:w-1/2 bg-white max-h-[calc(100vh-50px)] overflow-y-auto overflow-x-hidden p-4">
      <div className="animate-pulse flex flex-col space-y-4">
        <div className="bg-gray-200 h-8 w-3/4 mx-auto rounded"></div>

        <div className="space-y-4">
          <div className="bg-gray-200 h-6 w-1/2 rounded"></div>
          <div className="bg-gray-200 h-4 w-full rounded"></div>
          <div className="bg-gray-200 h-4 w-3/4 rounded"></div>
          <div className="bg-gray-200 h-4 w-1/2 rounded"></div>
        </div>

        <div className="bg-gray-200 h-10 w-full rounded"></div>
      </div>
    </div>
  );
};

export default QuizInformationSkeleton;
