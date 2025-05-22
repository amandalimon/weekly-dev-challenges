"use client";

import { useState } from "react";
import { Card, Input, Button, ErrorMessage } from "@/components/ui";

export default function Week3() {
  const isBinaryMultipleOf5 = (binary: string) => {
    if (typeof binary !== "string" || !/^[01]+$/.test(binary)) {
      throw new Error("Please enter a valid binary number.");
    }

    let decimal = 0;
    for (let i = 0; i < binary.length; i++) {
      decimal = decimal * 2 + (binary[i] === "1" ? 1 : 0);

      // output: 101
      // decimal = 0 * 2 + (101[1] === '1' ? 1 : 0)
      // decimal = 0 + (1 === '1' ? : 0)
      // decimal = 1Please enter a valid binary number using only 0s and 1s

      // decimal = 1 * 2 + (101[2] === '1' ? : 0)
      // decimal = 2 + (0 === '1' ? : 0)
      // decimal = 2 + 0

      // decimal = 2 * 2 + (101[3] === '1' ? : 0)
      // decimal = 4 + (1 === '1' ? : 0)
      // decimal = 4 + 1
    }

    return decimal % 5 === 0; // la comparación === produce un booleano
  };

  const [input, setInput] = useState("");
  const [output, setOutput] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCheck = () => {
    setError(null);
    setOutput(null);
    try {
      const decimal = parseInt(input, 2);
      const isMultiple = isBinaryMultipleOf5(input);
      const message = `${input} (${decimal}) is ${isMultiple ? "" : "not "}a multiple of 5.`;
      setOutput(message);
      setInput("");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "An unexpected error occurred");
    }
  };

  return (
    <Card
      title="Week 3: Binary Multiple of 5"
      description="Make a function that receives a binary number and validates if its a multiple of 5"
    >
      <Input
        value={input}
        onChange={(e) => {
          const value = e.target.value;
          if (/^[01]*$/.test(value)) {
            setInput(value);
          }
        }}
        placeholder="Enter a binary number"
      />
      <Button onClick={handleCheck}>Check</Button>

      {output && (
        <div className="bg-indigo-100 text-indigo-800 p-3 rounded-lg font-mono">
          {output}
        </div>
      )}

      {error && <ErrorMessage message={error} />}
    </Card>
  );
}
