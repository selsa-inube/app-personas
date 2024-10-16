import { convertDomainToList, convertDomainToOptions } from "src/utils/domains";

/* var valuesEnum = map[string]tydomain.Domain{
	"GrandpaUncle":                   {Code: "GrandpaUncle", Value: "GrandpaUncle", Description: "Grandpa uncle", I18nAttribute: "DM_ENUM_ERELATIONSHIPTHEOWNER_GRANDPAUNCLE"},
	"ChildFoster":                    {Code: "ChildFoster", Value: "ChildFoster", Description: "Child foster", I18nAttribute: "DM_ENUM_ERELATIONSHIPTHEOWNER_CHILDFOSTER"},
	"Stepson":                        {Code: "Stepson", Value: "Stepson", Description: "Stepson", I18nAttribute: "DM_ENUM_ERELATIONSHIPTHEOWNER_STEPSON"},
	"Stepbrother":                    {Code: "Stepbrother", Value: "Stepbrother", Description: "Stepbrother", I18nAttribute: "DM_ENUM_ERELATIONSHIPTHEOWNER_STEPBROTHER"},
	"ParentFoster":                   {Code: "ParentFoster", Value: "ParentFoster", Description: "Parent foster", I18nAttribute: "DM_ENUM_ERELATIONSHIPTHEOWNER_PARENTFOSTER"},
	"Stepfather":                     {Code: "Stepfather", Value: "Stepfather", Description: "Stepfather", I18nAttribute: "DM_ENUM_ERELATIONSHIPTHEOWNER_STEPFATHER"},
	"SonInLaw":                       {Code: "SonInLaw", Value: "SonInLaw", Description: "Son-in-law", I18nAttribute: "DM_ENUM_ERELATIONSHIPTHEOWNER_SONINLAW"},
	"DaughterInLaw":                  {Code: "DaughterInLaw", Value: "DaughterInLaw", Description: "Daughter-in-law", I18nAttribute: "DM_ENUM_ERELATIONSHIPTHEOWNER_DAUGHTERINLAW"},
	"GreatGrandfather":               {Code: "GreatGrandfather", Value: "GreatGrandfather", Description: "Great-grandfather", I18nAttribute: "DM_ENUM_ERELATIONSHIPTHEOWNER_GREATGRANDFATHER"},
	"GreatFrandson":                  {Code: "GreatFrandson", Value: "GreatFrandson", Description: "Great-grandson", I18nAttribute: "DM_ENUM_ERELATIONSHIPTHEOWNER_GREATFRANDSON"},
	"Grandfather":                    {Code: "Grandfather", Value: "Grandfather", Description: "Grandfather", I18nAttribute: "DM_ENUM_ERELATIONSHIPTHEOWNER_GRANDFATHER"},
	"Nephew":                         {Code: "Nephew", Value: "Nephew", Description: "Nephew", I18nAttribute: "DM_ENUM_ERELATIONSHIPTHEOWNER_NEPHEW"},
	"Spouse":                         {Code: "Spouse", Value: "Spouse", Description: "Spouse", I18nAttribute: "DM_ENUM_ERELATIONSHIPTHEOWNER_SPOUSE"},
	"Associate":                      {Code: "Associate", Value: "Associate", Description: "Associate", I18nAttribute: "DM_ENUM_ERELATIONSHIPTHEOWNER_ASSOCIATE"},
	"Brother":                        {Code: "Brother", Value: "Brother", Description: "Brother", I18nAttribute: "DM_ENUM_ERELATIONSHIPTHEOWNER_BROTHER"},
	"ParentAdoptive":                 {Code: "ParentAdoptive", Value: "ParentAdoptive", Description: "Parentadoptive", I18nAttribute: "DM_ENUM_ERELATIONSHIPTHEOWNER_PARENTADOPTIVE"},
	"Son":                            {Code: "Son", Value: "Son", Description: "Son", I18nAttribute: "DM_ENUM_ERELATIONSHIPTHEOWNER_SON"},
	"BindingEntity":                  {Code: "BindingEntity", Value: "BindingEntity", Description: "Binding entity", I18nAttribute: "DM_ENUM_ERELATIONSHIPTHEOWNER_BINDINGENTITY"},
	"SonAdopted":                     {Code: "SonAdopted", Value: "SonAdopted", Description: "Sonadopted", I18nAttribute: "DM_ENUM_ERELATIONSHIPTHEOWNER_SONADOPTED"},
	"MotherAdoptive":                 {Code: "MotherAdoptive", Value: "MotherAdoptive", Description: "Motheradoptive", I18nAttribute: "DM_ENUM_ERELATIONSHIPTHEOWNER_MOTHERADOPTIVE"},
	"Mother":                         {Code: "Mother", Value: "Mother", Description: "Mother", I18nAttribute: "DM_ENUM_ERELATIONSHIPTHEOWNER_MOTHER"},
	"Grandson":                       {Code: "Grandson", Value: "Grandson", Description: "Grandson", I18nAttribute: "DM_ENUM_ERELATIONSHIPTHEOWNER_GRANDSON"},
	"Others":                         {Code: "Others", Value: "Others", Description: "Others", I18nAttribute: "DM_ENUM_ERELATIONSHIPTHEOWNER_OTHERS"},
	"Father":                         {Code: "Father", Value: "Father", Description: "Father", I18nAttribute: "DM_ENUM_ERELATIONSHIPTHEOWNER_FATHER"},
	"Cousin":                         {Code: "Cousin", Value: "Cousin", Description: "Cousin", I18nAttribute: "DM_ENUM_ERELATIONSHIPTHEOWNER_COUSIN"},
	"FatherInLaw":                    {Code: "FatherInLaw", Value: "FatherInLaw", Description: "Father-in-law", I18nAttribute: "DM_ENUM_ERELATIONSHIPTHEOWNER_FATHERINLAW"},
	"Uncle":                          {Code: "Uncle", Value: "Uncle", Description: "Uncle", I18nAttribute: "DM_ENUM_ERELATIONSHIPTHEOWNER_UNCLE"},
	"BrotherInLaw":                   {Code: "BrotherInLaw", Value: "BrotherInLaw", Description: "Brother-in-law", I18nAttribute: "DM_ENUM_ERELATIONSHIPTHEOWNER_BROTHERINLAW"},
	"ThirdPartyBeneficiaryNonFamily": {Code: "ThirdPartyBeneficiaryNonFamily", Value: "ThirdPartyBeneficiaryNonFamily", Description: "Third party beneficiary non-family", I18nAttribute: "DM_ENUM_ERELATIONSHIPTHEOWNER_THIRDPARTYBENEFICIARYNONFAMILY"},
	"Nanny":                          {Code: "Nanny", Value: "Nanny", Description: "Nanny", I18nAttribute: "DM_ENUM_ERELATIONSHIPTHEOWNER_NANNY"},
	"BeneficiaryByPercentageDifferentialForRelief": {Code: "BeneficiaryByPercentageDifferentialForRelief", Value: "BeneficiaryByPercentageDifferentialForRelief", Description: "Beneficiary by percentage differential for relief", I18nAttribute: "DM_ENUM_ERELATIONSHIPTHEOWNER_BENEFICIARYBYPERCENTAGEDIFFERENTIALFORRELIEF"},
	"EmployeeDomestic": {Code: "EmployeeDomestic", Value: "EmployeeDomestic", Description: "Employeedomestic", I18nAttribute: "DM_ENUM_ERELATIONSHIPTHEOWNER_EMPLOYEEDOMESTIC"},
	"PermanentPartner": {Code: "PermanentPartner", Value: "PermanentPartner", Description: "Permanent partner", I18nAttribute: "DM_ENUM_ERELATIONSHIPTHEOWNER_PERMANENTPARTNER"},
} */

