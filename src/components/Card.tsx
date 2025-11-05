// import { useState } from 'react'
import type { Pokemon } from './Game.tsx'
import '../style/card.css'

function Card({ pokemon }: { pokemon: Pokemon }) {
    // console.log(pokemon)

    return (
        <div className='card' onClick={onClick}>
            <h2>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
            <h4>ID no. {pokemon.pokedexNum}</h4>
            <img src={pokemon.image} alt={pokemon.name} height={250} width={250}/>
            {/* <p>{pokemon.pokedexEntry}</p> */}
        </div>
    )
}

export default Card