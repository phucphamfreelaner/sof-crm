import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AiFillPlusCircle } from "react-icons/ai";
import BaoGiaTable from "@/container/BaoGiaTable";
import * as UI from "@/libs/ui";

function BaoGia() {
  const params = useParams();
  const navigate = useNavigate();

  return params?.customerId ? (
    <UI.VStack w="100%">
      <UI.HStack pb="14px" w="100%" justifyContent="flex-end">
        <UI.Button
          onClick={() =>
            navigate(`/bao_gia/new?customerId=${params?.customerId}`)
          }
          size="small"
          startIcon={<AiFillPlusCircle fontSize="small" />}
          variant="contained"
        >
          Thêm mới
        </UI.Button>
      </UI.HStack>
      <BaoGiaTable customerId={params?.customerId} />
    </UI.VStack>
  ) : null;
}

export default BaoGia;
