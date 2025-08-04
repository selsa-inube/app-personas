import { BoxAttribute } from "@components/cards/BoxAttribute";
import { inube } from "@design/tokens";
import { Divider, Grid, Stack, Text } from "@inubekit/inubekit";
import { getValueOfDomain } from "@mocks/domains/domainService.mocks";
import { updateDataSteps } from "@pages/general/UpdateData/config/assisted";
import {
  mapPersonalAsset,
  mapPersonalDebt,
  mapPersonalReference,
} from "@pages/general/UpdateData/config/mappers";
import { IFormsUpdateData } from "@pages/general/UpdateData/types";
import React, { useContext } from "react";
import { AppContext } from "src/context/app";
import { IServiceDomains } from "src/context/app/types";
import { activeDM } from "src/model/domains/general/activedm";
import { companyFormalityDM } from "src/model/domains/general/updateData/economicActivity/companyformalitydm";
import { contractTypeDM } from "src/model/domains/general/updateData/economicActivity/contracttypedm";
import { economicActivityDM } from "src/model/domains/general/updateData/economicActivity/economicactivitydm";
import { severanceRegimeDM } from "src/model/domains/general/updateData/economicActivity/severanceregimedm";
import { workdayDM } from "src/model/domains/general/updateData/economicActivity/workdaydm";
import { countryDM } from "src/model/domains/general/updateData/financialOperations/countrydm";
import { relationshipDM } from "src/model/domains/general/updateData/personalResidence/relationshipDM";
import { residenceTypeDM } from "src/model/domains/general/updateData/personalResidence/residencetypedm";
import { stratumDM } from "src/model/domains/general/updateData/personalResidence/stratumdm";
import { ICommentsEntry } from "src/shared/forms/CommentsForm/types";
import { currencyFormat } from "src/utils/currency";
import { formatPrimaryDate, formatPrimaryTimestamp } from "src/utils/dates";
import { IBankTransfersEntry } from "../../BankTransfersForm/types";
import { IBeneficiariesEntry } from "../../BeneficiariesForm/types";
import { IContactDataEntry } from "../../ContactDataForm/types";
import { IEconomicActivityEntry } from "../../EconomicActivityForm/types";
import { IExpensesEntry } from "../../ExpensesForm/types";
import { mapFamilyGroupTable } from "../../FamilyGroupForm/config/mapper";
import { IFamilyGroupEntries } from "../../FamilyGroupForm/types";
import { IFinancialOperationsEntry } from "../../FinancialOperationsForm/types";
import { IIncomesEntry } from "../../IncomesForm/types";
import { IPersonalAssetEntries } from "../../PersonalAssetsForm/types";
import { IPersonalDebtEntries } from "../../PersonalDebtsForm/types";
import { IPersonalInformationEntry } from "../../PersonalInformationForm/types";
import { IPersonalReferenceEntries } from "../../PersonalReferencesForm/types";
import { IPersonalResidenceEntry } from "../../PersonalResidenceForm/types";
import { IRelationshipWithDirectorsEntry } from "../../RelationshipWithDirectorsForm/types";
import { ISocioeconomicInformationEntry } from "../../SocioeconomicInformationForm/types";

