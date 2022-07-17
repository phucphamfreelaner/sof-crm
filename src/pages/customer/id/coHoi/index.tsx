import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AiFillPlusCircle } from "react-icons/ai";
import CoHoiTable from "@/container/CoHoiTable";
import * as UI from "@/libs/ui";

function CoHoi() {
  const params = useParams();
  const navigate = useNavigate();

  return params?.customerId ? (
    <UI.VStack w="100%">
      <UI.HStack pb="14px" w="100%" justifyContent="flex-end">
        <UI.Button
          onClick={() =>
            navigate(`/co_hoi/new?customerId=${params?.customerId}`)
          }
          size="small"
          startIcon={<AiFillPlusCircle fontSize="small" />}
          variant="contained"
        >
          Thêm mới
        </UI.Button>
      </UI.HStack>
      <CoHoiTable customerId={params?.customerId} />
    </UI.VStack>
  ) : null;
}

export default CoHoi;
