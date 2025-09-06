import React, { useEffect, useState } from 'react'
import './Confetti.css'

const Confetti = ({ isActive, onComplete }) => {
    const [particles, setParticles] = useState([])

    useEffect(() => {
        if (isActive) {
            // Create confetti particles immediately
            const newParticles = []
            const colors = ['#d3a510', '#f4c430', '#ffe4a1', '#ccb069', '#b7870f']

            // Create some particles that start immediately (no delay)
            for (let i = 0; i < 15; i++) {
                newParticles.push({
                    id: i,
                    x: Math.random() * 100, // percentage of screen width
                    y: -10, // start above screen
                    color: colors[Math.floor(Math.random() * colors.length)],
                    size: Math.random() * 8 + 4, // 4-12px
                    rotation: Math.random() * 360,
                    rotationSpeed: (Math.random() - 0.5) * 10,
                    fallSpeed: Math.random() * 3 + 2, // 2-5
                    delay: 0 // No delay for immediate start
                })
            }
            
            // Create remaining particles with minimal delay
            for (let i = 15; i < 50; i++) {
                newParticles.push({
                    id: i,
                    x: Math.random() * 100, // percentage of screen width
                    y: -10, // start above screen
                    color: colors[Math.floor(Math.random() * colors.length)],
                    size: Math.random() * 8 + 4, // 4-12px
                    rotation: Math.random() * 360,
                    rotationSpeed: (Math.random() - 0.5) * 10,
                    fallSpeed: Math.random() * 3 + 2, // 2-5
                    delay: Math.random() * 0.1 // Very minimal delay 0-0.1s
                })
            }

            setParticles(newParticles)

            // Auto-complete after animation duration
            const timer = setTimeout(() => {
                if (onComplete) onComplete()
            }, 7000)

            return () => clearTimeout(timer)
        } else {
            setParticles([])
        }
    }, [isActive, onComplete])

    if (!isActive || particles.length === 0) return null

    return (
        <div className="confetti-container">
            {particles.map(particle => (
                <div
                    key={particle.id}
                    className="confetti-particle"
                    style={{
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                        backgroundColor: particle.color,
                        width: `${particle.size}px`,
                        height: `${particle.size}px`,
                        transform: `rotate(${particle.rotation}deg)`,
                        animationDelay: `${particle.delay}s`,
                        animationDuration: `${particle.fallSpeed}s`
                    }}
                />
            ))}
        </div>
    )
}

export default Confetti
