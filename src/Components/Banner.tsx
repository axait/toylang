import bannerVideo from '../assets/TL.mp4'
import bannerFallbackImage from '../assets/TL_fallback.png'
import { motion } from "motion/react"
import { useEffect, useRef, useState } from 'react';
import Typed from 'typed.js';

const Banner = () => {
  const el = useRef(null); // Ref for Typed.js
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [blocked, setBlocked] = useState(false);

  // Typed.js setup
  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: [
        'Fix bugs.',
        'Explore beauty.',
        'Entertain yourself.',
        'Learn always.',
        'Have fun.',
      ],
      typeSpeed: 50,
      backSpeed: 30,
      loop: true,
      shuffle: true,
      smartBackspace: true,
      cursorChar: '┃',
    });

    return () => {
      typed.destroy();
    };
  }, []);

  // Check autoplay
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const tryPlay = async () => {
      try {
        await video.play();
        console.log("✅ Autoplay worked");
      } catch (err) {
        console.warn("❌ Autoplay blocked", err);
        setBlocked(true);
      }
    };

    tryPlay();
  }, []);

  return (
    <div
      className="
        flex flex-col justify-center items-center
        mt-10
        w-[99vw] h-[200px]
      "
    >
      <div
        className="
          w-[300px] h-[100px]
          md:mt-[15px]
          overflow-hidden rounded-xl
        "
      >
        {blocked ? (
          <img
            src={bannerFallbackImage}
            alt="Fallback"
            className="w-full h-full object-cover object-center"
          />
        ) : (
          <video
            ref={videoRef}
            src={bannerVideo}
            autoPlay
            muted
            playsInline
            preload="auto"
            controls={false}
            className="w-full h-full object-cover object-center"
          ></video>
        )}
      </div>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="
          text-[0.8rem] font-mono
          relative 
          mt-[10px]
          md:mt-[25px]
          text-center
        "
      >
        A&nbsp;Language&nbsp;to&nbsp;
        <span ref={el}>Nothing. ┃</span>
      </motion.p>
    </div>
  );
};

export default Banner;
