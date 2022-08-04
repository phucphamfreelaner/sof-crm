import React from "react";
import { useNavigate } from "react-router-dom";
import * as UI from "@/libs/ui";
import { AiFillPlusCircle } from "react-icons/ai";
import BaoGiaTable from "@/container/BaoGiaTable";
import BaoGiaFilter from "@/container/BaoGiaFilter";
import { debounce, isEmpty } from "lodash-es";

function BaoGiaList() {
  const navigate = useNavigate();
  const [filter, setFilter] = React.useState<any>(null);
  const [key, setKey] = React.useState<any>(null);

  const handleFilterChange = debounce(setFilter, 500);

  return (
    <UI.Box>
      <UI.Grid sx={{ py: 1 }} container justifyContent="space-between">
        <UI.Grid item>
          <UI.Typography variant="h4">Báo giá</UI.Typography>
        </UI.Grid>
        <UI.Grid item>
          <UI.Button
            size="small"
            startIcon={<AiFillPlusCircle fontSize="small" />}
            variant="contained"
            onClick={() => {
              navigate(`/bao_gia/new?customerId=1`);
            }}
          >
            Thêm mới
          </UI.Button>
        </UI.Grid>
      </UI.Grid>

      <UI.Card>
        <UI.CKBox paddingTop="26px" paddingX="24px" paddingBottom="4px">
          <BaoGiaFilter
            key={key}
            onReload={() => {
              setFilter(null);
              setKey((s) => s + 1);
            }}
            onWatchChange={(filterData) => {
              handleFilterChange({
                code: filterData?.code,
                customer_id: filterData?.customer_id?.value,
                loai_tien_key: filterData?.loai_tien_key?.value,
                created_by: filterData?.created_by?.value,
              });
            }}
          />
        </UI.CKBox>
        <BaoGiaTable
          onSortChange={(orderBy) => {
            setFilter((filter) => ({ ...filter, ...orderBy }));
          }}
          isShowKhachHangLink
          filter={filter}
        />
      </UI.Card>
    </UI.Box>
  );
}

export default BaoGiaList;
