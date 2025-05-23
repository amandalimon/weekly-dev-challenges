"use client";

import { useState, useEffect } from "react";
import { Card, Input, Button } from "@/components/ui";

export default function Week5() {
  const [num1, setNum1] = useState<string>("");
  const [num2, setNum2] = useState<string>("");
  const [operator, setOperator] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const MAX_LENGTH = 10;
  // const [result, setResult] = useState<number | null>(null);

  const handleClear = () => {
    setNum1("");
    setNum2("");
    setOperator(null);
    setError(null);
    // setResult(null);
  };

  const calculate = (op: string) => {
    const a = parseFloat(num1);
    const b = parseFloat(num2);

    if (isNaN(a) || isNaN(b)) return;

    let res = 0;
    switch (op) {
      case "+":
        res = a + b;
        break;
      case "-":
        res = a - b;
        break;
      case "*":
        res = a * b;
        break;
      case "/":
        res = b !== 0 ? a / b : NaN;
        break;
    }

    // setResult(res);
    setNum1(res.toString());
    setNum2("");
    setOperator(null);

    if (isNaN(res)) {
      handleClear();
      setError(
        "The operation could not be completed due to an invalid result."
      );
    }
  };

  const handleClick = (value: string) => { 
    if (operator === null) {
      setNum1((prev) => {
        if (prev.length >= MAX_LENGTH) {
          setError("Maximum number length reached.");
          return prev;
        }
        return prev + value;
      });
    } else {
      setNum2((prev) => {
        if (prev.length >= MAX_LENGTH) {
          setError("Maximum number length reached.");
          return prev;
        }
        return prev + value;
      });
    }
  };

  const handleOperator = (op: string) => {
    // Prevent setting an operator if num1 is empty or invalid (like just ".")
    if (num1 === "" || num1 === "." || num2 === ".") return;
    setOperator(op);
  };

  const handleEqual = () => {
    // - an operator must be selected
    // - num2 must not be empty
    // - num2 must not be just a dot (invalid)
    if (operator && num2 !== "" && num2 !== ".") {
      calculate(operator);
    }
  };

  const display = () => {
    if (!num1 && !operator && !num2) return "";
    return `${num1} ${operator ?? ""} ${num2}`;
  };

  const handleDecimal = () => {
    // If no operator is selected, we're editing num1; otherwise, num2.
    const currentNum = operator === null ? num1 : num2;
    
    if (currentNum.includes(".")) return; // prevents multiple decimals in the same number.
    if (currentNum.length >= MAX_LENGTH) {
      setError("Maximum number length reached.");
      return;
    }
    if (operator === null) {
      setNum1((prev) => prev + ".");
    } else {
      setNum2((prev) => prev + ".");
    }
  };

  // useEffect(() => {
  //   console.log("num1", num1);
  //   console.log("num2", num2);
  //   console.log("operator", operator);
  //   console.log("--------------------------------");
  // }, [num1, num2, operator]);

  return (
    <>
      <Card
        title="Week 5: Basic Calculator"
        description="A calculator that performs addition, subtraction, multiplication, and division."
      >
        <div className="grid grid-cols-4 gap-2 mb-4">
          <Input
            placeholder="0"
            className="col-span-3"
            value={display()}
            readOnly
          />
          <Button
            onClick={handleClear}
            className="col-span-1 bg-zinc-800 border border-zinc-700 hover:bg-zinc-700"
          >
            Clear
          </Button>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {[
            "7", "8", "9", "/",
            "4", "5", "6", "*",
            "1", "2", "3", "-", 
            "0", ".", "=", "+",
          ].map((btn) => (
            <Button
              key={btn}
              onClick={() => {
                setError(null);
                if (["+", "-", "*", "/"].includes(btn)) {
                  handleOperator(btn);
                } else if (btn === ".") {
                  handleDecimal();
                } else if (btn === "=") {
                  handleEqual();
                } else {
                  handleClick(btn);
                }
              }}
              className="font-bold text-lg"
            >
              {btn}
            </Button>
          ))}
        </div>
      </Card>
      <div className="min-h-[1.25rem] mt-2">
        <p className="text-sm text-red-500">{error}</p>
      </div>
    </>
  );
}
