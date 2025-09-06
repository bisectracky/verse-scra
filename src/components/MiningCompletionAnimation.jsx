import React, { useEffect, useState } from 'react'
import './MiningCompletionAnimation.css'
import Confetti from './Confetti'
import { getContract, prepareContractCall, sendTransaction, waitForReceipt } from 'thirdweb'
import { polygon } from 'thirdweb/chains'
import { client } from '../config/thirdweb'
import { PLANET_VRF_ADDRESS, PLANET_VRF_ABI } from '../config/contracts'

const MiningCompletionAnimation = ({ isVisible, onClose, miningResults, account }) => {
    const [isCollecting, setIsCollecting] = useState(false)
    const [isDone, setIsDone] = useState(false)
    const [showInitialConfetti, setShowInitialConfetti] = useState(false)
    const [showCollectionConfetti, setShowCollectionConfetti] = useState(false)
    const [claimTxHash, setClaimTxHash] = useState(null)

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
            setShowCollectionConfetti(false)
            setClaimTxHash(null)
            // Start confetti immediately when modal becomes visible
            setShowInitialConfetti(true)
        }
    }, [isVisible])

    const handleCollect = async () => {
        if (!account || !results.drawId) {
            console.error('Missing account or drawId')
            return
        }

        setIsCollecting(true)
        
        try {
            // Get the contract instance
            const contract = getContract({
                client,
                chain: polygon,
                address: PLANET_VRF_ADDRESS,
                abi: PLANET_VRF_ABI
            })

            // Prepare the claim transaction
            const transaction = prepareContractCall({
                contract,
                method: 'claimPrize',
                params: [BigInt(results.drawId)]
            })

            // Send the transaction
            console.log('Claiming prize for drawId:', results.drawId)
            const { transactionHash } = await sendTransaction({
                account,
                transaction
            })

            console.log('Claim transaction sent:', transactionHash)
            setClaimTxHash(transactionHash)

            // Wait for transaction receipt
            const receipt = await waitForReceipt({
                client,
                chain: polygon,
                transactionHash
            })

            console.log('Prize claimed successfully:', receipt)
            
            // Show success animation
            setShowCollectionConfetti(true)
            setIsCollecting(false)
            setIsDone(true)
            
        } catch (error) {
            console.error('Failed to claim prize:', error)
            setIsCollecting(false)
            
            // Show user-friendly error message based on error type
            if (error.name === 'ContractFunctionExecutionError') {
                // Check for specific contract errors
                const errorMessage = error.message || ''
                
                if (errorMessage.includes('AlreadyClaimed') || errorMessage.includes('0x81b5ad68')) {
                    alert('This prize has already been claimed.')
                } else if (errorMessage.includes('InvalidId')) {
                    alert('Invalid operation ID. This prize does not exist.')
                } else if (errorMessage.includes('NotMaster')) {
                    alert('You are not authorized to claim this prize.')
                } else {
                    alert('Failed to claim prize. The transaction was reverted by the contract.')
                }
            } else if (error.message?.includes('user rejected') || error.message?.includes('User rejected')) {
                // User cancelled, just return to normal state
                console.log('User cancelled the transaction')
            } else {
                alert(`Failed to claim prize: ${error.message || 'Unknown error'}`)
            }
        }
    }

    const handleDone = () => {
        setIsCollecting(false)
        setIsDone(false)
        setClaimTxHash(null)
        onClose()
    }

    // Prevent closing modal by clicking overlay
    const handleOverlayClick = (e) => {
        e.stopPropagation()
    }

    if (!isVisible) return null

    return (
        <div className="mining-completion-overlay" onClick={handleOverlayClick}>
            {/* Initial confetti when mining completes */}
            <Confetti
                isActive={showInitialConfetti}
                onComplete={() => setShowInitialConfetti(false)}
            />

            {/* Collection confetti when collecting rewards */}
            {showCollectionConfetti && (
                <div className="collection-confetti">
                    {Array.from({ length: 20 }, (_, i) => (
                        <div
                            key={i}
                            className="confetti-particle"
                            style={{
                                '--random-x': `${(Math.random() - 0.5) * 200}px`,
                                '--random-y': `${(Math.random() - 0.5) * 200}px`,
                                backgroundColor: ['#d3a510', '#f4c430', '#ffe4a1', '#ccb069'][Math.floor(Math.random() * 4)],
                                left: '50%',
                                top: '50%',
                                animationDelay: `${Math.random() * 0.5}s`
                            }}
                        />
                    ))}
                </div>
            )}

            <div className="mining-completion-container" onClick={handleOverlayClick}>
                <svg xmlns="http://www.w3.org/2000/svg" height="200" width="200" className="mining-animation">
                    <g style={{order: -1}}>
                        <polygon transform="rotate(45 100 100)" strokeWidth={1} stroke="#d3a410" fill="none" points="70,70 148,50 130,130 50,150" id="bounce" />
                        <polygon transform="rotate(45 100 100)" strokeWidth={1} stroke="#d3a410" fill="none" points="70,70 148,50 130,130 50,150" id="bounce2" />
                        <polygon transform="rotate(45 100 100)" strokeWidth={2} stroke="" fill="#414750" points="70,70 150,50 130,130 50,150" />
                        <polygon strokeWidth={2} stroke="" fill="url(#gradiente)" points="100,70 150,100 100,130 50,100" />
                        <defs>
                            <linearGradient y2="100%" x2="10%" y1="0%" x1="0%" id="gradiente">
                                <stop style={{stopColor: '#1e2026', stopOpacity: 1}} offset="20%" />
                                <stop style={{stopColor: '#414750', stopOpacity: 1}} offset="60%" />
                            </linearGradient>
                        </defs>
                        <polygon transform="translate(20, 31)" strokeWidth={2} stroke="" fill="#b7870f" points="80,50 80,75 80,99 40,75" />
                        <polygon transform="translate(20, 31)" strokeWidth={2} stroke="" fill="url(#gradiente2)" points="40,-40 80,-40 80,99 40,75" />
                        <defs>
                            <linearGradient y2="100%" x2="0%" y1="-17%" x1="10%" id="gradiente2">
                                <stop style={{stopColor: '#d3a51000', stopOpacity: 1}} offset="20%" />
                                <stop style={{stopColor: '#d3a51054', stopOpacity: 1}} offset="100%" id="animatedStop" />
                            </linearGradient>
                        </defs>
                        <polygon transform="rotate(180 100 100) translate(20, 20)" strokeWidth={2} stroke="" fill="#d3a410" points="80,50 80,75 80,99 40,75" />
                        <polygon transform="rotate(0 100 100) translate(60, 20)" strokeWidth={2} stroke="" fill="url(#gradiente3)" points="40,-40 80,-40 80,85 40,110.2" />
                        <defs>
                            <linearGradient y2="100%" x2="10%" y1="0%" x1="0%" id="gradiente3">
                                <stop style={{stopColor: '#d3a51000', stopOpacity: 1}} offset="20%" />
                                <stop style={{stopColor: '#d3a51054', stopOpacity: 1}} offset="100%" id="animatedStop" />
                            </linearGradient>
                        </defs>
                        <polygon transform="rotate(45 100 100) translate(80, 95)" strokeWidth={2} stroke="" fill="#ffe4a1" points="5,0 5,5 0,5 0,0" id="particles" />
                        <polygon transform="rotate(45 100 100) translate(80, 55)" strokeWidth={2} stroke="" fill="#ccb069" points="6,0 6,6 0,6 0,0" id="particles" />
                        <polygon transform="rotate(45 100 100) translate(70, 80)" strokeWidth={2} stroke="" fill="#fff" points="2,0 2,2 0,2 0,0" id="particles" />
                        <polygon strokeWidth={2} stroke="" fill="#292d34" points="29.5,99.8 100,142 100,172 29.5,130" />
                        <polygon transform="translate(50, 92)" strokeWidth={2} stroke="" fill="#1f2127" points="50,50 120.5,8 120.5,35 50,80" />
                    </g>
                </svg>

                <div className="completion-message">
                    {results.status === 'pending' ? (
                        <>
                            <h2>Transaction Confirmed!</h2>
                            <p>Oracle is calculating your prize amount...</p>
                            
                            <div className="oracle-waiting">
                                <div className="oracle-spinner"></div>
                                <div className="oracle-info">
                                    <div>Draw ID: #{results.drawId}</div>
                                    <div className="oracle-timer">Please wait while we determine your rewards</div>
                                </div>
                            </div>
                        </>
                    ) : !isDone ? (
                        <>
                            <h2>Mining Operation Complete!</h2>
                            <p>{results.message || 'Resources have been successfully mined and are ready to collect.'}</p>

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
                            
                            {claimTxHash && isCollecting && (
                                <div className="tx-status">
                                    <a 
                                        href={`https://polygonscan.com/tx/${claimTxHash}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="tx-link"
                                    >
                                        View transaction on PolygonScan
                                    </a>
                                </div>
                            )}
                        </>
                    ) : (
                        <>
                            <h2>Resources Collected!</h2>
                            <p>{results.primaryToken.amount} {results.primaryToken.symbol} has been successfully transferred to your wallet!</p>

                            <div className="success-icon">
                                <div className="checkmark">✓</div>
                                <div className="success-sparkle">
                                    <div className="sparkle"></div>
                                    <div className="sparkle"></div>
                                    <div className="sparkle"></div>
                                    <div className="sparkle"></div>
                                    <div className="sparkle"></div>
                                    <div className="sparkle"></div>
                                </div>
                            </div>

                            {claimTxHash && (
                                <div className="tx-status">
                                    <a 
                                        href={`https://polygonscan.com/tx/${claimTxHash}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="tx-link"
                                    >
                                        View transaction on PolygonScan
                                    </a>
                                </div>
                            )}

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
