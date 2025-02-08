"use client";

import { useState, useEffect } from "react";

export default function Week8() {
  const [birthDate, setBirthDate] = useState<string>("");
  const [age, setAge] = useState<{
    years: number;
    months: number;
    days: number;
    minutes: number;
  } | null>(null);

  useEffect(() => {
    if (!birthDate) return;

    const calculateAge = () => {
      const birth = new Date(birthDate);
      const now = new Date();

      let years = now.getFullYear() - birth.getFullYear();
      let months = now.getMonth() - birth.getMonth();
      let days = now.getDate() - birth.getDate();

      if (days < 0) {
        months -= 1;
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += prevMonth.getDate();
      }
      if (months < 0) {
        years -= 1;
        months += 12;
      }

      const minutes = Math.floor((now.getTime() - birth.getTime()) / 60000);

      setAge({ years, months, days, minutes });
    };

    calculateAge();
  }, [birthDate]);

  return (
    <div className="flex flex-col items-center justify-center h-auto w-96 max-w-md rounded-lg bg-gray-50 text-gray-800 p-6 shadow-lg">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-6">
        Age Calculator
      </h1>
      <input
        type="date"
        value={birthDate}        onChange={(e) => setBirthDate(e.target.value)}
        className="p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6 w-full"
      />
      {age && (
        <div className="text-lg bg-white p-6 rounded-lg shadow-md w-full">
          <p className="mb-2 text-gray-700">
            <strong className="font-semibold">Age:</strong> {age.years} years
          </p>
          <p className="mb-2 text-gray-700">
            <strong className="font-semibold">Months:</strong> {age.months}{" "}
            months
          </p>
          <p className="mb-2 text-gray-700">
            <strong className="font-semibold">Days:</strong> {age.days} days
          </p>
          <p className="mb-2 text-gray-700">
            <strong className="font-semibold">Minutes:</strong>{" "}
            {age.minutes.toLocaleString()}
          </p>
        </div>
      )}
    </div>
  );
}
