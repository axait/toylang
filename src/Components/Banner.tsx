import bannerVideo from '../assets/TL.mp4'
import { motion } from "motion/react"
import { useEffect, useRef } from 'react';
import Typed from 'typed.js';

const Banner = () => {
  const el = useRef(null); // Ref to attach Typed.js to

  useEffect(() => {
    setTimeout(() => {
      // el.current.innerHTML = '';

      const typed = new Typed(el.current, {
        strings: [
          'Fix bugs. ',
          'Explore beauty.',
          'Entertain yourself.',
          'Learn always.',
          'Have fun.',
        ], // Array of strings to type
        typeSpeed: 50, // Typing speed in milliseconds
        backSpeed: 30, // Backspacing speed in milliseconds
        loop: true, // Loop the animation
        shuffle:true, // will shuffle the strings
        smartBackspace: true, // Enable smart backspacing
        cursorChar: '┃', // Cursor character
        // Add other Typed.js options as needed
      });

      // Cleanup function to destroy Typed.js instance when component unmounts
      return () => {
        typed.destroy();
      };

    }, 2000);
  }, []); // Empty dependency array ensures effect runs only once on mount

  return (
    <>
      <div
        className='
          flex flex-col justify-center items-center
          mt-10
          w-[99vw] h-[200px]
        '
      >
        <div
        className="
        w-[300px] h-[100px]
        md:mt-[15px]
        overflow-hidden rounded-xl
        "
        >
          <video
            src={bannerVideo}
            autoPlay
            muted
            playsInline
            preload="auto"
            controls={false}
            className="w-full h-full object-cover object-center"
          ></video>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className='
            text-[0.8rem] font-mono
            relative 
            mt-[10px] p-[px]
            md:mt-[25px]
            text-center
          '
        >
          A&nbsp;Language&nbsp;to&nbsp;
          <span ref={el}>Nothing. ┃</span>
        </motion.p>
      </div>
    </>
  )
}

export default Banner
