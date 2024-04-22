import React, { useState } from 'react'
import toast from "react-hot-toast"
import { Button, FormControl, FormLabel, Input, VStack} from "@chakra-ui/react"

import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const[loading,setLoading]=useState(false);
    const navigate=useNavigate();

    const guestHandler=()=>{
        setEmail("guest@example.com");
        setPassword("123456");
    }

    const submitHandler= async ()=>{
        setLoading(true);
        if(!password || !email){
            toast.error('Please fill all the field');
            setLoading(false);
            return;
        }
        try {
            const config={
                headers:{
                    "Content-type":"application/json",
                },
            };
            const {data}=await axios.post('/api/user/login',
                {email,password},
            config
            );

            toast.success('Logged in Successfully');
            localStorage.setItem("userInfo",JSON.stringify(data));
            setLoading(false);
            navigate("/chat")
        }catch (error) {
            toast.error('Error Occurred!');
            setLoading(false);
        }
    };


  return (
    <VStack>
        <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input
                placeholder='Enter Your Email'
                onChange={(e)=>{setEmail(e.target.value)}}
                value={email}
            />
        </FormControl>
        <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <Input
                value={password}
                type='password'
                placeholder='Enter Your Password'
                onChange={(e)=>{setPassword(e.target.value)}}
            />
        </FormControl>
        <FormControl>
            <Button w={"100%"} rounded={"full"} isLoading={loading} onClick={submitHandler} colorScheme='blue' >Login</Button>
        </FormControl>
        <FormControl>
            <Button w={"100%"} variant={"solid"} rounded={"full"} color={"black"} onClick={guestHandler} colorScheme='red'>Get Guest User Credentials</Button>
        </FormControl>
    </VStack>
  )
}

export default Login