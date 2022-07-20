import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as UI from "@/libs/ui";
import HopDongListContainer from "@/container/HopDongList";

function HopDong() {
  const params = useParams();

  return params?.customerId ? (
    <UI.VStack w="100%">
      <HopDongListContainer
        customerId={params?.customerId}
        isHiddenKhachHang={true}
        isHiddenSearchBar={true}
      />
    </UI.VStack>
  ) : null;
}

export default HopDong;
