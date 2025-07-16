import { Box } from "@chakra-ui/react";
import { ChatState } from "../context/ChatProvider";
import SingleChat from "./SingleChat";

const ChatBox = ({ fetchAgain, setFetchAgain }) => {
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
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  );
};

export default ChatBox;
