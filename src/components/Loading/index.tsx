import React from "react";
import * as UI from "@/libs/ui";

function Loading() {
  return (
    <UI.Box
      sx={{
        display: "flex",
        //backgroundColor: '#2d2e35',
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100px",
      }}
    >
      <UI.CircularProgress size="30px" />
    </UI.Box>
  );
}

export default Loading;
