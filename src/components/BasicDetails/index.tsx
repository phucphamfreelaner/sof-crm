import * as UI from "@/libs/ui";
import React from "react";

const PropertyList = (props) => {
  const { children } = props;
  return <UI.List disablePadding>{children}</UI.List>;
};

const ROW_TYPE = {
  string: ({ data, row }) => (
    <UI.Typography sx={{ width: "100%" }} variant="body2">
      {data?.[row?.property]}
    </UI.Typography>
  ),
  render: ({ data, row }) => (
    <UI.Typography sx={{ width: "100%" }} variant="body2">
      {row?.renderRow?.(data?.[row?.property], row)}
    </UI.Typography>
  ),
  "render-async": ({ data, row }) => {
    const [value, setValue] = React.useState<string>("");
    React.useEffect(() => {
      if (data?.[row?.property]) {
        row?.getRowData(data?.[row?.property]).then(setValue);
      }
    }, [data]);

    return (
      <UI.Typography sx={{ width: "100%" }} variant="body2">
        {row?.renderRow?.(value, row) || value}
      </UI.Typography>
    );
  },
};

const PropertyListItem = (props: any) => {
  const {
    align,
    children,
    disableGutters,
    row,
    data,
    labelWidth = "40%",
    ...other
  } = props;

  const ROW_COMPONENT = React.useRef<any>(ROW_TYPE["string"]);

  React.useEffect(() => {
    if (row?.renderRow) ROW_COMPONENT.current = ROW_TYPE["render"];
    if (row?.getRowData) ROW_COMPONENT.current = ROW_TYPE["render-async"];
  }, []);

  return (
    <UI.ListItem
      sx={{
        px: disableGutters ? 0 : 3,
        py: 1.5,
      }}
      {...other}
    >
      <UI.ListItemText
        disableTypography
        primary={
          <UI.Typography
            sx={{ minWidth: align === "vertical" ? "inherit" : 360 }}
            variant="subtitle2"
          >
            {row?.label}
          </UI.Typography>
        }
        secondary={
          <UI.Box
            sx={{
              flex: 1,
              mt: align === "vertical" ? 0.5 : 0,
            }}
          >
            <ROW_COMPONENT.current data={data} row={row} />
          </UI.Box>
        }
        sx={{
          ".MuiTypography-subtitle2": {
            minWidth: labelWidth,
            width: labelWidth,
          },
          display: "flex",
          flexDirection: align === "vertical" ? "column" : "row",
          my: 0,
        }}
      />
    </UI.ListItem>
  );
};
const BasicDetails = (props: {
  rows: {
    label: string;
    property?: string;
    renderRow?: (row?: any, data?: any) => any;
    getRowData?: (value?: any, data?: any) => Promise<any>;
    type?: "string" | "render" | "render-async";
  }[];
  title: string;
  width?: string;
  data?: any;
  labelWidth?: string;
}) => {
  const { rows, title, width = "100%", data = {}, labelWidth } = props;
  const align = true ? "horizontal" : "vertical";

  return (
    <UI.Card sx={{ width }}>
      <UI.CardHeader
        sx={{ paddingTop: "12px", paddingBottom: "12px" }}
        title={title}
      />
      <UI.Divider />
      <PropertyList>
        {rows.map((row: any, index: number) => {
          return (
            <PropertyListItem
              key={index}
              align={align}
              divider
              row={row}
              data={data}
              labelWidth={labelWidth}
            />
          );
        })}
      </PropertyList>
    </UI.Card>
  );
};
export default BasicDetails;
