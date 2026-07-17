import React, { useState, useEffect } from 'react';
import { RefreshCw, Zap } from 'lucide-react';

const EMOJIS = ['🚀', '🍕', '🎮', '💡', '🌈', '🔥', '🐶', '🍕', '🚀', '🎮', '💡', '🌈', '🔥', '🐶'];

export default function App() {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [isLocked, setIsLocked] = useState(false);

  const initializeGame = () => {
    const shuffled = [...EMOJIS].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setFlipped([]);
    setSolved([]);
  };

  useEffect(() => { initializeGame(); }, []);

  const handleCardClick = (index) => {
    if (isLocked || flipped.includes(index) || solved.includes(index)) return;
    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);
    if (newFlipped.length === 2) {
      setIsLocked(true);
      if (cards[newFlipped[0]] === cards[newFlipped[1]]) {
        setSolved((prev) => [...prev, ...newFlipped]);
        setIsLocked(false);
        setFlipped([]);
      } else {
        setTimeout(() => { setFlipped([]); setIsLocked(false); }, 1000);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex flex-col items-center justify-center p-4 font-sans">
      <header className="mb-8 flex items-center gap-3">
        <Zap className="text-yellow-400 w-10 h-10" />
        <h1 className="text-4xl font-bold tracking-tight">Emoji Match</h1>
      </header>
      <div className="grid grid-cols-4 gap-4 w-full max-w-sm">
        {cards.map((emoji, index) => (
          <button
            key={index}
            onClick={() => handleCardClick(index)}
            className={`aspect-square flex items-center justify-center text-3xl md:text-4xl rounded-2xl transition-all duration-300 shadow-xl 
              ${flipped.includes(index) || solved.includes(index) ? 'bg-white' : 'bg-indigo-600 hover:bg-indigo-500'}`}
          >
            {flipped.includes(index) || solved.includes(index) ? emoji : '?'}
          </button>
        ))}
      </div>
      <button onClick={initializeGame} className="mt-10 flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg">
        <RefreshCw size={20} /> Restart
      </button>
    </div>
  );
}