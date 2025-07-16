import { Dialog, Portal, createOverlay, Image, Text, Heading, CloseButton } from "@chakra-ui/react";

const ProfileModal = createOverlay((props) => {
  const { name, email, pic, ...rest } = props;
  return (
    <Dialog.Root {...rest} placement="center">
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content backgroundColor="white" color="black" display="flex" flexDirection="column" alignItems="center" height="35%">
            <Heading size="5xl" marginY="5%" fontFamily="Work sans">{name}</Heading>
            <Image src={pic} rounded="full" width="26%" height="40%" />
            <Text textStyle="2xl" fontFamily="Work sans" marginY="6%">Email: {email}</Text>
            <Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" variant="solid" className="hover-navbar"/>
            </Dialog.CloseTrigger>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
});

export default ProfileModal;
