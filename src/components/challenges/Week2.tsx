"use client";

import { useState } from "react";
import { Button, Card, Input, ErrorMessage } from "@/components/ui";

export default function Week2() {
  const romanToInt = (num: string) => {
    const romanHash = {
      I: 1,
      V: 5,
      X: 10,
      L: 50,
      C: 100,
      D: 500,
      M: 1000,
    };

    if (
      !/^(M{0,3})(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/.test(num)
    ) {
      throw new Error("Invalid Roman numeral format.");
    }

    let result = 0;

    for (let i = 0; i < num.length; i++) {
      const current = romanHash[num[i] as keyof typeof romanHash];
      const next = romanHash[num[i + 1] as keyof typeof romanHash];

      if (current < next) {
        result += next - current;
        i++;
      } else {
        result += current;
      }
    }

    return result;
  };

  // Si se pasa 1627 a la función:

  // Primer ciclo

  // 1. remainder = 1627 / 16 = 101.6875 ⇒ el residuo acá es 11
  // 2. result = "0123456789abcdef"[11] = b
  // 3. num = 1627 / 16 = 101 ya redondeado

  // Segundo ciclo

  // 1. remainder = 101 / 16 = 6.3125 ⇒ el residuo es 5
  // 2. result = "0123456789abcdef"[5] = 5
  // 3. num = 6 redondeado

  // Tercer ciclo

  // 1. remainder = 6 / 16 = 0.375 ⇒ el residuo es 6
  // 2. result = "0123456789abcdef"[6] = 6
  // 3. num = 0

  // Resultado final 65b

  const [input, setInput] = useState("");
  const [output, setOutput] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleConvert = () => {
    setError(null);
    setOutput(null);

    try {
      setOutput(romanToInt(input));
      setInput("");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "An unexpected error occurred");
    }
  };

  return (
    <Card
      title="Week 2: Roman to Integer"
      description="Make a function that converts any Roman number into its integer value."
    >
      <Input
        value={input}
        onChange={(e) => {
          const value = e.target.value.toUpperCase();
          if (/^[IVXLCDM]*$/.test(value)) {
            setInput(value);
          }
        }}
        placeholder="Enter a Roman number"
      />
      <Button onClick={handleConvert}>Convert</Button>

      {output !== null && (
        <div className="bg-indigo-100 text-indigo-800 p-3 rounded-lg font-mono">
          Result: <strong>{output}</strong>
        </div>
      )}

      {error && <ErrorMessage message={error} />}
    </Card>
  );
}
