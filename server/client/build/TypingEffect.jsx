import { useEffect, useState } from "react";
const WORDS = ["Productive", "Organized", "Focused", "Efficient", "Inspiring"];

export default function TypingEffect({ className }) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [phase, setPhase] = useState("typing"); // 'typing', 'pause', 'deleting'

  useEffect(() => {
    let timeout;

    if (phase === "typing") {
      if (charCount < WORDS[currentWordIndex].length) {
        timeout = setTimeout(() => setCharCount(c => c + 1), 150);
      } else {
        timeout = setTimeout(() => setPhase("pause"), 1000);
      }
    } else if (phase === "pause") {
      timeout = setTimeout(() => setPhase("deleting"), 1000);
    } else if (phase === "deleting") {
      if (charCount > 0) {
        timeout = setTimeout(() => setCharCount(c => c - 1), 100);
      } else {
        setCurrentWordIndex(i => (i + 1) % WORDS.length);
        setPhase("typing");
      }
    }

    return () => clearTimeout(timeout);
  }, [charCount, phase, currentWordIndex]);

  return (
    <span className={className}>
      {WORDS[currentWordIndex].substring(0, charCount)}
      <span className="cursor">|</span>
    </span>
  );
}
