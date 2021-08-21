import {
    Avatar,
    Box,
    Button,
    Center,
    Container,
    Grid,
    GridItem,
    ListItem,
    Modal,
    ModalContent,
    ModalFooter,
    ModalOverlay,
    Text,
    UnorderedList,
    useDisclosure
} from "@chakra-ui/react";
import useGlobal from "../store";
import {useRouter} from "next/router";
import styles from "../styles/Home.module.css";
import {DeleteIcon} from "@chakra-ui/icons";
import React from "react";

export function PokemonCard({pokemon, showDeleteButton}) {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [, {removePokemonFromTeam}] = useGlobal();

    const {name, spriteUrl} = pokemon
    const router = useRouter()

    const gotoPokemon = (pokemons) => {
        router.push("/pokemons/" + pokemon.name)
    }

    return (
        <div>
            <Container className={styles.teamPokemonsCardcontainer}>
                <div>
                    <Box boxShadow="2xl" maxW="sm" borderRadius="lg" overflow="hidden">
                        <Box p="6">
                            <Grid templateColumns="repeat(6, 1fr)" gap={1}>
                                <GridItem colSpan={4}>
                                    <Text casing="capitalize" fontSize="2xl">{pokemon.name}</Text>
                                </GridItem>
                                {showDeleteButton && (
                                    <GridItem colStart={6}>
                                        <Button
                                            onClick={onOpen}
                                            colorScheme="teal" variant="outline">
                                            <DeleteIcon/>
                                        </Button>
                                    </GridItem>
                                )}
                            </Grid>

                            <Center
                                onClick={() => gotoPokemon(pokemon)}
                            >
                                <Avatar size="xl" src={pokemon.sprites?.front_default}/>
                            </Center>
                            <Text fontSize="2xl">Abilities</Text>
                            <UnorderedList>
                                {pokemon.abilities?.map(({ability}, i) => (
                                    <ListItem key={i}>{ability.name}</ListItem>
                                ))}
                            </UnorderedList>
                        </Box>
                    </Box>
                </div>
                {/**/}
                <div className={styles.teamPokemonsCard}>
                    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay/>
                        <ModalContent>
                            <Text fontSize="2xl">
                                <Box px={2} py={2}>
                                    Remove <b>{pokemon.name}</b> from your team?
                                </Box>
                            </Text>
                            <ModalFooter>
                                <Button onClick={() => removePokemonFromTeam(pokemon)} colorScheme="pink" mr="4">
                                    Remove
                                </Button>
                                <Button onClick={onClose}>Cancel</Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </div>


            </Container>
        </div>
    );
}