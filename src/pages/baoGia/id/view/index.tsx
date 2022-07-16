import React from "react";
import { useParams } from "react-router-dom";
import { useGetViewBaoGiaQuery } from "@/store/baoGia";
import * as UI from "@/libs/ui";

export default function View() {
  const params = useParams();

  const { data, isLoading } = useGetViewBaoGiaQuery(
    { id: params?.id },
    { skip: !params?.id }
  );

  return (
    <UI.Card elevation={5}>
      <UI.CardHeader title="Mẫu in báo giá" />
      <UI.Divider />
      {isLoading ? (
        <UI.Center minH="200px" w="100%">
          <UI.CircularProgress />
        </UI.Center>
      ) : (
        <UI.CardContent>
          {data && <UI.CKBox dangerouslySetInnerHTML={{ __html: data }} />}
        </UI.CardContent>
      )}
    </UI.Card>
  );
}