const relationshipData = {
  FATHER: {
    id: "Father",
    value: "Padre",
  },
  MOTHER: {
    id: "Mother",
    value: "Madre",
  },
  GRANDFATHER: {
    id: "Grandfather",
    value: "Abuelo",
  },
  BROTHER: {
    id: "Brother",
    value: "Hermano",
  },
  SON: {
    id: "Son",
    value: "Hijo",
  },
  PARTNER: {
    id: "Associate",
    value: "Asociado",
  },
  GRANDPA_UNCLE: {
    id: "GrandpaUncle",
    value: "Tío abuelo",
  },
  CHILD_FOSTER: {
    id: "ChildFoster",
    value: "Hijo adoptivo",
  },
  STEPFATHER: {
    id: "Stepfather",
    value: "Padrastro",
  },
  STEPBROTHER: {
    id: "Stepbrother",
    value: "Hermanastro",
  },
  PARENT_FOSTER: {
    id: "ParentFoster",
    value: "Padre adoptivo",
  },
  SON_IN_LAW: {
    id: "SonInLaw",
    value: "Yerno",
  },
  DAUGHTER_IN_LAW: {
    id: "DaughterInLaw",
    value: "Nuera",
  },
  GREAT_GRANDFATHER: {
    id: "GreatGrandfather",
    value: "Bisabuelo",
  },
  GREAT_FRANDSON: {
    id: "GreatFrandson",
    value: "Bisnieto",
  },
  NEPHEW: {
    id: "Nephew",
    value: "Sobrino",
  },
  SPOUSE: {
    id: "Spouse",
    value: "Cónyuge",
  },
  PARENT_ADOPTIVE: {
    id: "ParentAdoptive",
    value: "Padre adoptivo",
  },
  BINDING_ENTITY: {
    id: "BindingEntity",
    value: "Entidad vinculada",
  },
  SON_ADOPTED: {
    id: "SonAdopted",
    value: "Hijo adoptado",
  },
  MOTHER_ADOPTIVE: {
    id: "MotherAdoptive",
    value: "Madre adoptiva",
  },
  GRANDSON: {
    id: "Grandson",
    value: "Nieto",
  },
  OTHERS: {
    id: "Others",
    value: "Otros",
  },
  COUSIN: {
    id: "Cousin",
    value: "Primo",
  },
  FATHER_IN_LAW: {
    id: "FatherInLaw",
    value: "Suegro",
  },
  UNCLE: {
    id: "Uncle",
    value: "Tío",
  },
  BROTHER_IN_LAW: {
    id: "BrotherInLaw",
    value: "Cuñado",
  },
  THIRD_PARTY_BENEFICIARY_NON_FAMILY: {
    id: "ThirdPartyBeneficiaryNonFamily",
    value: "Beneficiario de tercero no familiar",
  },
  NANNY: {
    id: "Nanny",
    value: "Niñera",
  },
  BENEFICIARY_PERCENTAGE_DIFFERENTIAL_RELIEF: {
    id: "BeneficiaryByPercentageDifferentialForRelief",
    value: "Beneficiario por porcentaje diferencial para alivio",
  },
  EMPLOYEE_DOMESTIC: {
    id: "EmployeeDomestic",
    value: "Empleado doméstico",
  },
  PERMANENT_PARTNER: {
    id: "PermanentPartner",
    value: "Compañero permanente",
  },
};

const relationshipDMValueOf = (id: string) =>
  convertDomainToOptions(relationshipData).find(
    (relationship) => relationship.id === id,
  );

const relationshipDM = {
  ...relationshipData,
  list: convertDomainToList(relationshipData),
  options: convertDomainToOptions(relationshipData),
  valueOf: relationshipDMValueOf,
};

export { relationshipDM };
