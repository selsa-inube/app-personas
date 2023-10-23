import { Icon } from "@design/data/Icon";
import { IAction } from "@design/data/Table/types";
import { mapInvestmentMovement } from "@pages/admin/savings/SavingsAccountMovements/config/table";
import { MdDeleteOutline, MdOutlineModeEdit } from "react-icons/md";

const personalReferencesTableTitles = [
  {
    id: "referenceType",
    titleName: "Tipo de referencia",
    priority: 1,
  },
  {
    id: "name",
    titleName: "Nombre",
    priority: 0,
  },
  {
    id: "address",
    titleName: "Dirección",
    priority: 3,
  },
  {
    id: "email",
    titleName: "Correo electrónico",
    priority: 2,
  },
  {
    id: "phone",
    titleName: "Celular",
    priority: 4,
  },
  {
    id: "city",
    titleName: "Ciudad",
    priority: 5,
  },
];

const personalReferencesTableBreakpoints = [
  { breakpoint: "(min-width: 1329px)", totalColumns: 6 },
  { breakpoint: "(max-width: 1280px)", totalColumns: 5 },
  { breakpoint: "(max-width: 1190px)", totalColumns: 4 },
  { breakpoint: "(max-width: 1130px)", totalColumns: 3 },
  { breakpoint: "(max-width: 910px)", totalColumns: 2 },
  { breakpoint: "(max-width: 895px)", totalColumns: 4 },
  { breakpoint: "(max-width: 860px)", totalColumns: 3 },
  { breakpoint: "(max-width: 670px)", totalColumns: 2 },
  { breakpoint: "(max-width: 460px)", totalColumns: 1 },
];

const personalReferencesTableActions: IAction[] = [
  {
    id: "1",
    actionName: "Editar",
    content: (reference) => (
      <Icon
        appearance="dark"
        icon={<MdOutlineModeEdit />}
        cursorHover={true}
        size="16px"
        spacing="none"
      />
    ),
    mobilePriority: true,
  },
  {
    id: "2",
    actionName: "Borrar",
    content: (reference) => (
      <Icon
        appearance="dark"
        icon={<MdDeleteOutline />}
        cursorHover={true}
        size="16px"
        spacing="none"
      />
    ),
    mobilePriority: true,
  },
];

export {
  mapInvestmentMovement,
  personalReferencesTableActions,
  personalReferencesTableBreakpoints,
  personalReferencesTableTitles,
};
