'use client';

import { useEffect, useState } from "react";

export default function Greeting() {
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const greetings = [
      "console.log('Hello, Developer! 👋');",
      "// Time to write some awesome code!",
      "function today() { return 'amazing'; }",
      "// Welcome to SyntaxRush! 🚀",
    ];
    setGreeting(greetings[Math.floor(Math.random() * greetings.length)]);
  }, []);

  return (
    <div className="p-4 bg-gray-900 text-amber-400 font-mono">
      <code>{greeting}</code>
    </div>
  );
}