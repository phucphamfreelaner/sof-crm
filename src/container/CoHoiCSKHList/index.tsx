import * as UI from "@/libs/ui";
import Loading from "@/components/Loading";
import viLocale from "date-fns/locale/vi";
import { formatDistance, differenceInDays } from "date-fns";
import {
  MdOutlineCancel,
  MdArrowDropDown,
  MdOutlineArrowLeft,
} from "react-icons/md";
import {
  useLazyDeleteCoHoiCSKHQuery,
  useLazyPutCoHoiCSKHByIdQuery,
} from "@/store/coHoiCSKH";
import { useBoolean } from "ahooks";

interface ICoHoiCSKHList {
  listCoHoiCSKHData?: any;
  isLoadingListCoHoiCSKH?: boolean;
  refetchListCoHoiCSKH?: () => any;
  onEditCoHoiCSKH?: (data: any) => any;
}

function CoHoiCSKHList(props: ICoHoiCSKHList) {
  const {
    listCoHoiCSKHData,
    isLoadingListCoHoiCSKH,
    refetchListCoHoiCSKH,
    onEditCoHoiCSKH,
  } = props;
  const getDiffTime = (start) => {
    const dateDiff = differenceInDays(new Date(start), new Date());
    const dateDiffStr = formatDistance(new Date(start), new Date(), {
      locale: viLocale,
      addSuffix: true,
    });
    if (dateDiff < 0)
      return (
        <UI.Typography variant="subtitle2" color="red">
          <b>{dateDiffStr}</b>
        </UI.Typography>
      );
    else if (dateDiff === 0)
      return (
        <UI.Typography variant="subtitle2" color="#b49b78">
          <b>{dateDiffStr}</b>
        </UI.Typography>
      );
    else
      return (
        <UI.Typography variant="subtitle2" color="#309a4b">
          <b>{dateDiffStr}</b>
        </UI.Typography>
      );
  };

  const [updateCoHoiCSKH, { isLoading: isLoadingUpdateCoHoiCSKH }] =
    useLazyPutCoHoiCSKHByIdQuery();
  const [deleteCoHoiCSKH, { isLoading: isLoadingDeleteCoHoiCSKH }] =
    useLazyDeleteCoHoiCSKHQuery();

  // const handleChangeTrangThai = (data, status) => {
  //   const payload = {
  //     ...data,
  //     trangthai: status,
  //   };
  //   updateCoHoiCSKH({ id: data?.id, payload }).finally(() => {
  //     refetchListCoHoiCSKH();
  //   });
  // };
  const handleXoaCoHoiCSKH = (data) => {
    deleteCoHoiCSKH({ id: data?.id }).finally(() => {
      refetchListCoHoiCSKH();
    });
  };

  const [isOpen, setOpen] = useBoolean(true);

  return (
    <>
      {isLoadingListCoHoiCSKH ? (
        <Loading />
      ) : (
        <UI.VStack w="100%" alignItems={"start"} mt={2}>
          <UI.HStack
            spacing={"4px"}
            alignItems="center"
            justifyContent="center"
            w="100%"
          >
            <UI.Typography
              gutterBottom
              sx={{ fontWeight: 600, color: "gray" }}
              variant="body1"
              textAlign="center"
            >
              Chăm sóc
            </UI.Typography>
            <UI.IconButton
              sx={{ position: "relative", top: "-2px" }}
              onClick={setOpen.toggle}
              size="small"
            >
              {isOpen ? (
                <MdArrowDropDown size="28px" color="gray" />
              ) : (
                <MdOutlineArrowLeft size="28px" color="gray" />
              )}
            </UI.IconButton>
          </UI.HStack>
          <UI.Collapse sx={{ width: "100%" }} in={isOpen}>
            <UI.VStack w="100%" alignItems={"start"}>
              {listCoHoiCSKHData &&
                listCoHoiCSKHData?.map((x: any) => {
                  return (
                    <UI.VStack
                      alignItems="flex-start"
                      w="100%"
                      key={x?.id}
                      mb={"10px"}
                    >
                      <UI.HStack w="100%" alignItems={"flex-start"}>
                        <UI.Avatar
                          sx={{
                            height: 32,
                            mr: 2,
                            width: 32,
                            backgroundColor: "#283da9",
                          }}
                          src=""
                        >
                          AD
                        </UI.Avatar>
                        <UI.HStack justifyContent="space-between" w="100%">
                          <UI.CKBox>
                            <UI.CKBox>{getDiffTime(x?.created_at)} </UI.CKBox>
                            <UI.CKBox
                              sx={{ p: { padding: 0, margin: 0 } }}
                              dangerouslySetInnerHTML={{ __html: x?.noi_dung }}
                            ></UI.CKBox>
                          </UI.CKBox>

                          <UI.Button
                            size={"small"}
                            sx={{ cursor: "pointer" }}
                            onClick={() => handleXoaCoHoiCSKH(x)}
                            startIcon={<MdOutlineCancel />}
                          >
                            Xoá
                          </UI.Button>
                        </UI.HStack>
                      </UI.HStack>
                    </UI.VStack>
                  );
                })}
            </UI.VStack>
          </UI.Collapse>
        </UI.VStack>
      )}
    </>
  );
}

export default CoHoiCSKHList;
