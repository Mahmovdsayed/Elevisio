'use client'

import { motion } from "framer-motion"

const NoiseLayer = ({
    speedX,
    speedY,
    size,
    opacity
}: {
    speedX: number
    speedY: number
    size: number
    opacity: number
}) => {
    return (
        <motion.div
            className="absolute inset-0 w-full h-full bg-repeat pointer-events-none z-40"
            style={{
                backgroundImage: "url(https://assets.aceternity.com/noise.webp)",
                backgroundSize: `${size}px ${size}px`,
                opacity: opacity,
            }}
            animate={{
                backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{
                duration: 10 / Math.max(Math.abs(speedX), Math.abs(speedY)),
                repeat: Infinity,
                ease: "linear",
            }}
        />
    )
}

const Noise = () => {
    return (
        <>
            <NoiseLayer
                speedX={1}
                speedY={0}
                size={150}
                opacity={0.02}
            />

            <NoiseLayer
                speedX={0}
                speedY={1.2}
                size={200}
                opacity={0.015}
            />

            <NoiseLayer
                speedX={0.7}
                speedY={0.7}
                size={180}
                opacity={0.01}
            />
        </>
    )
}

export default Noise