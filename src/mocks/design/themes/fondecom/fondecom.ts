const palette = {
  neutral: {
    n900: "#383838",
    n800: "#404040",
    n700: "#4D4D4D",
    n600: "#595959",
    n500: "#666666",
    n400: "#747474",
    n300: "#808080",
    n200: "#8C8C8C",
    n100: "#999999",
    n90: "#BDBDBD",
    n80: "#C4C4C4",
    n70: "#C9C9C9",
    n60: "#D1D1D1",
    n50: "#D9D9D9",
    n40: "#E0E0E0",
    n30: "#E8E8E8",
    n20: "#F0F0F0",
    n10: "#F7F7F7",
    n0: "#FFFFFF",
  },
  neutralAlpha: {
    n900a: "rgba(56, 56, 56, 1)",
    n800a: "rgba(56, 56, 56, 0.95)",
    n700a: "rgba(56, 56, 56, 0.89)",
    n600a: "rgba(56, 56, 56, 0.82)",
    n500a: "rgba(56, 56, 56, 0.77)",
    n400a: "rgba(56, 56, 56, 0.71)",
    n300a: "rgba(56, 56, 56, 0.66)",
    n200a: "rgba(56, 56, 56, 0.60)",
    n100a: "rgba(56, 56, 56, 0.54)",
    n90a: "rgba(56, 56, 56, 0.48)",
    n80a: "rgba(56, 56, 56, 0.42)",
    n70a: "rgba(56, 56, 56, 0.36)",
    n60a: "rgba(56, 56, 56, 0.31)",
    n50a: "rgba(56, 56, 56, 0.25)",
    n40a: "rgba(56, 56, 56, 0.13)",
    n30a: "rgba(56, 56, 56, 0.08)",
    n20a: "rgba(56, 56, 56, 0.04)",
    n10a: "rgba(56, 56, 56, 0.02)",
    n0a: "rgba(56, 56, 56, 0)",
  },
  red: {
    r500: "#BF2600",
    r400: "#DE350B",
    r300: "#FF5630",
    r200: "#FF7452",
    r100: "#FF8F73",
    r75: "#FFBDAD",
    r50: "#FFEBE6",
  },
  yellow: {
    y500: "#D89A00",
    y400: "#FFB600",
    y300: "#FFCC00",
    y200: "#FFE066",
    y100: "#FFEB99",
    y75: "#FFF5CC",
    y50: "#FFFAE6",
  },
  green: {
    g500: "#0C733B",
    g400: "#109C50",
    g300: "#15CC69",
    g200: "#57D992",
    g100: "#79F2C0",
    g75: "#CCFFE4",
    g50: "#E5FFF1",
  },
  blue: {
    b500: "#004480",
    b400: "#0059A7",
    b300: "#1FA7F2",
    b200: "#61AEF2",
    b100: "#91C5F2",
    b75: "#CCE7FF",
    b50: "#E5F3FF",
  },
  teal: {
    t500: "#008DA6",
    t400: "#00A3BF",
    t300: "#00B8D9",
    t200: "#00C7E6",
    t100: "#79E2F2",
    t75: "#B3F5FF",
    t50: "#E6FCFF",
  },
  purple: {
    p500: "#403294",
    p400: "#5243AA",
    p300: "#6554C0",
    p200: "#8777D9",
    p100: "#998DD9",
    p75: "#C0B6F2",
    p50: "#EAE6FF",
  },
};

