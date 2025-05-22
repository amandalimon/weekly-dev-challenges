"use client";

import { useState } from "react";
import { Button, Card, ErrorMessage, Input } from "@/components/ui";

export default function Week1() {
  const decimalToHexadecimal = (num: number) => {
    if (!Number.isInteger(num)) {
      throw new Error("The number must be an integer.");
    }

    if (num === 0) {
      return "0";
    }

    const hexChars = "0123456789abcdef";
    let result = "";
    let isNegative = num < 0; // boolean

    if (isNegative) num = Math.abs(num); // absolute number, versión positiva

    while (num > 0) {
      const remainder = num % 16; // module operator!!
      result = hexChars[remainder] + result;
      num = Math.floor(num / 16); // redondear
    }

    return result;
  };

  const [input, setInput] = useState("");
  const [output, setOutput] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleConvert = () => {
    setError(null);
    setOutput(null);

    const parsed = Number(input);
    if (isNaN(parsed)) {
      setError("Please enter a valid number.");
      return;
    }

    try {
      setOutput(decimalToHexadecimal(parsed));
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "An unexpected error occurred");
    }
  };

  return (
    <Card
      title="Week 1: Decimal to Hex"
      description="Make a function that converts any integer number into its hexadecimal value."
    >
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter an integer"
      />
      <Button onClick={handleConvert}>Convert</Button>

      {output !== null && (
        <div className="bg-indigo-100 text-indigo-800 p-3 rounded-lg font-mono">
          Hexadecimal: <strong>{output}</strong>
        </div>
      )}

      {error && <ErrorMessage message={error} />}
    </Card>
  );
}