const renderPersonalInfoVerification = (
  values: IPersonalInformationEntry,
  serviceDomains: IServiceDomains,
  isTablet: boolean,
) => {
  return (
    <Grid
      templateColumns={`repeat(${isTablet ? 1 : 2}, 1fr)`}
      autoRows="auto"
      gap={inube.spacing.s100}
      width="100%"
    >
      {values.firstName && (
        <BoxAttribute label="Primer nombre:" value={values.firstName} />
      )}
      {values.secondName && (
        <BoxAttribute label="Segundo nombre:" value={values.secondName} />
      )}
      {values.firstLastName && (
        <BoxAttribute label="Primer apellido:" value={values.firstLastName} />
      )}
      {values.secondLastName && (
        <BoxAttribute label="Segundo apellido:" value={values.secondLastName} />
      )}
      {values.identificationType?.value && (
        <BoxAttribute
          label="Tipo de identificación:"
          value={values.identificationType.value}
        />
      )}
      {values.identification && (
        <BoxAttribute
          label="Numero de identificación:"
          value={values.identification}
        />
      )}
      {values.expeditionCountry && (
        <BoxAttribute
          label="País de expedición:"
          value={
            serviceDomains.valueOf(values.expeditionCountry, "countries")?.label
          }
        />
      )}
      {values.expeditionDepartment && (
        <BoxAttribute
          label="Estado / Departamento de expedición:"
          value={
            serviceDomains.valueOf(values.expeditionDepartment, "departments")
              ?.label
          }
        />
      )}
      {values.expeditionCity && (
        <BoxAttribute
          label="Ciudad de expedición:"
          value={serviceDomains.valueOf(values.expeditionCity, "cities")?.label}
        />
      )}
      {values.expeditionDate && (
        <BoxAttribute
          label="Fecha de expedición:"
          value={formatPrimaryTimestamp(new Date(values.expeditionDate))}
        />
      )}
      {values.country && (
        <BoxAttribute
          label="País de nacimiento:"
          value={serviceDomains.valueOf(values.country, "countries")?.label}
        />
      )}
      {values.birthDate && (
        <BoxAttribute
          label="Fecha de nacimiento:"
          value={formatPrimaryDate(String(new Date(values.birthDate)))}
        />
      )}
      {values.civilStatus && (
        <BoxAttribute
          label="Estado civil:"
          value={
            serviceDomains.valueOf(values.civilStatus, "civilstatus")?.label
          }
        />
      )}
      {values.gender && (
        <BoxAttribute
          label="Género:"
          value={serviceDomains.valueOf(values.gender, "gender")?.label}
        />
      )}
      {values.rhFactor && (
        <BoxAttribute
          label="Factor RH:"
          value={serviceDomains.valueOf(values.rhFactor, "rhfactor")?.label}
        />
      )}
    </Grid>
  );
};

const renderContactDataVerification = (
  values: IContactDataEntry,
  serviceDomains: IServiceDomains,
  isTablet: boolean,
) => (
  <Grid
    templateColumns={`repeat(${isTablet ? 1 : 2}, 1fr)`}
    autoRows="auto"
    gap={inube.spacing.s100}
    width="100%"
  >
    {values.country && (
      <BoxAttribute
        label="País:"
        value={serviceDomains.valueOf(values.country, "countries")?.label}
      />
    )}

    {values.department && (
      <BoxAttribute
        label="Estado / Departamento:"
        value={serviceDomains.valueOf(values.department, "departments")?.label}
      />
    )}

    {values.city && (
      <BoxAttribute
        label="Ciudad:"
        value={serviceDomains.valueOf(values.city, "cities")?.label}
      />
    )}

    {values.address && (
      <BoxAttribute label="Dirección:" value={values.address} />
    )}

    {values.zipCode && (
      <BoxAttribute label="Código postal:" value={values.zipCode} />
    )}

    {values.landlinePhone && (
      <BoxAttribute label="Teléfono fijo:" value={values.landlinePhone} />
    )}

    {values.cellPhone && (
      <BoxAttribute label="Celular:" value={values.cellPhone} />
    )}

    {values.email && <BoxAttribute label="Correo:" value={values.email} />}
  </Grid>
);

const renderFamilyGroupVerification = (
  values: IFamilyGroupEntries,
  isTablet: boolean,
) => {
  const transformedEntries = mapFamilyGroupTable(values.entries);
  return (
    <Stack direction="column" gap={inube.spacing.s250} width="100%">
      <Grid
        templateColumns={`repeat(${isTablet ? 1 : 2}, 1fr)`}
        autoRows="auto"
        gap={inube.spacing.s100}
        width="100%"
      >
        {transformedEntries.map((entry) => {
          return (
            <BoxAttribute
              label={`${entry.fullName} :` || ""}
              value={entry.relationship}
              key={entry.id}
            />
          );
        })}
      </Grid>
    </Stack>
  );
};

