import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleAuthSuccess } from "../../services/authHandler";

export default function Authenticate() {
  const navigate = useNavigate()
  useEffect(() => {
    console.log(window.location.href);

    const authCodeRegex = /code=([^&]+)/;
    const isMatch = window.location.href.match(authCodeRegex);

    if (isMatch) {
      const authCode = isMatch[1];

      fetch(
        `http://localhost:8888/api/v1/jobmate/auth/outbound/authentication?code=${authCode}`,
        {
          method: "POST",
        }
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          const responseData = data?.data;
          const token = responseData?.token;

          // Lưu toàn bộ response vào localStorage để UserPage có thể check
          if (responseData) {
            localStorage.setItem('authResponse', JSON.stringify(responseData));
          }

          handleAuthSuccess(token, navigate);
        });
    }
  }, []);

  return (
    <div className="flex flex-col gap-8 justify-center items-center h-screen bg-gradient-to-br from-blue-500/5 via-gray-50 to-purple-500/5">
      {/* Loading Spinner */}
      <div className="relative">
        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
      </div>

      {/* Loading Text */}
      <p className="text-lg text-gray-700 font-medium">Authenticating...</p>
    </div>
  )
}