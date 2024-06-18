import { Flex, Stack, Avatar, Heading, Box } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { RegisterForm } from "../components/register/RegisterForm";

export const RegisterPage = () => {
  const { t } = useTranslation();
  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar bg="teal.500" />
        <Heading color="teal.400">{t("welcome")}</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <RegisterForm />
        </Box>
      </Stack>
    </Flex>
  );
};
