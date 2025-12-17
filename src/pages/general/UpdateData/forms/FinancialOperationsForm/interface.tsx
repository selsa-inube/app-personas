import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import {
  Button,
  IOption,
  Message,
  Stack,
  Text,
} from "@inubekit/inubekit";
import { FormikProps } from "formik";
import { IServiceDomains } from "src/context/app/types";
import * as Yup from "yup";
import { IFinancialOperationsEntry, EModalActiveStateFinancialOperations } from "./types";
import { MdAdd, MdOutlineAccountBalance, MdOutlineAssignment } from "react-icons/md";
import { UpdatesCard } from "@components/cards/UpdatesCard";
import { DescriptionFinancialOperationsModal } from "@components/modals/general/updateData/FinancialOperationsModal/DescriptionFinancialOperationsModal";
import { DecisionModal } from "@components/modals/general/DecisionModal";
import { AccountFinancialOperationsModal } from "@components/modals/general/updateData/FinancialOperationsModal/AccountFinancialOperationsModal";

interface FinancialOperationsFormUIProps {
  formik: FormikProps<IFinancialOperationsEntry>;
  loading?: boolean;
  withSubmit?: boolean;
  validationSchemaDescription: Yup.ObjectSchema<Yup.AnyObject>;
  validationSchemaAccount: Yup.ObjectSchema<Yup.AnyObject>;
  modalOpen: EModalActiveStateFinancialOperations;
  setModalOpen: (state: EModalActiveStateFinancialOperations) => void;
  serviceDomains: IServiceDomains;
  currencies: {
    loading: boolean;
    list: IOption[];
  };
}

