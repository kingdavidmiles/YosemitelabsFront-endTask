import React, {useEffect, useState} from "react";
import {ReactSearchAutocomplete} from 'react-search-autocomplete'
import Link from 'next/link'
import styles from "../styles/Home.module.css";
import {useRouter} from 'next/router'
import {Input, Container, Image, Center, Box, Text, Flex, Spacer, Button, Heading} from "@chakra-ui/react"
import useAxios from "axios-hooks";


function Home() {
    const router = useRouter()
    const [pokemons, setPokemons] = useState([])
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
            <div className={styles.toolbarHeader}>
                <Flex>
                    <Box p="4">
                        <Heading size="md">Chakra App</Heading>
                    </Box>
                    <Spacer/>
                    <Box p={4}>
                        <Button colorScheme="teal" mr="4">
                            <Link href={"/pokemons/team"}>
                                Team Pokemons
                            </Link>
                        </Button>
                        {/*<Button colorScheme="teal">Log in</Button>*/}
                    </Box>
                </Flex>
            </div>

            <Container maxW="xl" className={styles.container}>
                <div>
                    <Center>
                        <div>
                            <Center>
                                <Box pb={2}>
                                    <Image
                                        borderRadius="full"
                                        boxSize="150px"
                                        src="https://nextjs-blog-search-api.vercel.app/images/profile.jpg"
                                    />
                                </Box>
                            </Center>

                            <Box pt={0} pb={9}>
                                <Center>
                                    <Box>

                                        <Text fontSize="6xl">pokemons search</Text>
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
                                        autoFocus
                                    />
                                </div>
                            </header>
                        </Box>
                    </Center>

                </div>
            </Container>

        </div>
    )

}

// noinspection JSUnusedGlobalSymbols
export default React.memo(Home)
