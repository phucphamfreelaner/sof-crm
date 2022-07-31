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
      {row?.renderRow?.(data?.[row?.property], data)}
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
        {row?.renderRow?.(value, row, data) || value}
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
    valueWidth,
    colSpan,
    colStart,
    colEnd,
    rowSpan,
    rowStart,
    rowEnd,
    hiddenLabel,
    type,
  } = props;

  const ROW_COMPONENT = ROW_TYPE?.[type || "string"] || ROW_TYPE["string"];

  return (
    <UI.CKGridItem
      boxSizing="border-box"
      colEnd={colEnd}
      colStart={colStart}
      colSpan={colSpan}
      rowSpan={rowSpan}
      rowEnd={rowEnd}
      rowStart={rowStart}
    >
      <UI.HStack
        justifyContent={
          align === "right"
            ? "flex-end"
            : align === "center"
            ? "center"
            : "flex-start"
        }
      >
        {row?.label && !hiddenLabel && (
          <UI.CKBox w={labelWidth}>
            <UI.Typography
              color="text.secondary"
              sx={{ fontWeight: 600, textAlign: align }}
              variant="subtitle2"
            >
              {row?.label}
            </UI.Typography>
          </UI.CKBox>
        )}
        <UI.CKBox
          w={valueWidth}
          sx={{ textAlign: align }}
          flex={["right", "center"].includes(align) ? "none" : 1}
        >
          <ROW_COMPONENT data={data} row={row} />
        </UI.CKBox>
      </UI.HStack>
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
    labelWidth?: string;
    valueWidth?: string;
    align?: "center" | "left" | "right";
  }[];
  width?: string;
  data?: any;
  labelWidth?: string;
  templateRows?: string;
  templateColumns?: string;
  gap?: string;
  sx?: CSSObject;
  rowHeight?: string;
  valueWidth?: string;
}) => {
  const { rows, width = "100%", data = {}, labelWidth, valueWidth } = props;
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
            labelWidth={row?.labelWidth || labelWidth}
            valueWidth={row?.valueWidth || valueWidth}
            {...row}
          />
        );
      })}
    </PropertyList>
  );
};
export default BasicDetails;
