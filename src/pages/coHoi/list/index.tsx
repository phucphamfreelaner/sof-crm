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
    <UI.Box>
      <UI.Grid
        sx={{ mb: 4 }}
        container
        justifyContent="space-between"
        spacing={3}
      >
        <UI.Grid item>
          <UI.Typography variant="h4">Cơ Hội</UI.Typography>
        </UI.Grid>
      </UI.Grid>

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
