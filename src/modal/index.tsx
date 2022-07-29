import React from "react";
import DrawerBottom from "@/components/DrawerBottom";
import { useAppSelector, useAppDispatch } from "@/store";
import { closeModalBottom } from "@/store/modal";

function ModalProvider(props: any) {
  const dispatch = useAppDispatch();
  const modalsBottom = useAppSelector((s) => s.modal.modalsBottom);
  const isShowBottomDraw = useAppSelector((s) => s.modal.isShow);
  return (
    <>
      <DrawerBottom
        modalsBottom={modalsBottom}
        composeOpen={isShowBottomDraw}
      />
    </>
  );
}

export default ModalProvider;
