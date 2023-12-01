import { BoxAttribute } from "@components/cards/BoxAttribute";
import { Divider } from "@design/layout/Divider";
import { Grid } from "@design/layout/Grid";
import { Stack } from "@design/layout/Stack";
import { Text } from "@design/data/Text";
import { getValueOfDomain } from "@mocks/domains/domainService.mocks";
import {
  mapPersonalAsset,
  mapPersonalDebt,
  mapPersonalReference,
} from "@pages/general/UpdateData/config/mappers";
import { IFormsUpdateData } from "@pages/general/UpdateData/types";
import React from "react";
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
import { economicActivityDM } from "src/model/domains/economicActivity/economicactivitydm";
import { contractTypeDM } from "src/model/domains/economicActivity/contracttypedm";
import { severanceRegimeDM } from "src/model/domains/economicActivity/severanceregimedm";
import { workdayDM } from "src/model/domains/economicActivity/workdaydm";
import { companyFormalityDM } from "src/model/domains/economicActivity/companyformalitydm";
import { countryDM } from "src/model/domains/financialOperations/countrydm";
import { currencyFormat } from "src/utils/formats";
import { IBankTransfersEntry } from "../../BankTransfersForm/types";
import { IContactDataEntry } from "../../ContactDataForm/types";
import { IExpensesEntry } from "../../ExpensesForm/types";
import { IFinancialOperationsEntry } from "../../FinancialOperationsForm/types";
import { IIncomesEntry } from "../../IncomesForm/types";
import { IPersonalAssetEntries } from "../../PersonalAssetsForm/types";
import { IPersonalDebtEntries } from "../../PersonalDebtsForm/types";
import { IPersonalInformationEntry } from "../../PersonalInformationForm/types";
import { IPersonalReferenceEntries } from "../../PersonalReferencesForm/types";
import { IPersonalResidenceEntry } from "../../PersonalResidenceForm/types";
import { ISocioeconomicInformationEntry } from "../../SocioeconomicInformationForm/types";
import { IEconomicActivityEntry } from "../../EconomicActivityForm/types";
import { IRelationshipWithDirectorsEntry } from "../../RelationshipWithDirectorsForm/types";
import { IFamilyGroupEntries } from "../../FamilyGroupForm/types";
import { mapFamilyGroupTable } from "../../FamilyGroupForm/config/mapper";

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

const renderFamilyGroupVerification = (
  values: IFamilyGroupEntries,
  isTablet: boolean
) => {
  const transformedEntries = mapFamilyGroupTable(values.entries);
  return (
    <Stack direction="column" gap="s250" width="100%">
      <Grid
        templateColumns={isTablet ? "1fr" : "1fr 1fr"}
        gap="s100"
        width="100%"
      >
        {transformedEntries.map((entry) => {
          return (
            <React.Fragment key={entry.id}>
              <BoxAttribute
                label={`${entry.fullName} :` || ""}
                value={entry.relationship}
              />
            </React.Fragment>
          );
        })}
      </Grid>
    </Stack>
  );
};

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
              value={personalAsset.quota}
            />
            <BoxAttribute label="Saldo deuda:" value={personalAsset.quota} />
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
        <React.Fragment key={entry.id}>
          {index !== 0 && <Divider dashed />}
          <Grid
            templateColumns={isTablet ? "1fr" : "1fr 1fr"}
            gap="s100"
            width="100%"
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
        </React.Fragment>
      );
    })}
  </Stack>
);

const renderPersonalReferencesVerification = (
  values: IPersonalReferenceEntries,
  isTablet: boolean
) => (
  <Stack direction="column" gap="s250" width="100%">
    {values.entries.map((entry, index) => {
      const personalReference = mapPersonalReference(entry, index);
      return (
        <React.Fragment key={entry.id}>
          {index !== 0 && <Divider dashed />}
          <Grid
            templateColumns={isTablet ? "1fr" : "1fr 1fr"}
            gap="s100"
            width="100%"
          >
            <BoxAttribute
              label="Tipo de referencia:"
              value={personalReference.referenceType}
            />
            <BoxAttribute label="Nombre:" value={personalReference.name} />
            <BoxAttribute
              label="Dirección:"
              value={personalReference.address}
            />
            <BoxAttribute
              label="Correo electrónico:"
              value={personalReference.email}
            />
            <BoxAttribute label="Celular:" value={personalReference.phone} />
            <BoxAttribute label="Ciudad:" value={personalReference.city} />
          </Grid>
        </React.Fragment>
      );
    })}
  </Stack>
);

