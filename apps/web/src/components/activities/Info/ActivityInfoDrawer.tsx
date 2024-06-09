import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  DrawerProps,
} from "@chakra-ui/react";
import { FormProvider, useForm } from "react-hook-form";
import { FormActivity } from "../../../types/activity";
import { ActivityFormInfoDrawerContent } from "./ActivityInfoFormDrawerContent";
import { useActivityProvider } from "../ActivityCtx";
import { ActivityInfoDrawerContent } from "./ActivityInfoDrawerContent";
import { createContext, useCallback, useContext } from "react";
import { patchActivity } from "../../../api/activities/patchActivity";

interface Props extends Omit<DrawerProps, "isOpen" | "children"> {}

const ActivityInfoNoFormDrawer = (props: Props) => {
  return (
    <Drawer
      {...props}
      size={["full", "full", "md", "md"]}
      isOpen={true}
      placement="right"
    >
      <DrawerOverlay />
      <DrawerContent p="0" m={0}>
        <DrawerCloseButton />
        <DrawerBody p={0} overflowY="auto">
          <ActivityInfoDrawerContent />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

const ActivityInfoCtx = createContext<{
  handleSubmit: (data: FormActivity) => void;
} | null>(null);

export const useActivityInfoCtx = () => {
  const usedCtx = useContext(ActivityInfoCtx);
  if (!usedCtx) {
    throw Error("Missing ActivityInfoContext");
  }
  return usedCtx;
};

const ActivityInfoFormDrawer = ({ onClose, ...rest }: Props) => {
  const { activity } = useActivityProvider();
  const methods = useForm<FormActivity>({
    defaultValues: { ...activity, avatar: activity.avatar?.src },
  });
  console.log(activity.avatar?.src);
  const onSubmit = useCallback(
    async (data: FormActivity) => {
      console.log(data);
      const idk = await patchActivity({
        activityID: activity.ID,
        data: {
          description: data.description,
          location: data.location,
          name: data.name,
          startDate: data.startDate,
          endDate: data.endDate,
          tags: data.tags,
        },
      });
      console.log(idk);
    },
    [activity.ID]
  );
  const handleClose = () => {
    methods.handleSubmit(onSubmit)();
    onClose();
  };
  return (
    <Drawer
      {...rest}
      onClose={() => {
        handleClose();
      }}
      size={["full", "full", "md", "md"]}
      isOpen={true}
      placement="right"
    >
      <DrawerOverlay />
      <DrawerCloseButton />
      <ActivityInfoCtx.Provider value={{ handleSubmit: onSubmit }}>
        <FormProvider {...methods}>
          <DrawerContent p="0" m={0} overflowY="auto">
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <ActivityFormInfoDrawerContent />
            </form>
          </DrawerContent>
        </FormProvider>
      </ActivityInfoCtx.Provider>
    </Drawer>
  );
};

export const ActivityInfoDrawer = ({
  isEditable = false,
  ...rest
}: Props & { isEditable?: boolean }) => {
  return isEditable ? (
    <ActivityInfoFormDrawer {...rest} />
  ) : (
    <ActivityInfoNoFormDrawer {...rest} />
  );
};
