import { Stack, Skeleton } from "@chakra-ui/react";

const ChatLoading = () => {
    return (
        <Stack>
            {Array.from({ length: 13 }).map((_, i) => (
                <Skeleton height="61px" key={i} />
            ))}
        </Stack>
    )
}

export default ChatLoading;