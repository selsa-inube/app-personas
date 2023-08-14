import { MdDelete, MdModeEdit, MdToggleOff } from "react-icons/md";

const titlesMock = [
  {
    id: "username",
    titleName: "Username",
    priority: 1,
  },
  {
    id: "code",
    titleName: "Code",
    priority: 2,
  },
  {
    id: "userID",
    titleName: "User Id",
    priority: 0,
  },
  {
    id: "position",
    titleName: "Position",
    priority: 3,
  },
];

const actionsMock = [
  {
    id: "Activate",
    actionName: "Activate",
    content: <MdToggleOff />,
    type: "secondary",
  },
  {
    id: "Edit",
    actionName: "Edit",
    content: <MdModeEdit />,
    type: "primary",
  },
  {
    id: "Deleten ",
    actionName: "Delete",
    content: <MdDelete />,

    type: "remove",
  },
];

const breakPointsMock = [
  { breakpoint: "(min-width: 1091px)", totalColumns: 4 },
  { breakpoint: "(max-width: 1090px)", totalColumns: 3 },
  { breakpoint: "(max-width: 980px)", totalColumns: 2 },
  { breakpoint: "(max-width: 850px)", totalColumns: 4 },
  { breakpoint: "(max-width: 680px)", totalColumns: 3 },
  { breakpoint: "(max-width: 550px)", totalColumns: 2 },
  { breakpoint: "(max-width: 360px)", totalColumns: 1 },
];

export { actionsMock, breakPointsMock, titlesMock };
