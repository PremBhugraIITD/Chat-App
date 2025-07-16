import { Box, IconButton, Text } from "@chakra-ui/react";
import { ChatState } from "../context/ChatProvider.jsx";
import { getSender, getSenderFull } from "../config/chatLogic.js";
import ProfileModal from "./ProfileModal";
import UpdateGroupChatModal from "./UpdateGroupChatModal.jsx";

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { user, selectedChat, setSelectedChat } = ChatState();
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
                    UpdateGroupChatModal.open("update-chat", {
                      fetchAgain,
                      setFetchAgain,
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
          ></Box>
        </>
      ) : (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="100%"
          width="100%"
        >
          <Text fontSize="5xl" fontFamily="Work sans" color="black">
            Select a chat to start messaging
          </Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
