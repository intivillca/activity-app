import { useForm } from "react-hook-form";
import {
  Stack,
  FormControl,
  InputGroup,
  InputLeftElement,
  Input,
  InputRightElement,
  Button,
  FormHelperText,
  chakra,
  Link,
  FormErrorMessage,
} from "@chakra-ui/react";
import { t } from "i18next";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { FaLock, FaUserAlt } from "react-icons/fa";
import { useCallback, useState } from "react";
import { LoginRequestData } from "../../types/login";
import { login } from "../../auth/auth-routes/login";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

export const LoginForm = () => {
  const { register, handleSubmit } = useForm<LoginRequestData>();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const handleShowClick = useCallback(
    () => setShowPassword(!showPassword),
    [showPassword]
  );
  const onSubmit = useCallback(
    async (data: LoginRequestData) => {
      try {
        const { token } = await login(data);
        window.localStorage.setItem("authToken", token);
        navigate("/");
      } catch (e) {
        setError(t("login_error"));
      }
    },
    [navigate]
  );
  const onError = useCallback((error: unknown) => {
    console.log(error);
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <Stack
        spacing={4}
        p="1rem"
        backgroundColor="whiteAlpha.900"
        boxShadow="md"
      >
        <FormControl>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<CFaUserAlt color="gray.300" />}
            />
            <Input {...register("username")} placeholder={t("username")} />
          </InputGroup>
        </FormControl>
        <FormControl>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              color="gray.300"
              children={<CFaLock color="gray.300" />}
            />
            <Input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder={t("password")}
            />
            <InputRightElement width="4.5rem">
              <Button
                h="1.75rem"
                size={["md", "md", "sm", "sm"]}
                onClick={handleShowClick}
              >
                {showPassword ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
          <FormHelperText textAlign="right">
            <Link as={RouterLink} to="/forgot-password">
              {t("forgot_password")}
            </Link>
          </FormHelperText>
        </FormControl>
        <Button
          borderRadius={0}
          type="submit"
          variant="solid"
          colorScheme="teal"
          width="full"
        >
          {t("login")}
        </Button>
        {error && <FormErrorMessage>{error}</FormErrorMessage>}
      </Stack>
    </form>
  );
};
