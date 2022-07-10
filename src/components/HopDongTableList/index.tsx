import { useEffect, useState } from "react";
import * as UI from "@/libs/ui";
import { Scrollbar } from "@/components/ScrollBar";
import Empty from "@/assets/images/no-data.png";
import { MdCancel } from "react-icons/md";
import { AiFillCheckCircle } from "react-icons/ai";
import { format } from "date-fns";
import { isEmpty } from "lodash";
import { useNavigate } from "react-router-dom";
//import DeleteHopDongModal from "@/modal/DeleteHopDongModal";

const HopDongListTable = (props) => {
  const {
    hopDongList,
    hopDongListCount,
    onPageChange,
    onRowsPerPageChange,
    page,
    rowsPerPage,
    refetch,
    ...other
  } = props;
  const [selectedHopDongs, setSelectedHopDongs] = useState([]);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const navigate = useNavigate();

  // Reset selected hopDongList when hopDongList change
  useEffect(
    () => {
      if (selectedHopDongs.length) {
        setSelectedHopDongs([]);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [hopDongList]
  );

  const handleSelectAllHopDongs = (event) => {
    setSelectedHopDongs(
      event.target.checked ? hopDongList.map((hopDong) => hopDong?.id) : []
    );
  };

  const handleSelectOneHopDong = (event, hopDongId) => {
    if (!selectedHopDongs.includes(hopDongId)) {
      setSelectedHopDongs((prevSelected) => [...prevSelected, hopDongId]);
    } else {
      setSelectedHopDongs((prevSelected) =>
        prevSelected.filter((id) => id !== hopDongId)
      );
    }
  };

  const enableBulkActions = selectedHopDongs.length > 0;
  const selectedSomeHopDongs =
    selectedHopDongs.length > 0 && selectedHopDongs.length < hopDongList.length;
  const selectedAllHopDongs = selectedHopDongs.length === hopDongList.length;

  return (
    <div {...other}>
      <UI.Box
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? "neutral.800" : "neutral.100",
          display: enableBulkActions ? "block" : "none",
          px: 2,
          py: 0.5,
        }}
      >
        <UI.Checkbox
          checked={selectedAllHopDongs}
          indeterminate={selectedSomeHopDongs}
          onChange={handleSelectAllHopDongs}
        />
        <UI.Button
          size="small"
          sx={{ ml: 2 }}
          onClick={() => {
            setOpenDeleteModal(true);
          }}
        >
          Delete
        </UI.Button>
        <UI.Button
          size="small"
          sx={{ ml: 2 }}
          disabled={selectedHopDongs.length !== 1}
          onClick={() => {
            navigate(`/khach_hang/${selectedHopDongs?.[0]}`);
          }}
        >
          Edit
        </UI.Button>
      </UI.Box>
      <Scrollbar>
        <UI.Table sx={{ minWidth: 700 }}>
          <UI.TableHead
            sx={{ visibility: enableBulkActions ? "collapse" : "visible" }}
          >
            <UI.TableRow>
              <UI.TableCell padding="checkbox">
                <UI.Checkbox
                  checked={selectedAllHopDongs}
                  indeterminate={selectedSomeHopDongs}
                  onChange={handleSelectAllHopDongs}
                />
              </UI.TableCell>
              <UI.TableCell>Số HĐ</UI.TableCell>
              <UI.TableCell>Tiêu Đề</UI.TableCell>
              <UI.TableCell>Loại HĐ</UI.TableCell>
              <UI.TableCell>Còn Lại</UI.TableCell>
              <UI.TableCell>Đã Thu</UI.TableCell>
              <UI.TableCell>Tiền Gốc</UI.TableCell>
              <UI.TableCell>Tiền Hàng</UI.TableCell>
              <UI.TableCell>VAT</UI.TableCell>
              <UI.TableCell>Tổng Tiền</UI.TableCell>
              <UI.TableCell>Kinh Doanh</UI.TableCell>
              <UI.TableCell>Ngày Nhập</UI.TableCell>
              <UI.TableCell>Điện Thoại</UI.TableCell>
              <UI.TableCell>Ngày Ký</UI.TableCell>
              <UI.TableCell>Tiến Trình (Cơ Hội)</UI.TableCell>
            </UI.TableRow>
          </UI.TableHead>
          <UI.TableBody>
            {hopDongList &&
              hopDongList.map((hopDong) => {
                const isHopDongSelected = selectedHopDongs.includes(
                  hopDong?.id
                );

                return (
                  <UI.TableRow
                    hover
                    key={hopDong?.id}
                    selected={isHopDongSelected}
                    onClick={() => {
                      navigate(`/hop_dong/${hopDong?.id}`);
                    }}
                    sx={{
                      cursor: "pointer",
                      tabIndex: -1,
                    }}
                  >
                    <UI.TableCell
                      padding="checkbox"
                      onClick={(event) => event.stopPropagation()}
                    >
                      <UI.Checkbox
                        checked={isHopDongSelected}
                        onChange={(event) => {
                          handleSelectOneHopDong(event, hopDong?.id);
                        }}
                        value={isHopDongSelected}
                      />
                    </UI.TableCell>
                    <UI.TableCell>{hopDong?.code}</UI.TableCell>
                    <UI.TableCell>{hopDong?.name}</UI.TableCell>
                    <UI.TableCell>{hopDong?.loai_hop_dong?.name}</UI.TableCell>
                    <UI.TableCell>{hopDong?.so_tien_con_lai}</UI.TableCell>
                    <UI.TableCell>{hopDong?.so_tien_da_thu}</UI.TableCell>
                    <UI.TableCell>{hopDong?.thanh_tien_goc}</UI.TableCell>
                    <UI.TableCell>{hopDong?.tong_tien}</UI.TableCell>
                    <UI.TableCell>
                      <UI.Center>
                        {hopDong?.vat === 0 ? (
                          <MdCancel color={"red"} fontSize={"25px"} />
                        ) : (
                          <AiFillCheckCircle
                            color={"green"}
                            fontSize={"25px"}
                          />
                        )}
                      </UI.Center>
                    </UI.TableCell>
                    <UI.TableCell>{hopDong?.tong_tien_vat}</UI.TableCell>
                    <UI.TableCell>{hopDong?.nhan_vien_tao?.name}</UI.TableCell>
                    <UI.TableCell sx={{ width: "150px" }}>
                      {hopDong?.created_at
                        ? format(new Date(hopDong?.created_at), "dd MMM yyyy")
                        : undefined}
                    </UI.TableCell>
                    <UI.TableCell>{hopDong?.khach_hang?.phone}</UI.TableCell>
                    <UI.TableCell sx={{ width: "150px" }}>
                      {hopDong?.created_at
                        ? format(new Date(hopDong?.created_at), "dd MMM yyyy")
                        : undefined}
                    </UI.TableCell>

                    <UI.TableCell>
                      {
                        hopDong?.bao_gia_co_hoi_tien_trinh?.co_hoi?.tien_trinh
                          ?.name
                      }
                    </UI.TableCell>
                  </UI.TableRow>
                );
              })}
          </UI.TableBody>
        </UI.Table>
      </Scrollbar>
      {isEmpty(hopDongList) && (
        <UI.Center width={"full"} mt={20}>
          <img width="90px" src={Empty} />
          <UI.Typography color="#8996a3" fontSize="18px" textAlign="center">
            No data
          </UI.Typography>
        </UI.Center>
      )}
      <UI.TablePagination
        component="div"
        count={hopDongListCount}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />

      {/* <DeleteHopDongModal
        open={openDeleteModal}
        selectedIds={selectedHopDongs}
        hopDongList={hopDongList}
        onClose={() => {
          setOpenDeleteModal(false);
        }}
        refetch={refetch}
      /> */}
    </div>
  );
};

export default HopDongListTable;
