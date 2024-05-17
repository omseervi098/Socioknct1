import { faUserFriends, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect } from "react";
export default function SuggestionsCard() {
  const [suggestions, setSuggestions] = React.useState([]);
  useEffect(() => {
    async function loadSuggestions() {
      try {
        const res = await axios.get(
          process.env.NEXT_PUBLIC_BACKEND_URL + "/api/v1/user/suggested-users",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setSuggestions(res.data.suggestedUsers);
        console.log("Suggestions Loaded", res.data);
      } catch (err) {
        console.log(err);
      }
    }
    loadSuggestions();
  }, []);
  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-white rounded-lg p-3 shadow-lg gap-2">
      <div className="flex justify-between w-full">
        <div className="font-semibold text-md">Suggestions</div>
        <FontAwesomeIcon icon={faUserFriends} />
      </div>
      <div className="flex flex-col items-center justify-center w-full h-full gap-3">
        {suggestions.map((suggestion, index) => (
          <div
            className="relative  flex items-center justify-between w-full"
            key={index}
          >
            <img
              src={suggestion.background}
              alt="background"
              className="rounded-lg h-14 object-cover filter blur-xs w-full brightness-75"
            />
            <div className="absolute w-full flex items-center justify-between gap-2 p-2">
              <div className="flex items-center gap-2 justify-start">
                <img
                  src={suggestion.avatar}
                  alt="avatar"
                  className="w-8 h-8 rounded-full"
                />
                <div className="font-semibold text-white text-sm">
                  {suggestion.name}
                </div>
              </div>
              <button className="bg-blue-500 text-white rounded-lg p-1">
                <FontAwesomeIcon icon={faUserPlus} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
