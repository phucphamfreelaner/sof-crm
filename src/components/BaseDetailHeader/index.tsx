import React from "react";
import * as UI from "@/libs/ui";
import { MdNavigateNext } from "react-icons/md";

interface IBaseDetailHeader {
  breadcrumbs?: React.ReactNode;
}

function BaseDetailHeader(props: IBaseDetailHeader) {
  const { breadcrumbs } = props;
  return (
    <UI.HStack py="4px" px="16px" w="100%">
      <UI.Breadcrumbs
        separator={<MdNavigateNext size="20px" />}
        aria-label="breadcrumb"
      >
        {breadcrumbs}
      </UI.Breadcrumbs>
    </UI.HStack>
  );
}

export default BaseDetailHeader;
