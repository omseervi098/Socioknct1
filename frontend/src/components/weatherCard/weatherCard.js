import { useGeneralContext } from "@/context/generalcontext";
import { faCloudSun, faCloudSunRain } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import Image from "next/image";
export default function WeatherCard() {
  const { state, setLocation } = useGeneralContext();
  const { weather } = state;

  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-white p-3 rounded-lg">
      <div className="flex justify-between w-full ">
        <div className="font-semibold">Weather</div>
        <FontAwesomeIcon icon={faCloudSunRain} className="h-[20px]" />
      </div>

      <div className="flex flex-col items-center justify-center w-full h-full">
        {!weather ? (
          <div>Loading...</div>
        ) : (
          <>
            <div className="flex items-center justify-center">
              <Image
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                width={60}
                height={60}
              />{" "}
              {Math.floor(weather.main.temp - 273.15)}°C
              <Image
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                width={60}
                height={60}
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
