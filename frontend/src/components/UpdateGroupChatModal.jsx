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
import api from "../config/api";
import { FetchState } from "../context/FetchProvider";
import UserListItem from "./UserListItem";

const UpdateGroupChatModal = createOverlay((props) => {
  const { fetchAgain, setFetchAgain } = FetchState();
  const { selectedChat, setSelectedChat, user } = ChatState();
  const [chatName, setChatName] = useState("");
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameLoading, setRenameLoading] = useState(false);
  const handleRemove = async (u) => {
    if (selectedChat.groupAdmin._id != user._id && u._id != user._id) {
      toaster.create({
        description: "Only group admin can remove other users",
        type: "warning",
        duration: 5000,
        closable: true,
      });
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await api.delete("/chat/remove", {
        ...config,
        data: {
          chatId: selectedChat._id,
          userId: u._id,
        },
      });
      setLoading(false);
      setFetchAgain(!fetchAgain);
      if (u._id === user._id) {
        setSelectedChat();
        toaster.create({
          description: "You have left the group",
          type: "success",
          duration: 5000,
          closable: true,
        });
        return;
      } else {
        setSelectedChat(data);
        toaster.create({
          description: "User removed from group",
          type: "success",
          duration: 5000,
          closable: true,
        });
      }
    } catch (error) {
      setLoading(false);
      // console.error("Error removing user from group chat:", error);
      toaster.create({
        description: "Error removing user from group",
        type: "error",
        duration: 5000,
        closable: true,
      });
      return;
    }
  };
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
      const { data } = await api.put(
        "/chat/rename",
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
    //   console.error("Error renaming group chat:", error);
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
  const handleSearch = async (query) => {
    if (!query) {
      return;
    } else {
      try {
        setLoading(true);
        const config = {
          headers: {
            authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await api.get(
          `/user/search?key=${query}`,
          config
        );
        // console.log("Search Results:", data);
        setLoading(false);
        setSearchResult(data);
      } catch (error) {
        // console.error("Error occurred during search:", error);
        toaster.create({
          description: "Error occurred during search",
          type: "error",
          duration: 5000,
          closable: true,
        });
        setLoading(false);
      }
    }
  };
  const handleAdd = async (newUser) => {
    if (selectedChat.users.find((u) => u._id === newUser._id)) {
      //   console.log("User already in group");
      toaster.create({
        description: "User already in group",
        type: "warning",
        duration: 5000,
        closable: true,
      });
      return;
    }
    if (selectedChat.groupAdmin._id != user._id) {
      toaster.create({
        description: "Only group admin can add users",
        type: "warning",
        duration: 5000,
        closable: true,
      });
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await api.patch(
        `/chat/add`,
        {
          chatId: selectedChat._id,
          userId: newUser._id,
        },
        config
      );
      setLoading(false);
      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
    } catch (error) {
      setLoading(false);
      //   console.error("Error adding user to group chat:", error);
      toaster.create({
        description: "Error adding user to group",
        type: "error",
        duration: 5000,
        closable: true,
      });
      return;
    }
  };
  return (
    <Dialog.Root {...props} placement="top">
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content
            backgroundColor="white"
            color="black"
            display="flex"
            flexDirection="column"
            alignItems="center"
            // height="35%"
          >
            <Heading
              size="5xl"
              marginY="3%"
              fontFamily="Work sans"
              textAlign="center"
            >
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
                        handleRemove(u);
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
                    setSearch(event.target.value);
                    handleSearch(event.target.value);
                  }}
                />
              </Field.Root>
              {loading ? (
                <div>Loading...</div>
              ) : (
                searchResult?.slice(0, 4).map((newUser) => {
                  return (
                    <UserListItem
                      key={newUser._id}
                      user={newUser}
                      handler={() => {
                        handleAdd(newUser);
                      }}
                    />
                  );
                })
              )}
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
                marginTop="-15%"
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
