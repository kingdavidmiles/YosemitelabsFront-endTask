import globalHook from 'use-global-hook';

const lsKey = "teamPokemons"
/**
 *
 * @param pokemons
 */

const persistTeamPokemons=(pokemons)=>{
    return localStorage.setItem(lsKey, JSON.stringify(pokemons))
}

/**
 *
 */
export const getLocalTeamPokemons=()=>{
    const pokemons = typeof window !== 'undefined' ? localStorage.getItem(lsKey):null
    return JSON.parse(pokemons) ?? []
}

const initialState = {
    teamPokemons: getLocalTeamPokemons(),
};

const actions = {
    // checkPokemon: (store, pokemon) => {
    //     const prevPokemons = [...store.state.teamPokemons]
    //     const i = prevPokemons.findIndex(p => p.id === pokemon.id)
    // },
    removePokemonFromTeam: (store, pokemon) => {
        const prevPokemons = [...store.state.teamPokemons]
        const i = prevPokemons.findIndex(p => p.id === pokemon.id)
        if (i > -1) {
            prevPokemons.splice(i, 1)
        }
        persistTeamPokemons(prevPokemons)
        store.setState({teamPokemons: prevPokemons});
    },
    addPokemonToTeam: (store, pokemon) => {
        const prevPokemons = [...store.state.teamPokemons]
        const i = prevPokemons.findIndex(p => p.id === pokemon.id)
        // as a user I want to add the pokemon to my team (maximum of 6 pokemon per user)
        if (i === -1 && prevPokemons.length !== 6) {
            prevPokemons.push(pokemon)
        }
        persistTeamPokemons(prevPokemons)
        store.setState({teamPokemons: prevPokemons});
    },
};

const useGlobal = globalHook(initialState, actions);

export default useGlobal
