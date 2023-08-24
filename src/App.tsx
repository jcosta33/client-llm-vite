import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { Provider } from "./context";
import { muiTheme } from "./theme";
import Loader from "./components/loader";
import Wrapper from "./components/wrapper";

const darkTheme = createTheme(muiTheme);

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Provider>
        <Loader />
        <Wrapper />
      </Provider>
    </ThemeProvider>
  );
}

export default App;
