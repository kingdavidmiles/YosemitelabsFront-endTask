import React from "react";
import {ReactSearchAutocomplete} from 'react-search-autocomplete'
import styles from "../../styles/Home.module.css";
import Link from 'next/link'
import {
    Container,
    Image,
    Center,
    Box,
    Text,
    Flex,
    Spacer,
    Button,
    Heading,
    List,
    ListItem,
    ListIcon,
    OrderedList,
    UnorderedList
} from "@chakra-ui/react"

export default function Home() {

    const [value, setValue] = React.useState("")
    const handleChange = (event) => setValue(event.target.value)
    return (
        <div>
            {/*tool bar header*/}
            <div className={styles.toolbarHeader}>
                <Flex>
                    <Box p="4">
                        <Heading size="md">pokemons</Heading>
                    </Box>
                    <Spacer/>
                    <Box p={4}>
                        <Button colorScheme="teal" mr="4">
                            Add to team
                        </Button>
                        {/*<Button colorScheme="teal">Log in</Button>*/}
                    </Box>
                </Flex>
            </div>

            <Container maxW="xl" className={styles.container}>
                <div>
                    <Center>
                        <div>
                            <Box pt={0} pb={2}>

                                <Box>
                                    <Center>
                                        <Text fontSize="6xl">pokemons</Text>
                                    </Center>
                                </Box>

                            </Box>
                            <Center>
                                <Box pb={2}>
                                    <Image
                                        borderRadius="full"
                                        boxSize="150px"
                                        src="https://nextjs-blog-search-api.vercel.app/images/profile.jpg"
                                        alt="Segun Adebayo"
                                    />
                                </Box>


                            </Center>


                        </div>

                    </Center>

                    {/*input search*/}

                    <Box pt={9}>
                        <Center>


                            <div>
                                <List spacing={3}>

                                      <ListItem className={styles.listStyle}>

                                       <Link href={"/pokemons/pokemonId"}>   Lorem ipsum dolor sit amet, consectetur adipisicing elit</Link>
                                      </ListItem>



                                    <ListItem className={styles.listStyle}>

                                       <Link href={"/pokemons/pokemonId"}>
                                           Assumenda, quia temporibus eveniet a libero incidunt suscipit
                                       </Link>
                                    </ListItem>


                                    <ListItem className={styles.listStyle}>
                             
                                       <Link href={"/pokemons/pokemonId"}>
                                           Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
                                       </Link>
                                    </ListItem>

                                </List>
                            </div>
                        </Center>
                    </Box>
                </div>
            </Container>

        </div>
    )

}


