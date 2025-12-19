import { IUpdatesCardItem, UpdatesCard } from "@components/cards/UpdatesCard";
import { DecisionModal } from "@components/modals/general/DecisionModal";
import { AccountFinancialOperationsModal } from "@components/modals/general/updateData/FinancialOperationsModal/AccountFinancialOperationsModal";
import { DescriptionFinancialOperationsModal } from "@components/modals/general/updateData/FinancialOperationsModal/DescriptionFinancialOperationsModal";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Button, IOption, Message, Stack, Text } from "@inubekit/inubekit";
import { FormikProps } from "formik";
import {
  MdAdd,
  MdOutlineAccountBalance,
  MdOutlineAssignment,
} from "react-icons/md";
import { IServiceDomains } from "src/context/app/types";
import * as Yup from "yup";
import {
  EModalActiveStateFinancialOperations,
  IFinancialOperationsEntry,
} from "./types";

interface FinancialOperationsFormUIProps {
  formik: FormikProps<IFinancialOperationsEntry>;
  loading?: boolean;
  withSubmit?: boolean;
  validationSchemaDescription: Yup.ObjectSchema<Yup.AnyObject>;
  validationSchemaAccount: Yup.ObjectSchema<Yup.AnyObject>;
  modalState: EModalActiveStateFinancialOperations;
  serviceDomains: IServiceDomains;
  currencies: {
    loading: boolean;
    list: IOption[];
  };
  itemsUpdatesCard: IUpdatesCardItem[];
  setModalState: (state: EModalActiveStateFinancialOperations) => void;
  onSaveDescription: (values: IFinancialOperationsEntry) => void;
  onSaveAccount: (values: IFinancialOperationsEntry) => void;
  onDeleteDescription: () => void;
  onDeleteAccount: () => void;
}

