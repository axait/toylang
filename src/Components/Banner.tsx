import bannerVideo from '../assets/TL.mp4'
import { motion } from "motion/react"

const Banner = () => {
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
            className='
            
            '
            >
              <video src={bannerVideo} autoPlay muted playsInline controls={false}></video>
            </div>
            
            <motion.p
            initial={{ opacity: 0, y: 10 }}   // start hidden & shifted left
            animate={{ opacity: 1, y: 0 }}      // fade in & move to original place
            transition={{ duration: 1, ease: "easeOut" }}
            className='
            text-[0.8rem] font-mono
            absolute 
            top-[28%] left-[50%]
            translate-x-[-50%]
            text-center
            '
            >Exploring the beauty of programming and mathematics together.</motion.p>
        </div>
    </>
  )
}

export default Banner
