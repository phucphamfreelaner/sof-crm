import CustomerCoHoiTableListContainer from "@/container/CustomerDetails/customer-co-hoi";
import React from "react";
import { useParams } from "react-router-dom";

function CoHoi() {
  const params = useParams();

  return <CustomerCoHoiTableListContainer customerId={params?.customerId} />;
}

export default CoHoi;
