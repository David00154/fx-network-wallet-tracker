import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react'
import {useEffect, useState} from "react"
import supabase from "../database"
import theme from '../theme'

function MyApp({ Component, pageProps }) {
  const [success, setSuccess] = useState(false)
  useEffect(() => {
    supabase.auth
    .signIn({
      email: "davidbriggs00154@gmail.com",
      password: "admin@00154",
    })
    .then(({ user, error }) => {
      // setSubmitting(true);
      if (user) {
        console.log("Good")
        setSuccess('true')
      } else if (error) {
        console.log("Bad")
        console.log(error.message)
        alert(error.message + '. Reload your browser')
        // setSuccess(false);
      }
    })
    .catch((e) => {
      // setSuccess(false);
      alert("Internal Server Error");
      console.log(e);
    });
  }, [])

  if(!success) {
    return null
  } 

  return (
    <ChakraProvider resetCSS theme={theme}>
      <ColorModeProvider
        options={{
          useSystemColorMode: true,
        }}
      >
        <Component {...pageProps} />
      </ColorModeProvider>
    </ChakraProvider>
  )
}

export default MyApp
