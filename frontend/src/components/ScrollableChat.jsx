import {
  isLastMessage,
  isOtherSender,
  isOtherSenderMargin,
  isSameSender,
} from "../config/chatLogic";
import { ChatState } from "../context/ChatProvider";
import { Avatar, Box, Button } from "@chakra-ui/react";
import { Tooltip } from "@/components/ui/tooltip";

const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();
  return (
    <div>
      {messages &&
        messages.map((message, index) => {
          return (
            <div style={{ display: "flex" }} key={message._id}>
              {(isOtherSender(messages, message, index, user._id) ||
                isLastMessage(messages, index, user._id)) && (
                <Tooltip
                  content={message.sender.name}
                  positioning={{ placement: "bottom-start" }}
                  showArrow
                >
                  <Box>
                    {/* {console.log("Message sender:", message.sender.name)} */}
                    <Avatar.Root mr="1" size="sm" cursor="pointer">
                      <Avatar.Fallback name={message.sender.name} />
                      <Avatar.Image src={message.sender.pic} />
                    </Avatar.Root>
                  </Box>
                </Tooltip>
              )}
              <span
                style={{
                  backgroundColor: `${
                    message.sender._id === user._id ? "#bee3f8" : "#b9f5d0"
                  }`,
                  borderRadius: "20px",
                  padding: "5px 15px",
                  maxWidth: "75%",
                  marginLeft: isOtherSenderMargin(
                    messages,
                    message,
                    index,
                    user._id
                  ),
                  marginTop: isSameSender(messages, message, index) ? 3 : 0,
                  fontFamily: "Work sans",
                  fontWeight: "600",
                }}
              >
                {message.content}
              </span>
            </div>
          );
        })}
    </div>
  );
};

export default ScrollableChat;
