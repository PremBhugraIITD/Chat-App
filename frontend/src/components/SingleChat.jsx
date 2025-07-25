import { Box, IconButton, Input, Spinner, Text, Field } from "@chakra-ui/react";
import { ChatState } from "../context/ChatProvider.jsx";
import { getSender, getSenderFull } from "../config/chatLogic.js";
import ProfileModal from "./ProfileModal";
import UpdateGroupChatModal from "./UpdateGroupChatModal.jsx";
import { FetchState } from "../context/FetchProvider.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import { toaster } from "@/components/ui/toaster";
import "./SingleChat.css";
import ScrollableChat from "./ScrollableChat.jsx";
import { io } from "socket.io-client";
import Lottie from "react-lottie";
import animationData from "../animations/typing.json";

const ENDPOINT = "http://localhost:3000";
let socket, selectedChatCompare;

const SingleChat = () => {
  const { fetchAgain, setFetchAgain } = FetchState();
  const { user, selectedChat, setSelectedChat } = ChatState();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      socket.emit("stop typing", selectedChat);
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${user.token}`,
          },
        };
        setNewMessage("");
        const { data } = await axios.post(
          "api/message",
          {
            content: newMessage,
            chatId: selectedChat._id,
          },
          config
        );
        socket.emit("new message", data);
        setMessages([...messages, data]);
        // console.log("Message sent:", data);
      } catch (error) {
        // console.error("Error sending message:", error);
        toaster.create({
          description: "Error sending message",
          type: "error",
          duration: 5000,
          closable: true,
        });
      }
    }
  };
  const typingHandler = (event) => {
    setNewMessage(event.target.value);
    if (!socketConnected) {
      return;
    } else {
      if (!typing) {
        setTyping(true);
        socket.emit("typing", selectedChat);
        // console.log("User is typing...");
      }
      let lastTypingTime = new Date().getTime();
      setTimeout(() => {
        let timeNow = new Date().getTime();
        let timeDiff = timeNow - lastTypingTime;
        if (timeDiff >= 3000 && typing) {
          socket.emit("stop typing", selectedChat);
          // console.log("User stopped typing");
          setTyping(false);
        }
      }, 3000);
    }
  };
  const fetchMessages = async () => {
    if (!selectedChat) {
      return;
    } else {
      try {
        setLoading(true);
        const config = {
          headers: {
            authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.get(
          `api/message/${selectedChat._id}`,
          config
        );
        setMessages(data);
        setLoading(false);
        socket.emit("join chat", selectedChat._id);
      } catch (error) {
        // console.error("Error fetching messages:", error);
        setLoading(false);
        toaster.create({
          description: "Error fetching messages",
          type: "error",
          duration: 5000,
          closable: true,
        });
      }
    }
  };
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => {
      setSocketConnected(true);
    });
    socket.on("typing", () => {
      // console.log("User is typing...");
      setIsTyping(true);
    });
    socket.on("stop typing", () => {
      // console.log("User stopped typing");
      setIsTyping(false);
    });
  }, []);
  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);
  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageReceived.chat._id
      ) {
        //notification
      } else {
        setMessages([...messages, newMessageReceived]);
      }
    });
  });
  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            fontFamily="Work sans"
            color="black"
            pt="1"
            pb="3"
            px="2"
            width="97.5%"
            display="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
          >
            <IconButton
              variant="solid"
              backgroundColor="#ede8e8"
              className="click-drawer"
              display={{ base: "flex", md: "none" }}
              onClick={() => {
                setSelectedChat("");
              }}
              mt="2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-arrow-left"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
                />
              </svg>
            </IconButton>
            {selectedChat.isGroupChat ? (
              <>
                {selectedChat.chatName.toUpperCase()}
                <IconButton
                  variant="solid"
                  backgroundColor="#ede8e8"
                  className="click-drawer"
                  onClick={() => {
                    UpdateGroupChatModal.open("update-chat", {});
                  }}
                  mt="2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="50%"
                    height="50%"
                    fill="currentColor"
                    className="bi bi-eye-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                    <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                  </svg>
                </IconButton>
                <UpdateGroupChatModal.Viewport />
              </>
            ) : (
              <>
                {getSender(user, selectedChat.users)}
                <IconButton
                  variant="solid"
                  backgroundColor="#ede8e8"
                  className="click-drawer"
                  onClick={() => {
                    const userFull = getSenderFull(user, selectedChat.users);
                    ProfileModal.open("profile", {
                      name: userFull.name,
                      email: userFull.email,
                      pic: userFull.pic,
                    });
                  }}
                  mt="2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="50%"
                    height="50%"
                    fill="currentColor"
                    className="bi bi-eye-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                    <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                  </svg>
                </IconButton>
                <ProfileModal.Viewport />
              </>
            )}
          </Text>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="flex-end"
            p="3"
            width="97.5%"
            height="91.5%"
            backgroundColor="#e8e8e8"
            borderRadius="lg"
            overflowY="hidden"
          >
            {loading ? (
              <Spinner
                size="xl"
                width="20"
                height="20"
                alignSelf="center"
                margin="auto"
              />
            ) : (
              <div className="messages">
                <ScrollableChat messages={messages} />
              </div>
            )}
            <Field.Root required onKeyDown={sendMessage} mt="3">
              {isTyping ? (
                <div>
                  <Lottie
                    options={defaultOptions}
                    width="70"
                    height="10"
                    style={{ marginBottom: 5, marginLeft: 0 }}
                  />
                </div>
              ) : (
                <></>
              )}
              <Input
                variant="outline"
                css={{ "--focus-color": "black" }}
                backgroundColor="#e0e0e0"
                placeholder="Enter a message..."
                onChange={typingHandler}
                value={newMessage}
              />
            </Field.Root>
          </Box>
        </>
      ) : (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="100%"
          width="100%"
        >
          <Text
            fontSize="5xl"
            fontFamily="Work sans"
            color="black"
            textAlign="center"
          >
            Select a chat to start messaging
          </Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
