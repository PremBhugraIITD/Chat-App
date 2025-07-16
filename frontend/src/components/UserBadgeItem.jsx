import { Box, CloseButton } from "@chakra-ui/react";

const UserBadgeItem = ({ user, handler }) => {
  return (
    <Box
      px="2"
      py="1"
      borderRadius="lg"
      mx="1"
      mb="2"
      fontSize="12"
      backgroundColor="purple"
      color="white"
    >
      {user.name}
      <CloseButton size="2xs" variant="plain" onClick={handler}/>
    </Box>
  );
};

export default UserBadgeItem;