const fondecomTheme = {
  assisted: {
    title: {
      appearance: {
        Value: "",
        Reference: "fondecom.assisted.title.appearance",
        Token: "dark",
      },
    },
    description: {
      appearance: {
        Value: "",
        Reference: "fondecom.assisted.description.appearance",
        Token: "gray",
      },
    },
    track: {
      color: {
        Value: "",
        Reference: "fondecom.assisted.track.color",
        Token: "fondecom.palette.neutral.n30",
      },
    },
    bar: {
      color: {
        Value: "",
        Reference: "fondecom.assisted.bar.color",
        Token: "fondecom.palette.blue.b400",
      },
    },
    background: {
      color: {
        Value: "",
        Reference: "fondecom.assisted.background.color",
        Token: "fondecom.palette.neutral.n10",
      },
    },
    button: {
      appearance: {
        Value: "",
        Reference: "fondecom.assisted.button.appearance",
        Token: "primary",
      },
    },
    step: {
      color: {
        Value: "",
        Reference: "fondecom.assisted.step.color",
        Token: "fondecom.palette.blue.b400",
      },
    },
  },
  breadcrumbs: {
    content: {
      active: "fondecom.breadcrumbs.content.active",
    },
  },
  blanket: {
    background: {
      color: palette.neutralAlpha.n100a,
    },
  },
  button: {
    primary: {
      content: {
        color: {
          regular: "fondecom.palette.blue.b400",
          disabled: "fondecom.palette.neutral.n20",
          hover: "fondecom.palette.blue.b300",
        },
      },
      border: {
        color: {
          regular: "fondecom.palette.blue.b400",
          disabled: "fondecom.palette.neutral.n70",
          hover: "fondecom.palette.blue.b300",
        },
      },
      contrast: {
        appearance: "light",
      },
    },
    success: {
      content: {
        color: {
          regular: "fondecom.palette.green.g400",
          disabled: "fondecom.palette.neutral.n20",
          hover: "fondecom.palette.green.g300",
        },
      },
      border: {
        color: {
          regular: "fondecom.palette.green.g400",
          disabled: "fondecom.palette.neutral.n70",
          hover: "fondecom.palette.green.g300",
        },
      },
      contrast: {
        appearance: "light",
      },
    },
    warning: {
      content: {
        color: {
          regular: "fondecom.palette.yellow.y400",
          disabled: "fondecom.palette.neutral.n20",
          hover: "fondecom.palette.yellow.y300",
        },
      },
      border: {
        color: {
          regular: "fondecom.palette.yellow.y400",
          disabled: "fondecom.palette.neutral.n70",
          hover: "fondecom.palette.yellow.y300",
        },
      },
      contrast: {
        appearance: "dark",
      },
    },
    danger: {
      content: {
        color: {
          regular: "fondecom.palette.red.r400",
          disabled: "fondecom.palette.neutral.n20",
          hover: "fondecom.palette.red.r300",
        },
      },
      border: {
        color: {
          regular: "fondecom.palette.red.r400",
          disabled: "fondecom.palette.neutral.n70",
          hover: "fondecom.palette.red.r300",
        },
      },
      contrast: {
        appearance: "light",
      },
    },
    help: {
      content: {
        color: {
          regular: "fondecom.palette.purple.p400",
          disabled: "fondecom.palette.neutral.n20",
          hover: "fondecom.palette.purple.p300",
        },
      },
      border: {
        color: {
          regular: "fondecom.palette.purple.p400",
          disabled: "fondecom.palette.neutral.n70",
          hover: "fondecom.palette.purple.p300",
        },
      },
      contrast: {
        appearance: "light",
      },
    },
    dark: {
      content: {
        color: {
          regular: "fondecom.palette.neutral.n900",
          disabled: "fondecom.palette.neutral.n20",
          hover: "fondecom.palette.neutral.n500",
        },
      },
      border: {
        color: {
          regular: "fondecom.palette.neutral.n900",
          disabled: "fondecom.palette.neutral.n70",
          hover: "fondecom.palette.neutral.n500",
        },
      },
      contrast: {
        appearance: "light",
      },
    },
    gray: {
      content: {
        color: {
          regular: "fondecom.palette.neutral.n20",
          disabled: "fondecom.palette.neutral.n20",
          hover: "fondecom.palette.neutral.n30",
        },
      },
      border: {
        color: {
          regular: "fondecom.palette.neutral.n200",
          disabled: "fondecom.palette.neutral.n70",
          hover: "fondecom.palette.neutral.n90",
        },
      },
      contrast: {
        appearance: "gray",
      },
    },
    light: {
      content: {
        color: {
          regular: "fondecom.palette.neutral.n10",
          disabled: "fondecom.palette.neutral.n20",
          hover: "fondecom.palette.neutral.n0",
        },
      },
      border: {
        color: {
          regular: "fondecom.palette.neutral.n10",
          disabled: "fondecom.palette.neutral.n70",
          hover: "fondecom.palette.neutral.n0",
        },
      },
      contrast: {
        appearance: "dark",
      },
    },
  },
  countdownBar: {
    primary: {
      color: palette.blue.b400,
    },
    success: {
      color: palette.green.g400,
    },
    warning: {
      color: palette.yellow.y400,
    },
    danger: {
      color: palette.red.r400,
    },
    help: {
      color: palette.purple.p400,
    },
    dark: {
      color: palette.neutral.n900,
    },
    gray: {
      color: palette.neutral.n20,
    },
    light: {
      color: palette.neutral.n10,
    },
  },
  divider: {
    stroke: {
      color: palette.neutral.n40,
    },
  },
  fieldset: {
    legend: {
      color: {
        "fondecom.fieldset.legend.color": "fondecom.palette.neutral.n200",
      },
    },
    border: {
      color: {
        "fondecom.fieldset.border.color": "fondecom.palette.neutral.n40",
      },
    },
  },
  fullscreenNav: {
    background: {
      color: {
        Value: "",
        Reference: "fondecom.fullscreenNav.background.color",
        Token: "fondecom.palette.neutral.n10",
      },
    },
    divider: {
      color: {
        Value: "",
        Reference: "fondecom.fullscreenNav.divider.color",
        Token: "fondecom.palette.neutral.n40",
      },
    },
    title: {
      appearance: {
        Value: "",
        Reference: "fondecom.fullscreenNav.title.appearance",
        Token: "gray",
      },
    },
    subtitle: {
      appearance: {
        regular: {
          Value: "",
          Reference: "fondecom.fullscreenNav.subtitle.appearance.regular",
          Token: "gray",
        },
        expanded: {
          Value: "",
          Reference: "fondecom.fullscreenNav.subtitle.appearance.expanded",
          Token: "primary",
        },
      },
      background: {
        expanded: {
          Value: "",
          Reference: "fondecom.fullscreenNav.subtitle.background.expanded",
          Token: "fondecom.palette.neutral.n30",
        },
      },
    },
    link: {
      appearance: {
        regular: {
          Value: "",
          Reference: "fondecom.fullscreenNav.link.appearance.regular",
          Token: "dark",
        },
        selected: {
          Value: "",
          Reference: "fondecom.fullscreenNav.link.appearance.selected",
          Token: "primary",
        },
      },
      background: {
        selected: {
          Value: "",
          Reference: "fondecom.fullscreenNav.link.background.selected",
          Token: "fondecom.palette.neutral.n30",
        },
        hover: {
          Value: "",
          Reference: "fondecom.fullscreenNav.link.background.hover",
          Token: "fondecom.palette.neutral.n30",
        },
      },
    },
    copyright: {
      appearance: {
        Value: "",
        Reference: "fondecom.fullscreenNav.copyright.appearance",
        Token: "gray",
      },
    },
    burger: {
      appearance: {
        Value: "",
        Reference: "fondecom.fullscreenNav.burger.appearance",
        Token: "dark",
      },
    },
  },
  header: {
    background: {
      color: "fondecom.palette.neutral.n0",
    },
    content: {
      appearance: "gray",
    },
  },
  icon: {
    primary: {
      content: {
        color: {
          regular: palette.blue.b400,
          disabled: palette.neutral.n70,
          hover: palette.blue.b300,
        },
      },
      background: {
        color: {
          regular: palette.blue.b400,
          disabled: palette.neutral.n20,
          hover: palette.blue.b300,
        },
      },
      contrast: {
        color: {
          regular: palette.neutral.n10,
          disabled: palette.neutral.n70,
          hover: palette.neutral.n10,
        },
      },
    },
    success: {
      content: {
        color: {
          regular: palette.green.g400,
          disabled: palette.neutral.n70,
          hover: palette.green.g300,
        },
      },
      background: {
        color: {
          regular: palette.green.g400,
          disabled: palette.neutral.n20,
          hover: palette.green.g300,
        },
      },
      contrast: {
        color: {
          regular: palette.neutral.n10,
          disabled: palette.neutral.n70,
          hover: palette.neutral.n10,
        },
      },
    },
    warning: {
      content: {
        color: {
          regular: palette.yellow.y400,
          disabled: palette.neutral.n70,
          hover: palette.yellow.y300,
        },
      },
      background: {
        color: {
          regular: palette.yellow.y400,
          disabled: palette.neutral.n20,
          hover: palette.yellow.y300,
        },
      },
      contrast: {
        color: {
          regular: palette.neutral.n10,
          disabled: palette.neutral.n70,
          hover: palette.neutral.n10,
        },
      },
    },
    danger: {
      content: {
        color: {
          regular: palette.red.r400,
          disabled: palette.neutral.n70,
          hover: palette.red.r300,
        },
      },
      background: {
        color: {
          regular: palette.red.r400,
          disabled: palette.neutral.n20,
          hover: palette.red.r300,
        },
      },
      contrast: {
        color: {
          regular: palette.neutral.n10,
          disabled: palette.neutral.n70,
          hover: palette.neutral.n10,
        },
      },
    },
    help: {
      content: {
        color: {
          regular: palette.purple.p400,
          disabled: palette.neutral.n70,
          hover: palette.purple.p300,
        },
      },
      background: {
        color: {
          regular: palette.purple.p400,
          disabled: palette.neutral.n20,
          hover: palette.purple.p300,
        },
      },
      contrast: {
        color: {
          regular: palette.neutral.n10,
          disabled: palette.neutral.n70,
          hover: palette.neutral.n10,
        },
      },
    },
    dark: {
      content: {
        color: {
          regular: palette.neutral.n900,
          disabled: palette.neutral.n70,
          hover: palette.neutral.n500,
        },
      },
      background: {
        color: {
          regular: palette.neutral.n900,
          disabled: palette.neutral.n20,
          hover: palette.neutral.n500,
        },
      },
      contrast: {
        color: {
          regular: palette.neutral.n10,
          disabled: palette.neutral.n70,
          hover: palette.neutral.n10,
        },
      },
    },
    gray: {
      content: {
        color: {
          regular: palette.neutral.n300,
          disabled: palette.neutral.n70,
          hover: palette.neutral.n100,
        },
      },
      background: {
        color: {
          regular: palette.neutral.n20,
          disabled: palette.neutral.n20,
          hover: palette.neutral.n30,
        },
      },
      contrast: {
        color: {
          regular: palette.neutral.n900,
          disabled: palette.neutral.n70,
          hover: palette.neutral.n900,
        },
      },
    },
    light: {
      content: {
        color: {
          regular: palette.neutral.n10,
          disabled: palette.neutral.n70,
          hover: palette.neutral.n0,
        },
      },
      background: {
        color: {
          regular: palette.neutral.n10,
          disabled: palette.neutral.n20,
          hover: palette.neutral.n0,
        },
      },
      contrast: {
        color: {
          regular: palette.neutral.n900,
          disabled: palette.neutral.n70,
          hover: palette.neutral.n900,
        },
      },
    },
  },
  input: {
    border: {
      color: {
        regular: "fondecom.palette.neutral.n40",
        disabled: "fondecom.palette.neutral.n40",
        focus: "fondecom.palette.blue.b300",
        invalid: "fondecom.palette.red.r400",
      },
    },
    background: {
      color: {
        regular: "fondecom.palette.neutral.n0",
        disabled: "fondecom.palette.neutral.n10",
      },
    },
    content: {
      color: {
        regular: "fondecom.palette.neutral.n900",
        disabled: "fondecom.palette.neutral.n70",
      },
    },
    placeholder: {
      color: {
        regular: "fondecom.palette.neutral.n300",
      },
    },
    message: {
      color: {
        regular: "fondecom.palette.red.r400",
      },
    },
    required: {
      color: {
        regular: "fondecom.palette.red.r400",
        disabled: "fondecom.palette.neutral.n70",
      },
    },
    optionList: {
      appearance: {
        regular: "dark",
        expanded: "primary",
      },
      background: {
        expanded: "fondecom.palette.neutral.n0",
        selected: "fondecom.palette.neutral.n30",
      },
    },
  },
  label: {
    content: {
      color: {
        regular: palette.neutral.n900,
        disabled: palette.neutral.n70,
        focus: palette.blue.b300,
        invalid: palette.red.r400,
      },
    },
  },
  link: {
    content: {
      color: {
        regular: palette.blue.b400,
        hover: palette.blue.b300,
      },
    },
  },
  menu: {
    avatar: {
      appearance: {
        Value: "",
        Reference: "fondecom.menu.avatar.appearance",
        Token: "primary",
      },
    },
    username: {
      appearance: {
        Value: "",
        Reference: "fondecom.menu.username.appearance",
        Token: "dark",
      },
    },
    client: {
      appearance: {
        Value: "",
        Reference: "fondecom.menu.client.appearance",
        Token: "gray",
      },
    },
    heading: {
      appearance: {
        Value: "",
        Reference: "fondecom.menu.heading.appearance",
        Token: "gray",
      },
    },
    item: {
      content: {
        Value: "",
        Reference: "fondecom.menu.item.content",
        Token: "dark",
      },
      background: {
        hover: {
          Value: "",
          Reference: "fondecom.menu.item.background.hover",
          Token: "fondecom.palette.neutral.n20",
        },
        disabled: {
          Value: "",
          Reference: "fondecom.menu.item.background.disabled",
          Token: "fondecom.palette.neutral.n20",
        },
      },
    },
    background: {
      color: {
        Value: "",
        Reference: "fondecom.menu.background.color",
        Token: "fondecom.palette.neutral.n0",
      },
    },
    divider: {
      color: {
        Value: "",
        Reference: "fondecom.menu.divider.color",
        Token: "fondecom.palette.neutral.n40",
      },
    },
  },
  nav: {
    background: {
      color: {
        Value: "",
        Reference: "fondecom.nav.background.color",
        Token: "fondecom.palette.neutral.n10",
      },
    },
    divider: {
      color: {
        Value: "",
        Reference: "fondecom.nav.divider.color",
        Token: "fondecom.palette.neutral.n40",
      },
    },
    title: {
      appearance: {
        Value: "",
        Reference: "fondecom.nav.title.appearance",
        Token: "gray",
      },
    },
    subtitle: {
      appearance: {
        regular: {
          Value: "",
          Reference: "fondecom.nav.subtitle.appearance.regular",
          Token: "gray",
        },
        expanded: {
          Value: "",
          Reference: "fondecom.nav.subtitle.appearance.expanded",
          Token: "primary",
        },
      },
      background: {
        expanded: {
          Value: "",
          Reference: "fondecom.nav.subtitle.background.expanded",
          Token: "fondecom.palette.neutral.n30",
        },
      },
    },
    link: {
      appearance: {
        regular: {
          Value: "",
          Reference: "fondecom.nav.link.appearance.regular",
          Token: "dark",
        },
        selected: {
          Value: "",
          Reference: "fondecom.nav.link.appearance.selected",
          Token: "primary",
        },
      },
      background: {
        selected: {
          Value: "",
          Reference: "fondecom.nav.link.background.selected",
          Token: "fondecom.palette.neutral.n30",
        },
        hover: {
          Value: "",
          Reference: "fondecom.nav.link.background.hover",
          Token: "fondecom.palette.neutral.n30",
        },
      },
    },
    copyright: {
      appearance: {
        Value: "",
        Reference: "fondecom.nav.copyright.appearance",
        Token: "gray",
      },
    },
  },
  palette: palette,
  flag: {
    primary: {
      background: {
        color: {
          Value: "",
          Reference: "fondecom.flag.primary.background.color",
          Token: "fondecom.palette.blue.b50",
        },
      },
      countdownBar: {
        appearance: {
          Value: "",
          Reference: "fondecom.flag.primary.countdownBar.appearance",
          Token: "primary",
        },
      },
      icon: {
        appearance: {
          Value: "",
          Reference: "fondecom.flag.primary.icon.appearance",
          Token: "primary",
        },
      },
      content: {
        appearance: {
          Value: "",
          Reference: "fondecom.flag.primary.content.appearance",
          Token: "dark",
        },
      },
    },
    success: {
      background: {
        color: {
          Value: "",
          Reference: "fondecom.flag.success.background.color",
          Token: "fondecom.palette.green.g50",
        },
      },
      countdownBar: {
        appearance: {
          Value: "",
          Reference: "fondecom.flag.success.countdownBar.appearance",
          Token: "success",
        },
      },
      icon: {
        appearance: {
          Value: "",
          Reference: "fondecom.flag.success.icon.appearance",
          Token: "success",
        },
      },
      content: {
        appearance: {
          Value: "",
          Reference: "fondecom.flag.success.content.appearance",
          Token: "dark",
        },
      },
    },
    warning: {
      background: {
        color: {
          Value: "",
          Reference: "fondecom.flag.warning.background.color",
          Token: "fondecom.palette.yellow.y50",
        },
      },
      countdownBar: {
        appearance: {
          Value: "",
          Reference: "fondecom.flag.warning.countdownBar.appearance",
          Token: "warning",
        },
      },
      icon: {
        appearance: {
          Value: "",
          Reference: "fondecom.flag.warning.icon.appearance",
          Token: "warning",
        },
      },
      content: {
        appearance: {
          Value: "",
          Reference: "fondecom.flag.warning.content.appearance",
          Token: "dark",
        },
      },
    },
    danger: {
      background: {
        color: {
          Value: "",
          Reference: "fondecom.flag.danger.background.color",
          Token: "fondecom.palette.red.r50",
        },
      },
      countdownBar: {
        appearance: {
          Value: "",
          Reference: "fondecom.flag.danger.countdownBar.appearance",
          Token: "danger",
        },
      },
      icon: {
        appearance: {
          Value: "",
          Reference: "fondecom.flag.danger.icon.appearance",
          Token: "danger",
        },
      },
      content: {
        appearance: {
          Value: "",
          Reference: "fondecom.flag.danger.content.appearance",
          Token: "dark",
        },
      },
    },
    help: {
      background: {
        color: {
          Value: "",
          Reference: "fondecom.flag.help.background.color",
          Token: "fondecom.palette.purple.p50",
        },
      },
      countdownBar: {
        appearance: {
          Value: "",
          Reference: "fondecom.flag.help.countdownBar.appearance",
          Token: "help",
        },
      },
      icon: {
        appearance: {
          Value: "",
          Reference: "fondecom.flag.help.icon.appearance",
          Token: "help",
        },
      },
      content: {
        appearance: {
          Value: "",
          Reference: "fondecom.flag.help.content.appearance",
          Token: "dark",
        },
      },
    },
    dark: {
      background: {
        color: {
          Value: "",
          Reference: "fondecom.flag.dark.background.color",
          Token: "fondecom.palette.neutral.n30",
        },
      },
      countdownBar: {
        appearance: {
          Value: "",
          Reference: "fondecom.flag.dark.countdownBar.appearance",
          Token: "dark",
        },
      },
      icon: {
        appearance: {
          Value: "",
          Reference: "fondecom.flag.dark.icon.appearance",
          Token: "dark",
        },
      },
      content: {
        appearance: {
          Value: "",
          Reference: "fondecom.flag.dark.content.appearance",
          Token: "dark",
        },
      },
    },
    gray: {
      background: {
        color: {
          Value: "",
          Reference: "fondecom.flag.gray.background.color",
          Token: "fondecom.palette.neutral.n10",
        },
      },
      countdownBar: {
        appearance: {
          Value: "",
          Reference: "fondecom.flag.gray.countdownBar.appearance",
          Token: "gray",
        },
      },
      icon: {
        appearance: {
          Value: "",
          Reference: "fondecom.flag.gray.icon.appearance",
          Token: "gray",
        },
      },
      content: {
        appearance: {
          Value: "",
          Reference: "fondecom.flag.gray.content.appearance",
          Token: "dark",
        },
      },
    },
    light: {
      background: {
        color: {
          Value: "",
          Reference: "fondecom.flag.light.background.color",
          Token: "fondecom.palette.neutral.n0",
        },
      },
      countdownBar: {
        appearance: {
          Value: "",
          Reference: "fondecom.flag.light.countdownBar.appearance",
          Token: "dark",
        },
      },
      icon: {
        appearance: {
          Value: "",
          Reference: "fondecom.flag.light.icon.appearance",
          Token: "dark",
        },
      },
      content: {
        appearance: {
          Value: "",
          Reference: "fondecom.flag.light.content.appearance",
          Token: "dark",
        },
      },
    },
  },
  skeleton: {
    background: {
      color: palette.neutral.n30,
    },
    animation: {
      color: palette.neutral.n10,
    },
  },
  spinner: {
    primary: {
      solid: {
        spin: {
          color: palette.blue.b400,
        },
        track: {
          color: palette.neutral.n30,
        },
      },
      transparent: {
        spin: {
          color: palette.blue.b400,
        },
        track: {
          color: palette.neutralAlpha.n0a,
        },
      },
    },
    success: {
      solid: {
        spin: {
          color: palette.green.g400,
        },
        track: {
          color: palette.neutral.n30,
        },
      },
      transparent: {
        spin: {
          color: palette.green.g400,
        },
        track: {
          color: palette.neutralAlpha.n0a,
        },
      },
    },
    warning: {
      solid: {
        spin: {
          color: palette.yellow.y400,
        },
        track: {
          color: palette.neutral.n30,
        },
      },
      transparent: {
        spin: {
          color: palette.yellow.y400,
        },
        track: {
          color: palette.neutralAlpha.n0a,
        },
      },
    },
    danger: {
      solid: {
        spin: {
          color: palette.red.r400,
        },
        track: {
          color: palette.neutral.n30,
        },
      },
      transparent: {
        spin: {
          color: palette.red.r400,
        },
        track: {
          color: palette.neutralAlpha.n0a,
        },
      },
    },
    help: {
      solid: {
        spin: {
          color: palette.purple.p400,
        },
        track: {
          color: palette.neutral.n30,
        },
      },
      transparent: {
        spin: {
          color: palette.purple.p400,
        },
        track: {
          color: palette.neutralAlpha.n0a,
        },
      },
    },
    dark: {
      solid: {
        spin: {
          color: palette.neutral.n900,
        },
        track: {
          color: palette.neutral.n30,
        },
      },
      transparent: {
        spin: {
          color: palette.neutral.n900,
        },
        track: {
          color: palette.neutralAlpha.n0a,
        },
      },
    },
    gray: {
      solid: {
        spin: {
          color: palette.neutral.n100,
        },
        track: {
          color: palette.neutral.n30,
        },
      },
      transparent: {
        spin: {
          color: palette.neutral.n100,
        },
        track: {
          color: palette.neutralAlpha.n0a,
        },
      },
    },
    light: {
      solid: {
        spin: {
          color: palette.neutral.n10,
        },
        track: {
          color: palette.neutral.n30,
        },
      },
      transparent: {
        spin: {
          color: palette.neutral.n10,
        },
        track: {
          color: palette.neutralAlpha.n0a,
        },
      },
    },
  },
  tabs: {
    content: {
      appearance: {
        selected: {
          Token: "primary",
          Reference: "fondecom.tabs.content.appearance.selected",
        },
      },
    },
  },
  tag: {
    primary: {
      normal: {
        background: {
          color: palette.blue.b50,
        },
        content: {
          appearance: "primary",
        },
      },
      strong: {
        background: {
          color: palette.blue.b400,
        },
        content: {
          appearance: "light",
        },
      },
    },
    success: {
      normal: {
        background: {
          color: palette.green.g50,
        },
        content: {
          appearance: "success",
        },
      },
      strong: {
        background: {
          color: palette.green.g400,
        },
        content: {
          appearance: "light",
        },
      },
    },
    warning: {
      normal: {
        background: {
          color: palette.yellow.y50,
        },
        content: {
          appearance: "warning",
        },
      },
      strong: {
        background: {
          color: palette.yellow.y400,
        },
        content: {
          appearance: "dark",
        },
      },
    },
    danger: {
      normal: {
        background: {
          color: palette.red.r50,
        },
        content: {
          appearance: "danger",
        },
      },
      strong: {
        background: {
          color: palette.red.r400,
        },
        content: {
          appearance: "light",
        },
      },
    },
    help: {
      normal: {
        background: {
          color: palette.purple.p50,
        },
        content: {
          appearance: "help",
        },
      },
      strong: {
        background: {
          color: palette.purple.p400,
        },
        content: {
          appearance: "light",
        },
      },
    },
    dark: {
      normal: {
        background: {
          color: palette.neutral.n30,
        },
        content: {
          appearance: "dark",
        },
      },
      strong: {
        background: {
          color: palette.neutral.n900,
        },
        content: {
          appearance: "light",
        },
      },
    },
    gray: {
      normal: {
        background: {
          color: palette.neutral.n10,
        },
        content: {
          appearance: "gray",
        },
      },
      strong: {
        background: {
          color: palette.neutral.n30,
        },
        content: {
          appearance: "gray",
        },
      },
    },
    light: {
      normal: {
        background: {
          color: palette.neutral.n0,
        },
        content: {
          appearance: "dark",
        },
      },
      strong: {
        background: {
          color: palette.neutral.n10,
        },
        content: {
          appearance: "dark",
        },
      },
    },
  },
  table: {
    border: {
      color: {
        Value: "",
        Reference: "fondecom.table.border.color",
        Token: "fondecom.palette.neutral.n40",
      },
    },
    heading: {
      background: {
        regular: {
          Value: "",
          Reference: "fondecom.table.heading.background.regular",
          Token: "fondecom.palette.neutral.n0",
        },
      },
      color: {
        regular: {
          Value: "",
          Reference: "fondecom.table.heading.color.regular",
          Token: "fondecom.palette.neutral.n900",
        },
      },
    },
    action: {
      background: {
        action: {
          Value: "",
          Reference: "fondecom.table.action.background.action",
          Token: "fondecom.palette.neutral.n30",
        },
      },
      color: {
        action: {
          Value: "",
          Reference: "fondecom.table.action.color.action",
          Token: "fondecom.palette.neutral.n900",
        },
      },
    },
    row: {
      background: {
        regular: {
          Value: "",
          Reference: "fondecom.table.row.background.regular",
          Token: "fondecom.palette.neutral.n0",
        },
        zebra: {
          Value: "",
          Reference: "fondecom.table.row.background.zebra",
          Token: "fondecom.palette.neutral.n30",
        },
      },
      color: {
        regular: {
          Value: "",
          Reference: "fondecom.table.row.color.regular",
          Token: "fondecom.palette.neutral.n900",
        },
        zebra: {
          Value: "",
          Reference: "fondecom.table.row.color.zebra",
          Token: "fondecom.palette.neutral.n900",
        },
      },
    },
    cell: {
      color: {
        primary: {
          Value: "",
          Reference: "fondecom.table.cell.color.primary",
          Token: "fondecom.palette.blue.b400",
        },
        success: {
          Value: "",
          Reference: "fondecom.table.cell.color.success",
          Token: "fondecom.palette.green.g400",
        },
        warning: {
          Value: "",
          Reference: "fondecom.table.cell.color.warning",
          Token: "fondecom.palette.yellow.y400",
        },
        danger: {
          Value: "",
          Reference: "fondecom.table.cell.color.danger",
          Token: "fondecom.palette.red.r400",
        },
        help: {
          Value: "",
          Reference: "fondecom.table.cell.color.help",
          Token: "fondecom.palette.purple.p400",
        },
        dark: {
          Value: "",
          Reference: "fondecom.table.cell.color.dark",
          Token: "fondecom.palette.neutral.n900",
        },
        gray: {
          Value: "",
          Reference: "fondecom.table.cell.color.gray",
          Token: "fondecom.palette.neutral.n300",
        },
        light: {
          Value: "",
          Reference: "fondecom.table.cell.color.light",
          Token: "fondecom.palette.neutral.n900",
        },
      },
      background: {
        primary: {
          Value: "",
          Reference: "fondecom.table.cell.background.primary",
          Token: "fondecom.palette.blue.b50",
        },
        success: {
          Value: "",
          Reference: "fondecom.table.cell.background.success",
          Token: "fondecom.palette.green.g50",
        },
        warning: {
          Value: "",
          Reference: "fondecom.table.cell.background.warning",
          Token: "fondecom.palette.yellow.y50",
        },
        danger: {
          Value: "",
          Reference: "fondecom.table.cell.background.danger",
          Token: "fondecom.palette.red.r50",
        },
        help: {
          Value: "",
          Reference: "fondecom.table.cell.background.help",
          Token: "fondecom.palette.purple.p50",
        },
        dark: {
          Value: "",
          Reference: "fondecom.table.cell.background.dark",
          Token: "fondecom.palette.neutral.n30",
        },
        gray: {
          Value: "",
          Reference: "fondecom.table.cell.background.gray",
          Token: "fondecom.palette.neutral.n20",
        },
        light: {
          Value: "",
          Reference: "fondecom.table.cell.background.light",
          Token: "fondecom.palette.neutral.n0",
        },
      },
    },
    pagination: {
      appearance: {
        Value: "",
        Reference: "fondecom.table.pagination.appearance",
        Token: "gray",
      },
    },
    caption: {
      appearance: {
        Value: "",
        Reference: "fondecom.table.caption.appearance",
        Token: "gray",
      },
    },
  },
  text: {
    primary: {
      content: {
        color: {
          regular: palette.blue.b400,
          disabled: palette.neutral.n70,
          hover: palette.blue.b300,
        },
      },
    },
    success: {
      content: {
        color: {
          regular: palette.green.g400,
          disabled: palette.neutral.n70,
          hover: palette.green.g300,
        },
      },
    },
    warning: {
      content: {
        color: {
          regular: palette.yellow.y400,
          disabled: palette.neutral.n70,
          hover: palette.yellow.y300,
        },
      },
    },
    danger: {
      content: {
        color: {
          regular: palette.red.r400,
          disabled: palette.neutral.n70,
          hover: palette.red.r300,
        },
      },
    },
    help: {
      content: {
        color: {
          regular: palette.purple.p400,
          disabled: palette.neutral.n70,
          hover: palette.purple.p300,
        },
      },
    },
    dark: {
      content: {
        color: {
          regular: palette.neutral.n900,
          disabled: palette.neutral.n70,
          hover: palette.neutral.n500,
        },
      },
    },
    gray: {
      content: {
        color: {
          regular: palette.neutral.n300,
          disabled: palette.neutral.n70,
          hover: palette.neutral.n100,
        },
      },
    },
    light: {
      content: {
        color: {
          regular: palette.neutral.n10,
          disabled: palette.neutral.n70,
          hover: palette.neutral.n0,
        },
      },
    },
  },
  toggle: {
    on: {
      background: {
        color: {
          regular: {
            "fondecom.toggle.on.background.color.regular":
              "fondecom.palette.green.g400",
          },
          disabled: {
            "fondecom.toggle.on.background.color.disabled":
              "fondecom.palette.neutral.n20",
          },
          hover: {
            "fondecom.toggle.on.background.color.hover":
              "fondecom.palette.green.g300",
          },
        },
      },
      "toggle-background": {
        color: {
          regular: {
            "fondecom.toggle.on.toggle-background.color.regular":
              "fondecom.palette.neutral.n0",
          },
          disabled: {
            "fondecom.toggle.on.toggle-background.color.disabled":
              "fondecom.palette.neutral.n0",
          },
          hover: {
            "fondecom.toggle.on.toggle-background.color.hover":
              "fondecom.palette.neutral.n0",
          },
        },
      },
      "toggle-border": {
        color: {
          regular: {
            "fondecom.toggle.on.toggle-border.color.regular":
              "fondecom.palette.neutralAlpha.n0a",
          },
          disabled: {
            "fondecom.toggle.on.toggle-border.color.disabled":
              "fondecom.palette.neutral.n70",
          },
          hover: {
            "fondecom.toggle.on.toggle-border.color.hover":
              "fondecom.palette.neutralAlpha.n0a",
          },
        },
      },
      icon: {
        appearance: {
          "fondecom.toggle.on.icon.appearance": "light",
        },
      },
    },
    off: {
      background: {
        color: {
          regular: {
            "fondecom.toggle.off.background.color.regular":
              "fondecom.palette.neutral.n20",
          },
          disabled: {
            "fondecom.toggle.off.background.color.disabled":
              "fondecom.palette.neutral.n20",
          },
          hover: {
            "fondecom.toggle.off.background.color.hover":
              "fondecom.palette.neutral.n10",
          },
        },
      },
      "toggle-background": {
        color: {
          regular: {
            "fondecom.toggle.off.toggle-background.color.regular":
              "fondecom.palette.neutral.n0",
          },
          disabled: {
            "fondecom.toggle.off.toggle-background.color.disabled":
              "fondecom.palette.neutral.n0",
          },
          hover: {
            "fondecom.toggle.off.toggle-background.color.hover":
              "fondecom.palette.neutral.n0",
          },
        },
      },
      "toggle-border": {
        color: {
          regular: {
            "fondecom.toggle.off.toggle-border.color.regular":
              "fondecom.palette.neutral.n70",
          },
          disabled: {
            "fondecom.toggle.off.toggle-border.color.disabled":
              "fondecom.palette.neutral.n70",
          },
          hover: {
            "fondecom.toggle.off.toggle-border.color.hover":
              "fondecom.palette.neutral.n70",
          },
        },
      },
      icon: {
        appearance: {
          "fondecom.toggle.off.icon.appearance": "gray",
        },
      },
    },
  },
  typography: {
    fonts: [
      {
        family: "Open Sans",
        url: "https://fonts.gstatic.com/s/opensans/v35/memvYaGs126MiZpBA-UvWbX2vVnXBbObj2OVTS-muw.woff2",
        options: {
          weight: "400",
          style: "normal",
        },
      },
      {
        family: "Open Sans",
        url: "https://fonts.gstatic.com/s/opensans/v35/memvYaGs126MiZpBA-UvWbX2vVnXBbObj2OVTS-muw.woff2",
        options: {
          weight: "500",
          style: "normal",
        },
      },
    ],
    display: {
      large: {
        font: "Open Sans",
        lineHeight: "64px",
        size: "57px",
        tracking: "-0.25",
        weight: "400",
      },
      medium: {
        font: "Open Sans",
        lineHeight: "52px",
        size: "45px",
        tracking: "0",
        weight: "400",
      },
      small: {
        font: "Open Sans",
        lineHeight: "44px",
        size: "36px",
        tracking: "0",
        weight: "400",
      },
    },
    headline: {
      large: {
        font: "Open Sans",
        lineHeight: "40px",
        size: "32px",
        tracking: "0",
        weight: "400",
      },
      medium: {
        font: "Open Sans",
        lineHeight: "36px",
        size: "28px",
        tracking: "0",
        weight: "400",
      },
      small: {
        font: "Open Sans",
        lineHeight: "32px",
        size: "24px",
        tracking: "0",
        weight: "400",
      },
    },
    title: {
      large: {
        font: "Open Sans",
        lineHeight: "28px",
        size: "22px",
        tracking: "0",
        weight: "400",
      },
      medium: {
        font: "Open Sans",
        lineHeight: "24px",
        size: "16px",
        tracking: "0.15",
        weight: "500",
      },
      small: {
        font: "Open Sans",
        lineHeight: "20px",
        size: "14px",
        tracking: "0.1",
        weight: "500",
      },
    },
    label: {
      large: {
        font: "Open Sans",
        lineHeight: "20px",
        size: "14px",
        tracking: "0.1",
        weight: "500",
      },
      medium: {
        font: "Open Sans",
        lineHeight: "16px",
        size: "12px",
        tracking: "0.5",
        weight: "500",
      },
      small: {
        font: "Open Sans",
        lineHeight: "16px",
        size: "11px",
        tracking: "0.5",
        weight: "500",
      },
    },
    body: {
      large: {
        font: "Open Sans",
        lineHeight: "24px",
        size: "16px",
        tracking: "0.5",
        weight: "400",
      },
      medium: {
        font: "Open Sans",
        lineHeight: "20px",
        size: "14px",
        tracking: "0.25",
        weight: "400",
      },
      small: {
        font: "Open Sans",
        lineHeight: "16px",
        size: "12px",
        tracking: "0.4",
        weight: "400",
      },
    },
  },
};

export { fondecomTheme };
