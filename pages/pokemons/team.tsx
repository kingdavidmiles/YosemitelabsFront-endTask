import React from "react";
import useGlobal from "../../store";
import {Avatar, Box, Button, Center, Container, Flex, Grid, GridItem, Spacer, Text} from "@chakra-ui/react";
import Link from "next/link";
import {PokemonCard} from "../../components/PokemonCard";
import styles from "../../styles/Home.module.css";
const TeamPokemons: React.FC = () => {
    const [{teamPokemons}] = useGlobal();
    if (teamPokemons.length === 0) {
        return (
            //if no pokemon on team display this
            <div>
            <Center>
                <Text className={styles.EmptyPokmoncontainer}   fontSize="5xl">
                    Hello, no pokemons in your team, pokemons added to your team will live here
                </Text>
            </Center>
            </div>
        //
        )
    }
    return (
        <div>
            <div>
                <Box boxShadow="xl">
                    <Flex>
                        <Box p="5">
                            <Button colorScheme="teal" mr="4">
                                <Link href="/">
                                    Home
                                </Link>
                            </Button>

                        </Box>
                        <Spacer/>
                        <Box px='4' p='5'>
                            <Avatar
                                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/17.png"/>


                            {/*<Button colorScheme="teal">Log in</Button>*/}
                        </Box>
                    </Flex>
                </Box>
            </div>

            <Container maxW="container.xl">
                <div style={{
                    paddingTop: "3rem"
                }}>
                    <Text fontSize="2xl" fontWeight="extrabold">Pokemon Teams</Text>
                </div>
                <Grid

                    templateColumns="repeat(4, 1fr)"
                >
                    {teamPokemons?.flatMap(pokemon => (
                        <GridItem>
                            <PokemonCard showDeleteButton={true} pokemon={pokemon}/>
                        </GridItem>
                    ))}
                </Grid>
            </Container>
        </div>
    )
}


export default React.memo(TeamPokemons)