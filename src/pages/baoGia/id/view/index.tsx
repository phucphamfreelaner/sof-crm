import React from "react";
import { useParams } from "react-router-dom";
import { useGetViewBaoGiaQuery } from "@/store/baoGia";
import * as UI from "@/libs/ui";

export default function View() {
  const params = useParams();
  console.log("🚀 ~ params", params);

  const { data } = useGetViewBaoGiaQuery(
    { id: params?.id },
    { skip: !params?.id }
  );
  console.log("🚀 ~ data", data);

  return (
    <UI.Card elevation={5}>
      <UI.CardHeader title="Mẫu báo giá" />
      <UI.CardContent>
        {data && <UI.CKBox dangerouslySetInnerHTML={{ __html: data }} />}
      </UI.CardContent>
    </UI.Card>
  );
}
