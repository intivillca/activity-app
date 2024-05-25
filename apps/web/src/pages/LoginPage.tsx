import { Flex, Stack, Avatar, Heading, Box, Link } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { LoginForm } from "../components/login/LoginForm";

export const LoginPage = () => {
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
          <LoginForm />
        </Box>
      </Stack>
      <Box>
        {t("new_to_us")}{" "}
        <Link color="teal.500" href="#">
          {t("sign_up")}
        </Link>
      </Box>
    </Flex>
  );
};
