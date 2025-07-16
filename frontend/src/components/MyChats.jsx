import { ChatState } from "../context/ChatProvider.jsx";
import ChatLoading from "./ChatLoading.jsx";
import GroupChatModal from "./GroupChatModal.jsx";
import { getSender } from "../config/chatLogic.js";
import { toaster } from "@/components/ui/toaster";
import { useState, useEffect } from "react";
import axios from "axios";
import { Box, Button, Stack, Text } from "@chakra-ui/react";

const MyChats = ({fetchAgain}) => {
  const [loggedUser, setLoggedUser] = useState();
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`api/chat`, config);
      setChats(data);
    } catch {
      toaster.create({
        description: "Error occurred loading chats",
        type: "error",
        duration: 5000,
        closable: true,
      });
    }
  };
  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, [fetchAgain]);
  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDirection="column"
      alignItems="center"
      p="3"
      backgroundColor="white"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <Box
        pb="3"
        px="3"
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Work sans"
        display="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
        color="black"
      >
        My Chats
        <Button
          display="flex"
          fontSize={{ base: "17px", md: "10px", lg: "17px" }}
          color="black"
          fontWeight="semibold"
          className="click-drawer"
          backgroundColor="#ede8e8"
          border="solid 0.5px black"
          onClick={() => {
            GroupChatModal.open("group-chat", {
              user: loggedUser,
            });
          }}
        >
          New Group Chat
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-plus-lg"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"
            />
          </svg>
        </Button>
        <GroupChatModal.Viewport />
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        p="3"
        backgroundColor="#f8f8f8"
        width="100%"
        height="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
        {chats ? (
          <Stack overflowY="scroll">
            {chats.map((chat) => {
              return (
                <Box
                  onClick={() => {
                    setSelectedChat(chat);
                  }}
                  cursor="pointer"
                  bg={selectedChat === chat ? "#3882ac" : "#e8e8e8"}
                  color={selectedChat === chat ? "white" : "black"}
                  px="3"
                  py="2"
                  borderRadius="lg"
                  key={chat._id}
                >
                  <Text>
                    {chat.isGroupChat
                      ? chat.chatName
                      : getSender(loggedUser, chat.users)}
                  </Text>
                </Box>
              );
            })}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
