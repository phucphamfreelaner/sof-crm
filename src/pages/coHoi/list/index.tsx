import React from "react";
import { useNavigate } from "react-router-dom";
import * as UI from "@/libs/ui";
import {
  AiFillPlusCircle,
  AiOutlineUpload,
  AiOutlineDownload,
  AiOutlineUser,
} from "react-icons/ai";
import { debounce, isEmpty } from "lodash-es";
import CoHoiFilter from "@/container/CoHoiFilter";
import CoHoiTable from "@/container/CoHoiTable";

function CoHoiList() {
  const navigate = useNavigate();
  const [filter, setFilter] = React.useState<any>(null);
  const [key, setKey] = React.useState<any>(null);

  const handleFilterChange = debounce(setFilter, 500);

  return (
    <UI.Box>
      <UI.Grid container justifyContent="space-between" spacing={3}>
        <UI.Grid item>
          <UI.Typography variant="h4">Cơ Hội</UI.Typography>
        </UI.Grid>
        <UI.Grid item>
          <UI.Button
            onClick={() => navigate("/bao_gia/new")}
            size="small"
            startIcon={<AiFillPlusCircle fontSize="small" />}
            variant="contained"
          >
            Thêm mới
          </UI.Button>
        </UI.Grid>
      </UI.Grid>
      <UI.Box
        sx={{
          m: -1,
          mt: 3,
          mb: 4,
        }}
      >
        <UI.Button
          startIcon={<AiOutlineUpload fontSize="small" />}
          sx={{ m: 1 }}
        >
          Import
        </UI.Button>
        <UI.Button
          startIcon={<AiOutlineDownload fontSize="small" />}
          sx={{ m: 1 }}
        >
          Export
        </UI.Button>
      </UI.Box>
      <UI.Card>
        <UI.Divider />
        <UI.CardContent>
          <CoHoiFilter
            key={key}
            onReload={() => {
              setFilter(null);
              setKey((s) => s + 1);
            }}
            onWatchChange={(filterData) => {
              handleFilterChange({
                code: filterData?.code,
                customer_id: filterData?.customer_id?.value,
                phone: filterData?.phone,
                email: filterData?.email,
                trang_thai_key: filterData?.trang_thai_key?.value,
                tien_trinh_key: filterData?.tien_trinh_key?.value,
                nhan_vien_nhap: filterData?.nhan_vien_nhap?.value,
              });
            }}
          />
          <CoHoiTable
            onSortChange={(orderBy) => {
              setFilter((filter) => ({ ...filter, ...orderBy }));
            }}
            isShowKhachHangLink
            filter={filter}
          />
        </UI.CardContent>
      </UI.Card>
    </UI.Box>
  );
}

export default CoHoiList;
