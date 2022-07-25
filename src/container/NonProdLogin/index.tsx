import React from "react";
import * as Yup from "yup";

import * as UI from "@/libs/ui";
import BaseForm from "@/components/BaseForm";
import { LOCAL_KEY } from "@/constants";
import Logo from "@/assets/images/logo-capa-group.png";

import { useLazyLoginQuery } from "@/store/auth";

interface INonProdLogin {
  children?: React.ReactNode;
}

function NonProdLogin(props: INonProdLogin) {
  const theme = UI.useTheme();
  const { children } = props;
  const [open, setOpen] = React.useState(false);

  const [login, { data }] = useLazyLoginQuery();
  const handleLogin = ({ username, password }) => {
    login({ username, password });
  };
  React.useEffect(() => {
    //@ts-ignore
    const env = ENV;
    if (env === "non-prod" && !localStorage.getItem(LOCAL_KEY.TOKEN))
      setOpen(true);
    else setOpen(false);
  }, []);

  React.useEffect(() => {
    if (data) {
      localStorage.setItem(LOCAL_KEY.TOKEN, data);
      setOpen(false);
    }
  }, [data]);

  const handleLogout = () => localStorage.remove(LOCAL_KEY.TOKEN);

  return (
    <>
      {children}
      <UI.Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <UI.Box sx={style}>
          <UI.Box sx={{ maxWidth: "400px", marginBottom: "16px" }}>
            <img width="100%" src={Logo} />
          </UI.Box>
          <UI.Typography id="modal-modal-title" variant="h6" component="h2">
            LOGIN NOW!
          </UI.Typography>
          <br />
          <BaseForm
            sx={{ width: "400px" }}
            gap={theme.spacing(2)}
            onSubmit={handleLogin}
            schema={{
              username: Yup.string().required("User name is required!"),
              password: Yup.string().required("Password is required!"),
            }}
            fields={[
              {
                name: "username",
                type: "input",
                label: "User Name",
              },
              {
                name: "password",
                type: "input",
                label: "Password",
                textType: "password",
              },
            ]}
          >
            <UI.VStack pt={theme.spacing(2)} w="100%">
              <UI.Button type="submit" fullWidth variant="contained">
                Log in
              </UI.Button>
              <UI.Button
                type="button"
                onClick={handleLogout}
                fullWidth
                variant="outlined"
              >
                Log out
              </UI.Button>
              <UI.Box sx={{ pt: 2, width: "100%" }}>
                <UI.Alert severity="info">
                  <UI.Typography>
                    Use <b>admin</b> and password <b>admin</b>
                  </UI.Typography>
                </UI.Alert>
              </UI.Box>
            </UI.VStack>
          </BaseForm>
        </UI.Box>
      </UI.Modal>
    </>
  );
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  //   width: 500,
  bgcolor: "background.paper",
  borderRadius: "6px",
  boxShadow: 24,
  p: 4,
};

export default NonProdLogin;
