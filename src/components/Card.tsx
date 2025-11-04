// import { useState } from 'react'
import type { Pokemon } from './Game.tsx'

function Card({ pokemon }: { pokemon: Pokemon }) {
    // console.log(pokemon)

    return (
        <div className='card'>
            <h3>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h3>
            <h4>ID no. {pokemon.pokedexNum}</h4>
            <img src={pokemon.image} alt={pokemon.name} />
            {/* <p>{pokemon.pokedexEntry}</p> */}
        </div>
    )
}

export default Card