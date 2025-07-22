import { Box } from "@chakra-ui/react";
import { ChatState } from "../context/ChatProvider";
import SingleChat from "./SingleChat";
import { FetchState } from "../context/FetchProvider";

const ChatBox = () => {
  const { fetchAgain, setFetchAgain } = FetchState();
  const { selectedChat } = ChatState();
  return (
    <Box
      display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      flexDirection="column"
      alignItems="center"
      width={{ base: "100%", md: "68%" }}
      borderRadius="lg"
      borderWidth="1px"
      backgroundColor="white"
      color="black"
    >
      <SingleChat />
    </Box>
  );
};

export default ChatBox;
