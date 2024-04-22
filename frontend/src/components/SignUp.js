import React, { useState } from 'react'
import { Button, FormControl, FormLabel, Input, VStack} from "@chakra-ui/react"
import toast  from 'react-hot-toast';
import axios from "axios"
import {useNavigate} from "react-router-dom"

function SignUp() {
    const[name,setName]=useState('');
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const[confirmPassword,setConfirmPassword]=useState('');
    const[pic,setPic]=useState('');
    const[loading,setLoading]=useState(false);
    const navigate=useNavigate();

    // https://api.cloudinary.com/v1_1/dm8cjg3rp
    
    const postDetails=(pics)=>{
        setLoading(true);
        if(pics===undefined){
            toast.error("Please select an Image!");
            setLoading(false);
            return;
        }
        if(pics.type==="image/jpeg" || pics.type==='image/png'){
            const data=new FormData();
            data.append('file',pics);
            data.append("upload_preset","Chat-App");
            data.append("cloud_name","jai-image");
            fetch("https://api.cloudinary.com/v1_1/jai-image/image/upload",{
                method:'post',
                body:data
            })
            .then((res)=>res.json())
            .then((res)=>{
                setLoading(false);
                setPic(res.url.toString());
            })
            .catch((err)=>{
                console.log(err);
                setLoading(false);
            })
        }
        else{
            toast.error("Please select an Image!");
            setLoading(false);
            return;
        }
    }

    const submitHandler= async ()=>{
        setLoading(true);
        if(!name || !password || !email ||!confirmPassword){
            toast.error("Please fill all the field");
            setLoading(false);
            return;
        }
        if(password!==confirmPassword){
            toast.error("Password not match!");
            return;
        }

        try {
            const config={
                headers:{
                    "Content-type":"application/json",
                },
            };
            const {data}=await axios.post('/api/user',
                {name,email,password,pic},
            config
            );
            toast.success("Registration Successful");
            localStorage.setItem("userInfo",JSON.stringify(data));
            setLoading(false);
            navigate("/chat")
            
        }catch (error) {
            toast.error("Error Occurred!")
            setLoading(false);
        }

    };


  return (
    <VStack spacing={"2px"}>
        <FormControl id='first-name' isRequired>
            <FormLabel>Name</FormLabel>
            <Input
                placeholder='Enter Your Name'
                onChange={(e)=>{setName(e.target.value)}}
            />
        </FormControl>
        <FormControl id='email' isRequired>
            <FormLabel>Email</FormLabel>
            <Input
                placeholder='Enter Your Email'
                onChange={(e)=>{setEmail(e.target.value)}}
            />
        </FormControl>
        <FormControl id='password' isRequired>
            <FormLabel>Password</FormLabel>
            <Input
                type='password'
                placeholder='Enter Your Password'
                onChange={(e)=>{setPassword(e.target.value)}}
            />
        </FormControl>
        <FormControl id='confirm-password' isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <Input
                type='password'
                placeholder='Enter Your Confirm Password'
                onChange={(e)=>{setConfirmPassword(e.target.value)}}
            />
        </FormControl>
        <FormControl isRequired>
            <FormLabel>Upload Profile Picture</FormLabel>
            <Input
                placeholder='Select Your Picture'
                accept='image/*'
                type='file'
                p={1.5}
                onChange={(e)=>{postDetails(e.target.files[0])}}
            />
        </FormControl>
        <FormControl marginTop={"5px"}>
            <Button w={"100%"} isLoading={loading} rounded={"full"} colorScheme='blue'
                onClick={submitHandler}
             >Sign Up</Button>
        </FormControl>
    </VStack>
  )
}

export default SignUp