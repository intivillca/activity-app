import { useController, useFormContext } from "react-hook-form";
import { FormActivity } from "../../../types/activity";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Textarea,
  Button,
  Box,
} from "@chakra-ui/react";
import { TagInput } from "../../global/TagInput";
import { LocationInput } from "../../global/LocationInput";
import { latLngToString, stringToLatLng } from "../../../utils/location-utils";
import { useTranslation } from "react-i18next";
import { AvatarInput } from "../../global/AvatarInput";

export const ActivitiesFormFields = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<FormActivity>();
  const { t } = useTranslation("");
  const {
    field: { value: tags, onChange: setTags },
  } = useController({ control, name: "tags" });
  const {
    field: { value: img, onChange: onChangeImg },
  } = useController({ control, name: "img" });
  const {
    field: { value: location, onChange: onChangeLocation },
  } = useController({ control, name: "location" });
  return (
    <Box p={4} borderWidth={1} borderRadius="lg">
      <FormControl isInvalid={!!errors.img} mb={4}>
        <FormLabel htmlFor="img">{t("activities.form.image")}</FormLabel>
        <AvatarInput value={img} onChange={onChangeImg} />
        <FormErrorMessage>{errors.img && errors.img.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={!!errors.description} mb={4}>
        <FormLabel htmlFor="name">{t("activities.form.name")}</FormLabel>
        <Input
          id="name"
          placeholder={t("activities.form.name")}
          {...register("name")}
        />
        <FormErrorMessage>
          {errors.description && errors.description.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={!!errors.description} mb={4}>
        <FormLabel htmlFor="description">
          {t("activities.form.description")}
        </FormLabel>
        <Textarea
          id="description"
          placeholder={t("activities.form.description")}
          {...register("description")}
        />
        <FormErrorMessage>
          {errors.description && errors.description.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.startDate} mb={4}>
        <FormLabel htmlFor="startDate">
          {t("activities.form.start_date")}
        </FormLabel>
        <Input type="date" id="startDate" {...register("startDate")} />
        <FormErrorMessage>
          {errors.startDate && errors.startDate.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.endDate} mb={4}>
        <FormLabel htmlFor="endDate">{t("activities.form.end_date")}</FormLabel>
        <Input type="date" id="endDate" {...register("endDate")} />
        <FormErrorMessage>
          {errors.endDate && errors.endDate.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.location} mb={4}>
        <FormLabel htmlFor="location">
          {t("activities.form.location")}
        </FormLabel>
        <LocationInput
          value={stringToLatLng(location)}
          onChange={(data) => {
            const toString = latLngToString(data);
            onChangeLocation(toString);
          }}
        />
        <FormErrorMessage>
          {errors.location && errors.location.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.tags} mb={4}>
        <FormLabel htmlFor="tags">{t("activities.form.tags")}</FormLabel>
        <TagInput value={tags} onChange={setTags} />
        <FormErrorMessage>
          {errors.tags && errors.tags.message}
        </FormErrorMessage>
      </FormControl>

      <Button mt={4} colorScheme="teal" isLoading={false} type="submit">
        {t("activities.form.submit")}
      </Button>
    </Box>
  );
};
