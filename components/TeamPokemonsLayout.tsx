import  React from "react"
import styles from "../styles/Home.module.css";
import {Box, Button, Flex, Heading, Spacer, Text,Image} from "@chakra-ui/react";
import Link from "next/link";


export function HomeLayout() {

    return(
        <div className={styles.toolbarHeader} >
            <Box boxShadow="xl">
                <Flex>
                    <Box p="4">
                        <Button colorScheme="teal" mr="4">
                            <Link href="/">
                                Home
                            </Link>
                        </Button>

                    </Box>
                    <Spacer/>
                    <Box p={4}>
                      <Image alt="pokemon" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/17.png"/>

                        {/*<Button colorScheme="teal">Log in</Button>*/}
                    </Box>
                </Flex>
            </Box>

        </div>
    )
}