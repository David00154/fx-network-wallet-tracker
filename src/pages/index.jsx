import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Container,
  Stack,
  Link,
  Button,
  Divider,
  Heading,
  Text,
  useColorModeValue,
  List,
  ListItem,
  ListIcon,
  chakra,
  VisuallyHidden
} from '@chakra-ui/react';
import {useState, useEffect} from "react";
import {MdCheckCircle, MdError, MdOutlineWarningAmber} from "react-icons/md"
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import Head from "next/head"
import supabase from "../database"


const SocialButton = ({
  children,
  label,
  href,
}) => {
  return (
    <chakra.button
      bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      rounded={"full"}
      w={8}
      h={8}
      cursor={"pointer"}
      as={"a"}
      href={href}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export default function Index() {
  // const [processingError, setProcessingError] = useState(false)
  const [balance, setBalance] = useState(null)
  const [level, setLevel] = useState('')
  const [loaded, setLoaded] = useState(false)
  const [loading, setloading] = useState(false)
  const [trackingNumber, setTrackingNumber] = useState('')
  const trackAddress = () => {
    setLoaded(false)
    setloading(true)
    if(trackingNumber == "") {
      alert("The input field should not be blank")
      setloading(false)
    } else {
      supabase
      .from("Order")
      .select("*")
      .eq('order_number', trackingNumber.trim())
      .then(({data: Order, error}) => {
        // console.log(Profile)
        // setNumbers(Order)
        if(error) {
          alert(error.message)
          setloading(false)
        } else if(Order.length == 0) {
          alert('Tracking number does not exist.')
          setloading(false)
        } else {
          setBalance(Order[0].balance)
          setLevel(Order[0].level)
          console.log(level)
          setloading(false)
          setLoaded(true)
        }
        // console.log(Order)
        // res.show('routes/admin/users', {layout: "layouts/admin", title: "Users", users: Profile})
      })
      .catch(error => {
        alert("Error while tracking")
        setloading(false)
        setLoaded(false)
        console.log(error)
      })
    }

  }
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
          <Heading fontSize={'3xl'}>TRACK & TRACE</Heading>
        </Stack>

        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Enter your tracking number</FormLabel>
              <Input type="text" value={trackingNumber} onChange={(e) => setTrackingNumber(e.target.value)} />
            </FormControl>
            <Stack spacing={10}>
              <Button
                bg={'blue.400'}
                onClick={trackAddress}
                isLoading={loading}
                loadingText="Tracking"
                colorScheme={"blue"}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Track
              </Button>
            </Stack>
          </Stack>
        </Box>

        {loaded && (
          <>
            <Text fontWeight="600" textAlign="left">Summary</Text>
            <Flex justify-content="space-between" direction="row" width="100%">
              <Text flex="1">
                Total
              </Text>
              <Text>
                {balance}
              </Text>
            </Flex>

          <List spacing={3}>
         {/*<ListItem>
           <ListIcon as={3 > 9 ? MdCheckCircle : MdOutlineWarningAmber} color={3 > 9 ? "green.500": "yellow.500"} />
           Ordered
         </ListItem>*/}
         <ListItem mb="5" fontWeight="500" fontSize="base">
          <ListIcon as={level == "stage1" || level == "stage2" || level == "stage3" ? MdCheckCircle : MdOutlineWarningAmber} color={level == "stage1" || level == "stage2" || level == "stage3" ? "green.500": "yellow.500"} />
           Ordered
           <Stack direction="row" h="45px" px="2">
           <Divider orientation="vertical" />
           <Text pl="2" py="1" fontWeight="400">
             To complete the transaction please send money to your wallet address
           </Text>
         </Stack>
         </ListItem>


            <>
               <ListItem fontWeight="500" mb="3">
                 <ListIcon as={level == "stage2" || level == "stage3" ? MdCheckCircle : MdOutlineWarningAmber} color={level == "stage2" || level == "stage3" ? "green.500": "yellow.500"} />
                 Verifying address
                 <Stack direction="row" h="45px" px="2">
                   <Divider orientation="vertical" />
                   <Text pl="1" fontWeight="400">
                     The address is been verified, we will send an email to you once it's completed.
                   </Text>
                 </Stack>
               </ListItem>
            </>


            <>
              <ListItem fontWeight="500" mt="3">
               <ListIcon 
               as={level == "stage3" ? MdError: MdOutlineWarningAmber} 
               color={level == "stage3" ? "red.500": "yellow.500"} />
               {level == "stage3" ? "Error processing wallet": "Processing Completed"}
               <Stack direction="row" h={level == "stage3" ? "45px": "0px"} px="2">
               <Divider orientation="vertical" />
                {level == "stage3" && (
                    <>
                      <Text pl="2" py="1" fontWeight="400">
                       An error was found!. Contact coinbase and explain the situation.
                     </Text>
                    </>
                )}
             </Stack>
             </ListItem>
            </>
             </List>


          </>
        )}

       </Stack>
      </Flex>






      <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Container
        as={Stack}
        maxW={"6xl"}
        py={4}
        direction={{ base: "column", md: "row" }}
        spacing={4}
        justify={{ base: "center", md: "space-between" }}
        align={{ base: "center", md: "center" }}
      >
        <Text>© 2021 Fx Network. All rights reserved</Text>
        <Stack direction={"row"} spacing={6}>
          <SocialButton label={"Twitter"} href={"#"}>
            <FaTwitter />
          </SocialButton>
          <SocialButton label={"YouTube"} href={"#"}>
            <FaYoutube />
          </SocialButton>
          <SocialButton label={"Instagram"} href={"#"}>
            <FaInstagram />
          </SocialButton>
        </Stack>
      </Container>
    </Box>
      </>
  )
}