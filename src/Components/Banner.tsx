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
        <div className="w-[400px] h-[120px] overflow-hidden rounded-xl">
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
            mt-3
            text-center
          '
        >
          Exploring the beauty of programming and mathematics together.
        </motion.p>
      </div>
    </>
  )
}

export default Banner
