export default function PostSkeleton() {
  return (
    <div className="flex flex-col items-center justify-center w-full overflow-hidden h-full px-0 sm:px-1 lg:px-4 gap-4">
      <div className="bg-white rounded-lg shadow-lg w-full px-2 sm:px-4 py-2">
        <div
          role="status"
          className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 flex flex-col  items-center justify-center"
        >
          <div className=" pb-2 pt-1 w-full flex flex-col justify-between gap-2">
            <div className="w-full flex flex-row gap-2">
              <div className="flex flex-row items-center gap-2">
                <svg
                  className="w-12 h-auto rounded-full text-slate-400 dark:text-gray-600"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 18"
                >
                  <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                </svg>
              </div>
              <div className="gap-1 w-full flex flex-col justify-center">
                <div className="h-2 bg-slate-400 rounded-full  w-full"></div>
                <div className="h-2 bg-slate-400 rounded-full   w-full"></div>
                <div className="h-2 bg-slate-400 rounded-full "></div>
              </div>
              <div className="flex justify-center items-center gap-2">
                <div className="h-6 bg-slate-400 rounded-md w-10"></div>
              </div>
            </div>
            <div className="w-full flex flex-col gap-2 mt-2">
              <div className="gap-1 w-full flex flex-col justify-center">
                <div className="h-2 bg-slate-400 rounded-full  w-full"></div>
                <div className="h-2 bg-slate-400 rounded-full   w-full"></div>
                <div className="h-2 bg-slate-400 rounded-full   w-full"></div>
                <div className="h-2 bg-slate-400 rounded-full  w-[95%]"></div>
                <div className="h-2 bg-slate-400 rounded-full   w-[85%]"></div>
                <div className="h-2 bg-slate-400 rounded-full   w-[90%]"></div>
              </div>
            </div>
            <div className="w-full flex flex-col gap-2 mt-2">
              <div className="gap-1 w-full flex flex-row justify-between">
                <div className="h-2 bg-slate-400 rounded-full  w-[20%]"></div>
                <div className="h-2 bg-slate-400 rounded-full   w-[30%]"></div>
              </div>
            </div>
            <div className="w-full flex flex-col gap-2 mt-2">
              <div className="gap-1 w-full flex flex-row justify-between">
                <div className="gap-1 w-[50%] flex flex-row items-center">
                  <div className="h-6 bg-slate-400 rounded-lg w-[50%] "></div>
                  <div className="h-6 bg-slate-400 rounded-lg  w-[50%]"></div>
                </div>
                <div className="h-6 bg-slate-400 rounded-lg   w-[25%]"></div>
              </div>
            </div>
          </div>

          <span className="sr-only">Loading...</span>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-lg w-full px-2 sm:px-4 py-2">
        <div
          role="status"
          className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 flex flex-col  items-center justify-center"
        >
          <div className=" pb-2 pt-1 w-full flex flex-col justify-between gap-2">
            <div className="w-full flex flex-row gap-2">
              <div className="flex flex-row items-center gap-2">
                <svg
                  className="w-12 h-auto rounded-full text-slate-400 dark:text-gray-600"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 18"
                >
                  <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                </svg>
              </div>
              <div className="gap-1 w-full flex flex-col justify-center">
                <div className="h-2 bg-slate-400 rounded-full  w-full"></div>
                <div className="h-2 bg-slate-400 rounded-full   w-full"></div>
                <div className="h-2 bg-slate-400 rounded-full "></div>
              </div>
              <div className="flex justify-center items-center">
                <div className="h-6 bg-slate-400 rounded-md w-10"></div>
              </div>
            </div>
            <div className="w-full  flex flex-col gap-2 mt-2">
              <div className="gap-1 w-full flex flex-col justify-center">
                <div className="h-2 bg-slate-400 rounded-full  w-full"></div>
                <div className="h-2 bg-slate-400 rounded-full   w-full"></div>
                <div className="h-2 bg-slate-400 rounded-full   w-full"></div>
                <div className="h-2 bg-slate-400 rounded-full  w-[48%]"></div>
              </div>
              <div className="flex flex-row items-center gap-0">
                <div className="w-full h-60 bg-slate-200 flex items-center justify-center rounded-l-lg">
                  <svg
                    className="w-10 h-10 text-slate-400 "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 18"
                  >
                    <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                  </svg>
                </div>
                <div className="w-full h-60 bg-slate-300 flex items-center justify-center rounded-r-lg">
                  <svg
                    className="w-10 h-10 text-slate-400  "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 18"
                  >
                    <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                  </svg>
                </div>
              </div>
              <div className="w-full flex flex-col gap-2 mt-2">
                <div className="gap-1 w-full flex flex-row justify-between">
                  <div className="h-2 bg-slate-400 rounded-full  w-[20%]"></div>
                  <div className="h-2 bg-slate-400 rounded-full   w-[30%]"></div>
                </div>
              </div>
              <div className="w-full flex flex-col gap-2 mt-2">
                <div className="gap-1 w-full flex flex-row justify-between">
                  <div className="gap-1 w-[50%] flex flex-row items-center">
                    <div className="h-6 bg-slate-400 rounded-lg w-[50%] "></div>
                    <div className="h-6 bg-slate-400 rounded-lg  w-[50%]"></div>
                  </div>
                  <div className="h-6 bg-slate-400 rounded-lg   w-[25%]"></div>
                </div>
              </div>
            </div>
          </div>

          <span className="sr-only">Loading...</span>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-lg w-full px-2 sm:px-4 py-2">
        <div
          role="status"
          className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 flex flex-col  items-center justify-center"
        >
          <div className=" pb-2 pt-1 w-full flex flex-col justify-between gap-2">
            <div className="w-full flex flex-row gap-2">
              <div className="flex flex-row items-center gap-2">
                <svg
                  className="w-12 h-auto rounded-full text-slate-400 dark:text-gray-600"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 18"
                >
                  <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                </svg>
              </div>
              <div className="gap-1 w-full flex flex-col justify-center">
                <div className="h-2 bg-slate-400 rounded-full  w-full"></div>
                <div className="h-2 bg-slate-400 rounded-full   w-full"></div>
                <div className="h-2 bg-slate-400 rounded-full "></div>
              </div>
              <div className="flex justify-center items-center gap-2">
                <div className="h-6 bg-slate-400 rounded-md w-10"></div>
              </div>
            </div>
            <div className="w-full flex flex-col gap-2 mt-2">
              <div className="gap-1 w-full flex flex-col justify-center">
                <div className="h-2 bg-slate-400 rounded-full  w-full"></div>
                <div className="h-2 bg-slate-400 rounded-full   w-full"></div>
                <div className="h-2 bg-slate-400 rounded-full   w-[96%]"></div>
                <div className="h-2 bg-slate-400 rounded-full   w-full"></div>
                <div className="h-2 bg-slate-400 rounded-full   w-full"></div>
                <div className="h-2 bg-slate-400 rounded-full   w-[96%]"></div>
                <div className="h-2 bg-slate-400 rounded-full  w-[48%]"></div>
              </div>
            </div>
            <div className="w-full flex flex-col gap-2 mt-2">
              <div className="gap-1 w-full flex flex-row justify-between">
                <div className="h-2 bg-slate-400 rounded-full  w-[20%]"></div>
                <div className="h-2 bg-slate-400 rounded-full   w-[30%]"></div>
              </div>
            </div>
            <div className="w-full flex flex-col gap-2 mt-2">
              <div className="gap-1 w-full flex flex-row justify-between">
                <div className="gap-1 w-[50%] flex flex-row items-center">
                  <div className="h-6 bg-slate-400 rounded-lg w-[50%] "></div>
                  <div className="h-6 bg-slate-400 rounded-lg  w-[50%]"></div>
                </div>
                <div className="h-6 bg-slate-400 rounded-lg   w-[25%]"></div>
              </div>
            </div>
          </div>

          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  );
}
