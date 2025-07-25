import React, { useState } from "react";
import { Tooltip } from "@/components/ui/tooltip";
import {
  Box,
  Button,
  Text,
  Menu,
  Avatar,
  Drawer,
  CloseButton,
  Portal,
  Input,
  Spinner,
} from "@chakra-ui/react";
import { ChatState } from "../context/ChatProvider.jsx";
import ProfileModal from "./ProfileModal.jsx";
import { useNavigate } from "react-router-dom";
import { toaster } from "@/components/ui/toaster";
import ChatLoading from "./ChatLoading.jsx";
import UserListItem from "./UserListItem.jsx";
import axios from "axios";
import { getSender } from "../config/chatLogic.js";
import Badge from "@mui/material/Badge";

const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const [open, setOpen] = useState(false);
  const {
    user,
    setSelectedChat,
    chats,
    setChats,
    notifications,
    setNotifications,
  } = ChatState();
  const navigate = useNavigate();
  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };
  const handleSearch = async () => {
    if (!search) {
      toaster.create({
        description: "Please enter something to search",
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
      const { data } = await axios.get(`api/user/search?key=${search}`, config);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      setLoading(false);
      //   console.error(error);
      toaster.create({
        description: "Error occurred during search",
        type: "error",
        duration: 5000,
        closable: true,
      });
    }
  };
  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`api/chat`, { userId }, config);
      if (!chats.find((chat) => chat._id === data._id)) {
        setChats([data, ...chats]);
      }
      setSelectedChat(data);
      setLoadingChat(false);
      setOpen(false);
    } catch (error) {
      setLoadingChat(false);
      toaster.create({
        description: "Error occurred fetching chats",
        type: "error",
        duration: 5000,
        closable: true,
      });
    }
  };
  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px"
        borderColor="#ede8e8"
      >
        <Tooltip
          content="Search for users to chat"
          positioning={{ placement: "bottom-end" }}
          showArrow
        >
          <Button
            variant="solid"
            color="black"
            className="hover-navbar"
            onClick={() => setOpen(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
            </svg>
            <Text display={{ base: "none", md: "flex" }} px="4">
              Search User
            </Text>
          </Button>
        </Tooltip>
        <Text color="black" fontSize="3xl" fontFamily="Work sans">
          Chatter
        </Text>
        <div>
          <Menu.Root variant="solid">
            <Menu.Trigger asChild>
              <Button
                variant="solid"
                size="md"
                color="black"
                className="hover-navbar"
              >
                <Badge badgeContent={notifications.length} color="success" max={10}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-bell-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2m.995-14.901a1 1 0 1 0-1.99 0A5 5 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901" />
                  </svg>
                </Badge>
              </Button>
            </Menu.Trigger>
            <Menu.Positioner>
              <Menu.Content backgroundColor="white">
                {!notifications.length && (
                  <Menu.Item
                    value="new-file"
                    color="black"
                    className="hover-navbar"
                  >
                    No New Messages
                  </Menu.Item>
                )}
                {notifications.map((notif) => {
                  return notif.chat.isGroupChat ? (
                    <Menu.Item
                      value="new-file"
                      color="black"
                      className="hover-navbar"
                      key={notif._id}
                      onClick={() => {
                        setSelectedChat(notif.chat);
                        setNotifications(
                          notifications.filter((n) => {
                            return n !== notif;
                          })
                        );
                      }}
                    >
                      New Message in {notif.chat.chatName}
                    </Menu.Item>
                  ) : (
                    <Menu.Item
                      value="new-file"
                      color="black"
                      className="hover-navbar"
                      key={notif._id}
                      onClick={() => {
                        setSelectedChat(notif.chat);
                        setNotifications(
                          notifications.filter((n) => {
                            return n !== notif;
                          })
                        );
                      }}
                    >
                      New Message from {getSender(user, notif.chat.users)}
                    </Menu.Item>
                  );
                })}
              </Menu.Content>
            </Menu.Positioner>
          </Menu.Root>
          <Menu.Root variant="solid">
            <Menu.Trigger asChild>
              <Button
                variant="solid"
                size="md"
                color="black"
                className="hover-navbar"
              >
                <Avatar.Root size="xs">
                  <Avatar.Fallback name={user.name} />
                  <Avatar.Image src={user.pic} />
                </Avatar.Root>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-chevron-down"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
                  />
                </svg>
              </Button>
            </Menu.Trigger>
            <Menu.Positioner>
              <Menu.Content backgroundColor="white">
                <Menu.Item
                  value="new-txt"
                  color="black"
                  className="hover-navbar"
                  onClick={() => {
                    ProfileModal.open("profile", {
                      name: user.name,
                      email: user.email,
                      pic: user.pic,
                    });
                  }}
                >
                  My Profile
                </Menu.Item>
                <Menu.Item
                  value="new-file"
                  color="black"
                  className="hover-navbar"
                  onClick={logoutHandler}
                >
                  Logout
                </Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Menu.Root>
          <ProfileModal.Viewport />
        </div>
      </Box>
      <Drawer.Root
        open={open}
        onOpenChange={(e) => setOpen(e.open)}
        placement="start"
      >
        <Portal>
          <Drawer.Backdrop />
          <Drawer.Positioner>
            <Drawer.Content backgroundColor="white" color="black">
              <Drawer.Header>
                <Drawer.Title>Search Users</Drawer.Title>
              </Drawer.Header>
              <Drawer.Body>
                <Box display="flex" pb="2">
                  <Input
                    placeholder="Search by name or email"
                    value={search}
                    onChange={(event) => {
                      setSearch(event.target.value);
                    }}
                  ></Input>
                  <Button
                    backgroundColor="#ede8e8"
                    ml="4"
                    mb="1"
                    className="click-drawer"
                    onClick={handleSearch}
                  >
                    Go
                  </Button>
                </Box>
                {loading ? (
                  <ChatLoading />
                ) : (
                  searchResult.map((user) => {
                    return (
                      <UserListItem
                        key={user._id}
                        user={user}
                        handler={() => {
                          accessChat(user._id);
                        }}
                      />
                    );
                  })
                )}
                {loadingChat && <Spinner />}
              </Drawer.Body>
              <Drawer.CloseTrigger asChild>
                <CloseButton
                  size="sm"
                  variant="solid"
                  className="hover-navbar"
                />
              </Drawer.CloseTrigger>
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>
    </>
  );
};

export default SideDrawer;
