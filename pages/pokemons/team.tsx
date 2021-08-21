import React from "react";
import useGlobal from "../../store";
import {Box, Button, Container, Flex, Grid, GridItem, Spacer, Text} from "@chakra-ui/react";
import styles from "../../styles/Home.module.css";
import Link from "next/link";
import {PokemonCard} from "../../components/PokemonCard";

const TeamPokemons: React.FC = () => {
    const [{teamPokemons}] = useGlobal();
    if (teamPokemons.length === 0) {
        return (
            <div>
                <Text>
                    Hello, no pokemons in your team, pokemons added to your team will live here
                </Text>
            </div>
        )
    }
    return (
        <div>
            <div className={styles.toolbarHeader}>
                <Flex>
                    <Box p="4">
                        <Text fontSize="2xl">List of pokemons</Text>
                    </Box>
                    <Spacer/>
                    <Box p={4}>
                        <Button colorScheme="teal" mr="4">
                            <Link href="/">
                                Add Pokemons
                            </Link>
                        </Button>

                        {/*<Button colorScheme="teal">Log in</Button>*/}
                    </Box>
                </Flex>
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