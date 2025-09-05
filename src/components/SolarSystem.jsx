import React from 'react'

const SolarSystem = ({ planets, selectedPlanet, isWalletConnected }) => {
    const planetDescriptions = {
        solanium: {
            type: "Temporal World",
            description: "A time-dilated world where gravitational fields create temporal anomalies across its surface."
        },
        ethereus: {
            type: "Storm World",
            description: "Lightning world spanning the entire planet creates natural electromagnetic fields strong enough to power entire civilizations.",
            moons: [{ name: "L2 Base", className: "moon" }]
        },
        zano: {
            type: "Privacy World",
            description: "A privacy-focused world in cryptographic mists. Planet's stealth clouds makes it nearly invisible."
        },
        ferrum: {
            type: "Volcanic World",
            description: "A volcanic archipelago world with thousands of active volcanic islands scattered across molten seas.",
            moons: [
                { name: "Ferrox", className: "deimos" },
                { name: "Scylla", className: "phoebos" }
            ]
        },
        lumina: {
            type: "Ocean World",
            description: "A water world completely covered by shallow seas with liquid lumen islands"
        },
        titanox: {
            type: "Forest World",
            description: "A forest world dominated by massive merkle tree structures that reach 50 kilometers in height.",
            moons: [
                { name: "Avalon", className: "titan" },
                { name: "Lumenis", className: "dione" },
                { name: "Crysta", className: "enceladus" }
            ]
        },
        base: {
            type: "Shell World",
            description: "A hollow shell world with a vast internal cavity containing floating continents.",
            moons: [
                { name: "Glacius", className: "triton" },
                { name: "Shard", className: "proteus" },
                { name: "Echo", className: "nereid" }
            ]
        },
        voidara: {
            type: "Phase World",
            description: "A phase-shifting world that periodically becomes intangible and floats through other celestial bodies"
        }
    }


    return (
        <div className='solar'>
            {Object.entries(planets).map(([planetId, planet]) => {
                const desc = planetDescriptions[planetId]
                return (
                    <div key={planetId} className='solar_systm'>
                        <div className={`planet ${planetId}`}>
                            {desc.moons?.map((moon, idx) => (
                                <React.Fragment key={idx}>
                                    <div className={`moon ${moon.className}`}>
                                        <h3>Moon</h3>
                                        <h2>{moon.name}</h2>
                                    </div>
                                    {moon.className === 'moon' && <div className='trajectory m'></div>}
                                    {moon.className === 'deimos' && <div className='trajectory d'></div>}
                                    {moon.className === 'phoebos' && <div className='trajectory p'></div>}
                                    {moon.className === 'titan' && <div className='trajectory ti'></div>}
                                    {moon.className === 'dione' && <div className='trajectory di'></div>}
                                    {moon.className === 'enceladus' && <div className='trajectory enc'></div>}
                                    {moon.className === 'triton' && <div className='trajectory tri'></div>}
                                    {moon.className === 'proteus' && <div className='trajectory pro'></div>}
                                    {moon.className === 'nereid' && <div className='trajectory ner'></div>}
                                </React.Fragment>
                            ))}
                            <div className={`planet_description ${planetId}`}>
                                <h2>{desc.type}</h2>
                                <h1>{planet.name}</h1>
                                <p>{desc.description}</p>
                                <label htmlFor={`read${planetId.charAt(0).toUpperCase() + planetId.slice(1)}`}>
                                    <a className="check-resources-btn">
                                        Check Resources
                                    </a>
                                </label>
                            </div>
                            <div className='overlay'></div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default SolarSystem