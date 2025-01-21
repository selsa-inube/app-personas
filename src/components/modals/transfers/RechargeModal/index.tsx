import { IHelpOption } from "@components/modals/payments/PaymentHelpModal";
import { Select } from "@design/input/Select";
import { ISelectOption } from "@design/input/Select/types";
import { TextField } from "@design/input/TextField";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Blanket } from "@inubekit/blanket";
import { Button } from "@inubekit/button";
import { Divider } from "@inubekit/divider";
import { Icon, Stack } from "@inubekit/inubekit";
import { Text } from "@inubekit/text";
import { useFormik } from "formik";
import { createPortal } from "react-dom";
import { MdOutlineClose } from "react-icons/md";
import { IProduct } from "src/model/entity/product";
import {
  handleChangeWithCurrency,
  validateCurrencyField,
} from "src/utils/currency";
import { getFieldState } from "src/utils/forms/forms";
import { validationMessages } from "src/validations/validationMessages";
import { validationRules } from "src/validations/validationRules";
import * as Yup from "yup";
import { StyledModal } from "./styles";

const mapSavingAccounts = (savingAccounts: IProduct[]): ISelectOption[] => {
  return savingAccounts.map((savingAccount) => ({
    id: savingAccount.id,
    value: `${savingAccount.title} - ${savingAccount.id}`,
  }));
};

const validationSchema = Yup.object().shape({
  savingAccount: Yup.string().required(validationMessages.required),
  amount: validationRules.money.required(validationMessages.required),
});

interface RechargeModalProps {
  savingAccounts: IProduct[];
  onCloseModal: () => void;
  onSubmit: (savingAccount: string, amount: number) => void;
}

function RechargeModal(props: RechargeModalProps) {
  const { savingAccounts, onCloseModal, onSubmit } = props;

  const options = mapSavingAccounts(savingAccounts);
  const initialSavingAccount = options.length === 1 ? options[0].id : "";

  const formik = useFormik({
    initialValues: {
      savingAccount: initialSavingAccount,
      amount: "",
    },
    validationSchema,
    validateOnBlur: false,
    onSubmit: () => {
      onSubmit(formik.values.savingAccount, parseInt(formik.values.amount));
    },
  });

  const isMobile = useMediaQuery("(max-width: 580px)");

  const node = document.getElementById("modals");

  if (node === null) {
    throw new Error(
      "The portal node is not defined. This can occur when the specific node used to render the portal has not been defined correctly.",
    );
  }

  return createPortal(
    <Blanket>
      <StyledModal $smallScreen={isMobile}>
        <Stack direction="column" width="100%" gap={inube.spacing.s100}>
          <Stack justifyContent="space-between" alignItems="center">
            <Text type="title" size="medium">
              Depositar
            </Text>

            <Icon
              appearance="dark"
              icon={<MdOutlineClose />}
              onClick={onCloseModal}
              cursorHover={true}
              size="20px"
              spacing="narrow"
            />
          </Stack>
          <Text type="body" size="medium" appearance="gray">
            Diligencia el formulario para depositar tu cuenta
          </Text>
        </Stack>

        <Divider dashed />

        <Stack direction="column" gap={inube.spacing.s150}>
          <Select
            label="Cuenta de ahorros"
            name="savingAccount"
            id="savingAccount"
            size="compact"
            isFullWidth
            options={mapSavingAccounts(savingAccounts)}
            onBlur={formik.handleBlur}
            errorMessage={formik.errors.savingAccount}
            state={getFieldState(formik, "savingAccount")}
            onChange={formik.handleChange}
            value={formik.values.savingAccount || ""}
            readOnly={options.length === 1}
            isRequired={options.length !== 1}
          />
          <TextField
            label="Valor del depósito"
            name="amount"
            id="amount"
            placeholder="Digita el valor que vas a depositar"
            value={validateCurrencyField("amount", formik)}
            type="text"
            errorMessage={formik.errors.amount}
            size="compact"
            isFullWidth
            state={getFieldState(formik, "amount")}
            onBlur={formik.handleBlur}
            onChange={(e) => handleChangeWithCurrency(formik, e)}
            validMessage="El valor es válido"
            isRequired
          />
        </Stack>

        <Stack width="100%" justifyContent="flex-end" gap={inube.spacing.s100}>
          <Button
            appearance="gray"
            variant="outlined"
            spacing="compact"
            onClick={onCloseModal}
          >
            Atrás
          </Button>
          <Button
            spacing="compact"
            onClick={() => formik.handleSubmit()}
            disabled={!formik.isValid || !formik.dirty}
          >
            Enviar
          </Button>
        </Stack>
      </StyledModal>
    </Blanket>,
    node,
  );
}

export { RechargeModal };
export type { IHelpOption };
