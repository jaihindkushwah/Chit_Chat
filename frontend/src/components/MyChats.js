import React, { useEffect, useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import { Box, Button, Stack, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import { AddIcon } from "@chakra-ui/icons";
import ChatLoading from "./ChatLoading";
import { getSender } from "../config/ChatLogic";
import GroupChatModel from "./miscellaneous/GroupChatModel";

function MyChats({fetchAgain}) {
  const [loggedUser, setLoggedUser] = useState({});
  const { user, setSelectedChat, chats, setChats, selectedChat } = ChatState();

  const toast = useToast();

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const {data} = await axios.get("/api/chat", config);
      setChats(data);
    } catch (error) {
      toast({
        title: "Error Occured",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };
  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchAgain]);


  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <Box
        px={3}
        pb={3}
        w="100%"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        fontFamily={"Work sans"}
        fontSize={{ base: "28px", md: "30px" }}
      >
       My Chats
       <GroupChatModel>
        <Button display={"flex"} fontSize={{ base: "17px", md: "10px", lg: "17px" }} rightIcon={<AddIcon />}>
          New Group Chat
        </Button>
       </GroupChatModel>
      </Box>

      <Box
        display="flex"
        flexDir="column"
        p={3}
        bg="#F8F8F8"
        width="100%"
        minHeight={"78vh"}
        borderRadius="lg"
        overflowY="hidden"
        >
        {chats ? (
          <Stack overflow={"scroll"}>
            {chats?.map((chat) => (
             chat?<Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                color={selectedChat === chat ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
                key={chat._id}
              >
                {
                  chat.users?<Text>
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                  </Text>:null
                }
              </Box>:null
            ))}
          </Stack>
        ): <ChatLoading/>}
        </Box>
    </Box>
  );
}

export default MyChats;
