import { Box, Button, Text, useClipboard, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaCopy, FaPaperPlane } from "react-icons/fa";
import { useMutation } from "react-query";
import { generateInvite } from "../../../api/invites/generateInvite";
import { useActivityProvider } from "../ActivityCtx";

export const MemberInvite = () => {
  const [isGenerated, setIsGenerated] = useState(false);
  const { t } = useTranslation("");
  const {
    activity: { ID },
  } = useActivityProvider();
  const { data, mutateAsync } = useMutation({
    mutationFn: async () => {
      const invite = await generateInvite({ activityID: ID });
      setIsGenerated(true);
      return invite;
    },
  });
  return !isGenerated ? (
    <Button
      colorScheme={"green"}
      leftIcon={<FaPaperPlane />}
      onClick={() => {
        mutateAsync();
      }}
    >
      {t("activities.invite_members")}
    </Button>
  ) : (
    <CopyTextComponent
      textToCopy={
        data?.ID ? `${window.location.origin}/invite/${data?.ID}` : ""
      }
    />
  );
};

interface Props {
  textToCopy: string;
}
const CopyTextComponent = ({ textToCopy }: Props) => {
  const { hasCopied, onCopy } = useClipboard(textToCopy);
  const toast = useToast();

  const handleCopyClick = () => {
    onCopy();
    toast({
      title: "Copied!",
      description: "Text has been copied to the clipboard.",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      p={4}
      bg="gray.50"
      maxW="sm"
      m="auto"
      mt={10}
      textAlign="center"
    >
      <Text mb={4} fontSize="lg" fontWeight="bold">
        {textToCopy}
      </Text>
      <Button
        colorScheme="teal"
        onClick={handleCopyClick}
        leftIcon={<FaCopy />}
      >
        {hasCopied ? "Copied!" : "Copy"}
      </Button>
    </Box>
  );
};
