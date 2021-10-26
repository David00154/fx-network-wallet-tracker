import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Divider,
  Heading,
  Text,
  useColorModeValue,
  List,
  ListItem,
  ListIcon
} from '@chakra-ui/react';
import {useState} from "react";
import {MdCheckCircle, MdError} from "react-icons/md"
import Head from "next/head"
import { useRouter } from 'next/router'

export default function Index() {
  const {index:balance} = useRouter().query
  return (
      <>
      <Head>
        <title>Wallet Tracker & Trace</title>
      </Head>
        <Flex
      minH={'100vh'}
      align={'center'}
      // pt={{ base: "90px", md: "0" }}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={10} px={5}>
          <Stack align={'center'}>
          <Heading fontSize={'4xl'}>TRACK & TRACE</Heading>
          <Flex justify-content="space-between" direction="row" width="100%">
            <Text flex="1">
              Total
            </Text>
            <Text>
              {balance}
            </Text>
          </Flex>
        </Stack>
        <List spacing={3}>
       <ListItem>
         <ListIcon as={MdCheckCircle} color="green.500" />
         Ordered
       </ListItem>
       <ListItem>
         <Stack direction="row" h="25px" px="2">
         <Divider orientation="vertical" />
       </Stack>
       </ListItem>
       {new Date().getMinutes() >= 28 && (
          <>
             <ListItem>
               <ListIcon as={MdCheckCircle} color="green.500" />
               Verifying address
             </ListItem>
             <ListItem className="mb-3">
               <Stack direction="row" h="108px" px="2">
               <Divider orientation="vertical" />
               <Text px="4">
                 We're just verifying  some of your details and will send you an email shortly. This normally takes between a few minutes and a few hours.
               </Text>
             </Stack>
             </ListItem>
          </>
        )}
       {new Date().getMinutes() >= 31 && (
          <>
            <ListItem>
             <ListIcon as={MdError} color="red.500" />
             Error processing wallet
           </ListItem>
           <ListItem className="mb-3">
             <Stack direction="row" h="108px" px="2">
             <Divider orientation="vertical" />
             <Text px="4">
               An error was found!. Contact coinbase and explain the situation.
             </Text>
           </Stack>
           </ListItem>
          </>
        )}
      {/* <ListItem>
           <ListIcon as={MdError} color="red.500" />
           <Text>Error</Text>
         </ListItem>
         <ListItem>
           <Stack direction="row" h="100px" px="2">
           <Divider orientation="vertical" />
           <Text px="4">An error was found!. Contact coinbase and explain the situation.</Text>
         </Stack>
         </ListItem>*/}
     </List>



       </Stack>
      </Flex>
      </>
  )
}