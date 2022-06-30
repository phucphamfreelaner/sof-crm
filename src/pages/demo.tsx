import React from "react";
import { useGetDemoByIdQuery, useLazyGetDemoByIdQuery } from "@/store/demo";

function Demo() {
  const {
    data,
    isLoading,
    isFetching: isDemoFetching,
    refetch,
  } = useGetDemoByIdQuery({ id: "133" }, { skip: !"id" });
  const [loadDemo, { data: lazyData, isFetching }] = useLazyGetDemoByIdQuery();

  return (
    <div>
      <button onClick={refetch}>{isLoading ? "Loading" : "reload"}</button>
      <button onClick={loadDemo}>Load</button>
    </div>
  );
}

export default Demo;
