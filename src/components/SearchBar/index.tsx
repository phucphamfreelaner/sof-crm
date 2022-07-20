import React, { useState } from "react";
import * as UI from "@/libs/ui";
import { AiOutlineSearch } from "react-icons/ai";
import BaseForm from "@/components/BaseForm";
import { IoMdArrowDropdown } from "react-icons/io";
import { RiArrowUpSFill } from "react-icons/ri";
import { debounce } from "lodash";

export interface ISearhBar {
  baseSearchOptions: any;
  advanceSearchOptions: any;
  handleOnchangeBaseSearch?: (val: any) => any;
  handleOnchangeAdvanceSearch?: (val: any) => any;
}

function SearchBar(props: ISearhBar) {
  const theme = UI.useTheme();
  const {
    baseSearchOptions,
    advanceSearchOptions,
    handleOnchangeBaseSearch,
    handleOnchangeAdvanceSearch,
  } = props;
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <UI.Box
        sx={{
          alignItems: "center",
          display: "flex",
          flexWrap: "wrap",
          m: -1.5,
          p: 3,
        }}
      >
        <BaseForm
          sx={{ mt: "15px" }}
          templateColumns="repeat(12, 1fr)"
          columnGap="24px"
          onWatchChange={debounce((val) => {
            handleOnchangeBaseSearch(val);
          }, 1000)}
          watchFields={baseSearchOptions.map((item) => {
            return item.name;
          })}
          fields={baseSearchOptions}
        ></BaseForm>
        <UI.HStack sx={{ width: "100%" }} mt={16} mb={16}>
          <UI.Typography fontStyle={"italic"}>Tìm kiếm nâng cao</UI.Typography>
          <UI.Box
            sx={{ cursor: "pointer" }}
            onClick={(val) => {
              setExpanded(!expanded);
            }}
          >
            <UI.IconButton aria-label="show" size="large">
              {expanded ? <RiArrowUpSFill /> : <IoMdArrowDropdown />}
            </UI.IconButton>
          </UI.Box>
        </UI.HStack>
        <UI.Collapse in={expanded}>
          <BaseForm
            gap={theme.spacing(2)}
            templateColumns="repeat(6,1fr)"
            onWatchChange={debounce((val) => {
              handleOnchangeAdvanceSearch(val);
            }, 1000)}
            watchFields={advanceSearchOptions.map((item) => {
              return item.name;
            })}
            fields={advanceSearchOptions}
          ></BaseForm>
        </UI.Collapse>
      </UI.Box>
    </>
  );
}

export default SearchBar;
