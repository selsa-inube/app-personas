import { ITag } from "@inubekit/inubekit";
import { IEntryCategory } from "@pages/request/events/RegisterInEvent/forms/ChooseEntriesForm/types";
import { IEvent } from "./event";
import { ISelectedDocument, IValidation } from "./service";
import { IBeneficiary } from "./user";
interface IRequest {
  id: string;
  title: string;
  product?: string;
  destination?: string;
  beneficiary?: string;
  detailsSituation?: string;
  trackingCode: string;
  requestDate: Date;
  description: string;
  status: string;
  value?: number;
  label?: string;
  quotaValue?: string;
  periodicity?: string;
  deadline?: string;
  interestRate?: number;
  netValue?: number;
  extraordinaryQuotas?: {
    quotas: number;
    valuePerQuota: number;
  };
  tag: ITag;
  validations?: IValidation[];
  documentaryRequirements?: ISelectedDocument[];
  requestType: RequestType;
  aidType?: string;
  paymentMethodName?: string;
  periodicityName?: string;
  disbursementMethodName?: string;
  disbursementAccount?: string;
  actionAfterExpiration?: string;
  customerName?: string;
  customerCode?: string;
  identificationType?: string;
  personalInformation?: {
    birthDate?: string;
    gender?: string;
    civilStatus?: string;
    rhFactor?: string;
  };
  contactData?: {
    countryName?: string;
    departmentName?: string;
    cityName?: string;
    address?: string;
    zipCode?: string;
    landlinePhone?: string;
    cellPhone?: string;
    email?: string;
  };
  bankTransfers?: {
    bankEntityName?: string;
    accountType?: string;
  };
  financialOperations?: {
    operationInOutside?: string;
    externalAccounts?: string;
    descriptionOutsideOperation?: string;
    externalAccountCountry?: string;
    externalAccountBank?: string;
    externalCurrencyAccount?: string;
    externalNumberAccount?: string;
  };
  socioeconomicInformation?: {
    schoolingLevelCode?: string;
    numberPersonsInCharge?: string;
    vulnerableProtectionGroupCode?: string;
    responsibleOfHousehold?: string;
    womanHeadOfHousehold?: string;
    publiclyExposed?: string;
    incomeTax?: string;
    publicResourcesAdministration?: string;
  };
  events?: {
    event?: IEvent;
    entriesCategories?: IEntryCategory[];
    participants?: IBeneficiary[];
  };
  accountToDebit?: string;
  accountNumber?: string;
}

type RequestType =
  | "credit"
  | "aid"
  | "newprogrammedsaving"
  | "newcdat"
  | "cancelprogrammedsaving"
  | "modifydeadlineactionprogrammedsaving"
  | "cancelcdat"
  | "modifyquotavalueprogrammedsaving"
  | "modifydeadlineactioncdat"
  | "updatedata"
  | "registerinevent"
  | "pqrs";

export type { IRequest, RequestType };
