import React from "react";
import { useNavigate } from "react-router-dom";
import * as UI from "@/libs/ui";
import { AiFillPlusCircle } from "react-icons/ai";
import { debounce } from "lodash-es";
import CoHoiFilter from "@/container/CoHoiFilter";
import CoHoiTable from "@/container/CoHoiTable";

function CoHoiList() {
  const navigate = useNavigate();
  const [filter, setFilter] = React.useState<any>(null);
  const [key, setKey] = React.useState<any>(null);

  const handleFilterChange = debounce(setFilter, 500);

  return (
    <UI.Box sx={{ px: 3 }}>
      <UI.Grid sx={{ mb: 1 }} container justifyContent="space-between">
        <UI.Grid item>
          <UI.Typography variant="h4">Cơ Hội</UI.Typography>
        </UI.Grid>
      </UI.Grid>

      <UI.Card>
        <UI.Box>
          <UI.CKBox paddingTop="26px" paddingX="24px">
            <CoHoiFilter
              key={key}
              onReload={() => {
                setFilter(null);
                setKey((s) => s + 1);
              }}
              onWatchChange={(filterData) => {
                handleFilterChange({
                  name: filterData?.name,
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
          </UI.CKBox>
          <CoHoiTable
            onSortChange={(orderBy) => {
              setFilter((filter) => ({ ...filter, ...orderBy }));
            }}
            isShowKhachHangLink
            filter={filter}
          />
        </UI.Box>
      </UI.Card>
    </UI.Box>
  );
}

export default CoHoiList;
