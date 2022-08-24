import React, {useEffect, useState, useCallback} from 'react'
import Loading from '../components/Loading'
import { useParams, Link } from 'react-router-dom'
import { useGlobalContext } from '../context'

const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i='

const SingleCocktail = () => {

  const { setLoading,loading } = useGlobalContext()
  const [cocktail, setCocktail] = useState(null)
  
  const param = useParams()
  //Useparams is returning the object with id property
  const {id} = param

  //ID fetching
  const fetchID = useCallback(async () => {
    setLoading(true)
    try {
      const response = await fetch(`${url}${id}`)
      const data = await response.json()
      const { drinks } = data
      //Check console
      console.log(drinks[0]);
      if(drinks){
        const {
          strDrink,
          strDrinkThumb,
          strAlcoholic,
          strCategory,
          strGlass,
          strInstructions,
          strIngredient1,
          strIngredient2,
          strIngredient3,
          strIngredient4,
          strIngredient5,
          strIngredient6,
          strIngredient7,
        } = drinks[0]

        const ingredients = [
          strIngredient1,
          strIngredient2,
          strIngredient3,
          strIngredient4,
          strIngredient5,
          strIngredient6,
          strIngredient7,
        ]

        const newCocktail = {
          name: strDrink,
          image: strDrinkThumb,
          info: strAlcoholic,
          category: strCategory,
          glass: strGlass,
          instructions: strInstructions,
          ingredients,
        }
        //Check console
        console.log(newCocktail);
        setCocktail(newCocktail)
      } else {
        setCocktail(null)
      }
    } catch (error) {
      console.log(error);    
    }
    setLoading(false)
  },[id, setLoading])

  useEffect(() => {
    fetchID()
  },[id, fetchID])

  if(loading){
    return <Loading />
  }

  if(!cocktail){
    return <h2 className='section-title'>no cocktail to display</h2>
  } else {
    const { name, image, category, info, glass, instructions, ingredients} = cocktail
    return (
      <section className='section cocktail-section'>
        <Link to="/" className='btn btn-primary'>
          home
        </Link>
        <h2 className='section-title'>{name}</h2>
        <div className="drink">
          <img src={image} alt={name} />
          <div className="drink-info">
            <p>
              <span className='drink-data'>name :</span> {name}
            </p>
            <p>
              <span className='drink-data'>category :</span> {category}
            </p>
            <p>
              <span className='drink-data'>info :</span> {info}
            </p>
            <p>
              <span className='drink-data'>glass :</span> {glass}
            </p>
            <p>
              <span className='drink-data'>instructons :</span> {instructions}
            </p>
            <p>
              <span className='drink-data'>ingredients: </span>
              {/*Render correct number of ingredinets*/}
              {ingredients.map((ingredient, index) => {
                return ingredient ? <span key={index}>{ingredient}</span> : null
              })}
            </p>
          </div>
        </div>
      </section>
    )
  }
}

export default SingleCocktail
