import { Box } from "@components/cards/Box";
import { Product } from "@components/cards/Product";
import { QuickAccess } from "@components/cards/QuickAccess";
import { SavingsCommitmentCard } from "@components/cards/SavingsCommitmentCard";
import { quickLinks } from "@config/quickLinks";
import { Text } from "@design/data/Text";
import { Title } from "@design/data/Title";
import { Grid } from "@design/layout/Grid";
import { Stack } from "@design/layout/Stack";
import { Breadcrumbs } from "@design/navigation/Breadcrumbs";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { savingsCommitmentsMock } from "@mocks/products/savings/savingsCommitments.mocks";
import {
  extractInvestmentAttributes,
  formatInvestmentCurrencyAttrs,
  investmentAttributeBreakpoints,
} from "@pages/admin/home/config/products";
import { StyledCommitmentsContainer } from "@pages/admin/home/styles";
import { MdArrowBack, MdOutlineAccountBalanceWallet } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { IAttribute, ICommitment, IProduct } from "src/model/entity/product";
import { currencyFormat } from "src/utils/currency";
import { extractAttribute } from "src/utils/products";
import { truncateAndObfuscateDescription } from "src/utils/texts";
import {
  investmentIcons,
  savingsAccountIcons,
} from "../SavingsAccount/config/saving";
import { mySavingsBox } from "./config/boxes";
import { crumbsMySavings } from "./config/navigation";
import {
  extractMySavingsAttributes,
  formatMySavingsCurrencyAttrs,
  mySavingsAttributeBreakpoints,
} from "./config/products";

const renderSavingCommitments = (productsCommitments: ICommitment[]) => {
  return productsCommitments.map((commitment) => {
    const valueToPay = extractAttribute(commitment.attributes, "value_to_pay");
    const nextPayDate = extractAttribute(
      commitment.attributes,
      "next_pay_date",
    );
    const navigate = useNavigate();

    const currencyValueToPay = valueToPay && {
      id: valueToPay.id || "",
      label: valueToPay.label || "",
      value: currencyFormat(Number(valueToPay.value)),
    };

    const attributes: IAttribute[] = [];
    if (currencyValueToPay) attributes.push(currencyValueToPay);
    if (nextPayDate) attributes.push(nextPayDate);

    const handleNavigateCommitment = () => {
      navigate(`/my-savings/commitment/${commitment.id}`);
    };

    return (
      <SavingsCommitmentCard
        key={commitment.id}
        title={commitment.title}
        tag={commitment.tag}
        attributes={attributes}
        onClick={handleNavigateCommitment}
      />
    );
  });
};

