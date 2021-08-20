import globalHook from 'use-global-hook';

const initialState = {
    teamPokemons: [],
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
            prevPokemons.splice(i, pokemon)
        }
        store.setState({teamPokemons: prevPokemons});
    },
    addPokemonToTeam: (store, pokemon) => {
        const prevPokemons = [...store.state.teamPokemons]
        const i = prevPokemons.findIndex(p => p.id === pokemon.id)
        // as a user I want to add the pokemon to my team (maximum of 6 pokemon per user)
        if (i === -1 && prevPokemons.length !== 6) {
            prevPokemons.push(pokemon)
        }
        store.setState({teamPokemons: prevPokemons});
    },
};

const useGlobal = globalHook(initialState, actions);

export default useGlobal
