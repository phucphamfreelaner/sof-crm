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

const CohoiListTable = (props) => {
  const {
    cohois,
    cohoisCount,
    onPageChange,
    onRowsPerPageChange,
    page,
    rowsPerPage,
    ...other
  } = props;
  const [selectedCohois, setSelectedCohois] = useState([]);

  const navigate = useNavigate();

  // Reset selected cohois when cohois change
  useEffect(
    () => {
      if (selectedCohois.length) {
        setSelectedCohois([]);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cohois]
  );

  const handleSelectAllCohois = (event) => {
    setSelectedCohois(
      event.target.checked ? cohois.map((cohoi) => cohoi?.id) : []
    );
  };

  const handleSelectOneCohoi = (event, cohoiId) => {
    if (!selectedCohois.includes(cohoiId)) {
      setSelectedCohois((prevSelected) => [...prevSelected, cohoiId]);
    } else {
      setSelectedCohois((prevSelected) =>
        prevSelected.filter((id) => id !== cohoiId)
      );
    }
  };

  const enableBulkActions = selectedCohois.length > 0;
  const selectedSomeCohois =
    selectedCohois.length > 0 && selectedCohois.length < cohois.length;
  const selectedAllCohois = selectedCohois.length === cohois.length;

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
          checked={selectedAllCohois}
          indeterminate={selectedSomeCohois}
          onChange={handleSelectAllCohois}
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
                  checked={selectedAllCohois}
                  indeterminate={selectedSomeCohois}
                  onChange={handleSelectAllCohois}
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
            {cohois &&
              cohois.map((cohoi) => {
                const isCohoiSelected = selectedCohois.includes(cohoi?.id);

                return (
                  <TableRow
                    hover
                    key={cohoi?.id}
                    selected={isCohoiSelected}
                    onClick={() => {
                      navigate(
                        `/khach_hang/${cohoi.khach_hang?.id}?tab=co-hoi`
                      );
                    }}
                    sx={{
                      cursor: "pointer",
                      tabIndex: -1,
                    }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isCohoiSelected}
                        onChange={(event) =>
                          handleSelectOneCohoi(event, cohoi?.id)
                        }
                        value={isCohoiSelected}
                      />
                    </TableCell>

                    <TableCell>{cohoi?.code}</TableCell>

                    <TableCell>{cohoi?.name}</TableCell>

                    <TableCell>{cohoi?.khach_hang?.phone}</TableCell>

                    <TableCell>{cohoi?.khach_hang?.email}</TableCell>

                    <TableCell>{cohoi?.trang_thai?.name}</TableCell>

                    <TableCell>{cohoi?.tien_trinh?.name}</TableCell>

                    <TableCell>{cohoi?.nhan_vien_tao?.name}</TableCell>

                    <TableCell sx={{ width: "150px" }}>
                      {cohoi?.created_at
                        ? format(new Date(cohoi?.created_at), "dd MMM yyyy")
                        : undefined}
                    </TableCell>

                    <TableCell>{cohoi?.note}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </Scrollbar>
      {isEmpty(cohois) && (
        <UI.Center width={"full"} mt={20}>
          <img width="90px" src={Empty} />
          <Typography color="#8996a3" fontSize="18px" textAlign="center">
            No data
          </Typography>
        </UI.Center>
      )}
      <TablePagination
        component="div"
        count={cohoisCount}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </div>
  );
};

export default CohoiListTable;
