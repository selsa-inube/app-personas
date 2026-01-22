import { UpdatesCard } from "@components/cards/UpdatesCard";
import { BankTransfersModal } from "@components/modals/general/updateData/BankTransfersModal";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Button, Message, Stack } from "@inubekit/inubekit";
import { FormikProps } from "formik";
import { MdAdd, MdOutlineAccountBalance } from "react-icons/md";
import { IServiceDomains } from "src/context/app/types";
import * as Yup from "yup";
import { IBankTransfersEntry } from "./types";

interface BankTransfersFormUIProps {
  formik: FormikProps<IBankTransfersEntry>;
  loading?: boolean;
  validationSchema: Yup.ObjectSchema<Yup.AnyObject>;
  serviceDomains: IServiceDomains;
  modalState: {
    show: boolean;
    editEntry: IBankTransfersEntry | undefined;
  };
  onSaveBankTransfers: (values: IBankTransfersEntry) => void;
  onDeleteBankTransfers: () => void;
  onToggleModal: () => void;
  onSelectEdit: () => void;
}

function BankTransfersFormUI(props: BankTransfersFormUIProps) {
  const {
    formik,
    loading,
    validationSchema,
    serviceDomains,
    modalState,
    onSaveBankTransfers,
    onDeleteBankTransfers,
    onToggleModal,
    onSelectEdit,
  } = props;

  const isMobile = useMediaQuery("(max-width: 700px)");

  const haveBank = Boolean(
    formik.values.bankEntityName &&
      formik.values.bankEntityCode !== "" &&
      formik.values.accountType &&
      formik.values.accountType !== "" &&
      formik.values.accountNumber &&
      String(formik.values.accountNumber || "") !== "",
  );

  const items = haveBank
    ? [
        {
          title:
            formik.values.bankEntityName || "Datos de transferencia bancaria",
          entries: [
            {
              name: "Tipo de cuenta",
              value: formik.values.accountType.split("-")[1] || "",
            },
            {
              name: "Número de cuenta",
              value: String(formik.values.accountNumber || ""),
            },
          ],
        },
      ]
    : [];

  return (
    <form>
      <Stack direction="column" gap={inube.spacing.s200}>
        {!haveBank ? (
          <Message
            appearance="help"
            title="Actualmente no tienes una cuenta bancaria relacionada. Haz clic en “Agregar cuenta” para empezar."
          />
        ) : (
          <UpdatesCard
            id={String(formik.values.accountNumber)}
            isMobile={isMobile}
            loading={loading}
            icon={<MdOutlineAccountBalance />}
            items={items}
            deleteTitle="Eliminar cuenta"
            deleteDescription="¿Estás seguro? Eliminar la cuenta nos impide sugerirla como opción de pago o reembolso en tus próximas solicitudes."
            onEdit={onSelectEdit}
            onDelete={onDeleteBankTransfers}
          />
        )}

        {modalState.show && (
          <BankTransfersModal
            title={modalState.editEntry ? "Editar cuenta" : "Agregar cuenta"}
            description={
              modalState.editEntry
                ? "Edita la cuenta para realizar transferencias de dinero."
                : "Agrega una cuenta para realizar transferencias de dinero. "
            }
            actionText={modalState.editEntry ? "Editar" : "Agregar"}
            portalId="modals"
            formik={formik}
            validationSchema={validationSchema}
            serviceDomains={serviceDomains}
            onCloseModal={onToggleModal}
            onClick={onSaveBankTransfers}
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
            onClick={!haveBank ? () => onToggleModal() : undefined}
            cursorHover={!haveBank}
            disabled={haveBank}
          >
            Agregar cuenta
          </Button>
        </Stack>
      </Stack>
    </form>
  );
}

export { BankTransfersFormUI };
