import dynamic from "next/dynamic";
import {ChakraProvider, extendTheme} from "@chakra-ui/react";
import Head from "next/head";
import "../styles/globals.css"

// import theme from "../theme"
const theme = extendTheme({})

function MyApp({Component, pageProps}) {
    return (
        <ChakraProvider theme={theme}>
            <Head>
                <title>Front-end test | Yosemitelabs</title>
            </Head>
            <Component {...pageProps} />
        </ChakraProvider>
    );
}

export default dynamic(() => Promise.resolve(MyApp), {
    ssr: false,
});