const renderBeneficiariesVerification = (
  values: IBeneficiariesEntry,
  isTablet: boolean,
) => {
  return (
    <Grid
      templateColumns={`repeat(${isTablet ? 1 : 2}, 1fr)`}
      autoRows="auto"
      gap={inube.spacing.s250}
      width="100%"
    >
      {values.beneficiaries.length > 0 &&
        values.beneficiaries.map((beneficiary) => (
          <BoxAttribute
            key={beneficiary.id}
            label={beneficiary.name}
            value={`${beneficiary.percentage || 0} %`}
          />
        ))}
    </Grid>
  );
};

const renderBankTransfersVerification = (
  values: IBankTransfersEntry,
  serviceDomains: IServiceDomains,
  isTablet: boolean,
) => {
  return (
    <Grid
      templateColumns={`repeat(${isTablet ? 1 : 2}, 1fr)`}
      autoRows="auto"
      gap={inube.spacing.s100}
      width="100%"
    >
      {values.bankEntityName && (
        <BoxAttribute
          label="Entidad bancaria:"
          value={
            serviceDomains.valueOf(values.bankEntityName, "integratedbanks")
              ?.label
          }
        />
      )}
      {values.accountType && (
        <BoxAttribute
          label="Tipo de cuenta:"
          value={values.accountType.split("-")[1]?.trim() || values.accountType}
        />
      )}
      {values.accountNumber && (
        <BoxAttribute label="Numero de cuenta:" value={values.accountNumber} />
      )}
    </Grid>
  );
};

