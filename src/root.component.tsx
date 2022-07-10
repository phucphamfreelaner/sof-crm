import Router from "@/router";
import * as UI from "@/libs/ui";
import { ReduxProvider } from "@/store";
import NonProdLogin from "@/container/NonProdLogin";
import { Toaster } from "react-hot-toast";
import { createTheme } from "@/libs/theme";

export default function Root() {
  const theme = createTheme({ mode: "light" });
  return (
    <ReduxProvider>
      <UI.ThemeProvider theme={theme}>
        <UI.CssBaseline />
        <Toaster />
        <NonProdLogin>
          <Router />
        </NonProdLogin>
      </UI.ThemeProvider>
    </ReduxProvider>
  );
}
