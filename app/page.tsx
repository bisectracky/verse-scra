"use client"

import { useState, useEffect } from "react"
import "../src/styles/main.css"

// Planet data structure
const planets = [
  {
    id: "solanium",
    name: "Solanium",
    subtitle: "Temporal World",
    miners: "0 Miners",
    description: "A time-dilated world where gravitational fields create temporal anomalies across its surface.",
    className: "planet1",
    checked: true,
  },
  {
    id: "ethereus",
    name: "Ethereus",
    subtitle: "Storm World",
    miners: "0 MINERS",
    description:
      "Lightning world spanning the entire planet creates natural electromagnetic fields strong enough to power entire civilizations.",
    className: "planet2",
    checked: true,
    moon: { name: "L2 Base", type: "Moon" },
  },
  {
    id: "zano",
    name: "ZANO",
    subtitle: "Privacy World",
    miners: "1 MINER",
    description: "A privacy-focused world in cryptographic mists. Planet's stealth clouds makes it nearly invisible.",
    className: "planet3",
    checked: true,
  },
  {
    id: "ferrum",
    name: "Ferrum",
    subtitle: "Volcanic World",
    miners: "1 MINER",
    description: "A volcanic archipelago world with thousands of active volcanic islands scattered across molten seas.",
    className: "planet4",
    checked: true,
    moons: [
      { name: "Ferrox", type: "Moon", className: "deimos", trajectory: "d" },
      { name: "Scylla", type: "Moon", className: "phoebos", trajectory: "p" },
    ],
  },
  {
    id: "lumina",
    name: "Lumina",
    subtitle: "Ocean World",
    miners: "0 MINERS",
    description: "A water world completely covered by shallow seas with liquid ether islands",
    className: "planet5",
  },
  {
    id: "titanox",
    name: "TITANOX",
    subtitle: "Forest World",
    miners: "2 MINERS",
    description: "A forest world dominated by massive merkle tree structures that reach 50 kilometers in height.",
    className: "planet6",
    moons: [
      { name: "Avalon", type: "Moon", className: "titan", trajectory: "ti" },
      { name: "Lumenis", type: "Moon", className: "dione", trajectory: "di" },
      { name: "Crysta", type: "Moon", className: "enceladus", trajectory: "enc" },
    ],
  },
  {
    id: "base",
    name: "Base",
    subtitle: "Shell World",
    miners: "0 Miners",
    description: "A hollow shell world with a vast internal cavity containing floating continents.",
    className: "planet7",
    moons: [
      { name: "Glacius", type: "Moon", className: "triton", trajectory: "tri" },
      { name: "Shard", type: "Moon", className: "proteus", trajectory: "pro" },
      { name: "Echo", type: "Moon", className: "nereid", trajectory: "ner" },
    ],
  },
  {
    id: "voidara",
    name: "Voidara",
    subtitle: "Phase World",
    miners: "0 Miners",
    description:
      "A phase-shifting world that periodically becomes intangible and floats through other celestial bodies",
    className: "planet8",
  },
]

// Panel content for each planet
const panelContent = {
  solanium: {
    title: "Pyrion",
    content: `Pyrion is the computational forge world of the Zephyr System, where natural hash crystals grow from the planet's core.
    Its surface consists of vast silicon valleys and towering proof-of-work spires that generate computational energy through geological processes.`,
    image: "./src/solanium-panel.jpg",
    sections: [
      {
        title: "A mining cycle on Pyrion lasts only 67 Zephyr-days.",
        text: `The planet's computational day lasts 134 standard days, during which hash crystals grow and mature.
        The day side reaches optimal mining temperatures of 2,000°C where silicon crystallizes into natural circuits,
        while the night side at -200°C allows for quantum cooling of computational processes.`,
      },
    ],
  },
  zano: {
    title: "ZANO",
    content: `ZANO, the ultimate privacy world of the Zephyr System, is shrouded in an impenetrable cryptographic atmosphere that makes all transactions completely anonymous and untraceable.`,
    image: "./src/zano-panel.jpg",
    sections: [
      {
        title: "A privacy cycle on ZANO lasts 198 standard days.",
        text: `The planet processes confidential transactions slowly, taking 198 days to complete one full anonymization cycle.`,
      },
    ],
  },
  ethereus: {
    title: "Ethereus",
    content: `Ethereus is the storm world perpetually covered in electrical tempests that never cease. Lightning networks spanning the entire planet create natural electromagnetic fields strong enough to power entire civilizations.`,
    image: "./src/ethereus-panel.jpg",
    sections: [
      {
        title: "Ethereus's storms synchronize with network activity.",
        text: `The planet's electrical tempests align with the computational demands of the system's blockchain networks.`,
      },
    ],
  },
  ferrum: {
    title: "Ferrum",
    content: `Ferrum is now the fourth world from Zephyros, known throughout the system for its volcanic archipelago landscape with thousands of active volcanic islands scattered across molten seas.`,
    image: "./src/ferrum-panel.jpg",
    sections: [
      {
        title: "Ferrum's volcanic activity creates new landmasses daily.",
        text: `The planet's intense volcanic activity constantly reshapes its surface, with new islands emerging from the molten seas while others are reclaimed by the lava.`,
      },
    ],
  },
  lumina: {
    title: "Base",
    content: `Base is the largest planet in the Zephyr System, a massive gas giant that dominates the outer system.`,
    image: "./src/lumina-panel.jpg",
    sections: [
      {
        title: "Base is the fourth brightest object in the Zephyr System.",
        text: `Only Zephyros, Bitcoin moon, and Lumina outshine it. The planet's Great Red Vortex reflects stellar light in distinctive patterns.`,
      },
    ],
  },
  titanox: {
    title: "Ethereus",
    content: `Ethereus is the ether rain world, where crystallized smart contracts continuously precipitate from its rings.`,
    image: "./src/titanox-panel.jpg",
    sections: [
      {
        title: "Ethereus experiences constant ether crystal precipitation.",
        text: `The planet is famous throughout the system for its continuous ether rain, where crystallized smart contracts fall from the ring system at a rate of 12 million crystals per hour.`,
      },
    ],
  },
  base: {
    title: "Solanium",
    content: `Solanium is the eighth world from Zephyros. It was the first planet whose existence was predicted by blockchain consensus algorithms before it was actually discovered through deep space scanning.`,
    image: "./src/base-panel.jpg",
    sections: [
      {
        title: "Solanium was unknown to early crypto civilizations.",
        text: `It operates beyond the visible transaction spectrum and was first detected through advanced consensus algorithms.`,
      },
    ],
  },
  voidara: {
    title: "Voidara",
    content: `Voidara is the phase-shifting world of the Zephyr System, a mysterious planet that periodically becomes intangible and floats through other celestial bodies.`,
    image: "./src/voidara-panel.jpg",
    sections: [
      {
        title: "Voidara phases between dimensions every 248 Zephyr-years.",
        text: `The planet's quantum phase cycle allows it to exist in multiple dimensional states, sometimes becoming completely intangible and passing through other celestial bodies without gravitational interaction.`,
      },
    ],
  },
}

