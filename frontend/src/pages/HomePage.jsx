import React from "react";
import { Container, Box, Text, Tabs } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SignIn from "../components/SignIn.jsx";
import SignUp from "../components/SignUp.jsx";

const HomePage = () => {
  const [selectedTab, setSelectedTab] = useState("tab-2");
  const navigate = useNavigate();
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
      navigate("/chats");
    }
  }, [navigate]);
  return (
    <Container maxW="xl" centerContent>
      <Box
        display="flex"
        justifyContent="center"
        p={3}
        bg={"white"}
        width="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text fontSize="4xl" fontFamily="Work sans" color="black">
          Chatter
        </Text>
      </Box>
      <Box
        bg="white"
        width="100%"
        p={4}
        borderRadius="lg"
        borderWidth="1px"
        display="flex"
        justifyContent="center"
      >
        <Tabs.Root
          variant="plain"
          maxW="md"
          fitted
          defaultValue={"tab-1"}
          width="90%"
          loopFocus="true"
        >
          <Tabs.List>
            <Tabs.Trigger
              value="tab-1"
              color="black"
              borderRadius="50px"
              backgroundColor={selectedTab === "tab-2" && "#a6d7ed"}
              onClick={() => {
                setSelectedTab("tab-2");
              }}
              transition="background-color 0.3s ease-in-out"
            >
              Sign In
            </Tabs.Trigger>
            <Tabs.Trigger
              value="tab-2"
              color="black"
              borderRadius="50px"
              backgroundColor={selectedTab === "tab-1" && "#a6d7ed"}
              onClick={() => {
                setSelectedTab("tab-1");
              }}
              transition="background-color 0.2s ease-in-out"
            >
              Sign Up
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="tab-1" color="black">
            <SignIn />
          </Tabs.Content>
          <Tabs.Content value="tab-2" color="black">
            <SignUp />
          </Tabs.Content>
        </Tabs.Root>
      </Box>
    </Container>
  );
};

export default HomePage;
