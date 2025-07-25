export const getSender = (loggedUser, users) => {
    // console.log("loggedUser:", loggedUser);
  return users[0]._id === loggedUser?._id ? users[1].name : users[0].name;
};

export const getSenderFull = (loggedUser, users) => {
  return users[0]._id === loggedUser?._id ? users[1] : users[0];
};

export const isOtherSender = (messages, currMessage, index, userId) => {
  return (
    index < messages.length - 1 &&
    (messages[index + 1].sender._id !== currMessage.sender._id ||
      messages[index + 1].sender._id === undefined) &&
    currMessage.sender._id !== userId
  );
};

export const isLastMessage = (messages, index, userId) => {
    // console.log("isLastMessage called");
  return (
    index === messages.length - 1 &&
    messages[messages.length - 1].sender._id !== userId &&
    messages[messages.length - 1].sender._id
  );
};

export const isOtherSenderMargin = (messages, currMessage, index, userId) => {
  if (
    index < messages.length - 1 &&
    messages[index + 1].sender._id === currMessage.sender._id &&
    currMessage.sender._id !== userId
  ) {
    return 40;
  } else if (
    (index < messages.length - 1 &&
      messages[index + 1].sender._id !== currMessage.sender._id &&
      currMessage.sender._id !== userId) ||
    (index == messages.length - 1 && currMessage.sender._id !== userId)
  ) {
    return 0;
  } else {
    return "auto";
  }
};

export const isSameSender = (messages, currMessage, index) => {
  return index > 0 && messages[index - 1].sender._id === currMessage.sender._id;
};

export const isOtherSenderBoth = (messages, currMessage, index, userId) => {
  return (
    index < messages.length - 1 &&
    (messages[index + 1].sender._id !== currMessage.sender._id ||
      messages[index + 1].sender._id === undefined)
  );
};

export const isLastMessageBoth = (messages, index, userId) => {
    // console.log("isLastMessage called");
  return (
    index === messages.length - 1 &&
    messages[messages.length - 1].sender._id
  );
};