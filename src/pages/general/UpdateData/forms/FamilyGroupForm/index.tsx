import { IAction } from "@design/data/Table/types";
import { EMessageType, IMessage } from "@ptypes/messages.types";
import { FormikProps, FormikValues, useFormik } from "formik";
import { forwardRef, useImperativeHandle, useState } from "react";
import { validationMessages } from "src/validations/validationMessages";
import { validationRules } from "src/validations/validationRules";
import * as Yup from "yup";
import { DeleteFamilyMember } from "./DeleteFamilyMember";
import { EditFamilyMember } from "./EditFamilyMember";
import { FamilyMemberView } from "./FamilyMemberView";
import { deleteFamilyMemberMsgs } from "./config/deleteMember";
import { familyGroupRequiredFields } from "./config/formConfig";
import { FamilyGroupFormUI } from "./interface";
import { IFamilyGroupEntries, IFamilyGroupEntry } from "./types";
import { IIdentificationDataEntry } from "./AddFamilyMember/forms/IdentificationDataForm/types";
import { IPersonalDataEntry } from "./AddFamilyMember/forms/PersonalDataForm/types";
import { IContactDataEntry } from "./AddFamilyMember/forms/ContactDataForm/types";
import { IInformationDataEntry } from "./AddFamilyMember/forms/InformationDataForm/types";

const validationSchema = Yup.object().shape({
  firstName: familyGroupRequiredFields.firstName
    ? validationRules.name.required(validationMessages.required)
    : validationRules.name,
  secondName: familyGroupRequiredFields.secondName
    ? validationRules.name.required(validationMessages.required)
    : validationRules.name,
  firstLastName: familyGroupRequiredFields.firstLastName
    ? validationRules.name.required(validationMessages.required)
    : validationRules.name,
  secondLastName: familyGroupRequiredFields.secondLastName
    ? validationRules.name.required(validationMessages.required)
    : validationRules.name,
  type: familyGroupRequiredFields.type
    ? Yup.string().required(validationMessages.required)
    : Yup.string(),
  identificationNumber: familyGroupRequiredFields.identificationNumber
    ? validationRules.identification.required(validationMessages.required)
    : validationRules.identification,
  city: familyGroupRequiredFields.city
    ? validationRules.city.required(validationMessages.required)
    : validationRules.city,
  date: familyGroupRequiredFields.date
    ? validationRules.date.required(validationMessages.required)
    : validationRules.date,
  country: familyGroupRequiredFields.country
    ? validationRules.country.required(validationMessages.required)
    : validationRules.country,
  address: familyGroupRequiredFields.address
    ? validationRules.address.required(validationMessages.required)
    : validationRules.address,
  department: familyGroupRequiredFields.department
    ? validationRules.stateOrDepartment.required(validationMessages.required)
    : validationRules.stateOrDepartment,
  zipCode: familyGroupRequiredFields.zipCode
    ? validationRules.zipCode.required(validationMessages.required)
    : validationRules.zipCode,
  landlinePhone: familyGroupRequiredFields.landlinePhone
    ? validationRules.landlinePhone.required(validationMessages.required)
    : validationRules.landlinePhone,
  cellPhone: familyGroupRequiredFields.cellPhone
    ? validationRules.phone.required(validationMessages.required)
    : validationRules.phone,
  email: familyGroupRequiredFields.email
    ? validationRules.email.required(validationMessages.required)
    : validationRules.email,
  birthDate: familyGroupRequiredFields.birthDate
    ? validationRules.date.required(validationMessages.required)
    : validationRules.date,
  gender: familyGroupRequiredFields.gender
    ? Yup.string().required(validationMessages.required)
    : Yup.string(),
  relationship: familyGroupRequiredFields.relationship
    ? Yup.string().required(validationMessages.required)
    : Yup.string(),
  isDependent: familyGroupRequiredFields.isDependent
    ? Yup.string().required(validationMessages.required)
    : Yup.string(),
  educationLevel: familyGroupRequiredFields.educationLevel
    ? Yup.string().required(validationMessages.required)
    : Yup.string(),
  businessActivity: familyGroupRequiredFields.businessActivity
    ? Yup.string().required(validationMessages.required)
    : Yup.string(),
  profession: familyGroupRequiredFields.profession
    ? Yup.string().required(validationMessages.required)
    : Yup.string(),
});

interface FamilyGroupFormProps {
  initialValues: IFamilyGroupEntries;
  onSubmit?: (values: IFamilyGroupEntries) => void;
}

