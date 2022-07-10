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
import { format } from "date-fns";
import { isEmpty } from "lodash";
import { useNavigate } from "react-router-dom";

const CoHoiTableList = (props) => {
  const {
    nextUrl,
    coHois,
    coHoisCount,
    onPageChange,
    onRowsPerPageChange,
    page,
    rowsPerPage,
    ...other
  } = props;
  const [selectedCoHois, setSelectedCoHois] = useState([]);

  const navigate = useNavigate();

  // Reset selected coHois when coHois change
  useEffect(
    () => {
      if (selectedCoHois.length) {
        setSelectedCoHois([]);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [coHois]
  );

  const handleSelectAllCoHois = (event) => {
    setSelectedCoHois(
      event.target.checked ? coHois.map((coHoi) => coHoi?.id) : []
    );
  };

  const handleSelectOneCoHoi = (event, coHoiId) => {
    if (!selectedCoHois.includes(coHoiId)) {
      setSelectedCoHois((prevSelected) => [...prevSelected, coHoiId]);
    } else {
      setSelectedCoHois((prevSelected) =>
        prevSelected.filter((id) => id !== coHoiId)
      );
    }
  };

  const enableBulkActions = selectedCoHois.length > 0;
  const selectedSomeCoHois =
    selectedCoHois.length > 0 && selectedCoHois.length < coHois.length;
  const selectedAllCoHois = selectedCoHois.length === coHois.length;

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
          checked={selectedAllCoHois}
          indeterminate={selectedSomeCoHois}
          onChange={handleSelectAllCoHois}
        />
        <Button size="small" sx={{ ml: 2 }}>
          Delete
        </Button>
        <Button size="small" sx={{ ml: 2 }}>
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
                  checked={selectedAllCoHois}
                  indeterminate={selectedSomeCoHois}
                  onChange={handleSelectAllCoHois}
                />
              </TableCell>
              <TableCell>Mã Cơ hội</TableCell>
              <TableCell>Tên cơ hội</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Tiến trình</TableCell>
              <TableCell>Nhân viên nhập</TableCell>
              <TableCell>Ngày nhập</TableCell>
              <TableCell>Ghi chú</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {coHois &&
              coHois.map((coHoi) => {
                const isCoHoiSelected = selectedCoHois.includes(coHoi?.id);

                return (
                  <TableRow
                    hover
                    key={coHoi?.id}
                    selected={isCoHoiSelected}
                    onClick={() => {
                      if (nextUrl == "customerCoHoiList") {
                        navigate(
                          `/khach_hang/${coHoi.khach_hang?.id}?tab=co-hoi`
                        );
                      } else {
                        navigate(`/co_hoi/${coHoi.id}`);
                      }
                    }}
                    sx={{
                      cursor: "pointer",
                      tabIndex: -1,
                    }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isCoHoiSelected}
                        onChange={(event) =>
                          handleSelectOneCoHoi(event, coHoi?.id)
                        }
                        value={isCoHoiSelected}
                      />
                    </TableCell>

                    <TableCell>{coHoi?.code}</TableCell>

                    <TableCell>{coHoi?.name}</TableCell>

                    <TableCell>{coHoi?.khach_hang?.phone}</TableCell>

                    <TableCell>{coHoi?.khach_hang?.email}</TableCell>

                    <TableCell>{coHoi?.trang_thai?.name}</TableCell>

                    <TableCell>{coHoi?.tien_trinh?.name}</TableCell>

                    <TableCell>{coHoi?.nhan_vien_tao?.name}</TableCell>

                    <TableCell sx={{ width: "150px" }}>
                      {coHoi?.created_at
                        ? format(new Date(coHoi?.created_at), "dd MMM yyyy")
                        : undefined}
                    </TableCell>

                    <TableCell>{coHoi?.note}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </Scrollbar>
      {isEmpty(coHois) && (
        <UI.Center width={"full"} mt={20}>
          <img width="90px" src={Empty} />
          <Typography color="#8996a3" fontSize="18px" textAlign="center">
            No data
          </Typography>
        </UI.Center>
      )}
      <TablePagination
        component="div"
        count={coHoisCount}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </div>
  );
};

export default CoHoiTableList;
