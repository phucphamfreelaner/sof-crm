import React from "react";
import * as UI from "@/libs/ui";
import {
  AiOutlineEdit,
  AiOutlineSave,
  AiOutlineDownCircle,
  AiOutlineCloseCircle,
} from "react-icons/ai";
import { useBoolean } from "ahooks";

interface IDetailInfo {
  id?: string;
  title?: string;
  editContent?: React.ReactNode;
  detailContent?: React.ReactNode;
  onSave?: () => any;
}
function DetailInfo(props: IDetailInfo) {
  const { id, title, editContent, detailContent, onSave } = props;
  const [isOpen, setOpen] = useBoolean(false);
  return (
    <>
      <UI.Box mb={4}>
        <UI.HStack justifyContent="space-between" spacing={3}>
          <UI.CKBox
            sx={{
              alignItems: "center",
              display: "flex",
              overflow: "hidden",
            }}
          >
            <div>
              <UI.Typography sx={{ textTransform: "uppercase" }} variant="h5">
                {title}
              </UI.Typography>
              <UI.Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <UI.Typography variant="subtitle2">Mã ID:</UI.Typography>
                <UI.Chip label={id} size="small" sx={{ ml: 1 }} />
              </UI.Box>
            </div>
          </UI.CKBox>
          <UI.HStack alignItems="flex-end" justifyContent="flex-end" w="50%">
            <UI.LoadingButton
              loadingPosition="end"
              form="co-hoi-details"
              type="submit"
              endIcon={isOpen ? <AiOutlineCloseCircle /> : <AiOutlineEdit />}
              variant="outlined"
              onClick={setOpen.toggle}
              color={isOpen ? "error" : "primary"}
            >
              {isOpen ? "Cancel" : "Edit"}
            </UI.LoadingButton>

            <UI.Button
              endIcon={<AiOutlineDownCircle fontSize="small" />}
              sx={{ m: 1 }}
              variant="contained"
            >
              Actions
            </UI.Button>
          </UI.HStack>
        </UI.HStack>
      </UI.Box>
      <UI.Divider />
      <UI.Box sx={{ mt: 3 }}>
        <UI.Grid container spacing={3}>
          <UI.Grid item xs={12}>
            <UI.Collapse in={!isOpen}>{detailContent}</UI.Collapse>
            <UI.Collapse in={isOpen}>{editContent}</UI.Collapse>
          </UI.Grid>
        </UI.Grid>
      </UI.Box>
    </>
  );
}

export default DetailInfo;