const renderFinancialOperationsVerification = (
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

    {values.isDeclaredIncomes !== "" && (
      <BoxAttribute
        label="Declara renta:"
        value={activeDM.valueOf(values.isDeclaredIncomes)?.value}
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

const renderEconomicActivityVerification = (
  values: IEconomicActivityEntry,
  isTablet: boolean
) => (
  <Stack width="100%" direction="column" gap="s250">
    {values.economicActivity !== "" && (
      <Text type="label" size="medium">
        Clasificación económica
      </Text>
    )}

    <Grid
      templateColumns={isTablet ? "1fr" : "1fr 1fr"}
      gap="s100"
      width="100%"
    >
      {values.economicActivity !== "" && (
        <BoxAttribute
          label="Actividad económica:"
          value={economicActivityDM.valueOf(values.economicActivity)?.value}
        />
      )}

      {values.profession && (
        <BoxAttribute
          label="Profesión:"
          value={getValueOfDomain(values.profession, "profession")?.value}
        />
      )}

      {values.job && <BoxAttribute label="Oficio:" value={values.job} />}

      {values.mainCiiuActivity && (
        <BoxAttribute
          label="Actividad CIIU principal:"
          value={values.mainCiiuActivity}
        />
      )}

      {values.secondaryCiiuActivity && (
        <BoxAttribute
          label="Actividad CIIU secundaria:"
          value={values.secondaryCiiuActivity}
        />
      )}

      {values.economicSector && (
        <BoxAttribute
          label="Sector económico:"
          value={
            getValueOfDomain(values.economicSector, "economicSector")?.value
          }
        />
      )}
    </Grid>

    {(values.company ||
      values.contractType ||
      values.admissionDate ||
      values.contractExpiration ||
      values.severanceRegime ||
      values.workday ||
      values.position ||
      values.dependence ||
      values.employeeCode ||
      values.companyFormality ||
      values.companyCountry ||
      values.companyCity ||
      values.companyPhone ||
      values.companyAddress ||
      values.companyEmail) && (
      <>
        <Text type="label" size="medium">
          Detalles laborales
        </Text>

        <Grid
          templateColumns={isTablet ? "1fr" : "1fr 1fr"}
          gap="s100"
          width="100%"
        >
          {values.company && (
            <BoxAttribute label="Empresa:" value={values.company} />
          )}

          {values.contractType && (
            <BoxAttribute
              label="Tipo de contrato:"
              value={contractTypeDM.valueOf(values.contractType)?.value}
            />
          )}

          {values.admissionDate && (
            <BoxAttribute
              label="Fecha de ingreso:"
              value={values.admissionDate}
            />
          )}

          {values.contractExpiration && (
            <BoxAttribute
              label="Vencimiento del contrato:"
              value={values.contractExpiration}
            />
          )}

          {values.severanceRegime && (
            <BoxAttribute
              label="Régimen de cesantías:"
              value={severanceRegimeDM.valueOf(values.severanceRegime)?.value}
            />
          )}

          {values.workday && (
            <BoxAttribute
              label="Jornada laboral:"
              value={workdayDM.valueOf(values.workday)?.value}
            />
          )}

          {values.position && (
            <BoxAttribute
              label="Cargo:"
              value={getValueOfDomain(values.position, "position")?.value}
            />
          )}

          {values.dependence && (
            <BoxAttribute
              label="Dependencia:"
              value={getValueOfDomain(values.dependence, "dependence")?.value}
            />
          )}

          {values.employeeCode && (
            <BoxAttribute
              label="Código como empleado:"
              value={values.employeeCode}
            />
          )}

          {values.companyFormality && (
            <BoxAttribute
              label="Formalidad de la empresa:"
              value={companyFormalityDM.valueOf(values.companyFormality)?.value}
            />
          )}

          {values.companyCountry && (
            <BoxAttribute
              label="País de la empresa:"
              value={countryDM.valueOf(values.companyCountry)?.value}
            />
          )}

          {values.companyCity && (
            <BoxAttribute
              label="Ciudad de la empresa:"
              value={values.companyCity}
            />
          )}

          {values.companyPhone && (
            <BoxAttribute
              label="Teléfono de la empresa:"
              value={values.companyPhone}
            />
          )}

          {values.companyAddress && (
            <BoxAttribute
              label="Dirección de la empresa:"
              value={values.companyAddress}
            />
          )}

          {values.companyEmail && (
            <BoxAttribute
              label="Correo electrónico de la empresa:"
              value={values.companyEmail}
            />
          )}
        </Grid>
      </>
    )}
  </Stack>
);

const renderIncomesVerification = (
  values: IIncomesEntry,
  isTablet: boolean
) => (
  <Grid templateColumns={isTablet ? "1fr" : "1fr 1fr"} gap="s100" width="100%">
    {values.basicSalary !== "" && (
      <BoxAttribute
        label="Salario básico:"
        value={currencyFormat(Number(values.basicSalary))}
      />
    )}

    {values.bonds !== "" && (
      <BoxAttribute
        label="Bonos:"
        value={currencyFormat(Number(values.bonds))}
      />
    )}

    {values.commissions !== "" && (
      <BoxAttribute
        label="Comisiones:"
        value={currencyFormat(Number(values.commissions))}
      />
    )}

    {values.overtime !== "" && (
      <BoxAttribute
        label="Horas extras:"
        value={currencyFormat(Number(values.overtime))}
      />
    )}

    {values.transportationAssistance !== "" && (
      <BoxAttribute
        label="Auxilio de transporte:"
        value={currencyFormat(Number(values.transportationAssistance))}
      />
    )}

    {values.foodAssistance !== "" && (
      <BoxAttribute
        label="Auxilio de alimentación:"
        value={currencyFormat(Number(values.foodAssistance))}
      />
    )}

    {values.others !== "" && (
      <BoxAttribute
        label="Otros ingresos:"
        value={currencyFormat(Number(values.others))}
      />
    )}
  </Grid>
);

const renderExpensesVerification = (
  values: IExpensesEntry,
  isTablet: boolean
) => (
  <Grid templateColumns={isTablet ? "1fr" : "1fr 1fr"} gap="s100" width="100%">
    {values.personalExpenses !== "" && (
      <BoxAttribute
        label="Gastos personales:"
        value={currencyFormat(Number(values.personalExpenses))}
      />
    )}

    {values.familyExpenses !== "" && (
      <BoxAttribute
        label="Gastos familiares:"
        value={currencyFormat(Number(values.familyExpenses))}
      />
    )}

    {values.credits !== "" && (
      <BoxAttribute
        label="Créditos:"
        value={currencyFormat(Number(values.credits))}
      />
    )}

    {values.creditCards !== "" && (
      <BoxAttribute
        label="Tarjetas de crédito:"
        value={currencyFormat(Number(values.creditCards))}
      />
    )}

    {values.health !== "" && (
      <BoxAttribute
        label="Salud:"
        value={currencyFormat(Number(values.health))}
      />
    )}

    {values.pension !== "" && (
      <BoxAttribute
        label="Pensión:"
        value={currencyFormat(Number(values.pension))}
      />
    )}

    {values.others !== "" && (
      <BoxAttribute
        label="Otros gastos:"
        value={currencyFormat(Number(values.others))}
      />
    )}
  </Grid>
);

const renderRelationshipWithDirectorsVerification = (
  values: IRelationshipWithDirectorsEntry,
  isTablet: boolean
) => (
  <Grid templateColumns={isTablet ? "1fr" : "1fr 1fr"} gap="s100" width="100%">
    {values.hasRelationshipWithDirectors !== "" && (
      <BoxAttribute
        label="Parentesco con directivos de la entidad:"
        value={activeDM.valueOf(values.hasRelationshipWithDirectors)?.value}
      />
    )}
    {values.hasRelationshipWithDirectors === activeDM.Y.id && (
      <>
        {values.directorName !== "" && (
          <BoxAttribute
            label="Nombre del directivo:"
            value={values.directorName}
          />
        )}
        {values.directorRelationship !== "" && (
          <BoxAttribute
            label="Parentesco:"
            value={relationshipDM.valueOf(values.directorRelationship)?.value}
          />
        )}
      </>
    )}
  </Grid>
);

interface VerificationBoxesProps {
  updatedData: IFormsUpdateData;
  stepKey: string;
  isTablet: boolean;
}

function VerificationBoxes(props: VerificationBoxesProps) {
  const { updatedData, stepKey, isTablet } = props;
  return (
    <>
      {stepKey === "personalInformation" &&
        renderPersonalInfoVerification(
          updatedData.personalInformation.values,
          isTablet
        )}

      {stepKey === "contactData" &&
        renderContacDataVerification(updatedData.contactData.values, isTablet)}

      {stepKey === "familyGroup" &&
        renderFamilyGroupVerification(updatedData.familyGroup.values, isTablet)}

      {stepKey === "bankTransfers" &&
        renderBankTransfersVerification(
          updatedData.bankTransfers.values,
          isTablet
        )}

      {stepKey === "personalAssets" &&
        renderPersonalAssetsVerification(
          updatedData.personalAssets.values,
          isTablet
        )}

      {stepKey === "personalDebts" &&
        renderPersonalDebtVerification(
          updatedData.personalDebts.values,
          isTablet
        )}

      {stepKey === "personalReferences" &&
        renderPersonalReferencesVerification(
          updatedData.personalReferences.values,
          isTablet
        )}

      {stepKey === "financialOperations" &&
        renderFinancialOperationsVerification(
          updatedData.financialOperations.values,
          isTablet
        )}

      {stepKey === "personalResidence" &&
        renderPersonalResidenceVerification(
          updatedData.personalResidence.values,
          isTablet
        )}

      {stepKey === "socioeconomicInformation" &&
        renderSocioeconomicInfoVerification(
          updatedData.socioeconomicInformation.values,
          isTablet
        )}

      {stepKey === "economicActivity" &&
        renderEconomicActivityVerification(
          updatedData.economicActivity.values,
          isTablet
        )}

      {stepKey === "income" &&
        renderIncomesVerification(updatedData.income.values, isTablet)}
      {stepKey === "expenses" &&
        renderExpensesVerification(updatedData.expenses.values, isTablet)}

      {stepKey === "relationshipWithDirectors" &&
        renderRelationshipWithDirectorsVerification(
          updatedData.relationshipWithDirectors.values,
          isTablet
        )}
    </>
  );
}

export { VerificationBoxes };
