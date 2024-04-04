import { BoxAttribute } from "@components/cards/BoxAttribute";
import { Stack } from "@design/layout/Stack";
import { ICommentsEntry } from "src/shared/forms/CommentsForm/types";
import { IFormsPay } from "../../../types";

const renderObligationsVerification = () => <></>;

const renderPaymentMethodVerification = () => <></>;

const renderCommentsVerification = (values: ICommentsEntry) => (
  <Stack width="100%" direction="column">
    {values.comments !== "" && (
      <BoxAttribute
        label="Comentarios adicionales:"
        value={values.comments}
        direction="column"
      />
    )}
  </Stack>
);

interface VerificationBoxesProps {
  pay: IFormsPay;
  stepKey: string;
  isTablet: boolean;
}

function VerificationBoxes(props: VerificationBoxesProps) {
  const { pay, stepKey } = props;
  return (
    <>
      {stepKey === "obligations" && renderObligationsVerification()}

      {stepKey === "paymentMethod" && renderPaymentMethodVerification()}

      {stepKey === "comments" &&
        renderCommentsVerification(pay.comments.values)}
    </>
  );
}

export { VerificationBoxes };
