import { Icon } from "@design/data/Icon";
import { IAction } from "@design/data/Table/types";
import { mapInvestmentMovement } from "@pages/admin/savings/SavingsAccountMovements/config/table";
import { MdDeleteOutline, MdOutlineModeEdit } from "react-icons/md";

const personalDebtsTableTitles = [
  {
    id: "liabilityType",
    titleName: "Tipo de pasivo",
    priority: 1,
  },
  {
    id: "terminationDate",
    titleName: "Fecha de terminación",
    priority: 2,
  },
  {
    id: "debtBalance",
    titleName: "Saldo de la deuda",
    priority: 0,
  },
  {
    id: "financialEntity",
    titleName: "Entidad financiera",
    priority: 3,
  },
  {
    id: "quota",
    titleName: "Cuota",
    priority: 4,
  },
];

const personalDebtsTableBreakpoints = [
  { breakpoint: "(min-width: 1229px)", totalColumns: 5 },
  { breakpoint: "(max-width: 1120px)", totalColumns: 4 },
  { breakpoint: "(max-width: 1000px)", totalColumns: 3 },
  { breakpoint: "(max-width: 900px)", totalColumns: 4 },
  { breakpoint: "(max-width: 860px)", totalColumns: 3 },
  { breakpoint: "(max-width: 600px)", totalColumns: 2 },
  { breakpoint: "(max-width: 390px)", totalColumns: 1 },
];

const personalDebtsTableActions: IAction[] = [
  {
    id: "1",
    actionName: "Editar",
    content: (debt) => (
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
    content: (debt) => (
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
  personalDebtsTableActions,
  personalDebtsTableBreakpoints,
  personalDebtsTableTitles,
};
