import Router from "@/router";
import * as UI from "@/libs/ui";

export default function Root() {
  const theme = UI.createTheme();
  return (
    <UI.ThemeProvider theme={theme}>
      <UI.CssBaseline />
      <Router />
    </UI.ThemeProvider>
  );
}
