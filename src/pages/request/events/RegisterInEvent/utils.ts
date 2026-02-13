import { enviroment } from "@config/enviroment";
import { mapSystemValidations } from "@forms/SystemValidationsForm/mappers";
import { IUser } from "@inube/auth";
import { registerInEventRequest } from "src/services/iclient/events/registerInEventRequest";
import { IRegisterInEventRequest } from "src/services/iclient/events/registerInEventRequest/types";
import { sendTeamsMessage } from "src/services/teams/sendMessage";
import { registerInEventSteps } from "./config/assisted";
import { initalValuesRegisterInEvent } from "./config/initialValues";
import { IFormsRegisterInEvent, IFormsRegisterInEventRefs } from "./types";

const registerInEventStepsRules = (
  currentStep: number,
  currentRegisterInEvent: IFormsRegisterInEvent,
  formReferences: IFormsRegisterInEventRefs,
  isCurrentFormValid: boolean,
) => {
  let newRegisterInEvent = { ...currentRegisterInEvent };

  switch (currentStep) {
    case registerInEventSteps.chooseEntries.number: {
      const values = formReferences.chooseEntries.current?.values;

      if (!values) return currentRegisterInEvent;

      newRegisterInEvent.chooseEntries = {
        isValid: isCurrentFormValid,
        values,
      };

      if (
        JSON.stringify(values) !==
        JSON.stringify(currentRegisterInEvent.chooseEntries.values)
      ) {
        newRegisterInEvent.liquidation = {
          isValid: true,
          values: {
            ...initalValuesRegisterInEvent.liquidation,
            entriesCategories: values.entriesCategories.filter(
              (category) => category.count && category.count > 0,
            ),
            totalValue: values.totalValue,
          },
        };

        newRegisterInEvent.systemValidations = {
          isValid: false,
          values: {
            ...mapSystemValidations(),
            productCode: values.event?.product || "",
            eventType: values.event?.eventType || "",
            totalServiceValue: values.entriesCategories.reduce(
              (acc, entry) => acc + (entry.fullValue || 0),
              0,
            ),
            totalSubsidyValue: values.entriesCategories.reduce(
              (acc, entry) => acc + (entry.subsidyValue || 0),
              0,
            ),
            totalValue: values.totalValue,
            entriesCategories: values.entriesCategories.map((entry) => ({
              ...entry,
              fullValue: entry.fullValue || 0,
              subTotal: entry.subTotal || 0,
            })),
          },
        };
      }

      return newRegisterInEvent;
    }
  }

  const stepKey = Object.entries(registerInEventSteps).find(
    ([, config]) => config.number === currentStep,
  )?.[0];

  if (!stepKey) return currentRegisterInEvent;

  const values =
    formReferences[stepKey as keyof IFormsRegisterInEvent]?.current?.values;

  return (newRegisterInEvent = {
    ...newRegisterInEvent,
    [stepKey]: { isValid: isCurrentFormValid, values },
  });
};

const sendEventRegistration = async (
  user: IUser,
  registrationRequest: IFormsRegisterInEvent,
  accessToken: string,
) => {
  if (!registrationRequest.chooseEntries.values.event) {
    return;
  }
  const paymentMethodType =
    registrationRequest.paymentMethod.values.paymentMethod === "DEBAHORINT"
      ? "DebitInternalSavingsAccount"
      : registrationRequest.paymentMethod.values.paymentMethod === "PSE"
        ? "PaymentByPSE"
        : "";

  const registrationRequestData: IRegisterInEventRequest = {
    customerCode: user.identification,
    event: registrationRequest.chooseEntries.values.event,
    entries: registrationRequest.chooseEntries.values.entriesCategories.map(
      (entry) => ({
        id: entry.id,
        name: entry.name,
        value: entry.value,
        subsidyValue: entry.subsidyValue,
        subsidyName: entry.subsidyName,
        count: entry.count,
        subTotal: entry.subTotal,
        fullValue: entry.fullValue,
      }),
    ),
    totalServiceValue:
      registrationRequest.chooseEntries.values.entriesCategories.reduce(
        (acc, entry) => acc + (entry.fullValue || 0),
        0,
      ),
    totalSubsidyValue:
      registrationRequest.chooseEntries.values.entriesCategories.reduce(
        (acc, entry) => acc + (entry.subsidyValue || 0),
        0,
      ),
    paymentMethod: {
      paymentType: paymentMethodType,
      accountNumber:
        registrationRequest.paymentMethod.values.accountNumber || "",
      descriptionPayment:
        registrationRequest.paymentMethod.values.paymentMethodName,
      value: registrationRequest.chooseEntries.values.totalValue,
    },
    totalValue: registrationRequest.chooseEntries.values.totalValue,
    participants: registrationRequest.chooseEntries.values.participants,
    termsConditions: {
      ids: registrationRequest.termsAndConditions.values.ids,
      description:
        registrationRequest.termsAndConditions.values.termsConditions.join(" "),
    },
    validations: registrationRequest.systemValidations.values.validations,
  };

  let confirmationType = "succeed";

  try {
    await registerInEventRequest(registrationRequestData, accessToken);
  } catch (error) {
    confirmationType = "failed";

    throw error;
  } finally {
    if (enviroment.IS_PRODUCTION) {
      const confirmationTime = new Date();
      if (confirmationType === "failed") {
        sendTeamsMessage({
          type: "MessageCard",
          summary: "Registration in event request failure",
          title: "Failed registration in event request",
          subtitle: "Details",
          facts: [
            { name: "User ID:", value: user.identification },
            { name: "Date:", value: confirmationTime.toISOString() },
            {
              name: "Amount:",
              value: registrationRequestData.paymentMethod.value.toString(),
            },
          ],
        });
      }
    }
  }
};

export { registerInEventStepsRules, sendEventRegistration };
