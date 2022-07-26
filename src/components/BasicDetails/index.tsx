import * as UI from "@/libs/ui";
import { CSSObject } from "@emotion/react";
import React from "react";

const PropertyList = (props: any) => {
  return (
    <UI.CKGrid boxSizing="border-box" {...props}>
      {props?.children}
    </UI.CKGrid>
  );
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
    row,
    data,
    labelWidth = "40%",
    colSpan,
    rowSpan,
    hiddenLabel,
    type,
  } = props;

  const ROW_COMPONENT = ROW_TYPE?.[type || "string"] || ROW_TYPE["string"];

  return (
    <UI.CKGridItem boxSizing="border-box" colSpan={colSpan} rowSpan={rowSpan}>
      <UI.ListItemText
        disableTypography
        primary={
          hiddenLabel ? null : (
            <UI.Typography
              color="text.secondary"
              sx={{ fontWeight: 600 }}
              variant="subtitle2"
            >
              {row?.label}
            </UI.Typography>
          )
        }
        secondary={
          <UI.Box
            sx={{
              flex: 1,
              mt: align === "vertical" ? 0.5 : 0,
            }}
          >
            <ROW_COMPONENT data={data} row={row} />
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
    </UI.CKGridItem>
  );
};
const BasicDetails = (props: {
  rows: {
    label: string;
    property?: string;
    renderRow?: (data?: any, row?: any) => any;
    getRowData?: (value?: any, row?: any) => Promise<any>;
    type?: "string" | "render" | "render-async";
    colSpan?: number;
    colStart?: number;
    colEnd?: number;
    rowSpan?: number;
    rowStart?: number;
    rowEnd?: number;
    hiddenLabel?: boolean;
  }[];
  width?: string;
  data?: any;
  labelWidth?: string;
  templateRows?: string;
  templateColumns?: string;
  gap?: string;
  sx?: CSSObject;
  rowHeight?: string;
}) => {
  const { rows, width = "100%", data = {}, labelWidth } = props;
  const align = true ? "horizontal" : "vertical";

  return (
    <PropertyList {...props}>
      {rows.map((row: any, index: number) => {
        return (
          <PropertyListItem
            key={index}
            align={align}
            divider
            row={row}
            data={data}
            labelWidth={labelWidth}
            {...row}
          />
        );
      })}
    </PropertyList>
  );
};
export default BasicDetails;
