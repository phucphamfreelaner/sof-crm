import React from "react";
import { useParams } from "react-router-dom";
import { useGetViewBaoGiaQuery } from "@/store/baoGia";
import { AiOutlinePrinter } from "react-icons/ai";

import * as UI from "@/libs/ui";

export default function View() {
  const params = useParams();

  const { data, isLoading } = useGetViewBaoGiaQuery(
    { id: params?.id },
    { skip: !params?.id }
  );

  const handlePrintNewTab = () => {
    var uri = "data:text/html," + encodeURIComponent(data);
    var newWindow = window.open(uri);
    newWindow.document.write(data);
    newWindow.focus();
    newWindow.print();
  };

  return (
    <UI.Card elevation={5}>
      <UI.CardHeader
        title={
          <UI.HStack justifyContent="space-between" w="100%">
            <UI.Typography variant="h6">Xem trước mẫu in</UI.Typography>
            <UI.Button
              onClick={handlePrintNewTab}
              startIcon={<AiOutlinePrinter />}
              variant="outlined"
            >
              In
            </UI.Button>
          </UI.HStack>
        }
      />
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