function renderMySavingsContent(
  productsCommitments: ICommitment[],
  savingsAccountsMock: IProduct[],
  savingsStatutoryContributionsMock: IProduct[],
  cdats?: IProduct[],
  programmedSavings?: IProduct[],
) {
  return (
    <>
      <Stack direction="column" gap="s300">
        <Text type="title" size="medium">
          Tus productos
        </Text>
        <Box {...mySavingsBox}>
          <Stack direction="column" gap="s250">
            <Stack direction="column" gap="s200">
              {savingsCommitmentsMock.length > 0 && (
                <Text type="label" size="medium">
                  Cuentas
                </Text>
              )}
              <Stack direction="column" gap="s100">
                {savingsAccountsMock.length === 0 ? (
                  <Product
                    empty={true}
                    icon={<MdOutlineAccountBalanceWallet />}
                  />
                ) : (
                  savingsAccountsMock.map((saving) => (
                    <Product
                      key={saving.id}
                      title={saving.title}
                      description={truncateAndObfuscateDescription(
                        saving.id,
                        saving.type,
                        4,
                      )}
                      attributes={formatMySavingsCurrencyAttrs(
                        extractMySavingsAttributes(saving),
                      )}
                      tags={saving.tags}
                      icon={savingsAccountIcons[saving.type]}
                      breakpoints={mySavingsAttributeBreakpoints}
                      navigateTo={`/my-savings/account/${saving.id}`}
                    />
                  ))
                )}
              </Stack>
            </Stack>
            <Stack direction="column" gap="s200">
              {savingsStatutoryContributionsMock.length > 0 && (
                <Text type="label" size="medium">
                  Aportes estatutarios
                </Text>
              )}
              <Stack direction="column" gap="s100">
                {savingsStatutoryContributionsMock.length === 0 ? (
                  <Product
                    empty={true}
                    icon={<MdOutlineAccountBalanceWallet />}
                  />
                ) : (
                  savingsStatutoryContributionsMock.map((saving) => (
                    <Product
                      key={saving.id}
                      title={saving.title}
                      description={truncateAndObfuscateDescription(
                        saving.id,
                        saving.type,
                        4,
                      )}
                      attributes={formatMySavingsCurrencyAttrs(
                        extractMySavingsAttributes(saving),
                      )}
                      tags={saving.tags}
                      icon={savingsAccountIcons[saving.type]}
                      breakpoints={mySavingsAttributeBreakpoints}
                      navigateTo={`/my-savings/account/${saving.id}`}
                    />
                  ))
                )}
              </Stack>
            </Stack>
            {cdats && cdats.length > 0 && (
              <Stack direction="column" gap="s200">
                <Text type="label" size="medium">
                  CDAT
                </Text>
                <Stack direction="column" gap="s100">
                  {cdats.map((investment) => (
                    <Product
                      key={investment.id}
                      title={investment.title}
                      description={investment.id}
                      attributes={formatInvestmentCurrencyAttrs(
                        extractInvestmentAttributes(investment),
                      )}
                      tags={investment.tags}
                      icon={investmentIcons[investment.type]}
                      navigateTo={`/my-savings/account/${investment.id}`}
                      breakpoints={investmentAttributeBreakpoints}
                    />
                  ))}
                </Stack>
              </Stack>
            )}
            {programmedSavings && programmedSavings.length > 0 && (
              <Stack direction="column" gap="s200">
                <Text type="label" size="medium">
                  Ahorros programados
                </Text>
                <Stack direction="column" gap="s100">
                  {programmedSavings.map((investment) => (
                    <Product
                      key={investment.id}
                      title={investment.title}
                      description={investment.id}
                      attributes={formatInvestmentCurrencyAttrs(
                        extractInvestmentAttributes(investment),
                      )}
                      tags={investment.tags}
                      icon={investmentIcons[investment.type]}
                      navigateTo={`/my-savings/account/${investment.id}`}
                      breakpoints={investmentAttributeBreakpoints}
                    />
                  ))}
                </Stack>
              </Stack>
            )}
            <Stack justifyContent="flex-end" gap="s100">
              <Text type="label" size="large">
                Total ahorrado :
              </Text>
              <Text type="body" size="medium" appearance="gray">
                $ 14.734.650
              </Text>
            </Stack>
            {productsCommitments.length > 0 && (
              <>
                <Text type="label" size="medium">
                  Compromisos
                </Text>
                <StyledCommitmentsContainer>
                  {renderSavingCommitments(productsCommitments)}
                </StyledCommitmentsContainer>
              </>
            )}
          </Stack>
        </Box>
      </Stack>
    </>
  );
}

interface MySavingsUIProps {
  productsCommitments: ICommitment[];
  savingsAccountsMock: IProduct[];
  savingsStatutoryContributionsMock: IProduct[];
  cdats?: IProduct[];
  programmedSavings?: IProduct[];
}

function MySavingsUI(props: MySavingsUIProps) {
  const {
    productsCommitments,
    savingsAccountsMock,
    savingsStatutoryContributionsMock,
    cdats,
    programmedSavings,
  } = props;
  const isDesktop = useMediaQuery("(min-width: 1440px)");
  return (
    <>
      <Stack direction="column" gap="s300">
        <Breadcrumbs crumbs={crumbsMySavings} />
        <Title
          title="Mis ahorros"
          subtitle="Consulta y solicita tus productos"
          icon={<MdArrowBack />}
          navigatePage="/"
        />
      </Stack>

      {!isDesktop ? (
        <Stack direction="column" margin={`${inube.spacing.s300} 0 0`}>
          {renderMySavingsContent(
            productsCommitments,
            savingsAccountsMock,
            savingsStatutoryContributionsMock,
            cdats,
            programmedSavings,
          )}
        </Stack>
      ) : (
        <Grid
          gap="s600"
          margin={`${inube.spacing.s600} 0 0`}
          templateColumns="1fr 250px"
        >
          {renderMySavingsContent(
            productsCommitments,
            savingsAccountsMock,
            savingsStatutoryContributionsMock,
            cdats,
            programmedSavings,
          )}
          <QuickAccess links={quickLinks} />
        </Grid>
      )}
    </>
  );
}

export { MySavingsUI };
