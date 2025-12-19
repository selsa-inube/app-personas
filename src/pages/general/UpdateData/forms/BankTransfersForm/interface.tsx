import { UpdatesCard } from "@components/cards/UpdatesCard";
import { DecisionModal } from "@components/modals/general/DecisionModal";
import { BankTransfersModal } from "@components/modals/general/updateData/BankTransfersModal";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Button, Message, Stack } from "@inubekit/inubekit";
import { FormikProps } from "formik";
import { MdAdd, MdOutlineAccountBalance } from "react-icons/md";
import { IServiceDomains } from "src/context/app/types";
import * as Yup from "yup";
import { EModalActiveState } from "../../types";
import { IBankTransfersEntry } from "./types";

interface BankTransfersFormUIProps {
  formik: FormikProps<IBankTransfersEntry>;
  loading?: boolean;
  validationSchema: Yup.ObjectSchema<Yup.AnyObject>;
  serviceDomains: IServiceDomains;
  modalState: EModalActiveState;
  setModalState: React.Dispatch<React.SetStateAction<EModalActiveState>>;
  onSaveBankTransfers: (values: IBankTransfersEntry) => void;
  onDeleteBankTransfers: () => void;
}

function BankTransfersFormUI(props: BankTransfersFormUIProps) {
  const {
    formik,
    loading,
    validationSchema,
    serviceDomains,
    modalState,
    setModalState,
    onSaveBankTransfers,
    onDeleteBankTransfers,
  } = props;

  const isMobile = useMediaQuery("(max-width: 700px)");

  const haveBank = Boolean(
    formik.values.bankEntityName &&
      formik.values.bankEntityCode !== "" &&
      formik.values.accountType &&
      formik.values.accountType !== "" &&
      formik.values.accountNumber &&
      formik.values.accountNumber !== "",
  );

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
            isMobile={isMobile}
            loading={loading}
            icon={<MdOutlineAccountBalance />}
            items={[
              {
                title:
                  formik.values.bankEntityName ||
                  "Datos de transferencia bancaria",
                entries: [
                  {
                    name: "Tipo de cuenta",
                    value: formik.values.accountType.split("-")[1] || "",
                  },
                  {
                    name: "Número de cuenta",
                    value: formik.values.accountNumber || "",
                  },
                ],
              },
            ]}
            onEdit={() => setModalState(EModalActiveState.EDIT)}
            onDelete={() => setModalState(EModalActiveState.DELETE)}
          />
        )}

        {(modalState === EModalActiveState.CREATE ||
          modalState === EModalActiveState.EDIT) && (
          <BankTransfersModal
            title={
              modalState === EModalActiveState.CREATE
                ? "Agregar cuenta"
                : "Editar cuenta"
            }
            description={
              modalState === EModalActiveState.CREATE
                ? "Agrega una cuenta para realizar transferencias de dinero. "
                : "Edita la cuenta para realizar transferencias de dinero."
            }
            actionText={
              modalState === EModalActiveState.CREATE ? "Agregar" : "Editar"
            }
            portalId="modals"
            formik={formik}
            validationSchema={validationSchema}
            serviceDomains={serviceDomains}
            onCloseModal={() => setModalState(EModalActiveState.IDLE)}
            onClick={onSaveBankTransfers}
          />
        )}

        {modalState === EModalActiveState.DELETE && (
          <DecisionModal
            title="Eliminar cuenta"
            description="¿Estás seguro? Eliminar la cuenta nos impide sugerirla como opción de pago o reembolso en tus próximas solicitudes."
            onCloseModal={() => setModalState(EModalActiveState.IDLE)}
            actionText="Eliminar"
            appearance="danger"
            onClick={onDeleteBankTransfers}
            portalId="modals"
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
            onClick={
              !haveBank
                ? () => setModalState(EModalActiveState.CREATE)
                : undefined
            }
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
