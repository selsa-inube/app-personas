import styled from "styled-components";
import { SwitchSizeType } from "./types";
import { inube } from "@design/tokens";

interface IStyledSpan {
  sizeSwitch?: SwitchSizeType;
  disabled?: boolean;
  checked?: boolean;
}

const StyledSpan = styled.span<IStyledSpan>`
  position: absolute;
  top: ${inube.spacing.s0};
  left: ${inube.spacing.s0};
  right: ${inube.spacing.s0};
  bottom: ${inube.spacing.s0};
  transition: 0.1s;
  border-radius: 30px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  background: ${({ disabled, theme }) =>
    disabled
      ? theme.color?.surface?.gray?.disabled ||
        inube.color.surface.gray.disabled
      : theme.color?.surface?.gray?.regular ||
        inube.color.surface.gray.regular};

  &:hover {
    background-color: ${({ disabled, theme }) =>
      disabled
        ? theme.color?.surface?.gray?.disabled ||
          inube.color.surface.gray.disabled
        : theme.color?.surface?.gray?.hover || inube.color.surface.gray.hover};
  }

  &:before {
    position: absolute;
    content: "";
    left: ${inube.spacing.s025};
    border-radius: 50%;
    transition: 0.3s;
    background-color: ${({ theme }) =>
      theme.color?.surface?.light?.clear || inube.color.surface.light.clear};
    box-sizing: border-box;
    border: ${({ disabled, theme }) =>
      disabled &&
      `0.5px solid ${
        theme.color?.stroke?.light?.disabled || inube.color.stroke.gray.disabled
      }`};
    width: ${({ sizeSwitch }) => (sizeSwitch === "small" ? "12px" : "16px")};
    height: ${({ sizeSwitch }) => (sizeSwitch === "small" ? "12px" : "16px")};
    bottom: ${({ sizeSwitch }) =>
      sizeSwitch === "small"
        ? `calc((${inube.spacing.s200} - ${inube.spacing.s150}) / 2)`
        : `calc((${inube.spacing.s250} - ${inube.spacing.s200}) / 2)`};
  }
`;

interface IStyledContainer {
  sizeSwitch?: SwitchSizeType;
}

const StyledContainer = styled.label<IStyledContainer>`
  position: relative;
  display: inline-block;
  width: ${({ sizeSwitch }) => (sizeSwitch === "small" ? "32px" : "40px")};
  height: ${({ sizeSwitch }) => (sizeSwitch === "small" ? "16px" : "20px")};
`;

interface IStyledInput {
  sizeSwitch?: SwitchSizeType;
  disabled?: boolean;
  checked?: boolean;
}

const StyledInput = styled.input<IStyledInput>`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + span {
    background-color: ${({ disabled, theme }) =>
      disabled
        ? theme?.color?.surface?.gray?.disabled ||
          inube.color.surface.gray.disabled
        : theme?.color?.surface?.success?.regular ||
          inube.color.surface.success.regular};

    &:hover {
      background-color: ${({ disabled, theme }) =>
        disabled
          ? theme?.color?.surface?.gray?.disabled ||
            inube.color.surface.gray.disabled
          : theme?.color?.surface?.success?.hover ||
            inube.color.surface.success.hover};
    }
  }

  &:checked + span:before {
    left: ${inube.spacing.s025};
    transform: ${({ sizeSwitch }) =>
      sizeSwitch === "small" ? `translateX(16px)` : `translateX(20px)`};
  }
`;

interface IStyledIcon {
  sizeSwitch?: SwitchSizeType;
  disabled?: boolean;
  checked?: boolean;
}

const StyledIcon = styled.div<IStyledIcon>`
    & svg {
        position: absolute;
        color: ${({ theme, disabled }) =>
          !disabled
            ? theme.color?.surface?.light?.regular ||
              inube.color.surface.light.regular
            : theme.color?.stroke?.gray?.disabled ||
              inube.color.stroke.gray.disabled};
        width: ${({ sizeSwitch }) => (sizeSwitch === "small" ? "10px" : "14px")};
        height: ${({ sizeSwitch }) => (sizeSwitch === "small" ? "10px" : "14px")};
        padding-left: ${({ sizeSwitch }) =>
          sizeSwitch === "small" ? inube.spacing.s025 : "none"};
        top: calc(${inube.spacing.s075} / 2);
        left: ${({ sizeSwitch, checked }) =>
          sizeSwitch === "small" && checked
            ? `calc(${inube.spacing.s075} / 2)`
            : sizeSwitch === "large" && checked
            ? `${inube.spacing.s050}`
            : `${inube.spacing.s250}`};
    }
`;

export { StyledContainer, StyledInput, StyledSpan, StyledIcon };
