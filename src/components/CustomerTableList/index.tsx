import { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Stack,
} from "@mui/material";
import * as UI from "@/libs/ui";
import { Scrollbar } from "@/components/ScrollBar";
import Empty from "@/assets/images/no-data.png";
import { MdCancel } from "react-icons/md";
import { AiFillCheckCircle } from "react-icons/ai";
import { format } from "date-fns";
import { isEmpty } from "lodash";
import { useNavigate } from "react-router-dom";
import DeleteCustomerModal from "@/modal/DeleteCustomerModal";

const CustomerListTable = (props) => {
  const {
    customers,
    customersCount,
    onPageChange,
    onRowsPerPageChange,
    page,
    rowsPerPage,
    ...other
  } = props;
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const navigate = useNavigate();

  // Reset selected customers when customers change
  useEffect(
    () => {
      if (selectedCustomers.length) {
        setSelectedCustomers([]);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [customers]
  );

  const handleSelectAllCustomers = (event) => {
    setSelectedCustomers(
      event.target.checked ? customers.map((customer) => customer?.id) : []
    );
  };

  const handleSelectOneCustomer = (event, customerId) => {
    if (!selectedCustomers.includes(customerId)) {
      setSelectedCustomers((prevSelected) => [...prevSelected, customerId]);
    } else {
      setSelectedCustomers((prevSelected) =>
        prevSelected.filter((id) => id !== customerId)
      );
    }
  };

  const enableBulkActions = selectedCustomers.length > 0;
  const selectedSomeCustomers =
    selectedCustomers.length > 0 && selectedCustomers.length < customers.length;
  const selectedAllCustomers = selectedCustomers.length === customers.length;

  const getInitials = (name = "") =>
    name
      .replace(/\s+/, " ")
      .split(" ")
      .slice(0, 2)
      .map((v) => v && v[0].toUpperCase())
      .join("");

  return (
    <div {...other}>
      <Box
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? "neutral.800" : "neutral.100",
          display: enableBulkActions ? "block" : "none",
          px: 2,
          py: 0.5,
        }}
      >
        <Checkbox
          checked={selectedAllCustomers}
          indeterminate={selectedSomeCustomers}
          onChange={handleSelectAllCustomers}
        />
        <Button
          size="small"
          sx={{ ml: 2 }}
          onClick={() => {
            setOpenDeleteModal(true);
          }}
        >
          Delete
        </Button>
        <Button
          size="small"
          sx={{ ml: 2 }}
          disabled={selectedCustomers.length !== 1}
          onClick={() => {
            navigate(`/khach_hang/${selectedCustomers?.[0]}`);
          }}
        >
          Edit
        </Button>
      </Box>
      <Scrollbar>
        <Table sx={{ minWidth: 700 }}>
          <TableHead
            sx={{ visibility: enableBulkActions ? "collapse" : "visible" }}
          >
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedAllCustomers}
                  indeterminate={selectedSomeCustomers}
                  onChange={handleSelectAllCustomers}
                />
              </TableCell>
              <TableCell>Mã Khách hàng</TableCell>
              <TableCell>Cách gọi KH</TableCell>
              <TableCell>Di động</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>NV nhập</TableCell>
              <TableCell>Ngày nhập</TableCell>
              <TableCell>Địa chỉ</TableCell>
              <TableCell>Điện thoại bàn</TableCell>
              <TableCell>Ghi chú</TableCell>
              <TableCell>Chăm sóc</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers &&
              customers.map((customer) => {
                const isCustomerSelected = selectedCustomers.includes(
                  customer?.id
                );

                return (
                  <TableRow
                    hover
                    key={customer?.id}
                    selected={isCustomerSelected}
                    onClick={() => {
                      navigate(`/khach_hang/${customer?.id}`);
                    }}
                    sx={{
                      cursor: "pointer",
                      tabIndex: -1,
                    }}
                  >
                    <TableCell
                      padding="checkbox"
                      onClick={(event) => event.stopPropagation()}
                    >
                      <Checkbox
                        checked={isCustomerSelected}
                        onChange={(event) => {
                          handleSelectOneCustomer(event, customer?.id);
                        }}
                        value={isCustomerSelected}
                      />
                    </TableCell>

                    <TableCell>{customer?.code}</TableCell>

                    <TableCell>
                      <Box
                        sx={{
                          alignItems: "center",
                          display: "flex",
                        }}
                      >
                        <Avatar
                          src={customer?.avatar}
                          sx={{
                            height: 42,
                            width: 42,
                          }}
                        >
                          {customer?.contact
                            ? getInitials(customer?.contact)
                            : "UD"}
                        </Avatar>
                        <Box sx={{ ml: 1 }}>
                          <Typography fontSize={"15px"}>
                            {customer?.contact}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>

                    <TableCell>{customer?.phone}</TableCell>
                    <TableCell>{customer?.email}</TableCell>

                    <TableCell>{customer?.user_tao?.name}</TableCell>

                    <TableCell sx={{ width: "150px" }}>
                      {customer?.created_at
                        ? format(new Date(customer?.created_at), "dd MMM yyyy")
                        : undefined}
                    </TableCell>

                    <TableCell>{customer?.address}</TableCell>

                    <TableCell>{customer?.totalOrders}</TableCell>

                    <TableCell>{customer?.note}</TableCell>

                    <TableCell>
                      <UI.Center>
                        {customer?.da_cham_soc === 0 ? (
                          <MdCancel color={"red"} fontSize={"30px"} />
                        ) : (
                          <AiFillCheckCircle
                            color={"green"}
                            fontSize={"30px"}
                          />
                        )}
                      </UI.Center>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </Scrollbar>
      {isEmpty(customers) && (
        <UI.Center width={"full"} mt={20}>
          <img width="90px" src={Empty} />
          <Typography color="#8996a3" fontSize="18px" textAlign="center">
            No data
          </Typography>
        </UI.Center>
      )}
      <TablePagination
        component="div"
        count={customersCount}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />

      <DeleteCustomerModal
        open={openDeleteModal}
        selectedIds={selectedCustomers}
        customers={customers}
        onClose={() => {
          setOpenDeleteModal(false);
        }}
      />
    </div>
  );
};

export default CustomerListTable;