const renderPersonalAssetsVerification = (
  values: IPersonalAssetEntries,
  isTablet: boolean,
) => (
  <Stack direction="column" gap={inube.spacing.s250} width="100%">
    {values.entries.map((entry, index) => {
      const personalAsset = mapPersonalAsset(entry, index);
      return (
        <React.Fragment key={entry.id}>
          {index !== 0 && <Divider dashed />}
          <Grid
            templateColumns={`repeat(${isTablet ? 1 : 2}, 1fr)`}
            autoRows="auto"
            gap={inube.spacing.s100}
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
  isTablet: boolean,
) => (
  <Stack direction="column" gap={inube.spacing.s250} width="100%">
    {values.entries.map((entry, index) => {
      const personalDebt = mapPersonalDebt(entry, index);
      return (
        <React.Fragment key={entry.id}>
          {index !== 0 && <Divider dashed />}
          <Grid
            templateColumns={`repeat(${isTablet ? 1 : 2}, 1fr)`}
            autoRows="auto"
            gap={inube.spacing.s100}
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
  isTablet: boolean,
) => (
  <Stack direction="column" gap={inube.spacing.s250} width="100%">
    {values.entries.map((entry, index) => {
      const personalReference = mapPersonalReference(entry, index);
      return (
        <React.Fragment key={entry.id}>
          {index !== 0 && <Divider dashed />}
          <Grid
            templateColumns={`repeat(${isTablet ? 1 : 2}, 1fr)`}
            autoRows="auto"
            gap={inube.spacing.s100}
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
  serviceDomains: IServiceDomains,
  isTablet: boolean,
) => {
  return (
    <Stack direction="column" gap={inube.spacing.s100} width="100%">
      <Grid
        templateColumns={`repeat(${isTablet ? 1 : 2}, 1fr)`}
        autoRows="auto"
        gap={inube.spacing.s100}
        width="100%"
      >
        {values.hasForeignCurrencyTransactions && (
          <BoxAttribute
            label="Operaciones en moneda extranjera:"
            value={
              activeDM.valueOf(values.hasForeignCurrencyTransactions)?.value
            }
          />
        )}
        {values.hasForeignCurrencyAccounts && (
          <BoxAttribute
            label="Cuentas en moneda extranjera:"
            value={activeDM.valueOf(values.hasForeignCurrencyAccounts)?.value}
          />
        )}
      </Grid>
      {values.descriptionOperations && (
        <BoxAttribute
          label="Descripción de las operaciones:"
          value={values.descriptionOperations}
          direction="column"
        />
      )}
      <Grid
        templateColumns={`repeat(${isTablet ? 1 : 2}, 1fr)`}
        autoRows="auto"
        gap={inube.spacing.s100}
        width="100%"
      >
        {values.country && (
          <BoxAttribute
            label="País:"
            value={serviceDomains.valueOf(values.country, "countries")?.label}
          />
        )}
        {values.bankEntity && (
          <BoxAttribute label="Entidad bancaria:" value={values.bankEntity} />
        )}
        {values.currency && (
          <BoxAttribute label="Moneda:" value={values.currency} />
        )}
        {values.accountNumber && (
          <BoxAttribute
            label="Numero de cuenta:"
            value={values.accountNumber}
          />
        )}
      </Grid>
    </Stack>
  );
};

const renderPersonalResidenceVerification = (
  values: IPersonalResidenceEntry,
  isTablet: boolean,
) => (
  <Grid
    templateColumns={`repeat(${isTablet ? 1 : 2}, 1fr)`}
    autoRows="auto"
    gap={inube.spacing.s100}
    width="100%"
  >
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
  serviceDomains: IServiceDomains,
  isTablet: boolean,
) => {
  return (
    <Grid
      templateColumns={`repeat(${isTablet ? 1 : 2}, 1fr)`}
      autoRows="auto"
      gap={inube.spacing.s100}
      width="100%"
    >
      {values.schoolingLevelCode && (
        <BoxAttribute
          label="Nivel de estudios:"
          value={
            serviceDomains.valueOf(values.schoolingLevelCode, "schoolinglevel")
              ?.label
          }
        />
      )}

      {values.numberPersonsInCharge && (
        <BoxAttribute
          label="Numero de personas a cargo:"
          value={values.numberPersonsInCharge}
        />
      )}

      {values.vulnerableProtectionGroupCode && (
        <BoxAttribute
          label="Grupo protección especial:"
          value={
            serviceDomains.valueOf(
              values.vulnerableProtectionGroupCode,
              "vulnerableprotectiongroup",
            )?.label
          }
        />
      )}

      {values.responsibleOfHousehold && (
        <BoxAttribute
          label="Responsable del hogar:"
          value={values.responsibleOfHousehold === "Y" ? "Sí" : "No"}
        />
      )}

      {values.womanHeadOfHousehold && (
        <BoxAttribute
          label="Mujer cabeza de familia:"
          value={values.womanHeadOfHousehold === "Y" ? "Sí" : "No"}
        />
      )}

      {values.publiclyExposed && (
        <BoxAttribute
          label="Públicamente expuesto:"
          value={values.publiclyExposed === "Y" ? "Sí" : "No"}
        />
      )}

      {values.incomeTax && (
        <BoxAttribute
          label="Declara renta:"
          value={values.incomeTax === "Y" ? "Sí" : "No"}
        />
      )}

      {values.publicResourcesAdministration && (
        <BoxAttribute
          label="Administra recursos publicos:"
          value={values.publicResourcesAdministration === "Y" ? "Sí" : "No"}
        />
      )}
    </Grid>
  );
};

const renderEconomicActivityVerification = (
  values: IEconomicActivityEntry,
  isTablet: boolean,
) => (
  <Stack width="100%" direction="column" gap={inube.spacing.s250}>
    {values.economicActivity !== "" && (
      <Text type="label" size="medium">
        Clasificación económica
      </Text>
    )}

    <Grid
      templateColumns={`repeat(${isTablet ? 1 : 2}, 1fr)`}
      autoRows="auto"
      gap={inube.spacing.s100}
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
          templateColumns={`repeat(${isTablet ? 1 : 2}, 1fr)`}
          autoRows="auto"
          gap={inube.spacing.s100}
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
              value={formatPrimaryTimestamp(new Date(values.admissionDate))}
            />
          )}

          {values.contractExpiration && (
            <BoxAttribute
              label="Vencimiento del contrato:"
              value={formatPrimaryTimestamp(
                new Date(values.contractExpiration),
              )}
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
  isTablet: boolean,
) => (
  <Grid
    templateColumns={`repeat(${isTablet ? 1 : 2}, 1fr)`}
    autoRows="auto"
    gap={inube.spacing.s100}
    width="100%"
  >
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
  isTablet: boolean,
) => (
  <Grid
    templateColumns={`repeat(${isTablet ? 1 : 2}, 1fr)`}
    autoRows="auto"
    gap={inube.spacing.s100}
    width="100%"
  >
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
  isTablet: boolean,
) => (
  <Grid
    templateColumns={`repeat(${isTablet ? 1 : 2}, 1fr)`}
    autoRows="auto"
    gap={inube.spacing.s100}
    width="100%"
  >
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
  updatedData: IFormsUpdateData;
  stepKey: keyof typeof updateDataSteps;
  isTablet: boolean;
}

function VerificationBoxes(props: VerificationBoxesProps) {
  const { updatedData, stepKey, isTablet } = props;
  const { serviceDomains } = useContext(AppContext);

  return (
    <>
      {stepKey === "personalInformation" &&
        renderPersonalInfoVerification(
          updatedData.personalInformation.values,
          serviceDomains,
          isTablet,
        )}

      {stepKey === "contactData" &&
        renderContactDataVerification(
          updatedData.contactData.values,
          serviceDomains,
          isTablet,
        )}

      {stepKey === "familyGroup" &&
        renderFamilyGroupVerification(updatedData.familyGroup.values, isTablet)}

      {stepKey === "beneficiaries" &&
        renderBeneficiariesVerification(
          updatedData.beneficiaries.values,
          isTablet,
        )}

      {stepKey === "bankTransfers" &&
        renderBankTransfersVerification(
          updatedData.bankTransfers.values,
          serviceDomains,
          isTablet,
        )}

      {stepKey === "personalAssets" &&
        renderPersonalAssetsVerification(
          updatedData.personalAssets.values,
          isTablet,
        )}

      {stepKey === "personalDebts" &&
        renderPersonalDebtVerification(
          updatedData.personalDebts.values,
          isTablet,
        )}

      {stepKey === "personalReferences" &&
        renderPersonalReferencesVerification(
          updatedData.personalReferences.values,
          isTablet,
        )}

      {stepKey === "financialOperations" &&
        renderFinancialOperationsVerification(
          updatedData.financialOperations.values,
          serviceDomains,
          isTablet,
        )}

      {stepKey === "personalResidence" &&
        renderPersonalResidenceVerification(
          updatedData.personalResidence.values,
          isTablet,
        )}

      {stepKey === "socioeconomicInformation" &&
        renderSocioeconomicInfoVerification(
          updatedData.socioeconomicInformation.values,
          serviceDomains,
          isTablet,
        )}

      {stepKey === "economicActivity" &&
        renderEconomicActivityVerification(
          updatedData.economicActivity.values,
          isTablet,
        )}

      {stepKey === "income" &&
        renderIncomesVerification(updatedData.income.values, isTablet)}
      {stepKey === "expenses" &&
        renderExpensesVerification(updatedData.expenses.values, isTablet)}

      {stepKey === "relationshipWithDirectors" &&
        renderRelationshipWithDirectorsVerification(
          updatedData.relationshipWithDirectors.values,
          isTablet,
        )}

      {stepKey === "comments" &&
        renderCommentsVerification(updatedData.comments.values)}
    </>
  );
}

export { VerificationBoxes };
