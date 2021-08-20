import React from "react";
import useGlobal from "../../store";
import {
    Box,
    Button,
    Center,
    Container,
    Flex,
    Image,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalOverlay,
    Spacer,
    Text,
    useDisclosure
} from "@chakra-ui/react";
import styles from "../../styles/Home.module.css";
import Link from "next/link";
import {useRouter} from "next/router"

function Lorem(props: { count: number }) {
    return null;
}

function PokemonCard({pokemon}) {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [, {removePokemonFromTeam}] = useGlobal();

    const {name, spriteUrl} = pokemon
    const router = useRouter()
    const handleclick = (pokemons) => {
        router.push("/pokemons/" + pokemon.name)
    }

    return (
        <div>


            <Container className={styles.teamPokemonsCardcontainer}>


                {/**/}
                <div className={styles.teamPokemonsCard}>
                    <div>
                        <Center>
                            <Text fontSize="6xl">{pokemon.name}</Text>

                        </Center>
                    </div>
                    <div onClick={handleclick}>
                        <div>
                            <Center>
                                <Image alt="images" src={pokemon.sprites?.front_default} style={{height: 400}}/>
                            </Center>
                        </div>
                        <Center>
                            <div>
                                <Text fontSize="6xl">Abilty names</Text>

                                {
                                    pokemon.abilities?.map((item) => {
                                        return (

                                            <div key={item}>
                                                <Text fontSize="2xl"> {item.ability.name}</Text>

                                            </div>
                                        )
                                    })
                                }
                            </div>

                        </Center>
                    </div>
                    <Center>
                        <Box pb={4} pt={3}>
                            <div>
                                <Button colorScheme="teal" mr="4" onClick={onOpen}>Remove from team</Button>

                                <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
                                    <ModalOverlay/>
                                    <ModalContent>
                                        {/*<ModalHeader></ModalHeader>*/}

                                        {/*<ModalCloseButton />*/}
                                        <ModalBody pb={6}>
                                            <Lorem count={2}/>

                                        </ModalBody>
                                        <Text fontSize="2xl">
                                            <Box px={2}>
                                                are you sure you want to delete<b> {pokemon.name}</b> from the list
                                            </Box>
                                        </Text>
                                        <ModalFooter>
                                            <Button onClick={() => removePokemonFromTeam(pokemon.id)} colorScheme="pink"
                                                    mr="4">
                                                Delete item
                                            </Button>
                                            <Button onClick={onClose}>Cancel</Button>
                                        </ModalFooter>
                                    </ModalContent>
                                </Modal>
                            </div>
                        </Box>
                    </Center>
                </div>


            </Container>
        </div>
    );
}

const TeamPokemons: React.FC = () => {

    const [{teamPokemons}] = useGlobal();
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
            {teamPokemons.flatMap(pokemon => (<PokemonCard pokemon={pokemon}/>))}
        </div>
    )
}


export default React.memo(TeamPokemons)