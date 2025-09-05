import React, { useEffect, useState } from 'react'
import './MiningCompletionAnimation.css'

const MiningCompletionAnimation = ({ isVisible, onClose, miningResults }) => {
    const [isCollecting, setIsCollecting] = useState(false)
    const [isDone, setIsDone] = useState(false)

    // Default mining results if none provided
    const defaultResults = {
        primaryToken: { symbol: 'VERSE', amount: '22,000' },
        secondaryTokens: [
            { symbol: 'tBTC', amount: '0.15' },
            { symbol: 'POL', amount: '450' },
            { symbol: 'DAI', amount: '1,200' }
        ]
    }

    const results = miningResults || defaultResults

    // Add/remove body class to hide sidebar when modal is shown
    useEffect(() => {
        if (isVisible) {
            document.body.classList.add('mining-completion-active')
        } else {
            document.body.classList.remove('mining-completion-active')
        }

        // Cleanup function to remove class when component unmounts
        return () => {
            document.body.classList.remove('mining-completion-active')
        }
    }, [isVisible])

    // Reset states when modal becomes visible
    useEffect(() => {
        if (isVisible) {
            setIsCollecting(false)
            setIsDone(false)
        }
    }, [isVisible])

    const handleCollect = () => {
        setIsCollecting(true)

        // Simulate collection transaction
        setTimeout(() => {
            setIsCollecting(false)
            setIsDone(true)
        }, 2000)
    }

    const handleDone = () => {
        setIsCollecting(false)
        setIsDone(false)
        onClose()
    }

    // Prevent closing modal by clicking overlay
    const handleOverlayClick = (e) => {
        e.stopPropagation()
    }

    if (!isVisible) return null

    return (
        <div className="mining-completion-overlay" onClick={handleOverlayClick}>
            <div className="mining-completion-container" onClick={handleOverlayClick}>
                <svg width="200" height="200" viewBox="0 0 200 200" className="mining-animation">
                    {/* Background circle */}
                    <circle cx="100" cy="100" r="80" fill="#414141" stroke="#d3a510" strokeWidth="2" />

                    {/* Animated gradient stop */}
                    <defs>
                        <radialGradient id="umbralGradient" cx="50%" cy="50%" r="50%">
                            <stop id="animatedStop" offset="0%" stopColor="#d3a5102e" />
                            <stop offset="100%" stopColor="rgba(211, 165, 16, 0.1)" />
                        </radialGradient>
                    </defs>

                    {/* Main mining icon with gradient */}
                    <circle cx="100" cy="100" r="60" fill="url(#umbralGradient)" />

                    {/* Bouncing elements */}
                    <circle id="bounce" cx="100" cy="136" r="8" fill="#d3a510" />
                    <circle id="bounce2" cx="100" cy="146" r="6" fill="#d3a510" />

                    {/* Particle effects */}
                    <g id="particles">
                        <circle cx="80" cy="80" r="2" fill="#d3a510" opacity="0.8" />
                        <circle cx="120" cy="80" r="2" fill="#d3a510" opacity="0.8" />
                        <circle cx="80" cy="120" r="2" fill="#d3a510" opacity="0.8" />
                        <circle cx="120" cy="120" r="2" fill="#d3a510" opacity="0.8" />
                        <circle cx="100" cy="60" r="2" fill="#d3a510" opacity="0.8" />
                        <circle cx="100" cy="140" r="2" fill="#d3a510" opacity="0.8" />
                        <circle cx="60" cy="100" r="2" fill="#d3a510" opacity="0.8" />
                        <circle cx="140" cy="100" r="2" fill="#d3a510" opacity="0.8" />
                    </g>

                    {/* Mining icon in center */}
                    <text x="100" y="110" textAnchor="middle" fontSize="24" fill="#d3a510" fontWeight="bold">
                        ⛏️
                    </text>
                </svg>

                <div className="completion-message">
                    {!isDone ? (
                        <>
                            <h2>Mining Operation Complete!</h2>
                            <p>Resources have been successfully mined and are ready to collect.</p>

                            <div className="mining-results">
                                <div className="primary-reward">
                                    <div className="token-amount">
                                        {results.primaryToken.amount} {results.primaryToken.symbol}
                                    </div>
                                </div>

                                {results.secondaryTokens && results.secondaryTokens.length > 0 && (
                                    <div className="secondary-rewards">
                                        <div className="rewards-label">Additional Resources:</div>
                                        {results.secondaryTokens.map((token, index) => (
                                            <div key={index} className="secondary-token">
                                                {token.amount} {token.symbol}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <button
                                className={`collect-btn ${isCollecting ? 'collecting' : ''}`}
                                onClick={handleCollect}
                                disabled={isCollecting}
                            >
                                {isCollecting ? (
                                    <>
                                        <span className="collecting-spinner"></span>
                                        Collecting...
                                    </>
                                ) : (
                                    `Collect ${results.primaryToken.amount} ${results.primaryToken.symbol}`
                                )}
                            </button>
                        </>
                    ) : (
                        <>
                            <h2>Resources Collected!</h2>
                            <p>All resources have been successfully transferred to your wallet.</p>

                            <div className="success-icon">
                                <div className="checkmark">✓</div>
                            </div>

                            <button className="done-btn" onClick={handleDone}>
                                Done
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default MiningCompletionAnimation
