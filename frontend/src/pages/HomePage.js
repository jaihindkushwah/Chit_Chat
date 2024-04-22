import React, { useEffect } from 'react'
import {Box, Container, Text,Tabs,TabList,Tab,TabPanel,TabPanels} from "@chakra-ui/react"
import Login from '../components/Login'
import SignUp from '../components/SignUp'
import { useNavigate, } from 'react-router-dom'

function HomePage() {
  const navigate=useNavigate();

  useEffect(()=>{
    const user=JSON.parse(localStorage.getItem("userInfo"));
    console.log(user);
    if(user){
      navigate("/chat");
    }
  },[navigate])

  return (
    <Container>
    
      <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      bg={"white"}
      width={"100%"}
      margin={"20px 0 28px 0"}
      borderRadius={"lg"}
      borderWidth={"1px"}
      >
      <Text fontFamily={"sans"} color={"black"} fontSize={"3xl"}> Chit Chat </Text>
      </Box>
      <Box
        bg={"white"}
        w={"100%"}
        p={4}
        borderRadius={"lg"}
        borderWidth={"1px"}
      >
        <Tabs variant='soft-rounded'>
          <TabList>
            <Tab w={"50%"}>Login</Tab>
            <Tab w={"50%"}>Sign up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login/>
            </TabPanel>
            <TabPanel>
              <SignUp/>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>

    </Container>
  )
}

export default HomePage