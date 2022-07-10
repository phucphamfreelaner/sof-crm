import Router from "@/router";
import * as UI from "@/libs/ui";
import { ReduxProvider } from "@/store";
import NonProdLogin from "@/container/NonProdLogin";
import { Toaster } from "react-hot-toast";
import { createTheme } from "@/libs/theme";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

export default function Root() {
  const theme = createTheme({ mode: "light" });
  return (
    <ReduxProvider>
      <UI.ThemeProvider theme={theme}>
        <UI.CssBaseline />
        <Toaster />
        <NonProdLogin>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Router />
          </LocalizationProvider>
        </NonProdLogin>
      </UI.ThemeProvider>
    </ReduxProvider>
  );
}
