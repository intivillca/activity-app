import { useController, useFormContext } from "react-hook-form";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Textarea,
  Center,
} from "@chakra-ui/react";
import { TagInput } from "../../global/TagInput";
import { LocationInput } from "../../global/LocationInput";
import { latLngToString, stringToLatLng } from "../../../utils/location-utils";
import { useTranslation } from "react-i18next";
import { AvatarInput } from "../../global/AvatarInput";

import { DateInput } from "../../global/DateInput";
import { FormGroup, GroupType } from "../../../types/group";
import { GroupTypeSelect } from "../../global/GroupTypeSelect";

export const GroupFormFields = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<FormGroup>();
  const { t } = useTranslation("");
  const {
    field: { value: type, onChange: setType },
  } = useController({ control, name: "type" });
  const {
    field: { value: tags, onChange: setTags },
  } = useController({ control, name: "tags" });
  const {
    field: { value: img, onChange: onChangeImg },
  } = useController({ control, name: "avatar" });
  const {
    field: { value: location, onChange: onChangeLocation },
  } = useController({ control, name: "location" });
  const { field: startDateField } = useController({
    control,
    name: "startDate",
  });
  const { field: endDateField } = useController({ control, name: "endDate" });
  return (
    <>
      <FormControl isInvalid={!!errors.avatar} mb={4}>
        <Center>
          <AvatarInput value={img} onChange={onChangeImg} />
        </Center>
        <FormErrorMessage>
          {errors.avatar && errors.avatar.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={!!errors.description} mb={4}>
        <FormLabel htmlFor="name">{t("group.form.name")}</FormLabel>
        <Input
          id="name"
          placeholder={t("group.form.name")}
          {...register("name")}
        />
        <FormErrorMessage>
          {errors.name && errors.name?.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={!!errors.description} mb={4}>
        <FormLabel htmlFor="type">{t("group.form.type.type")}</FormLabel>
        <GroupTypeSelect value={type} onChange={setType} />
        <FormErrorMessage>
          {errors.type && errors.type.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={!!errors.description} mb={4}>
        <FormLabel htmlFor="description">
          {t("group.form.description")}
        </FormLabel>
        <Textarea
          id="description"
          placeholder={t("group.form.description")}
          {...register("description")}
        />
        <FormErrorMessage>
          {errors.description && errors.description.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.startDate} mb={4}>
        <FormLabel htmlFor="startDate">{t("group.form.start_date")}</FormLabel>
        <DateInput
          value={startDateField.value}
          onChange={startDateField.onChange}
        />
        <FormErrorMessage>
          {errors.startDate && errors.startDate.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.endDate} mb={4}>
        <FormLabel htmlFor="endDate">{t("group.form.end_date")}</FormLabel>
        <DateInput
          value={endDateField.value}
          onChange={endDateField.onChange}
        />
        <FormErrorMessage>
          {errors.endDate && errors.endDate.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.location} mb={4}>
        <FormLabel htmlFor="location">{t("group.form.location")}</FormLabel>
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
        <FormLabel htmlFor="tags">{t("group.form.tags")}</FormLabel>
        <TagInput value={tags} onChange={setTags} />
        <FormErrorMessage>
          {errors.tags && errors.tags.message}
        </FormErrorMessage>
      </FormControl>
    </>
  );
};
