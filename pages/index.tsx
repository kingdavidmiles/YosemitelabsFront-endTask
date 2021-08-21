import React, {useEffect, useState} from "react";
import {HomeLayout} from "../components/HomeLayout";
import {ReactSearchAutocomplete} from 'react-search-autocomplete'
import styles from "../styles/Home.module.css";
import {useRouter} from 'next/router'
import {Avatar, Box, Center, Container, Grid, GridItem, Text} from "@chakra-ui/react"
import useAxios from "axios-hooks";
import {PokemonCard} from "../components/PokemonCard";
import axios from "axios";

function Home() {
    const router = useRouter()
    const [pokemons, setPokemons] = useState([])
    const [pokemonsFilter, setPokemonsFilter] = useState([])

    // Initially get all pokemons into autocomplete
    const [{data, loading, error}] = useAxios({
        url: `${process.env.API_URL}/pokemon`,
        method: "GET",
    })

    useEffect(() => {
        if (data?.results) {
            setPokemons(data.results)
        }
    }, [data])


    const handleOnSelect = (pokemon) => {
        router.push("/pokemons/" + pokemon.name)
    }

    /**
     *
     * @param string
     * @param results
     */
    const handleOnSearch = (string, results) => {
        const namesURLS = results.map(pk => `${process.env.API_URL}/pokemon/${pk.name}`)
        const pokemonsPromises = []
        namesURLS.forEach(url => {
            pokemonsPromises.push(axios.get(url))
        })
        axios.all(pokemonsPromises).then((data) => {
            const pkArr = []
            data.forEach(({data}) => {
                pkArr.push(data)
            })
            setPokemonsFilter(pkArr)
        })
    }

    const formatResult = (item) => {
        return item;
    }

    if (loading) {
        return (
            <div>
                <div>
                    <Text fontSize="6xl">
                        Loading..
                    </Text>
                </div>
            </div>
        )
    }

    return (
        <div>

            <HomeLayout/>
            <Container maxW="xl" className={styles.container}>
                <div>
                    <Center>
                        <div>
                            <Center>
                                <Box pb={2}>
                                    <Avatar size="2xl"
                                            src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png"}
                                    />
                                </Box>
                            </Center>

                            <Text pt={6}>
                                Pokemon React web app for Yosemitelabs Front-end Task
                            </Text>

                            <Box pt={0} pb={9}>
                                <Center>
                                    <Box>
                                        <Text fontSize="6xl">Pokemons search</Text>
                                    </Box>
                                </Center>
                            </Box>
                        </div>

                    </Center>
                    {/*input search*/}
                    <Center>
                        <Box pt={9}>
                            <header className="App-header">
                                <div style={{width: 500}}>
                                    <ReactSearchAutocomplete
                                        items={pokemons}
                                        onSelect={handleOnSelect}
                                        onSearch={handleOnSearch}
                                        autoFocus
                                    />
                                </div>
                            </header>
                        </Box>
                    </Center>
                </div>
            </Container>
            {pokemonsFilter.length > 0 && (
                <Center>
                    <Container maxW="container.xl">
                        <div style={{
                            paddingTop: "3rem"
                        }}>
                            <Text fontSize="2xl" fontWeight="extrabold">Pokemon Results</Text>
                        </div>
                        <Grid
                            templateColumns="repeat(4, 1fr)"
                        >
                            {pokemonsFilter?.flatMap(pokemon => (
                                <GridItem>
                                    <PokemonCard showDeleteButton={false} pokemon={pokemon}/>
                                </GridItem>
                            ))}
                        </Grid>
                    </Container>
                </Center>
            )}
        </div>
    )
}

// noinspection JSUnusedGlobalSymbols
export default React.memo(Home)
