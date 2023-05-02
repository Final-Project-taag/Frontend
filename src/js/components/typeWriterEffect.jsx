import React, { useState, useEffect } from "react";

const Typewriter = ({ text }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showBlinker, setShowBlinker] = useState(false)
  useEffect(() => {
    setShowBlinker(true)
    const intervalId = setInterval(() => {
      
      setDisplayText((prevText) => {
        return prevText + text[currentIndex];
      });
      if (currentIndex === text.length - 1) {
        clearInterval(intervalId);
        setShowBlinker(false)
        return;
      }
      setCurrentIndex(currentIndex + 1);
    }, 40);

    return () => {clearInterval(intervalId)
       } ;
  }, [currentIndex]);
  return (
    <div className=" typewriter  w-11/12 pt-6 h-40">
      <h2 className="typing m-auto tracking-widest">{displayText} {showBlinker ? (<span className="blink-caret text-orange-600">|</span>): null} </h2>
    </div>
  );
};

export default Typewriter;