import React from "react";
import BottomWindow from "@/components/BottomWindow";
import { useAppSelector, useAppDispatch } from "@/store";
import { closeModalBottom } from "@/store/modal";

function ModalProvider(props: any) {
  const dispatch = useAppDispatch();
  const modalsBottom = useAppSelector((s) => s.modal.modalsBottom);
  return (
    <>
      <BottomWindow
        onCloseWindow={(id) => dispatch(closeModalBottom({ id }))}
        modals={modalsBottom}
      />
    </>
  );
}

export default ModalProvider;
