import Router from "@/router";
import * as UI from "@/libs/ui";
import { ReduxProvider } from "@/store";

export default function Root(props) {
  const theme = UI.createTheme();
  return (
    <ReduxProvider>
      <UI.ThemeProvider theme={theme}>
        <UI.CssBaseline />
        <Router />
      </UI.ThemeProvider>
    </ReduxProvider>
  );
}
