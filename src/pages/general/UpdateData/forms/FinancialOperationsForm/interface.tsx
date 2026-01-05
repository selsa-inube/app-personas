import { UpdatesCard } from "@components/cards/UpdatesCard";
import { AccountFinancialOperationsModal } from "@components/modals/general/updateData/FinancialOperationsModal/AccountFinancialOperationsModal";
import { OperationFinancialOperationsModal } from "@components/modals/general/updateData/FinancialOperationsModal/OperationFinancialOperationsModal";
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
  validationSchemaOperation: Yup.ObjectSchema<Yup.AnyObject>;
  validationSchemaAccount: Yup.ObjectSchema<Yup.AnyObject>;
  modalState: {
    show: boolean;
    action: EModalActiveStateFinancialOperations;
    editEntry: IFinancialOperationsEntry | undefined;
  };
  serviceDomains: IServiceDomains;
  currencies: {
    loading: boolean;
    list: IOption[];
  };
  onSaveOperation: (values: IFinancialOperationsEntry) => void;
  onSaveAccount: (values: IFinancialOperationsEntry) => void;
  onDeleteOperation: () => void;
  onDeleteAccount: () => void;
  onSelectEditOperation: () => void;
  onSelectEditAccount: () => void;
  onToggleModal: () => void;
  onOpenCreateOperation: () => void;
  onOpenCreateAccount: () => void;
}

function FinancialOperationsFormUI(props: FinancialOperationsFormUIProps) {
  const {
    formik,
    loading,
    validationSchemaOperation,
    validationSchemaAccount,
    modalState,
    serviceDomains,
    currencies,
    onSaveOperation,
    onSaveAccount,
    onDeleteOperation,
    onDeleteAccount,
    onSelectEditAccount,
    onSelectEditOperation,
    onToggleModal,
    onOpenCreateOperation,
    onOpenCreateAccount,
  } = props;

  const isMobile = useMediaQuery("(max-width: 740px)");

  const haveOperation = Boolean(
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

  const itemsOperations = haveOperation
    ? [
        {
          title: "DESCRIPCIÓN DE LA OPERACIÓN",
          entries: [{ value: formik.values.descriptionOperations || "" }],
        },
      ]
    : [];

  const itemsAccounts = haveAccounts
    ? [
        {
          title:
            formik.values.bankEntityName.toUpperCase() || "ENTIDAD BANCARIA",
          entries: [
            { name: "País", value: formik.values.countryName || "" },
            {
              name: "Entidad bancaria",
              value: formik.values.bankEntityName || "",
            },
            {
              name: "Tipo de cuenta",
              value: formik.values.accountType.split("-")[1] || "",
            },
            {
              name: "Número de cuenta",
              value: String(formik.values.accountNumber) || "",
            },
          ],
        },
      ]
    : [];

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
          {haveOperation && (
            <UpdatesCard
              id=""
              isMobile={isMobile}
              loading={loading}
              icon={<MdOutlineAssignment />}
              items={itemsOperations}
              onEdit={onSelectEditOperation}
              onDelete={onDeleteOperation}
              deleteTitle="Eliminar descripción de la operación"
              deleteDescription="¿Estás seguro? Eliminar la descripción de la operación no se puede deshacer."
            />
          )}
          <Stack alignItems="center" justifyContent="flex-end">
            <Button
              appearance="primary"
              iconBefore={<MdAdd />}
              spacing="compact"
              variant="none"
              onClick={onOpenCreateOperation}
              disabled={haveOperation}
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
              id={formik.values.accountNumber}
              isMobile={isMobile}
              loading={loading}
              icon={<MdOutlineAccountBalance />}
              items={itemsAccounts}
              onEdit={onSelectEditAccount}
              onDelete={onDeleteAccount}
              deleteTitle="Eliminar cuenta"
              deleteDescription="¿Estás seguro? Eliminar la cuenta nos impide sugerirla como opción en tus próximas solicitudes."
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
              onClick={onOpenCreateAccount}
              disabled={haveAccounts}
              cursorHover
            >
              Adicionar
            </Button>
          </Stack>
        </Stack>

        {modalState.show &&
          (modalState.action ===
            EModalActiveStateFinancialOperations.CREATE_OPERATION ||
            modalState.action ===
              EModalActiveStateFinancialOperations.EDIT_OPERATION) && (
            <OperationFinancialOperationsModal
              title={
                modalState.action ===
                EModalActiveStateFinancialOperations.CREATE_OPERATION
                  ? "Adicionar operación"
                  : "Editar operación"
              }
              description={
                modalState.action ===
                EModalActiveStateFinancialOperations.CREATE_OPERATION
                  ? "Agrega información sobre la operación en moneda extrajera."
                  : "Editar información sobre la operación en moneda extrajera."
              }
              actionText={
                modalState.action ===
                EModalActiveStateFinancialOperations.CREATE_OPERATION
                  ? "Agregar"
                  : "Editar"
              }
              portalId="modals"
              formik={formik}
              validationSchema={validationSchemaOperation}
              onCloseModal={onToggleModal}
              onClick={onSaveOperation}
            />
          )}

        {modalState.show &&
          (modalState.action ===
            EModalActiveStateFinancialOperations.CREATE_ACCOUNT ||
            modalState.action ===
              EModalActiveStateFinancialOperations.EDIT_ACCOUNT) && (
            <AccountFinancialOperationsModal
              title={
                modalState.action ===
                EModalActiveStateFinancialOperations.CREATE_ACCOUNT
                  ? "Agregar cuenta"
                  : "Editar cuenta"
              }
              description={
                modalState.action ===
                EModalActiveStateFinancialOperations.CREATE_ACCOUNT
                  ? "Agrega información sobre la cuenta con la que realizas tus operaciones internacionales."
                  : "Editar información sobre la cuenta con la que realizas tus operaciones internacionales."
              }
              actionText={
                modalState.action ===
                EModalActiveStateFinancialOperations.CREATE_ACCOUNT
                  ? "Agregar"
                  : "Editar"
              }
              portalId="modals"
              formik={formik}
              validationSchema={validationSchemaAccount}
              serviceDomains={serviceDomains}
              currencies={currencies}
              onCloseModal={onToggleModal}
              onClick={onSaveAccount}
            />
          )}
      </Stack>
    </form>
  );
}

export { FinancialOperationsFormUI };
