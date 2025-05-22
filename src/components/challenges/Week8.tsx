"use client";

import { useState } from "react";
import { Card, Input, Button, ErrorMessage } from "@/components/ui";

export default function Week8() {
  const [birthDate, setBirthDate] = useState<string>("");
  const [age, setAge] = useState<{
    years: number;
    months: number;
    days: number;
    minutes: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculateAge = () => {
    if (isNaN(new Date(birthDate).getTime())) {
      setError("Please enter a complete and valid birth date.");
      return;
    }
    // birthDate = "1998-10-15"
    const birth = new Date(birthDate); // convierte la fecha a la zona horaria local
    // console.log (birth)
    // Date Wed Oct 14 1998 19:00:00 GMT-0500 (Central Daylight Time)
    // Los cálculos siguen siendo correctos porque los métodos getFullYear(), getMonth() y getDate() trabajan con en tiempo local
    const now = new Date();

    let years = now.getFullYear() - birth.getFullYear(); // 27
    let months = now.getMonth() - birth.getMonth(); // -8
    let days = now.getDate() - birth.getDate(); // -10

    if (days < 0) {
      months -= 1; // -8 - 1 = -9
      const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0); // obtener el número de días del mes anterior
      // console.log (prevMonth)
      // Date Fri Jan 31 2025 00:00:00 GMT-0600 (Central Standard Time)
      days += prevMonth.getDate(); // -10 + 31 = 21
    }
    if (months < 0) {
      years -= 1; // 27 - 1 = 26
      months += 12; // -9 + 12 = 3
    }

    const minutes = Math.floor((now.getTime() - birth.getTime()) / 60000); // diferencia en milisegundos
    // 1 minuto tiene 60,000 milisegundos

    setAge({ years, months, days, minutes });
  };

  return (
    <Card
      title="Week 8: Age Calculator"
      description="Make a function that calculates the age of a person based on their birth date."
    >
      <Input
        type="date"
        value={birthDate}
        onChange={(e) => {
          const value = e.target.value;
          setBirthDate(value);
          if (value && !isNaN(new Date(value).getTime())) {
            setError(null);
          }
        }}
        placeholder="Enter your birth date"
      />
      <Button onClick={calculateAge}>Calculate</Button>

      {age && (
        <div className="bg-indigo-100 text-indigo-800 p-4 rounded-xl font-mono space-y-2 shadow-sm mt-4">
          <p className="text-lg font-semibold">🎉 You are:</p>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>
              <span className="font-bold">{age.years}</span> years
            </li>
            <li>
              <span className="font-bold">{age.months}</span> months
            </li>
            <li>
              <span className="font-bold">{age.days}</span> days
            </li>
            <li>
              <span className="font-bold">{age.minutes.toLocaleString()}</span>{" "}
              minutes
            </li>
          </ul>
        </div>
      )}

      {error && <ErrorMessage message={error} />}
    </Card>
  );
}
