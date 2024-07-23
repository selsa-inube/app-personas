import { inube } from "@design/tokens";
import styled from "styled-components";

const StyledAmortizationContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: ${inube.spacing.s300};
  align-items: center;

  > div {
    width: 100%;
  }
`;

const StyledAmortizationDocument = styled.iframe`
  @page {
    size: letter;
    margin: 0;
  }

  @media print {
    body {
      -webkit-print-color-adjust: exact;
    }
  }

  display: none;
`;

export { StyledAmortizationContainer, StyledAmortizationDocument };