function FinancialOperationsFormUI(props: FinancialOperationsFormUIProps) {
  const {
    formik,
    loading,
    validationSchemaDescription,
    validationSchemaAccount,
    modalOpen,
    setModalOpen,
    serviceDomains,
    currencies
  } = props;

  const isMobile = useMediaQuery("(max-width: 740px)");

  const handleSaveDescription = (values: IFinancialOperationsEntry) => {
    formik.setValues({
      ...formik.values,
      descriptionOperations: values.descriptionOperations,
    });
    setModalOpen(EModalActiveStateFinancialOperations.IDLE);
  }

  const handleSaveAccount = (values: IFinancialOperationsEntry) => {
    formik.setValues({
      ...formik.values,
      country: values.country,
      countryName: values.countryName,
      bankEntityCode: values.bankEntityCode,
      bankEntityName: values.bankEntityName,
      accountType: values.accountType,
      currency: values.currency,
      accountNumber: values.accountNumber,
    });
    setModalOpen(EModalActiveStateFinancialOperations.IDLE);
  }

  const handleDeleteDescription = () => {
    formik.setValues({
      ...formik.values,
      descriptionOperations: ''
    });
    setModalOpen(EModalActiveStateFinancialOperations.IDLE);
  }

  const handleDeleteAccount = () => {
    formik.setValues({
      ...formik.values,
      country: '',
      countryName: '',
      bankEntityCode: '',
      bankEntityName: '',
      accountType: '',
      currency: '',
      accountNumber: null
    });
    setModalOpen(EModalActiveStateFinancialOperations.IDLE);
  }

  const haveDescription = Boolean(formik.values.descriptionOperations && formik.values.descriptionOperations !== '');
  const haveAccounts = Boolean(
    formik.values.country && formik.values.country !== '' &&
    formik.values.countryName && formik.values.countryName !== '' &&
    formik.values.bankEntityCode && formik.values.bankEntityCode !== '' &&
    formik.values.bankEntityName && formik.values.bankEntityName !== '' &&
    formik.values.accountType && formik.values.accountType !== '' &&
    formik.values.currency && formik.values.currency !== '' &&
    formik.values.accountNumber && formik.values.accountNumber !== null
  );

  return (
    <form>
      <Stack
        direction="column"
        gap={inube.spacing.s300}
        width="100%"
      >
        <Message
          appearance="help"
          title="Si posees cuentas o realizas transacciones en moneda extranjera, es importante que las registres en este paso."
        />
        <Stack
          direction="column"
          gap={inube.spacing.s250}
          width="100%"
        >
          <Text
            type="title"
            size={isMobile ? 'small' : 'medium'}
            appearance="gray"
            weight="bold"
          >
            Operaciones en moneda extranjera
          </Text>
          {
            haveDescription && (
              <UpdatesCard
                isMobile={isMobile}
                loading={loading}
                icon={<MdOutlineAssignment />}
                items={[{
                  title: 'DESCRIPCIÓN DE LA OPERACIÓN',
                  entries: [
                    { value: formik.values.descriptionOperations || '' }
                  ]
                }]}
                onEdit={() => setModalOpen(EModalActiveStateFinancialOperations.EDIT_DESCRIPTION)}
                onDelete={() => setModalOpen(EModalActiveStateFinancialOperations.DELETE_DESCRIPTION)}
              />
            )
          }
          <Stack
            alignItems="center"
            justifyContent="flex-end"
          >
            <Button
              appearance="primary"
              iconBefore={<MdAdd />}
              spacing="compact"
              variant="none"
              onClick={() => setModalOpen(EModalActiveStateFinancialOperations.CREATE_DESCRIPTION)}
              disabled={haveDescription}
              cursorHover
            >
              Adicionar
            </Button>
          </Stack>
        </Stack>
        <Stack
          direction="column"
          gap={inube.spacing.s250}
          width="100%"
        >
          <Text
            type="title"
            size={isMobile ? 'small' : 'medium'}
            appearance="gray"
            weight="bold"
          >
            Cuentas en moneda extranjera
          </Text>
          {
            haveAccounts && (
              <UpdatesCard
                isMobile={isMobile}
                loading={loading}
                icon={<MdOutlineAccountBalance />}
                items={[{
                  title: formik.values.bankEntityName.toUpperCase() || 'ENTIDAD BANCARIA',
                  entries: [
                    { name: 'País', value: formik.values.countryName || '' },
                    { name: 'Entidad bancaria', value: formik.values.bankEntityName || '' },
                    { name: 'Tipo de cuenta', value: formik.values.accountType.split('-')[1] || '' },
                    { name: 'Moneda', value: formik.values.currency || '' },
                    { name: 'Número de cuenta', value: String(formik.values.accountNumber) || '' },
                  ]
                }]}
                onEdit={() => setModalOpen(EModalActiveStateFinancialOperations.EDIT_ACCOUNT)}
                onDelete={() => setModalOpen(EModalActiveStateFinancialOperations.DELETE_ACCOUNT)}
              />
            )
          }
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
              onClick={() => setModalOpen(EModalActiveStateFinancialOperations.CREATE_ACCOUNT)}
              disabled={haveAccounts}
              cursorHover
            >
              Adicionar
            </Button>
          </Stack>
        </Stack>

        {
          (modalOpen === EModalActiveStateFinancialOperations.CREATE_DESCRIPTION || modalOpen === EModalActiveStateFinancialOperations.EDIT_DESCRIPTION) && (
            <DescriptionFinancialOperationsModal
              title={
                modalOpen === EModalActiveStateFinancialOperations.CREATE_DESCRIPTION
                  ? "Adicionar operación"
                  : "Editar operación"
              }
              description={
                modalOpen === EModalActiveStateFinancialOperations.CREATE_DESCRIPTION
                  ? "Agrega información sobre la operación en moneda extrajera."
                  : "Editar información sobre la operación en moneda extrajera."
              }
              actionText={
                modalOpen === EModalActiveStateFinancialOperations.CREATE_DESCRIPTION
                  ? "Agregar"
                  : "Editar"
              }
              portalId="modals"
              formik={formik}
              validationSchema={validationSchemaDescription}
              onCloseModal={() => setModalOpen(EModalActiveStateFinancialOperations.IDLE)}
              onClick={handleSaveDescription}
            />
          )
        }

        {
          (modalOpen === EModalActiveStateFinancialOperations.CREATE_ACCOUNT || modalOpen === EModalActiveStateFinancialOperations.EDIT_ACCOUNT) && (
            <AccountFinancialOperationsModal
              title={
                modalOpen === EModalActiveStateFinancialOperations.CREATE_ACCOUNT
                  ? "Agregar cuenta"
                  : "Editar cuenta"
              }
              description={
                modalOpen === EModalActiveStateFinancialOperations.CREATE_ACCOUNT
                  ? "Agrega información sobre la cuenta con la que realizas tus operaciones internacionales."
                  : "Editar información sobre la cuenta con la que realizas tus operaciones internacionales."
              }
              actionText={
                modalOpen === EModalActiveStateFinancialOperations.CREATE_ACCOUNT
                  ? "Agregar"
                  : "Editar"
              }
              portalId="modals"
              formik={formik}
              validationSchema={validationSchemaAccount}
              serviceDomains={serviceDomains}
              currencies={currencies}
              onCloseModal={() => setModalOpen(EModalActiveStateFinancialOperations.IDLE)}
              onClick={handleSaveAccount}
            />
          )
        }

        {
          (modalOpen === EModalActiveStateFinancialOperations.DELETE_DESCRIPTION || modalOpen === EModalActiveStateFinancialOperations.DELETE_ACCOUNT) && (
            <DecisionModal
              title={
                modalOpen === EModalActiveStateFinancialOperations.DELETE_DESCRIPTION
                  ? "Eliminar descripción de la operación"
                  : "Eliminar cuenta"
              }
              description={
                modalOpen === EModalActiveStateFinancialOperations.DELETE_DESCRIPTION
                  ? "¿Estás seguro? Eliminar la descripción de la operación no se puede deshacer."
                  : "¿Estás seguro? Eliminar la cuenta nos impide sugerirla como opción en tus próximas solicitudes."
              }
              onCloseModal={() => setModalOpen(EModalActiveStateFinancialOperations.IDLE)}
              actionText="Eliminar"
              appearance="danger"
              onClick={() =>
                modalOpen === EModalActiveStateFinancialOperations.DELETE_DESCRIPTION
                  ? handleDeleteDescription()
                  : handleDeleteAccount()
              }
              portalId="modals"
            />
          )
        }

      </Stack>
    </form>
  )
}

export { FinancialOperationsFormUI };
