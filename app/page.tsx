"use client";

import React, { useState, useEffect, useCallback } from 'react';

interface TypingStats {
  accuracy: number;
  wpm: number;
  mistakes: number;
}

const TypingPractice: React.FC = () => {
  const [text, setText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [stats, setStats] = useState<TypingStats>({ 
    accuracy: 100, 
    wpm: 0, 
    mistakes: 0 
  });
  const [isFinished, setIsFinished] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const practiceTexts = [
    `// Function with type annotations
function add(a: number, b: number): number {
    return a + b;
}

// Testing the function
const result = add(5, 3);`,

    `// React functional component
interface UserProps {
    name: string;
    age: number;
}

const UserProfile: React.FC<UserProps> = ({ name, age }) => {
    return (
        <div className="profile">
            <h2>{name}</h2>
            <p>Age: {age}</p>
        </div>
    );
};`,

    `// Async/await pattern
async function fetchUserData() {
    try {
        const response = await fetch('/api/user');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}`,

    `// Class with TypeScript
class TodoItem {
    private id: string;
    private completed: boolean;

    constructor(public title: string) {
        this.id = Math.random().toString(36);
        this.completed = false;
    }

    toggle(): void {
        this.completed = !this.completed;
    }
}`
  ];

  const generateText = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * practiceTexts.length);
    return practiceTexts[randomIndex];
  }, []);

  useEffect(() => {
    setText(generateText());
  }, [generateText]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserInput(value);

    if (!startTime && value.length === 1) {
      setStartTime(Date.now());
    }

    const mistakes = calculateMistakes(text.substring(0, value.length), value);
    const accuracy = calculateAccuracy(text.substring(0, value.length), value);
    
    setStats(prev => ({ 
      ...prev, 
      accuracy,
      mistakes 
    }));

    setCurrentIndex(value.length);

    if (value.length === text.length) {
      setIsFinished(true);
      calculateFinalStats();
    }
  };

  const calculateMistakes = (original: string, typed: string): number => {
    let mistakes = 0;
    for (let i = 0; i < typed.length; i++) {
      if (typed[i] !== original[i]) mistakes++;
    }
    return mistakes;
  };

  const calculateAccuracy = (original: string, typed: string): number => {
    if (typed.length === 0) return 100;
    const mistakes = calculateMistakes(original, typed);
    return Math.round(((typed.length - mistakes) / typed.length) * 100);
  };

  const calculateFinalStats = () => {
    if (!startTime) return;
    
    const timeElapsed = (Date.now() - startTime) / 1000;
    const words = text.length / 5; // Standard word length approximation
    const wpm = Math.round((words / timeElapsed) * 60);
    setStats(prev => ({ ...prev, wpm }));
  };

  const resetPractice = () => {
    setText(generateText());
    setUserInput('');
    setStartTime(null);
    setStats({ accuracy: 100, wpm: 0, mistakes: 0 });
    setIsFinished(false);
    setCurrentIndex(0);
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-8 text-gray-800">Typing Practice</h1>
      
      <div className="mb-8 p-4 bg-gray-50 rounded-lg font-mono">
        {text.split('').map((char, index) => (
          <span
            key={index}
            className={`${
              index === currentIndex
                ? 'bg-blue-200'
                : index < currentIndex
                ? userInput[index] === char
                  ? 'text-green-600'
                  : 'text-red-600'
                : 'text-gray-800'
            }`}
          >
            {char}
          </span>
        ))}
      </div>

      <input
        type="text"
        value={userInput}
        onChange={handleInput}
        className="w-full p-4 border-2 border-gray-200 rounded-lg font-mono focus:outline-none focus:border-blue-500"
        placeholder="Start typing..."
        disabled={isFinished}
      />

      <div className="mt-6 grid grid-cols-3 gap-4 text-center">
        <div className="p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">Accuracy</p>
          <p className="text-xl font-bold text-gray-800">{stats.accuracy}%</p>
        </div>
        <div className="p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">WPM</p>
          <p className="text-xl font-bold text-gray-800">{stats.wpm}</p>
        </div>
        <div className="p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">Mistakes</p>
          <p className="text-xl font-bold text-gray-800">{stats.mistakes}</p>
        </div>
      </div>

      {isFinished && (
        <button
          onClick={resetPractice}
          className="mt-6 w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  );  // React functional component
  interface UserProps {
    name: string;
    age: number;
  }
  
  const UserProfile: React.FC<UserProps> = ({ name, age }) => {
    return (
      <div className="profile">
        <h2>{name}</h2>
        <p>Age: {age}</p>
      </div>
    );
  };
};

export default TypingPractice;


