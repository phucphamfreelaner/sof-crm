import React, { useState, useRef } from "react";
import CustomerListTable from "@/components/CustomerTableList";
import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";

import {
  AiFillPlusCircle,
  AiOutlineUpload,
  AiOutlineDownload,
  AiOutlineSearch,
} from "react-icons/ai";
import { useGetCustomerListQuery } from "@/store/customer";
import Loading from "@/components/Loading";

const sortOptions = [
  {
    label: "Last update (newest)",
    value: "updatedAt|desc",
  },
  {
    label: "Last update (oldest)",
    value: "updatedAt|asc",
  },
  {
    label: "Total orders (highest)",
    value: "totalOrders|desc",
  },
  {
    label: "Total orders (lowest)",
    value: "totalOrders|asc",
  },
];

const applyFilters = (customers, filters) =>
  customers.filter((customer) => {
    if (filters.query) {
      let queryMatched = false;
      const properties = ["email", "name"];

      properties.forEach((property) => {
        if (
          customer[property].toLowerCase().includes(filters.query.toLowerCase())
        ) {
          queryMatched = true;
        }
      });

      if (!queryMatched) {
        return false;
      }
    }

    if (filters.hasAcceptedMarketing && !customer.hasAcceptedMarketing) {
      return false;
    }

    if (filters.isProspect && !customer.isProspect) {
      return false;
    }

    if (filters.isReturning && !customer.isReturning) {
      return false;
    }

    return true;
  });

const descendingComparator = (a, b, sortBy) => {
  // When compared to something undefined, always returns false.
  // This means that if a field does not exist from either element ('a' or 'b') the return will be 0.

  if (b[sortBy] < a[sortBy]) {
    return -1;
  }

  if (b[sortBy] > a[sortBy]) {
    return 1;
  }

  return 0;
};

const getComparator = (sortDir, sortBy) =>
  sortDir === "desc"
    ? (a, b) => descendingComparator(a, b, sortBy)
    : (a, b) => -descendingComparator(a, b, sortBy);

const applySort = (customers, sort) => {
  const [sortBy, sortDir] = sort.split("|");
  const comparator = getComparator(sortDir, sortBy);
  const stabilizedThis = customers.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const newOrder = comparator(a[0], b[0]);

    if (newOrder !== 0) {
      return newOrder;
    }

    return a[1] - b[1];
  });

  return stabilizedThis.map((el) => el[0]);
};

const applyPagination = (customers, page, rowsPerPage) =>
  customers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

function CustomerTableListContainer() {
  const [customers, setCustomers] = useState([]);
  const [sort, setSort] = useState(sortOptions[0].value);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentTab, setCurrentTab] = useState("all");
  const queryRef = useRef(null);
  const [filters, setFilters] = useState({
    query: "",
  });
  const { data, isLoading, isFetching, refetch } = useGetCustomerListQuery({
    page: page,
    limit: rowsPerPage,
    contact_name: filters?.query,
  });

  // Usually query is done on backend with indexing solutions
  const filteredCustomers = applyFilters(customers, filters);
  const sortedCustomers = applySort(filteredCustomers, sort);
  const paginatedCustomers = applyPagination(
    sortedCustomers,
    page,
    rowsPerPage
  );
  const handleQueryChange = (event) => {
    event.preventDefault();
    setFilters((prevState) => ({
      ...prevState,
      query: queryRef.current?.value,
    }));
  };
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
    refetch();
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ mb: 4 }}>
            <Grid container justifyContent="space-between" spacing={3}>
              <Grid item>
                <Typography variant="h4">Customers</Typography>
              </Grid>
              <Grid item>
                <Button
                  startIcon={<AiFillPlusCircle fontSize="small" />}
                  variant="contained"
                >
                  Add
                </Button>
              </Grid>
            </Grid>
            <Box
              sx={{
                m: -1,
                mt: 3,
              }}
            >
              <Button
                startIcon={<AiOutlineUpload fontSize="small" />}
                sx={{ m: 1 }}
              >
                Import
              </Button>
              <Button
                startIcon={<AiOutlineDownload fontSize="small" />}
                sx={{ m: 1 }}
              >
                Export
              </Button>
            </Box>
          </Box>
          <Card>
            <Divider />
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                flexWrap: "wrap",
                m: -1.5,
                p: 3,
              }}
            >
              <Box
                component="form"
                onSubmit={handleQueryChange}
                sx={{
                  flexGrow: 1,
                  m: 1.5,
                }}
              >
                <TextField
                  defaultValue=""
                  fullWidth
                  inputProps={{ ref: queryRef }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AiOutlineSearch fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                  placeholder="Search customers"
                />
              </Box>
              {/* <TextField
                label="Sort By"
                name="sort"
                onChange={()=>{console.log('Sort By')}}
                select
                SelectProps={{ native: true }}
                sx={{ m: 1.5 }}
                value={sort}
              >
                {sortOptions.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField> */}
            </Box>
            {isFetching ? (
              <Loading />
            ) : (
              <CustomerListTable
                customers={data ? data : []}
                customersCount={data ? data.length : 0}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                rowsPerPage={rowsPerPage}
                page={page}
              />
            )}
          </Card>
        </Container>
      </Box>
    </>
  );
}

export default CustomerTableListContainer;
