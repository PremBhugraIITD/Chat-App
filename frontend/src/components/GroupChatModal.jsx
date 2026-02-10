import {
  Dialog,
  Portal,
  createOverlay,
  Field,
  Input,
  Button,
  Heading,
  CloseButton,
  Box,
} from "@chakra-ui/react";
import { useState } from "react";
import { toaster } from "@/components/ui/toaster";
import api from "../config/api";
import UserListItem from "./UserListItem";
import UserBadgeItem from "./UserBadgeItem";
import { ChatState } from "../context/ChatProvider";

const GroupChatModal = createOverlay((props) => {
  const { user, ...rest } = props;
  const [chatName, setChatName] = useState("");
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const { chats, setChats } = ChatState();
  const handleSubmit = async () => {
    if (!chatName || !selectedUsers) {
      toaster.create({
        description: "Please fill all the fields",
        type: "warning",
        duration: 5000,
        closable: true,
      });
      return;
    }
    try {
      const config = {
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await api.post(
        "/chat/group",
        {
          name: chatName,
          users: JSON.stringify(selectedUsers.map((u) => u._id)),
        },
        config
      );
      setChats([data, ...chats]);
      toaster.create({
        description: "Group chat created successfully",
        type: "success",
        duration: 5000,
        closable: true,
      });
      GroupChatModal.close("group-chat");
    } catch (error) {
    //   console.error("Error creating group chat:", error);
      toaster.create({
        description: "Error creating group chat",
        type: "error",
        duration: 5000,
        closable: true,
      });
      return;
    }
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
  const handleGroup = (user) => {
    if (selectedUsers.includes(user)) {
      toaster.create({
        description: "User already selected",
        type: "warning",
        duration: 5000,
        closable: true,
      });
      return;
    }
    setSelectedUsers([...selectedUsers, user]);
  };
  const handleDelete = (user) => {
    setSelectedUsers(
      selectedUsers.filter((u) => {
        return user._id !== u._id;
      })
    );
    return;
  };
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
            // height="25%"
          >
            <Heading
              size="4xl"
              fontFamily="Work sans"
              display="flex"
              justifyContent="center"
              marginTop="4%"
              marginBottom="4%"
            >
              Create Group Chat
            </Heading>
            <Dialog.Body
              display="flex"
              flexDirection="column"
              alignItems="center"
              width="90%"
            >
              <Field.Root required width="100%" mb="3">
                <Input
                  value={chatName}
                  placeholder="Chat Name"
                  onChange={(event) => {
                    setChatName(event.target.value);
                  }}
                />
              </Field.Root>
              <Field.Root required width="100%" mb="1">
                <Input
                  value={search}
                  placeholder="Add Users eg: Taru, Prem, John"
                  onChange={(event) => {
                    setSearch(event.target.value);
                    handleSearch(event.target.value);
                  }}
                  mb="1"
                />
              </Field.Root>
              <Box width="100%" display="flex" flexWrap="wrap">
                {selectedUsers.map((user) => {
                  return (
                    <UserBadgeItem
                      key={user._id}
                      user={user}
                      handler={() => {
                        handleDelete(user);
                      }}
                    />
                  );
                })}
              </Box>
              {loading ? (
                <div>Loading...</div>
              ) : (
                searchResult?.slice(0, 4).map((user) => {
                  return (
                    <UserListItem
                      key={user._id}
                      user={user}
                      handler={() => {
                        handleGroup(user);
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
                marginTop="-20%"
                marginRight="-129%"
                variant="solid"
                colorPalette="cyan"
                onClick={handleSubmit}
              >
                Create Chat
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
});

export default GroupChatModal;
