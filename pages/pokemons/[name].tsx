// noinspection JSUnusedGlobalSymbols
import React, {useEffect, useState} from "react";
import styles from "../../styles/Home.module.css";

import {
    Avatar,
    Box,
    Button,
    Center,
    Container,
    Flex,
    Grid,
    GridItem,
    Heading,
    Spacer,
    Text,
    useToast
} from "@chakra-ui/react"
import useAxios from "axios-hooks";
import {useRouter} from "next/router";
import useGlobal from "../../store";
import Link from "next/link";

export default function PokemonPage() {
    const toast = useToast()
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

    useEffect(() => {
        const data = localStorage.getItem("pokemon-list")
        if (data) {
            setPokemon(JSON.parse(data))
        }
    }, [])

    useEffect(() => {
        return localStorage.setItem("pokemon-list", JSON.stringify(pokemon));

    }, [pokemon])


    if (loading) {
        return (
            <div>
                <div>
                    <h1>Getting pokemon details</h1>
                </div>
            </div>
        )
    }
    // @ts-ignore
    return (
        <div>
            {/*tool bar header*/}
            <div >
                <Box boxShadow="xl">
                <Flex>
                    <Box p="4" >
                        <Heading size="md">
                            {pokemon.name}
                        </Heading>
                    </Box>
                    <Spacer/>
                    <Box p={4}>
                        <Grid templateColumns="repeat(5, 1fr)">
                            <GridItem colSpan={2} h="10">
                                <Button colorScheme="teal" mr="4">
                                    <Link href="/pokemons/team">
                                        Team Pokemons
                                    </Link>
                                </Button>
                            </GridItem>
                            <GridItem colStart={3} colEnd={6} h="10">
                                <div
                                    onClick={() =>
                                        toast({
                                            position: "top",
                                            title: "Item added",
                                            description: `"${pokemon.name}" have successfully added to the team`,
                                            status: "success",
                                            duration: 1000,
                                            isClosable: true,
                                        })
                                    }
                                >
                                    <Button

                                        className={styles.buttoncolor}

                                        onClick={() => addPokemonToTeam(pokemon)}
                                    >Add to team</Button>
                                </div>
                            </GridItem>
                        </Grid>
                    </Box>
                </Flex>
                </Box>
            </div>

            {/*tool bar header end here*/}
            <Container className={styles.Namecontainer}>
                <Box boxShadow='2xl'>
                    {/**/}
                    <div className={styles.teamPokemonsCard}>
                        <div>
                            <Center>
                                <Text fontSize="3xl" pt='4' pb='4' fontWeight="extrabold"
                                      casing="capitalize">{pokemon?.name}</Text>
                            </Center>
                        </div>
                        <div>
                            <Center>
                                <Avatar size="1xl" name="Dan Abrahmov" src={pokemon.sprites?.front_default}/>
                                {/*<Image alt="images" src={pokemon.sprites?.front_default} style={{height: 400}}/>*/}
                            </Center>
                        </div>
                        <Center>
                            <div>
                                <Text fontSize="4xl" casing="capitalize" pt='4' pb='2'>Abilty names</Text>

                                <Box pt={2} pb={4}>
                                    {
                                        pokemon.abilities?.map((item) => {
                                            return (

                                                <div key={item}>
                                                    <Text fontSize="xl"> {item.ability.name}</Text>

                                                </div>
                                            )
                                        })
                                    }
                                </Box>
                            </div>
                        </Center>
                    </div>
                </Box>
            </Container>

        </div>
    )

}


