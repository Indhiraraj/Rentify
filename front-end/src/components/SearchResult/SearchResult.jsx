import React, { useContext } from 'react'
import AreaCard from '../user-flow/user-flow-components/AreaCard/AreaCard'
import { RentifyContext } from '../ContextProvider/RentifyContextProvider'

const SearchResult = () => {
    const {resultAreas} = useContext(RentifyContext);
    if (resultAreas.length === 0) {
        return (
            <div className='search'><h2>Try searching something else</h2></div>
        )
    }
  return (
    <div className='search'>
        {resultAreas ? (
        <div className="areas">
          {resultAreas.map((area) => (
            <AreaCard
              key={resultAreas.areaId}
              area={resultAreas}
            />
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default SearchResult