const FamilyGroupForm = forwardRef(function FamilyGroupForm(
  props: FamilyGroupFormProps,
  ref: React.Ref<FormikProps<IFamilyGroupEntries>>
) {
  const { initialValues, onSubmit } = props;
  const [dynamicSchema, setDynamicSchema] = useState(validationSchema);
  const [message, setMessage] = useState<IMessage>();
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);

  const formik = useFormik({
    initialValues,
    validateOnChange: false,
    validationSchema: dynamicSchema,
    onSubmit: onSubmit || (() => {}),
  });

  useImperativeHandle(ref, () => formik);

  const handleShowMessage = (message: IMessage) => {
    const { title, description, icon, appearance } = message;
    setMessage({
      show: true,
      title,
      description,
      icon,
      appearance,
    });
  };

  const handleCloseMessage = () => {
    setMessage(undefined);
  };

  const handleDeleteMember = (memberId: string) => {
    let messageType = EMessageType.SUCCESS;

    const member = formik.values.entries.find((entry) => entry.id === memberId);

    const updatedMembers = formik.values.entries.filter(
      (member) => member.id !== memberId
    );

    if (updatedMembers.length === formik.values.entries.length) {
      messageType = EMessageType.FAILED;
    } else {
      formik.setFieldValue("entries", updatedMembers);
    }

    const { icon, title, description, appearance } =
      deleteFamilyMemberMsgs[messageType];

    handleShowMessage({
      title,
      description: description(`${member?.firstName} ${member?.firstLastName}`),
      icon,
      appearance,
    });
  };

  const handleEditMember = async (
    member: IFamilyGroupEntry,
    formik: FormikValues
  ) => {
    await formik.validateForm();

    if (formik.isValid) {
      const updatedEntries = formik.values.entries.map(
        (entry: IFamilyGroupEntry) => {
          if (entry.id === member.id) {
            return {
              id: formik.values.id,
              firstName: formik.values.firstName,
              secondName: formik.values.secondName,
              firstLastName: formik.values.firstLastName,
              secondLastName: formik.values.secondLastName,
              type: formik.values.type,
              identificationNumber: formik.values.identificationNumber,
              city: formik.values.city,
              date: formik.values.date,
              country: formik.values.country,
              address: formik.values.address,
              department: formik.values.department,
              zipCode: formik.values.zipCode,
              landlinePhone: formik.values.landlinePhone,
              cellPhone: formik.values.cellPhone,
              email: formik.values.email,
              birthDate: formik.values.birthDate,
              gender: formik.values.gender,
              relationship: formik.values.relationship,
              isDependent: formik.values.isDependent,
              educationLevel: formik.values.educationLevel,
              businessActivity: formik.values.businessActivity,
              profession: formik.values.profession,
            };
          }
          return entry;
        }
      );

      formik.setFieldValue("entries", updatedEntries);
    }
  };

  const handleAddMember = async (
    identificationData: IIdentificationDataEntry,
    personalData: IPersonalDataEntry,
    contactData: IContactDataEntry,
    informationData: IInformationDataEntry
  ) => {
    await formik.validateForm();

    formik.setFieldValue("entries", [
      ...formik.values.entries,
      {
        id: identificationData.identificationNumber,
        firstName: personalData.firstName,
        secondName: personalData.secondName,
        firstLastName: personalData.firstLastName,
        secondLastName: personalData.secondLastName,
        type: personalData.type,
        identificationNumber: identificationData.identificationNumber,
        cellPhone: contactData.cellPhone,
        email: contactData.email,
        birthDate: informationData.birthDate,
        gender: informationData.gender,
        relationship: informationData.relationship ?? personalData.relationship,
        isDependent: informationData.isDependent ?? personalData.isDependent,
        educationLevel: informationData.educationLevel,
        businessActivity: informationData.businessActivity,
        profession: informationData.profession,
      },
    ]);

    setShowAddMemberModal(false);
    formik.setTouched({});
  };

  const isRequired = (fieldName: string): boolean => {
    const fieldDescription = dynamicSchema.describe().fields[fieldName] as any;
    return !fieldDescription.nullable && !fieldDescription.optional;
  };

  const handleToggleModal = () => {
    setShowAddMemberModal(!showAddMemberModal);
  };

  const familyGroupTableActions: IAction[] = [
    {
      id: "1",
      actionName: "Ver",
      content: (member) => (
        <FamilyMemberView
          member={member}
          formik={formik}
          onDeleteMember={() => handleDeleteMember(member.id)}
          onEditMember={handleEditMember}
          isRequired={isRequired}
        />
      ),
      mobilePriority: true,
    },
    {
      id: "2",
      actionName: "Editar",
      content: (member) => (
        <EditFamilyMember
          formik={formik}
          member={member}
          onEditMember={handleEditMember}
          isRequired={isRequired}
        />
      ),
      mobilePriority: true,
    },
    {
      id: "3",
      actionName: "Borrar",
      content: (member) => (
        <DeleteFamilyMember
          member={member}
          onDeleteMember={() => handleDeleteMember(member.id)}
        />
      ),
      mobilePriority: true,
    },
  ];

  return (
    <FamilyGroupFormUI
      formik={formik}
      message={message}
      familyGroupTableActions={familyGroupTableActions}
      showAddMemberModal={showAddMemberModal}
      onCloseMessage={handleCloseMessage}
      onToggleModal={handleToggleModal}
      onAddMember={handleAddMember}
    />
  );
});

export { FamilyGroupForm };
