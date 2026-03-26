import React, { useState, useEffect, useRef } from "react";
import { groups } from "./data";
import Envelope from "./components/Envelope";
import Letter from "./components/Letter";

function App() {
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [isLetterVisible, setIsLetterVisible] = useState(false);

  const inputRef = useRef(null);

  // Sync body classes and handle Escape key
  useEffect(() => {
    const body = document.body;

    if (selectedGroupId) {
      body.classList.add("focus-active");
    } else {
      body.classList.remove("focus-active");
    }

    if (isLetterVisible) {
      body.classList.add("letter-visible");
    } else {
      body.classList.remove("letter-visible");
    }

    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeEverything();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      body.classList.remove("focus-active", "letter-visible");
    };
  }, [selectedGroupId, isLetterVisible]);

  // Focus input when revealed
  useEffect(() => {
    if (isRevealed && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isRevealed]);

  const handleEnvelopeClick = (id) => {
    if (selectedGroupId && selectedGroupId !== id) return;
    setSelectedGroupId(id);
    setTimeout(() => {
      setIsRevealed(true);
    }, 750);
  };

  const closeEverything = () => {
    if (!selectedGroupId && !isLetterVisible) return;
    setIsRevealed(false);
    setTimeout(() => {
      setSelectedGroupId(null);
      setPassword("");
      setError(false);
      setIsLetterVisible(false);
    }, 400);
  };

  const verifyPassword = (id) => {
    const group = groups.find((g) => g.id === id);
    if (password.toLowerCase() === group.motto.toLowerCase()) {
      setIsLetterVisible(true);
    } else {
      setError(true);
      setTimeout(() => setError(false), 400);
    }
  };

  const closeLetter = () => {
    setIsLetterVisible(false);
    setTimeout(closeEverything, 300);
  };

  const selectedGroup = groups.find((g) => g.id === selectedGroupId);

  return (
    <>
      <div
        id="focusBackdrop"
        onClick={closeEverything}
      ></div>

      <header className="text-center pt-24 pb-8 transition-all duration-500">
        <h1 className="text-5xl md:text-7xl font-bold italic mb-4 text-white/95">
          Huy Truong - The ending chapter
        </h1>
        <p className="text-xs md:text-sm uppercase tracking-[0.7em] text-white/40">
          For those who shared the rhythm of this journey
        </p>
      </header>

      <main className="tabletop pt-24">
        {groups.map((group) => (
          <Envelope
            key={group.id}
            group={group}
            isActive={selectedGroupId === group.id}
            isBlurred={selectedGroupId && selectedGroupId !== group.id}
            isRevealed={isRevealed}
            password={password}
            setPassword={setPassword}
            error={error}
            inputRef={inputRef}
            onEnvelopeClick={handleEnvelopeClick}
            onVerify={verifyPassword}
          />
        ))}
      </main>

      <Letter
        group={selectedGroup}
        isVisible={isLetterVisible}
        onClose={closeLetter}
      />
    </>
  );
}

export default App;
