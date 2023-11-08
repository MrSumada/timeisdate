import logo from './logo.svg';
import './App.css';
import { useState, useEffect, useRef } from 'react';
import  Party  from 'party-js';

function App() {
  const [message, setMessage] = useState("...");
  const [bgColor, setBgColor] = useState("#94e1b0");
  const confettiContainer = useRef(null);
  const [date, setDate] = useState(10.26);
  const [time, setTime] = useState(10.27)

  const startConfetti = () => {
    if (confettiContainer.current) {
    Party.confetti(confettiContainer.current, {
      count: 100,  // Number of confetti particles
      colors: ['#FF0000', '#00FF00', '#0000FF'],  // Array of confetti colors
    });
    }
  }

  useEffect(() => {
    
    const timer = setInterval(() => {
      const newTime = new Date();
      let newHour = newTime.getHours();
      if (newHour > 12) { newHour = newHour - 12 };
      if (newHour === 0) { newHour = 12};

      const newMonth = newTime.getMonth() + 1;
      const newDay = newTime.getDate();
      setTime((newHour + newTime.getMinutes()/100).toFixed(2))
      setDate((newMonth + newDay/100).toFixed(2))
    }, 1000)

    if (date === time) {
      setMessage("Yup!")
      const interval = setInterval(() => {
        setBgColor("#" + (Math.floor((1 - Math.random()/100)*16777215)).toString(16))
        console.log(bgColor)
      }, 1000)
      startConfetti();

      return () => { clearInterval(interval);}

    } else {
      setMessage("Nope");
    }

    return () => {
      clearInterval(timer)
    };
  })

  useEffect(() => {
    setMessage("...")
  }, [])


  return (
    <div className="App" ref={confettiContainer} style={{backgroundColor: bgColor}}>
      <h1>Is the Time also the Date?</h1>
      <h2>{message}</h2>
      {/* <p>{date}</p>
      <p>{time}</p> */}
    </div>
  );
}

export default App;
