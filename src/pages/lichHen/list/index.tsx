import React from "react";
import { useNavigate } from "react-router-dom";
import * as UI from "@/libs/ui";
import {
  AiFillPlusCircle,
  AiOutlineUpload,
  AiOutlineDownload,
  AiOutlineUser,
} from "react-icons/ai";
import LichHenTable from "@/container/LichHenTable";
import { debounce, isEmpty } from "lodash-es";

function LichHenList() {
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
          <UI.Typography variant="h4">Lịch Hẹn</UI.Typography>
        </UI.Grid>
        <UI.Grid item>
          <UI.Button
            size="small"
            startIcon={<AiFillPlusCircle fontSize="small" />}
            variant="contained"
          >
            Thêm mới
          </UI.Button>
        </UI.Grid>
      </UI.Grid>

      <UI.Card>
        <UI.Divider />
        <UI.CardContent>
          <LichHenTable
            onSortChange={(orderBy) => {
              setFilter((filter) => ({ ...filter, ...orderBy }));
            }}
            filter={filter}
          />
        </UI.CardContent>
      </UI.Card>
    </UI.Box>
  );
}

export default LichHenList;
