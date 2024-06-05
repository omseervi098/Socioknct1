export default function InfoCardSkeleton() {
  return (
    <div className="flex flex-col items-center justify-center pb-3 w-full bg-white rounded-lg shadow-lg">
      <div className="flex flex-col items-center justify-center w-full p-3">
        <div className="h-24 w-24 bg-gray-200 rounded-full animate-pulse"></div>
        <div className="h-4 w-20 bg-gray-200 rounded-lg mt-2 animate-pulse"></div>
        <div className="h-4 w-20 bg-gray-200 rounded-lg mt-2 animate-pulse"></div>
        <div className="h-4 w-20 bg-gray-200 rounded-lg mt-2 animate-pulse"></div>
        <div className="h-4 w-20 bg-gray-200 rounded-lg mt-2 animate-pulse"></div>
      </div>
      <div className="flex flex-col gap-3 items-center justify-center w-full mt-4 px-7">
        <div className="h-8 w-32 bg-gray-200 rounded-lg animate-pulse"></div>
        <div className="h-8 w-32 bg-gray-200 rounded-lg animate-pulse"></div>
        <div className="h-8 w-32 bg-gray-200 rounded-lg animate-pulse"></div>
        <div className="h-8 w-32 bg-gray-200 rounded-lg animate-pulse"></div>
      </div>
    </div>
  );
}
