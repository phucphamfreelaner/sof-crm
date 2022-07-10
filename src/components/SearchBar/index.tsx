import React, { useState } from "react";
import * as UI from "@/libs/ui";
import { AiOutlineSearch } from "react-icons/ai";
import BaseForm from "@/components/BaseForm";
import { IoMdArrowDropdown } from "react-icons/io";
import { RiArrowUpSFill } from "react-icons/ri";
import { debounce } from "lodash";

export interface ISearhBar {
  sort: any;
  orderBy: any;
  queryRef: any;
  sortOptions: any;
  orderOptions: any;
  handleQueryChange?: (val: any) => any;
  handleOrderChange?: (val: any) => any;
  handleSortChange?: (val: any) => any;
  handleOnchangeAdvanceSearch?: (val: any) => any;
}

function SearchBar(props: ISearhBar) {
  const theme = UI.useTheme();
  const {
    sort,
    orderBy,
    queryRef,
    sortOptions,
    orderOptions,
    handleQueryChange,
    handleOnchangeAdvanceSearch,
    handleOrderChange,
    handleSortChange,
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
        <UI.Box
          component="form"
          onSubmit={handleQueryChange}
          sx={{
            flexGrow: 1,
          }}
        >
          <UI.TextField
            defaultValue=""
            fullWidth
            inputProps={{ ref: queryRef }}
            InputProps={{
              startAdornment: (
                <UI.InputAdornment position="start">
                  <AiOutlineSearch fontSize="small" />
                </UI.InputAdornment>
              ),
            }}
            placeholder="Tìm kiếm mã hợp đồng"
          />
        </UI.Box>
        <UI.TextField
          label="Sort By"
          name="sort"
          onChange={handleSortChange}
          select
          SelectProps={{ native: true }}
          sx={{ m: 1.5 }}
          value={sort}
        >
          {sortOptions.map((option) => (
            <option key={option.name} value={option.name}>
              {option.label}
            </option>
          ))}
        </UI.TextField>

        <UI.TextField
          label="Order By"
          name="order"
          onChange={handleOrderChange}
          select
          SelectProps={{ native: true }}
          sx={{ m: 1.5 }}
          value={orderBy}
        >
          {orderOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </UI.TextField>
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
            watchFields={sortOptions.map((item) => {
              return item.name;
            })}
            //@ts-ignore
            fields={sortOptions}
          ></BaseForm>
        </UI.Collapse>
      </UI.Box>
    </>
  );
}

export default SearchBar;
