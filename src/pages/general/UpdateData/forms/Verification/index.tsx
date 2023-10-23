import { BoxAttribute } from "@components/cards/BoxAttribute";
import { Accordion } from "@design/data/Accordion";
import { Button } from "@design/input/Button";
import { Divider } from "@design/layout/Divider";
import { Grid } from "@design/layout/Grid";
import { Stack } from "@design/layout/Stack";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { getValueOfDomain } from "@mocks/domains/domainService.mocks";
import React from "react";
import { MdOutlineArrowBack } from "react-icons/md";
import { activeDM } from "src/model/domains/general/activedm";
import { bloodTypeDM } from "src/model/domains/personalInformation/bloodtypedm";
import { cityDM } from "src/model/domains/personalInformation/citydm";
import { genderDM } from "src/model/domains/personalInformation/genderdm";
import { identificationTypeDM } from "src/model/domains/personalInformation/identificationtypedm";
import { maritalStatusDM } from "src/model/domains/personalInformation/maritalstatusdm";
import { relationshipDM } from "src/model/domains/personalResidence/relationshipdm";
import { residenceTypeDM } from "src/model/domains/personalResidence/residencetypedm";
import { stratumDM } from "src/model/domains/personalResidence/stratumdm";
import { educationLevelTypeDM } from "src/model/domains/socioeconomicInformation/educationLeveldm";
import { updateDataSteps } from "../../config/assisted";
import { mapPersonalAsset, mapPersonalDebt } from "../../config/mappers";
import { IFormsUpdateData } from "../../types";
import { IBankTransfersEntry } from "../BankTransfersForm/types";
import { IContactDataEntry } from "../ContactDataForm/types";
import { IFinancialOperationsEntry } from "../FinancialOperationsForm/types";
import { IPersonalAssetEntries } from "../PersonalAssetsForm/types";
import { IPersonalDebtEntries } from "../PersonalDebtsForm/types";
import { IPersonalInformationEntry } from "../PersonalInformationForm/types";
import { IPersonalResidenceEntry } from "../PersonalResidenceForm/types";
import { ISocioeconomicInformationEntry } from "../SocioeconomicInformationForm/types";
import { updateDataBoxTitles } from "./config/box";

const renderPersonalInfoVerification = (
  values: IPersonalInformationEntry,
  isTablet: boolean
) => (
  <Grid templateColumns={isTablet ? "1fr" : "1fr 1fr"} gap="s100" width="100%">
    <BoxAttribute label="Primer nombre:" value={values.firstName} />
    <BoxAttribute label="Segundo nombre:" value={values.secondName} />
    <BoxAttribute label="Primer apellido:" value={values.firstLastName} />
    <BoxAttribute label="Segundo apellido:" value={values.secondLastName} />
    <BoxAttribute
      label="Tipo de identificación:"
      value={identificationTypeDM.valueOf(values.identificationType)?.value}
    />
    <BoxAttribute
      label="Numero de identificación:"
      value={values.identification}
    />
    <BoxAttribute
      label="Lugar de expedición:"
      value={cityDM.valueOf(values.expeditionPlace)?.value}
    />
    <BoxAttribute label="Fecha de expedición:" value={values.expeditionDate} />
    <BoxAttribute label="Fecha de nacimiento:" value={values.birthDate} />
    <BoxAttribute
      label="Ciudad de nacimiento:"
      value={cityDM.valueOf(values.city)?.value}
    />
    <BoxAttribute
      label="Genero:"
      value={genderDM.valueOf(values.gender)?.value}
    />
    <BoxAttribute
      label="Estado civil:"
      value={maritalStatusDM.valueOf(values.maritalStatus)?.value}
    />
    <BoxAttribute
      label="Factor RH:"
      value={bloodTypeDM.valueOf(values.bloodType)?.value}
    />
  </Grid>
);

const renderContacDataVerification = (
  values: IContactDataEntry,
  isTablet: boolean
) => (
  <Grid templateColumns={isTablet ? "1fr" : "1fr 1fr"} gap="s100" width="100%">
    <BoxAttribute label="País:" value={values.country} />
    <BoxAttribute
      label="Estado / Departamento:"
      value={values.stateOrDepartment}
    />
    <BoxAttribute label="Ciudad:" value={cityDM.valueOf(values.city)?.value} />
    <BoxAttribute label="Dirección:" value={values.address} />
    <BoxAttribute label="Código postal:" value={values.postalCode} />
    <BoxAttribute label="Teléfono:" value={values.landlinePhone} />
    <BoxAttribute label="Celular:" value={values.cellPhone} />
    <BoxAttribute label="Correo:" value={values.email} />
  </Grid>
);

