import {
  Dialog,
  Portal,
  createOverlay,
  Image,
  Text,
  Heading,
  CloseButton,
} from "@chakra-ui/react";

const ProfileModal = createOverlay((props) => {
  const { name, email, pic, ...rest } = props;
  return (
    <Dialog.Root {...rest} placement="center">
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content
            backgroundColor="white"
            color="black"
            display="flex"
            flexDirection="column"
            alignItems="center"
            height="auto"
          >
            <Heading size="5xl" marginY="3%" fontFamily="Work sans" textAlign="center">
              {name}
            </Heading>
            <Image src={pic} boxSize="20vh" borderRadius="full" fit="cover"/>
            <Text textStyle="2xl" fontFamily="Work sans" marginY="6%">
              Email: {email}
            </Text>
            <Dialog.Footer>
              <Dialog.CloseTrigger asChild>
                <CloseButton
                  size="sm"
                  variant="solid"
                  className="hover-navbar"
                />
              </Dialog.CloseTrigger>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
});

export default ProfileModal;
