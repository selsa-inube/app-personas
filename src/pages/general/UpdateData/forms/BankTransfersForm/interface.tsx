import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Button, Message, Stack } from "@inubekit/inubekit";
import { FormikProps } from "formik";
import { IBankTransfersEntry } from "./types";
import { IServiceDomains } from "src/context/app/types";
import { UpdatesCard } from "@components/cards/UpdatesCard";
import { MdAdd, MdOutlineAccountBalance } from "react-icons/md";
import { useState } from "react";
import { EModalActiveState } from "../../types";
import { BankTransfersModal } from "@components/modals/general/updateData/BankTransfersModal";
import { DecisionModal } from "@components/modals/general/DecisionModal";
import * as Yup from "yup";

interface BankTransfersFormUIProps {
  formik: FormikProps<IBankTransfersEntry>;
  loading?: boolean;
  validationSchema: Yup.ObjectSchema<Yup.AnyObject>;
  serviceDomains: IServiceDomains;
}

function BankTransfersFormUI(props: BankTransfersFormUIProps) {
  const { formik, loading, validationSchema, serviceDomains } = props;

  const [modalOpen, setModalOpen] = useState<EModalActiveState>(EModalActiveState.IDLE);
  const isMobile = useMediaQuery("(max-width: 700px)");

  const haveBank = Boolean(
    formik.values.bankEntityName &&
    formik.values.bankEntityCode !== "" &&
    formik.values.accountType &&
    formik.values.accountType !== "" &&
    formik.values.accountNumber &&
    formik.values.accountNumber !== ""
  )

  const handleDeleteBankTransfers = (formik: FormikProps<IBankTransfersEntry>) => {
    formik.setValues({
      ...formik.values,
      bankEntityName: '',
      bankEntityCode: '',
      accountType: '',
      accountNumber: '',
    });
    setModalOpen(EModalActiveState.IDLE);
  }

  const handleSaveBankTransfers = (values: IBankTransfersEntry) => {
    formik.setValues({
      ...formik.values,
      bankEntityName: values.bankEntityName,
      bankEntityCode: values.bankEntityCode,
      accountType: values.accountType,
      accountNumber: values.accountNumber,
    });
    setModalOpen(EModalActiveState.IDLE);
  }

  return (
    <form>
      <Stack direction="column" gap={inube.spacing.s200}>
        {
          !haveBank
            ? (
              <Message
                appearance="help"
                title="Actualmente no tienes una cuenta bancaria relacionada. Haz clic en “Agregar cuenta” para empezar."
              />
            )
            : (
              <UpdatesCard
                isMobile={isMobile}
                loading={loading}
                icon={<MdOutlineAccountBalance />}
                items={[{
                  title: formik.values.bankEntityName || 'Datos de transferencia bancaria',
                  entries: [
                    { name: "Tipo de cuenta", value: formik.values.accountType.split('-')[1] || '' },
                    { name: "Número de cuenta", value: formik.values.accountNumber || '' },
                  ]
                }]}
                onEdit={() => setModalOpen(EModalActiveState.EDIT)}
                onDelete={() => setModalOpen(EModalActiveState.DELETE)}
              />
            )
        }

        {
          (modalOpen === EModalActiveState.CREATE || modalOpen === EModalActiveState.EDIT) && (
            <BankTransfersModal
              title={modalOpen === EModalActiveState.CREATE ? "Agregar cuenta" : "Editar cuenta"}
              description={modalOpen === EModalActiveState.CREATE ? "Agrega una cuenta para realizar transferencias de dinero. " : "Edita la cuenta para realizar transferencias de dinero."}
              actionText={modalOpen === EModalActiveState.CREATE ? "Agregar" : "Editar"}
              portalId="modals"
              formik={formik}
              validationSchema={validationSchema}
              serviceDomains={serviceDomains}
              onCloseModal={() => setModalOpen(EModalActiveState.IDLE)}
              onClick={handleSaveBankTransfers}
            />
          )
        }

        {

          modalOpen === EModalActiveState.DELETE && (
            <DecisionModal
              title="Eliminar cuenta"
              description="¿Estás seguro? Eliminar la cuenta nos impide sugerirla como opción de pago o reembolso en tus próximas solicitudes."
              onCloseModal={() => setModalOpen(EModalActiveState.IDLE)}
              actionText="Eliminar"
              appearance="danger"
              onClick={() => handleDeleteBankTransfers(formik)}
              portalId="modals"
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
            onClick={!haveBank ? () => setModalOpen(EModalActiveState.CREATE) : undefined}
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