const renderBankTransfersVerification = (
  values: IBankTransfersEntry,
  isTablet: boolean
) => (
  <Grid templateColumns={isTablet ? "1fr" : "1fr 1fr"} gap="s100" width="100%">
    <BoxAttribute
      label="Entidad bancaria:"
      value={getValueOfDomain(values.bankEntity, "bank")?.value}
    />
    <BoxAttribute
      label="Tipo de cuenta:"
      value={getValueOfDomain(values.accountType, "accountType")?.value}
    />
    <BoxAttribute label="Numero de cuenta:" value={values.accountNumber} />
  </Grid>
);

const renderPersonalAssetsVerification = (
  values: IPersonalAssetEntries,
  isTablet: boolean
) => (
  <Stack direction="column" gap="s250" width="100%">
    {values.entries.map((entry, index) => {
      const personalAsset = mapPersonalAsset(entry, index);
      return (
        <React.Fragment key={entry.id}>
          {index !== 0 && <Divider dashed />}
          <Grid
            templateColumns={isTablet ? "1fr" : "1fr 1fr"}
            gap="s100"
            width="100%"
          >
            <BoxAttribute
              label="Nombre del activo:"
              value={personalAsset.assetType}
            />
            <BoxAttribute
              label="Valor comercial:"
              value={personalAsset.commercialValue}
            />
            <BoxAttribute
              label="Saldo deuda:"
              value={personalAsset.debtBalance}
            />
            <BoxAttribute
              label="Entidad financiera:"
              value={personalAsset.financialEntity}
            />
            <BoxAttribute label="Cuota:" value={personalAsset.quota} />
          </Grid>
        </React.Fragment>
      );
    })}
  </Stack>
);

const renderPersonalDebtVerification = (
  values: IPersonalDebtEntries,
  isTablet: boolean
) => (
  <Stack direction="column" gap="s250" width="100%">
    {values.entries.map((entry, index) => {
      const personalDebt = mapPersonalDebt(entry, index);
      return (
        <>
          {index !== 0 && <Divider dashed />}
          <Grid
            templateColumns={isTablet ? "1fr" : "1fr 1fr"}
            gap="s100"
            width="100%"
            key={entry.id}
          >
            <BoxAttribute
              label="Nombre del pasivo:"
              value={personalDebt.liabilityType}
            />
            <BoxAttribute
              label="Fecha de terminación:"
              value={personalDebt.terminationDate}
            />
            <BoxAttribute
              label="Saldo deuda:"
              value={personalDebt.debtBalance}
            />
            <BoxAttribute
              label="Entidad financiera:"
              value={personalDebt.financialEntity}
            />
            <BoxAttribute label="Cuota:" value={personalDebt.quota} />
          </Grid>
        </>
      );
    })}
  </Stack>
);

const renderfinancialOperationsVerification = (
  values: IFinancialOperationsEntry,
  isTablet: boolean
) => (
  <Stack direction="column" gap="s100" width="100%">
    <Grid
      templateColumns={isTablet ? "1fr" : "1fr 1fr"}
      gap="s100"
      width="100%"
    >
      <BoxAttribute
        label="Operaciones en moneda extranjera:"
        value={activeDM.valueOf(values.hasForeignCurrencyTransactions)?.value}
      />
      <BoxAttribute
        label="Cuentas en moneda extranjera:"
        value={activeDM.valueOf(values.hasForeignCurrencyAccounts)?.value}
      />
    </Grid>
    <BoxAttribute
      label="Descripción de las operaciones:"
      value={values.descriptionOperations}
      direction="column"
    />
    <Grid
      templateColumns={isTablet ? "1fr" : "1fr 1fr"}
      gap="s100"
      width="100%"
    >
      <BoxAttribute label="País:" value={values.country} />
      <BoxAttribute
        label="Banco:"
        value={getValueOfDomain(values.bankEntity, "bankForeign")?.value}
      />
      <BoxAttribute
        label="Moneda:"
        value={getValueOfDomain(values.currency, "currency")?.value}
      />
      <BoxAttribute label="Numero de cuenta:" value={values.accountNumber} />
    </Grid>
  </Stack>
);

