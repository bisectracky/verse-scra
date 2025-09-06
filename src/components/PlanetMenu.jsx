import React from 'react'

const PlanetMenu = ({ planets, selectedPlanet, onPlanetSelect }) => {
  const planetOrder = ['voidara', 'base', 'titanox', 'lumina', 'ferrum', 'zano', 'ethereus', 'solanium']

  return (
    <>
      {planetOrder.map((planetId, index) => {
        const planet = planets[planetId]
        return (
          <React.Fragment key={planetId}>
            <input 
              className={`planet${8-index}`}
              id={planetId}
              name='planet'
              type='radio'
              checked={selectedPlanet === planetId}
              onChange={() => onPlanetSelect(planetId)}
            />
            <label className={`${planetId} menu`} htmlFor={planetId}>
              <div className='preview'></div>
              <div className='info'>
                <h2>
                  <div className='pip'></div>
                  {planet.name}
                </h2>
                <h3>
                  <span className="miner-count">{planet.miners}</span> 
                  {planet.miners === 1 ? ' MINER' : ' MINERS'}
                </h3>
              </div>
            </label>
          </React.Fragment>
        )
      })}
    </>
  )
}

export default PlanetMenu