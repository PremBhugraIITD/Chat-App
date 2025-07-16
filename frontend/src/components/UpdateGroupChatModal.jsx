import { ChatState } from "../context/ChatProvider";
import { useState } from "react";
import {
  Dialog,
  Portal,
  createOverlay,
  Heading,
  CloseButton,
  Box,
  Field,
  Input,
  Button,
} from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";
import UserBadgeItem from "./UserBadgeItem";
import axios from "axios";

const UpdateGroupChatModal = createOverlay((props) => {
  const { fetchAgain, setFetchAgain, ...rest } = props;
  const { selectedChat, setSelectedChat, user } = ChatState();
  const [chatName, setChatName] = useState();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameLoading, setRenameLoading] = useState(false);
  const handleRemove = (u) => {};
  const handleRename = async (u) => {
    if (!chatName) {
      return;
    }
    try {
      setRenameLoading(true);
      const config = {
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        "api/chat/rename",
        {
          chatId: selectedChat._id,
          chatName: chatName,
        },
        config
      );
      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setRenameLoading(false);
    } catch (error) {
      console.error("Error renaming group chat:", error);
      setRenameLoading(false);
      toaster.create({
        description: "Failed to rename group chat",
        type: "error",
        duration: 5000,
        closable: true,
      });
    }
    setChatName("");
  };
  const handleSearch = (query) => {};
  return (
    <Dialog.Root {...rest} placement="top">
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content
            backgroundColor="white"
            color="black"
            display="flex"
            flexDirection="column"
            alignItems="center"
            height="35%"
          >
            <Heading size="5xl" marginY="3%" fontFamily="Work sans">
              {selectedChat.chatName.toUpperCase()}
            </Heading>
            <Dialog.Body
              display="flex"
              flexDirection="column"
              alignItems="center"
              width="90%"
            >
              <Box width="100%" display="flex" flexWrap="wrap" pb="3">
                {selectedChat.users.map((u) => {
                  return (
                    <UserBadgeItem
                      key={u._id}
                      user={u}
                      handler={() => {
                        handleRemove(u._id);
                      }}
                    />
                  );
                })}
              </Box>
              <Field.Root required display="flex" flexDirection="row">
                <Input
                  value={chatName}
                  mb="3"
                  placeholder="Chat Name"
                  onChange={(event) => {
                    setChatName(event.target.value);
                  }}
                />
                <Button
                  ml="1"
                  variant="solid"
                  colorPalette="teal"
                  loading={renameLoading}
                  onClick={handleRename}
                >
                  Rename
                </Button>
              </Field.Root>
              <Field.Root required display="flex">
                <Input
                  value={search}
                  mb="1"
                  placeholder="Add Users to group"
                  onChange={(event) => {
                    handleSearch(event.target.value);
                  }}
                />
              </Field.Root>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.CloseTrigger asChild>
                <CloseButton
                  size="sm"
                  variant="solid"
                  className="hover-navbar"
                />
              </Dialog.CloseTrigger>
              <Button
                marginTop="-40%"
                marginRight="-129%"
                variant="solid"
                colorPalette="red"
                onClick={() => {
                  handleRemove(user);
                }}
              >
                Leave Group
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
});

export default UpdateGroupChatModal;
