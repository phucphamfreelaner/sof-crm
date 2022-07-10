import React from "react";

interface IBaoGiaTable {
  filter?: any;
}

function BaoGiaTable(props: IBaoGiaTable) {
  const { filter } = props;
  return <div>BaoGiaTable</div>;
}

export default BaoGiaTable;