function FinancialOperationsFormUI(props: FinancialOperationsFormUIProps) {
  const {
    formik,
    loading,
    validationSchemaDescription,
    validationSchemaAccount,
    modalState,
    serviceDomains,
    currencies,
    itemsUpdatesCard,
    setModalState,
    onSaveDescription,
    onSaveAccount,
    onDeleteDescription,
    onDeleteAccount,
  } = props;

  const isMobile = useMediaQuery("(max-width: 740px)");

  const haveDescription = Boolean(
    formik.values.descriptionOperations &&
      formik.values.descriptionOperations !== "",
  );

  const haveAccounts = Boolean(
    formik.values.country &&
      formik.values.country !== "" &&
      formik.values.countryName &&
      formik.values.countryName !== "" &&
      formik.values.bankEntityCode &&
      formik.values.bankEntityCode !== "" &&
      formik.values.bankEntityName &&
      formik.values.bankEntityName !== "" &&
      formik.values.accountType &&
      formik.values.accountType !== "" &&
      formik.values.currency &&
      formik.values.currency !== "" &&
      formik.values.accountNumber &&
      formik.values.accountNumber !== null,
  );

  return (
    <form>
      <Stack direction="column" gap={inube.spacing.s300} width="100%">
        <Message
          appearance="help"
          title="Si posees cuentas o realizas transacciones en moneda extranjera, es importante que las registres en este paso."
        />
        <Stack direction="column" gap={inube.spacing.s250} width="100%">
          <Text
            type="title"
            size={isMobile ? "small" : "medium"}
            appearance="gray"
            weight="bold"
          >
            Operaciones en moneda extranjera
          </Text>
          {haveDescription && (
            <UpdatesCard
              isMobile={isMobile}
              loading={loading}
              icon={<MdOutlineAssignment />}
              items={[
                {
                  title: "DESCRIPCIÓN DE LA OPERACIÓN",
                  entries: [
                    { value: formik.values.descriptionOperations || "" },
                  ],
                },
              ]}
              onEdit={() =>
                setModalState(
                  EModalActiveStateFinancialOperations.EDIT_DESCRIPTION,
                )
              }
              onDelete={() =>
                setModalState(
                  EModalActiveStateFinancialOperations.DELETE_DESCRIPTION,
                )
              }
            />
          )}
          <Stack alignItems="center" justifyContent="flex-end">
            <Button
              appearance="primary"
              iconBefore={<MdAdd />}
              spacing="compact"
              variant="none"
              onClick={() =>
                setModalState(
                  EModalActiveStateFinancialOperations.CREATE_DESCRIPTION,
                )
              }
              disabled={haveDescription}
              cursorHover
            >
              Adicionar
            </Button>
          </Stack>
        </Stack>
        <Stack direction="column" gap={inube.spacing.s250} width="100%">
          <Text
            type="title"
            size={isMobile ? "small" : "medium"}
            appearance="gray"
            weight="bold"
          >
            Cuentas en moneda extranjera
          </Text>
          {haveAccounts && (
            <UpdatesCard
              isMobile={isMobile}
              loading={loading}
              icon={<MdOutlineAccountBalance />}
              items={itemsUpdatesCard}
              onEdit={() =>
                setModalState(EModalActiveStateFinancialOperations.EDIT_ACCOUNT)
              }
              onDelete={() =>
                setModalState(
                  EModalActiveStateFinancialOperations.DELETE_ACCOUNT,
                )
              }
            />
          )}
          <Stack
            gap={inube.spacing.s100}
            alignItems="center"
            justifyContent="flex-end"
          >
            <Button
              appearance="primary"
              iconBefore={<MdAdd />}
              spacing="compact"
              variant="none"
              onClick={() =>
                setModalState(
                  EModalActiveStateFinancialOperations.CREATE_ACCOUNT,
                )
              }
              disabled={haveAccounts}
              cursorHover
            >
              Adicionar
            </Button>
          </Stack>
        </Stack>

        {(modalState ===
          EModalActiveStateFinancialOperations.CREATE_DESCRIPTION ||
          modalState ===
            EModalActiveStateFinancialOperations.EDIT_DESCRIPTION) && (
          <DescriptionFinancialOperationsModal
            title={
              modalState ===
              EModalActiveStateFinancialOperations.CREATE_DESCRIPTION
                ? "Adicionar operación"
                : "Editar operación"
            }
            description={
              modalState ===
              EModalActiveStateFinancialOperations.CREATE_DESCRIPTION
                ? "Agrega información sobre la operación en moneda extrajera."
                : "Editar información sobre la operación en moneda extrajera."
            }
            actionText={
              modalState ===
              EModalActiveStateFinancialOperations.CREATE_DESCRIPTION
                ? "Agregar"
                : "Editar"
            }
            portalId="modals"
            formik={formik}
            validationSchema={validationSchemaDescription}
            onCloseModal={() =>
              setModalState(EModalActiveStateFinancialOperations.IDLE)
            }
            onClick={onSaveDescription}
          />
        )}

        {(modalState === EModalActiveStateFinancialOperations.CREATE_ACCOUNT ||
          modalState === EModalActiveStateFinancialOperations.EDIT_ACCOUNT) && (
          <AccountFinancialOperationsModal
            title={
              modalState === EModalActiveStateFinancialOperations.CREATE_ACCOUNT
                ? "Agregar cuenta"
                : "Editar cuenta"
            }
            description={
              modalState === EModalActiveStateFinancialOperations.CREATE_ACCOUNT
                ? "Agrega información sobre la cuenta con la que realizas tus operaciones internacionales."
                : "Editar información sobre la cuenta con la que realizas tus operaciones internacionales."
            }
            actionText={
              modalState === EModalActiveStateFinancialOperations.CREATE_ACCOUNT
                ? "Agregar"
                : "Editar"
            }
            portalId="modals"
            formik={formik}
            validationSchema={validationSchemaAccount}
            serviceDomains={serviceDomains}
            currencies={currencies}
            onCloseModal={() =>
              setModalState(EModalActiveStateFinancialOperations.IDLE)
            }
            onClick={onSaveAccount}
          />
        )}

        {(modalState ===
          EModalActiveStateFinancialOperations.DELETE_DESCRIPTION ||
          modalState ===
            EModalActiveStateFinancialOperations.DELETE_ACCOUNT) && (
          <DecisionModal
            title={
              modalState ===
              EModalActiveStateFinancialOperations.DELETE_DESCRIPTION
                ? "Eliminar descripción de la operación"
                : "Eliminar cuenta"
            }
            description={
              modalState ===
              EModalActiveStateFinancialOperations.DELETE_DESCRIPTION
                ? "¿Estás seguro? Eliminar la descripción de la operación no se puede deshacer."
                : "¿Estás seguro? Eliminar la cuenta nos impide sugerirla como opción en tus próximas solicitudes."
            }
            onCloseModal={() =>
              setModalState(EModalActiveStateFinancialOperations.IDLE)
            }
            actionText="Eliminar"
            appearance="danger"
            onClick={() =>
              modalState ===
              EModalActiveStateFinancialOperations.DELETE_DESCRIPTION
                ? onDeleteDescription()
                : onDeleteAccount()
            }
            portalId="modals"
          />
        )}
      </Stack>
    </form>
  );
}

export { FinancialOperationsFormUI };
