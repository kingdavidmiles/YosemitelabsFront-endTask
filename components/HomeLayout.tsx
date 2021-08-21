import  React from "react"
import styles from "../styles/Home.module.css";
import {Box, Button, Flex, Heading, Spacer} from "@chakra-ui/react";
import Link from "next/link";


export function HomeLayout() {

return(
    <div className={styles.toolbarHeader} >
        <Box boxShadow="xl">
            <Flex>
                <Box p="4">
                    <Heading size="md">Yosemitelabs Front-end Task</Heading>
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
        </Box>

    </div>
)
}