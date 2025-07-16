import { Avatar, Box, Text } from "@chakra-ui/react";

const UserListItem = ({ user, handler }) => {
    return (
        <Box
            onClick={handler}
            backgroundColor="#e8e8e8"
            color="black"
            _hover={{ backgroundColor: "#38b2ac", color: "white" }}
            width="100%"
            display="flex"
            alignItems="center"
            px="3"
            py="2"
            mb="2"
            borderRadius="lg"
            cursor="pointer"
        >
            <Avatar.Root size="sm" mr="2">
                <Avatar.Fallback name={user.name} />
                <Avatar.Image src={user.pic} />
            </Avatar.Root>
            <Box>
                <Text>{user.name}</Text>
                <Text fontSize="xs">
                    <b>Email : </b>
                    {user.email}
                </Text>
            </Box>
        </Box>
    );
};

export default UserListItem;