const renderPersonalResidenceVerification = (
  values: IPersonalResidenceEntry,
  isTablet: boolean
) => (
  <Grid templateColumns={isTablet ? "1fr" : "1fr 1fr"} gap="s100" width="100%">
    {values.type && (
      <BoxAttribute
        label="Tipo de vivienda:"
        value={residenceTypeDM.valueOf(values.type)?.value}
      />
    )}

    {values.stratum && (
      <BoxAttribute
        label="Estrato de la vivienda:"
        value={stratumDM.valueOf(values.stratum)?.value}
      />
    )}
    {values.ownerName && (
      <BoxAttribute label="Nombre del titular:" value={values.ownerName} />
    )}
    {values.relationship && (
      <BoxAttribute
        label="Parentesco:"
        value={relationshipDM.valueOf(values.relationship)?.value}
      />
    )}

    {values.ownerCellPhone && (
      <BoxAttribute
        label="Celular del titular:"
        value={values.ownerCellPhone}
      />
    )}
  </Grid>
);

const renderSocioeconomicInfoVerification = (
  values: ISocioeconomicInformationEntry,
  isTablet: boolean
) => (
  <Grid templateColumns={isTablet ? "1fr" : "1fr 1fr"} gap="s100" width="100%">
    {values.educationLevel !== "" && (
      <BoxAttribute
        label="Nivel de estudios:"
        value={educationLevelTypeDM.valueOf(values.educationLevel)?.value}
      />
    )}

    {values.isResponsibleHome !== "" && (
      <BoxAttribute
        label="Responsable del hogar:"
        value={activeDM.valueOf(values.isResponsibleHome)?.value}
      />
    )}

    {values.isSingleMother !== "" && (
      <BoxAttribute
        label="Mujer cabeza de familia:"
        value={activeDM.valueOf(values.isSingleMother)?.value}
      />
    )}

    <BoxAttribute
      label="Numero de personas a cargo:"
      value={values.dependants}
    />

    {values.isPublicExposed !== "" && (
      <BoxAttribute
        label="Públicamente expuesto:"
        value={activeDM.valueOf(values.isPublicExposed)?.value}
      />
    )}

    {values.isDeclaredIncome !== "" && (
      <BoxAttribute
        label="Declara renta:"
        value={activeDM.valueOf(values.isDeclaredIncome)?.value}
      />
    )}

    {values.isPublicOfficials !== "" && (
      <BoxAttribute
        label="Administra recursos publicos:"
        value={activeDM.valueOf(values.isPublicOfficials)?.value}
      />
    )}
  </Grid>
);

interface VerificationProps {
  updatedData: IFormsUpdateData;
  handleStepChange: (stepId: number) => void;
}

function UpdateDataVerification(props: VerificationProps) {
  const { updatedData, handleStepChange } = props;

  const isTablet = useMediaQuery("(max-width: 1224px)");

  return (
    <Stack direction="column" gap="s300">
      {Object.entries(updateDataBoxTitles).map(([key, title]) => (
        <Accordion title={title} key={`${key}-box`}>
          <Stack
            direction="column"
            width="100%"
            alignItems="flex-end"
            gap={isTablet ? "s150" : "s200"}
          >
            {key === "personalInformation" &&
              renderPersonalInfoVerification(
                updatedData.personalInformation.values,
                isTablet
              )}
            {key === "contactData" &&
              renderContacDataVerification(
                updatedData.contactData.values,
                isTablet
              )}
            {key === "bankTransfers" &&
              renderBankTransfersVerification(
                updatedData.bankTransfers.values,
                isTablet
              )}

            {key === "personalAssets" &&
              renderPersonalAssetsVerification(
                updatedData.personalAssets.values,
                isTablet
              )}
            {key === "personalDebts" &&
              renderPersonalDebtVerification(
                updatedData.personalDebts.values,
                isTablet
              )}
            {key === "financialOperations" &&
              renderfinancialOperationsVerification(
                updatedData.financialOperations.values,
                isTablet
              )}

            {key === "personalResidence" &&
              renderPersonalResidenceVerification(
                updatedData.personalResidence.values,
                isTablet
              )}
            {key === "socioeconomicInformation" &&
              renderSocioeconomicInfoVerification(
                updatedData.socioeconomicInformation.values,
                isTablet
              )}
            <Button
              iconBefore={<MdOutlineArrowBack />}
              handleClick={() =>
                handleStepChange(
                  updateDataSteps[key as keyof IFormsUpdateData].id
                )
              }
              variant="none"
              appearance="dark"
            >
              Regresar a este paso
            </Button>
          </Stack>
        </Accordion>
      ))}
    </Stack>
  );
}

export { UpdateDataVerification };
