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
              className="w-[400px] h-[120px] overflow-hidden rounded-xl"
            >
              <video
                src={bannerVideo}
                autoPlay
                muted
                playsInline
                loop
                controls={false}
                className="w-full h-full object-cover object-center"
              ></video>
            </div>
            
            <motion.p
            initial={{ opacity: 0, y: 10 }}   // start hidden & shifted left
            animate={{ opacity: 1, y: 0 }}      // fade in & move to original place
            transition={{ duration: 1, ease: "easeOut" }}
            className='
            text-[0.8rem] font-mono
            relative 
            mt-2
            text-center
            '

            // top-[28%] left-[50%]
            // translate-x-[-50%]
            >Exploring the beauty of programming and mathematics together.</motion.p>
        </div>
    </>
  )
}

export default Banner
