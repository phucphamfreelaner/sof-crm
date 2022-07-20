import React, { useEffect, useState } from "react";
import * as UI from "@/libs/ui";
import { useDeleteCustomerByIDMutation } from "@/store/customer/service";
import { useLazyGetSampleDataQuery } from "@/store/test/service";
import { ICustomer } from "@/types";
import toast from "react-hot-toast";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "1px solid #000",
  borderRadius: "15px",
  boxShadow: 24,
  p: 4,
};

interface IDeleteCustomerModal {
  open: boolean;
  onClose?: (open: boolean) => void;
  customers: ICustomer[];
  refetch?: () => any;
}
function DeleteCustomerModal(props: IDeleteCustomerModal) {
  const { open, onClose, customers, refetch } = props;
  const theme = UI.useTheme();

  const [deleteCustomer, result] = useDeleteCustomerByIDMutation();

  const handleConfirm = async () => {
    const promise = [];
    customers?.map((customer) => {
      promise.push(deleteCustomer({ id: customer?.id }));
    });
    Promise.all(promise);
    await onClose(false);
    await toast.success("Delete customer(s) successfully");
    await refetch();
  };

  return (
    <UI.Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <UI.Box sx={style}>
        <UI.Typography
          textAlign="center"
          id="modal-modal-title"
          variant="h6"
          component="h2"
        >
          Confirm Delete
        </UI.Typography>
        <UI.VStack w="100%">
          {/* <UI.Button type="button" fullWidth variant="contained">
            Log in
            </UI.Button>
            <UI.Button
            type="button"
            fullWidth
            variant="outlined"
            >
            Log out
            </UI.Button> */}
          <UI.Box sx={{ pt: 2, width: "100%" }}>
            <UI.Alert severity="info">
              <UI.Typography mb={2}>
                The following customer(s) will be deleted:
              </UI.Typography>
              {customers?.map((customer) => {
                return (
                  <UI.HStack justifyContent={"start"} alignItems={"center"}>
                    <UI.Typography width={100}>
                      <b>{customer?.code}</b>
                    </UI.Typography>
                    <UI.Typography>{customer?.contact}</UI.Typography>
                  </UI.HStack>
                );
              })}
            </UI.Alert>
            <UI.HStack
              w="100%"
              pt={theme.spacing(2)}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <UI.LoadingButton
                loading={result?.status == "pending"}
                loadingPosition="end"
                type="button"
                variant="contained"
                onClick={handleConfirm}
              >
                Confirm
              </UI.LoadingButton>
              <UI.Button
                type="button"
                variant="outlined"
                onClick={() => onClose(false)}
              >
                Cancel
              </UI.Button>
            </UI.HStack>
          </UI.Box>
        </UI.VStack>
      </UI.Box>
    </UI.Modal>
  );
}

export default DeleteCustomerModal;
