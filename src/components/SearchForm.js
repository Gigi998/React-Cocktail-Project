import React, { useRef } from 'react'
import { useGlobalContext } from '../context'

const SearchForm = () => {

  const { setCocktailName } = useGlobalContext()
  const searchTerm = useRef("")

  const newSearch = () => {
    setCocktailName(searchTerm.current.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <section className='section search'>
      <form className='search-form' onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="name">search your favorite cocktail</label>
          <input 
            type="text"
            name="name"
            id="name"
            ref={searchTerm}
            onChange={newSearch}
           />
        </div>
      </form>
    </section>
  )
}

export default SearchForm
