import { IDestinationEntry } from "../forms/DestinationForm/types";
import { ICommentsEntry } from "../forms/CommentsForm/types";
import { ITermsAndConditionsEntry } from "../forms/TermsAndConditionsForm/types";

const destination: IDestinationEntry = {
  creditDestination: "",
  product: "",
};

const comments: ICommentsEntry = {
  comments: "",
};

const termsAndConditions: ITermsAndConditionsEntry = {
  termsAndConditions: false,
};

const initalValuesCreditSimulation = {
  destination,
  comments,
  termsAndConditions,
};

export { initalValuesCreditSimulation };
