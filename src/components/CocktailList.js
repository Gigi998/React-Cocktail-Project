import React from 'react'
import Cocktail from './Cocktail'
import Loading from './Loading'
import { useGlobalContext } from '../context'
import { useCallback } from 'react'

const CocktailList = () => {

  const { cocktails, loading } = useGlobalContext()

  if(loading){
    return(
      <Loading/>
    )
  }

  return (
    <section className='section'>
      <h2 className='section-title'>cocktails</h2>
      <div className="cocktails-center">
        {cocktails.map(drink => {
          return <Cocktail key={drink.id} {...drink} />
        })}
      </div>
    </section>
  )
}

export default CocktailList
