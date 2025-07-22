import { useState } from "react";
import { ChatState } from "../context/ChatProvider.jsx";
import { Box } from "@chakra-ui/react";
import SideDrawer from "../components/SideDrawer.jsx";
import MyChats from "../components/MyChats.jsx";
import ChatBox from "../components/ChatBox.jsx";

const ChatPage = () => {
  const { user } = ChatState();
  return (
    <div className="chatpage" style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box
        display="flex"
        justifyContent="space-between"
        width="100%"
        height="91.5vh"
        padding="10px"
      >
        {user && <MyChats />}
        {user && <ChatBox />}
      </Box>
    </div>
  );
};

export default ChatPage;
