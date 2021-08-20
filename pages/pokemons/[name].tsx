// noinspection JSUnusedGlobalSymbols
import React, {useEffect, useState} from "react";
import styles from "../../styles/Home.module.css";

import {Box, Button, Center, Container, Flex, Heading, Image, List, ListItem, Spacer, Text} from "@chakra-ui/react"
import useAxios from "axios-hooks";
import {useRouter} from "next/router";
import useGlobal from "../../store";
import Link from "next/link";

export default function PokemonPage() {

    const router = useRouter()
    const {name} = router.query
    const [pokemon, setPokemon] = useState({
        name: undefined,
        sprites: undefined,
        abilities: undefined
    })
    const [{data, loading, error}] = useAxios({
        url: `${process.env.API_URL}/pokemon/${name}`,
        method: "GET",
    })

    const [{teamPokemons}, {addPokemonToTeam}] = useGlobal();

    useEffect(() => {
        if (data) {
            setPokemon(data)
        }
    }, [data])


    // useEffect(() => {
    //     console.warn(teamPokemons)
    // }, [teamPokemons])


    if (loading) {
        return (
            <div>
                <div>
                    <h1>Getting pokemon details</h1>
                </div>
            </div>
        )
    }
    return (
        <div>
            {/*tool bar header*/}
            <div className={styles.toolbarHeader}>
                <Flex>
                    <Box p="4">
                        <Heading size="md">
                            {pokemon.name}
                        </Heading>
                    </Box>
                    <Spacer/>
                    <Box p={4}>
                        <Button colorScheme="teal" mr="4">
                            <Link href="/pokemons/team">
                                Team Pokemons
                            </Link>
                        </Button>
                        <Button onClick={() => addPokemonToTeam(pokemon)} colorScheme="teal" mr="4">
                            Add to team
                        </Button>
                        {/*<Button colorScheme="teal">Log in</Button>*/}
                    </Box>
                </Flex>
            </div>


            <Container className={styles.container}>


                {/**/}
                <div className={styles.teamPokemonsCard}>
                    <div>
                        <Center>
                            <Text fontSize="6xl">{pokemon?.name}</Text>

                        </Center>
                    </div>
                    <div>
                        <Center>
                            <Image alt="images" src={pokemon.sprites?.front_default} style={{height: 400}}/>
                        </Center>
                    </div>
                    <Center>
                        <div>
                            <Text fontSize="6xl">Abilty names</Text>

                            <Box pt={2} pb={4}>
                                {
                                    pokemon.abilities?.map((item) => {
                                        return (

                                            <div key={item}>
                                                <Text fontSize="2xl" > {item.ability.name}</Text>

                                            </div>
                                        )
                                    })
                                }
                            </Box>
                        </div>

                    </Center>

                </div>


            </Container>

        </div>
    )

}


