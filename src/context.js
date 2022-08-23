import React, { useState, useContext, useEffect } from 'react'
import { useCallback } from 'react'

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
const AppContext = React.createContext()

const AppProvider = ({ children }) => {

  const [cocktailName, setCocktailName] = useState("a")
  const [loading, setLoading] = useState(true)
  const [cocktails, setCocktails] = useState([])

  //Fetching data
  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${url}${cocktailName}`)
      const data = await response.json()
      console.log(data.drinks)
      const {drinks} = data
      //Checking and making new object
      if(drinks){
        const newDrinks = drinks.map(drink => {
          const {
            idDrink,
            strDrink,
            strDrinkThumb,
            strAlcoholic,
            strGlass,
          } = drink
          
          return {
            id: idDrink,
            name: strDrink,
            image: strDrinkThumb,
            info: strAlcoholic,
            glass: strGlass,
          }
        })
        setCocktails(newDrinks)
      }else{
        setCocktails([])
      }
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  },[cocktailName])

  return <AppContext.Provider 
      value={{
        loading,
        cocktails,
        cocktailName,
      }}
    >{children}</AppContext.Provider>
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
