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
  VisuallyHidden,
  Tbody,
  Tr,
  Thead,
  Table,
  TableCaption,
  Th,
  Td,
} from '@chakra-ui/react';
import {useState, useEffect} from "react";
import Head from "next/head"
// 
import supabase from "../../database"

export default function CreateCode() {
  const user = supabase.auth.user();
  const [userId, setUserId] = useState("");
  const [level, setLevel] = useState("");
  const [trackingNumber, setTrackingNumber] = useState("");
  const [balance, setBalance] = useState("");
  const [numbers, setNumbers] = useState([])
  const [success, setSuccess] = useState(false)
  const [success2, setSuccess2] = useState(false)

  useEffect(() => {
    getNumbers()
  }, [])

  const getNumbers = () => {
    supabase
    .from("Order")
    .select("*")
    .then(({data: Order, error}) => {
      // console.log(Profile)
      setNumbers(Order)
      console.log(Order)
      // res.show('routes/admin/users', {layout: "layouts/admin", title: "Users", users: Profile})
    })
    .catch(error => {
      alert("Error, try reload")
      console.log(error)
    })
  }

  const upDateTrackingNumber = () => {
    setSuccess2(true)
    if(userId == "") {
      alert("The Id field should not be empty")
      setSuccess2(false)
    } else {
        supabase
        .from('Order')
        .update({ level, balance, order_number: trackingNumber })
        .eq('id', userId)
        .then(({data, error}) => {
          if(error) {
            alert(error.message)
            setUserId("")
            setLevel("")
            setBalance("")
            setTrackingNumber("")
            setSuccess2(false)
          } else {
            setSuccess2(false)
            alert("Successfully updated the tracking code")
            setUserId("")
            setLevel("")
            setBalance("")
            setTrackingNumber("")
          }
        }).catch((e) => {
          setSuccess2(false)
          alert("Internal Server Error")
          setUserId("")
          setLevel("")
          setBalance("")
          setTrackingNumber("")
          console.log(e)
        })
    }
  }
  const createTrackingNumber = () => {
    setSuccess(true)
    supabase
    .from("Order")
    .insert({
    level,
    balance,
    order_number: trackingNumber,
  }).then(({data, error}) => {
    if(error) {
      alert(error.message)
      setUserId("")
      setLevel("")
      setBalance("")
      setTrackingNumber("")
      setSuccess(false)
    } else {
      setSuccess(false)
      alert("Successfully created a tracking code")
      setUserId("")
      setLevel("")
      setBalance("")
      setTrackingNumber("")
    }
  }).catch((e) => {
    setSuccess(false)
    alert("Internal Server Error")
    setUserId("")
    setLevel("")
    setBalance("")
    setTrackingNumber("")
    console.log(e)
  })
  }

  return (
    <>
      <Head>
        <title>Create Tracking Code | Fx Network</title>
      </Head>

      <Box
        rounded={'lg'}
        bg={useColorModeValue('white', 'gray.700')}
        boxShadow={'lg'}
        p={8}>
        <Stack spacing={4}>
          <FormControl>
            <FormLabel>Enter id</FormLabel>
            <Input value={userId} onChange={(e) => setUserId(e.target.value)} type="text" placeHolder="This place is for when you want to update the tracking number"/>
          </FormControl>
          <FormControl>
            <FormLabel>Enter level</FormLabel>
            <Input value={level} onChange={(e) => setLevel(e.target.value)} type="text" placeHolder="Eg. stage1 or stage2 or stage3." />
          </FormControl>
          <FormControl>
            <FormLabel>Enter Balance</FormLabel>
            <Input value={balance} onChange={(e) => setBalance(e.target.value)} type="text" placeHolder="This place is for only when you want to create the tracking number" />
          </FormControl>
          <FormControl>
            <FormLabel>Enter Tracking Number</FormLabel>
            <Input value={trackingNumber} onChange={(e) => setTrackingNumber(e.target.value)} type="text" placeHolder="This place is for only when you want to create the tracking number" />
          </FormControl>
          <Stack spacing={5}>
            <Button
              bg={'blue.400'}
              isLoading={success}
              loadingText="Creating"
              colorScheme={"blue"}
              onClick={createTrackingNumber}
              color={'white'}
              _hover={{
                bg: 'blue.500',
              }}>
              Create Tracking Code
            </Button>
            <Button
              bg={'teal.400'}
              isLoading={success2}
              loadingText="Updating"
              colorScheme={"teal"}
              onClick={upDateTrackingNumber}
              color={'white'}
              _hover={{
                bg: 'teal.500',
              }}>
              Update Tracking Code
            </Button>
          </Stack>
        </Stack>
        </Box>

      <Flex flexDirection="column" pt={{ base: "120px", md: "90px" }}
          bg={useColorModeValue('gray.50', 'gray.800')}
          overflowY={"auto"}> 



     <Box>
        <Table variant="simple" overflowY={"auto"}>
        <TableCaption>List of users</TableCaption>
        <Thead>
          <Tr>
            <Th>Id</Th>
            <Th>Level</Th>
            <Th>Tracking Number</Th>
            <Th>Balance</Th>
          </Tr>
        </Thead>
        <Tbody>
          {numbers.map(({id, level, balance, order_number}, i) => {
            return (
              <Tr key={i}>
                <Td>{id}</Td>
                <Td>{level}</Td>
                <Td>{order_number}</Td>
                <Td>{balance}</Td>
              </Tr>
            )
          })}
        </Tbody>
      </Table>
     </Box>
    </Flex>
    </>
  )
}