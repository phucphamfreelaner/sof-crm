import React from "react";
import * as UI from "@/libs/ui";
import { IBottomContent } from "@/store/modal";
import {
  AiOutlineMinusCircle,
  AiOutlinePlusCircle,
  AiOutlineCloseCircle,
} from "react-icons/ai";
import { isEmpty } from "lodash-es";

interface IBottomWindow {
  modals?: IBottomContent[];
  onCloseWindow?: (id: string) => any;
}

function BottomWindow(props: IBottomWindow) {
  const { modals, onCloseWindow } = props;

  return isEmpty(modals) ? null : (
    <UI.HStack
      alignItems="flex-end"
      p={10}
      position="fixed"
      zIndex={9}
      bottom={0}
      right={0}
      sx={{ transition: "0.3s" }}
    >
      {modals.map((x) => (
        <CardItem onCloseWindow={onCloseWindow} data={x} key={x.id} />
      ))}
    </UI.HStack>
  );
}

const CardItem = React.memo((props: any) => {
  const { data, onCloseWindow } = props;

  const [height, setHeight] = React.useState(data?.height || 500);
  const [width, setWidth] = React.useState(data?.width || 400);

  const { palette } = UI.useTheme();

  return (
    <UI.Card
      elevation={20}
      sx={{
        width,
        minWidth: width,
        maxWidth: width,
        border: `1px solid ${palette.grey[300]}`,
      }}
    >
      <UI.Toolbar
        sx={{
          minHeight: "40px !important",
          paddingX: "12px !important",
          background: palette.grey[50],
          justifyContent: "space-between",
        }}
      >
        <UI.CKBox>
          <UI.Typography variant="body2" fontWeight={600}>
            {data?.title}
          </UI.Typography>
        </UI.CKBox>
        <UI.HStack>
          <AiOutlineMinusCircle
            onClick={() => {
              setHeight(0.5);
              setWidth(300);
            }}
            size="18px"
            style={{ cursor: "pointer", color: palette.warning.main }}
          />
          <AiOutlinePlusCircle
            onClick={() => {
              setHeight(data?.width || 500);
              setWidth(data?.height || 400);
            }}
            size="18px"
            style={{ cursor: "pointer", color: palette.success.main }}
          />
          <AiOutlineCloseCircle
            onClick={() => onCloseWindow?.(data?.id)}
            size="18px"
            style={{ cursor: "pointer", color: palette.error.main }}
          />
        </UI.HStack>
      </UI.Toolbar>
      <UI.Divider sx={{ width: "100%", borderColor: palette.grey[100] }} />

      <UI.CKBox
        sx={{
          minHeight: `${height} !important`,
          maxHeight: `${height} !important`,
          height: `${height} !important`,
          overflow: "hidden",
          transition: "0.3s",
        }}
      >
        {data?.content}
      </UI.CKBox>
    </UI.Card>
  );
});

export default BottomWindow;
