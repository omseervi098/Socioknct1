import { useGeneralContext } from "@/context/generalcontext";
import { faCloudSun, faCloudSunRain } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import Image from "next/image";
export default function WeatherCard() {
  const { weather, setLocation } = useGeneralContext();

  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-white p-3 rounded-lg shadow-lg">
      <div className="flex justify-between w-full ">
        <div className="font-semibold">Weather</div>
        <FontAwesomeIcon icon={faCloudSunRain} className="h-[20px]" />
      </div>
      <div className="flex flex-col items-center justify-center w-full h-full">
        {!weather ? (
          <div role="status" className="animate-pulse">
            <div className="flex items-center justify-center mt-4">
              <svg
                className="w-10 h-10 text-slate-400 dark:text-gray-600"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 18"
              >
                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
              </svg>
              <div className="w-10 h-2.5 bg-slate-400 rounded-full dark:bg-gray-700 me-3 ms-3"></div>
              <svg
                className="w-10 h-10 text-slate-400 dark:text-gray-600"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 18"
              >
                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
              </svg>
            </div>
            <div className="h-2.5 bg-slate-400 rounded-full dark:bg-gray-700 w-20 mb-2.5 mt-2 mx-auto"></div>
            <div className="h-2.5 mx-auto bg-slate-400 rounded-full dark:bg-gray-700 max-w-[540px]"></div>
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-center">
              <Image
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                width={60}
                height={60}
                alt={weather.weather[0].description}
              />{" "}
              {Math.floor(weather.main.temp - 273.15)}°C
              <Image
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                width={60}
                height={60}
                alt={weather.weather[0].description}
              />
            </div>

            <small className="font-semibold">{weather.weather[0].main}</small>
            <small>
              {weather.name}, {weather.sys.country}
            </small>
          </>
        )}
      </div>
    </div>
  );
}
