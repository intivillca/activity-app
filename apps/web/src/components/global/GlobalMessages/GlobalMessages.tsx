import { Heading, Spinner, VStack } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useInfiniteQuery } from "react-query";
import { Fragment } from "react/jsx-runtime";
import { getGlobalMessages } from "../../../api/messages/getGlobalMessages";
import { useAuth } from "../../../auth/AuthContext";
import { GlobalMessageC } from "./GlobalMessage";

export const GlobalMessages = () => {
  const { userID } = useAuth();
  const { t } = useTranslation("");
  const queryKey = ["GlobalMessages", userID];
  const { data } = useInfiniteQuery({
    queryFn: async ({ pageParam }) => {
      return getGlobalMessages(pageParam);
    },
    getNextPageParam: ({ meta: { nextCursor } }) => nextCursor,
    getPreviousPageParam: ({ meta: { prevCursor } }) => prevCursor,
    queryKey,
  });

  if (!data) {
    return <Spinner />;
  }
  return (
    <VStack w="full" spacing={0.5}>
      <Heading>{t("")}</Heading>
      {data.pages.map((page, idx) => (
        <Fragment key={`page-${idx}`}>
          {page.data.map((item) => (
            <GlobalMessageC key={item.ID} {...item} />
          ))}
        </Fragment>
      ))}
    </VStack>
  );
};
