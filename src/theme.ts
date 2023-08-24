import { ThemeOptions } from "@mui/material";

export const muiTheme: ThemeOptions = {
  palette: {
    mode: "dark",
    text: {
      primary: "#ddd",
      secondary: "#ccc",
    },
    background: {
      default: "#000",
    },
    primary: {
      light: "#E5E5FF", // Lighter super washed-out pastel blue/purple
      main: "#D3D3FF", // Super washed-out pastel blue/purple
      dark: "#C0C0FF", // Darker super washed-out pastel blue/purple
      contrastText: "#000",
    },
    secondary: {
      light: "#FFFBE5", // Light super super washed-out yellow
      main: "#FFF9D3", // Super super washed-out yellow
      dark: "#FFF7C0", // Darker super super washed-out yellow
      contrastText: "#000",
    },
    error: {
      light: "#FFEEEE",
      main: "#FFDFDF",
      dark: "#FFCFCF",
      contrastText: "#000",
    },
    warning: {
      light: "#FFF5EE",
      main: "#FFEEDD",
      dark: "#FFE0CC",
      contrastText: "#000",
    },
    info: {
      light: "#F0F5FF",
      main: "#E1E9FF",
      dark: "#C2D4FF",
      contrastText: "#000",
    },
    success: {
      light: "#F0FFF0",
      main: "#E1FFE1",
      dark: "#C2FFC2",
      contrastText: "#000",
    },
    grey: {
      50: "#F3F3F3",
      100: "#E0E0E0",
      200: "#C7C7C7",
      300: "#B0B0B0",
      400: "#999999",
      500: "#808080",
      600: "#666666",
      700: "#4D4D4D",
      800: "#333333",
      900: "#1A1A1A",
    },
  },
  typography: {
    fontSize: 14, // default is 14, adjust this to your desired value
    fontFamily: "inherit",
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          letterSpacing: 0.3,
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          background: "#151515",
        },
      },
    },
  },
};