export default function ResourceExplorer() {
  const [selectedPlanet, setSelectedPlanet] = useState("ferrum")
  const [selectedPanel, setSelectedPanel] = useState("")

  // Handle URL hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1)
      if (hash && planets.find((p) => p.id === hash)) {
        setSelectedPlanet(hash)
      }
    }

    // Handle initial load
    handleHashChange()

    // Listen for hash changes
    window.addEventListener("hashchange", handleHashChange)

    return () => {
      window.removeEventListener("hashchange", handleHashChange)
    }
  }, [])

  const handlePlanetSelect = (planetId: string) => {
    setSelectedPlanet(planetId)
    window.location.hash = planetId
  }

  const handlePanelOpen = (planetId: string) => {
    setSelectedPanel(`read${planetId.charAt(0).toUpperCase() + planetId.slice(1)}`)
  }

  const handlePanelClose = () => {
    setSelectedPanel("")
  }

  return (
    <div className="resource-explorer">
      <h1 className="logo">
        Resource Explorer
        <span>WEB3 Mining System</span>
      </h1>

      {/* Planet Menu Items */}
      {planets.map((planet) => (
        <div key={planet.id}>
          <input
            className={planet.className}
            id={planet.id}
            name="planet"
            type="radio"
            checked={selectedPlanet === planet.id}
            onChange={() => handlePlanetSelect(planet.id)}
          />
          <label className={`${planet.id} menu`} htmlFor={planet.id}>
            <div className="preview"></div>
            <div className="info">
              <h2>
                <div className="pip"></div>
                {planet.name}
              </h2>
              <h3>{planet.miners}</h3>
            </div>
          </label>
        </div>
      ))}

      {/* Solar System Display */}
      <div className="solar">
        {planets.map((planet) => (
          <div key={`solar-${planet.id}`} className="solar_systm">
            <div className={`planet ${planet.id}`}>
              {/* Render moons if they exist */}
              {planet.moon && (
                <div className="moon moon">
                  <h3>{planet.moon.type}</h3>
                  <h2>{planet.moon.name}</h2>
                </div>
              )}

              {planet.moons?.map((moon, index) => (
                <div key={index}>
                  <div className={`moon ${moon.className}`}>
                    <h3>{moon.type}</h3>
                    <h2>{moon.name}</h2>
                  </div>
                  <div className={`trajectory ${moon.trajectory}`}></div>
                </div>
              ))}

              {planet.moon && <div className="trajectory m"></div>}

              <div className={`planet_description ${planet.id}`}>
                <h2>{planet.subtitle}</h2>
                <h1>{planet.name}</h1>
                <p>{planet.description}</p>
                <label onClick={() => handlePanelOpen(planet.id)}>
                  <a>Check Resources</a>
                </label>
              </div>
              <div className="overlay"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Panel System */}
      {Object.entries(panelContent).map(([planetId, content]) => (
        <div key={`panel-${planetId}`}>
          <input
            className="read"
            id={`read${planetId.charAt(0).toUpperCase() + planetId.slice(1)}`}
            name={`${planetId}Read`}
            type="radio"
            checked={selectedPanel === `read${planetId.charAt(0).toUpperCase() + planetId.slice(1)}`}
            onChange={() => {}}
          />
          <label className="closeBig" onClick={handlePanelClose}></label>
          <input
            className="read"
            id={`close${planetId.charAt(0).toUpperCase() + planetId.slice(1)}`}
            name={`${planetId}Read`}
            type="radio"
            checked={selectedPanel === ""}
            onChange={() => {}}
          />
          <div className="panel">
            <h1>{content.title}</h1>
            <p>{content.content}</p>
            <img src={content.image || "/placeholder.svg"} alt={content.title} />
            {content.sections.map((section, index) => (
              <div key={index}>
                <h2>{section.title}</h2>
                <p>{section.text}</p>
              </div>
            ))}
            <br />
          </div>
        </div>
      ))}
    </div>
  )
}

