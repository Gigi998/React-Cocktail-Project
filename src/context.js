import React, { useState, useContext, useEffect, useCallback } from 'react'

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
const AppContext = React.createContext()

const AppProvider = ({ children }) => {

  const [cocktailName, setCocktailName] = useState("rum")
  const [loading, setLoading] = useState(true)
  const [cocktails, setCocktails] = useState([])

  //Fetching data
  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const response = await fetch(`${url}${cocktailName}`)
      const data = await response.json()
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
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  },[cocktailName])

  useEffect(() => {
    fetchData()
  },[cocktailName,fetchData])
 
  return <AppContext.Provider 
      value={{
        loading,
        cocktails,
        cocktailName,
        setCocktailName,
        setLoading,
      }}
    >{children}</AppContext.Provider>
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
