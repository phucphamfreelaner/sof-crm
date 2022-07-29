import React from "react";
import * as UI from "@/libs/ui";
import Loading from "@/components/Loading";
import viLocale from "date-fns/locale/vi";
import { formatDistance, differenceInDays } from "date-fns";
import { TiTick } from "react-icons/ti";
import { RiPencilFill } from "react-icons/ri";
import {
  MdOutlineCancel,
  MdArrowDropDown,
  MdOutlineArrowLeft,
} from "react-icons/md";
import {
  useLazyDeleteCoHoiCSKHQuery,
  useLazyPutCoHoiCSKHByIdQuery,
} from "@/store/coHoiCSKH";
import { useGetListNhanVienQuery } from "@/store/nhanVien";
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

  const getInitials = (name = "") =>
    name
      .replace(/\s+/, " ")
      .split(" ")
      .slice(0, 2)
      .map((v) => v && v[0].toUpperCase())
      .join("");

  const { data: nhanVienData } = useGetListNhanVienQuery({});

  const handleChangeTrangThai = (data, status) => {
    const payload = {
      ...data,
      trangthai: status,
    };
    updateCoHoiCSKH({ id: data?.id, payload }).finally(() => {
      refetchListCoHoiCSKH();
    });
  };
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
        <UI.VStack alignItems={"start"} mt={2}>
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
              Cơ hội chăm sóc khách hàng
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
          <UI.Collapse in={isOpen}>
            <UI.VStack alignItems={"start"}>
              {listCoHoiCSKHData &&
                listCoHoiCSKHData?.map((x: any) => {
                  return (
                    <UI.VStack key={x?.id} mb={"10px"}>
                      <UI.HStack justifyContent={"flex-start"}>
                        <UI.Avatar
                          sx={{
                            height: 32,
                            mr: 2,
                            width: 32,
                            backgroundColor: "#283da9",
                          }}
                          src=""
                        >
                          {"A"}
                        </UI.Avatar>
                        <UI.Box>
                          <UI.HStack>
                            {getDiffTime(x?.created_at)}{" "}
                            <UI.Typography variant="subtitle2">
                              {x?.noi_dung}
                            </UI.Typography>
                          </UI.HStack>
                          <UI.HStack>
                            <UI.Chip
                              sx={{ fontSize: 12 }}
                              label={
                                x?.active === 0
                                  ? "Chưa chăm sóc"
                                  : "Đã chăm sóc"
                              }
                              size="small"
                            />
                          </UI.HStack>
                          <UI.HStack spacing={"20px"}>
                            <UI.IconButton
                              disabled={x?.active == 1}
                              size={"small"}
                              sx={{ cursor: "pointer" }}
                              onClick={() => handleChangeTrangThai(x, 0)}
                            >
                              <TiTick />
                              <UI.Typography ml={1} variant="subtitle2">
                                Đã chăm sóc
                              </UI.Typography>
                            </UI.IconButton>
                            <UI.IconButton
                              size={"small"}
                              sx={{ cursor: "pointer" }}
                              onClick={() => onEditCoHoiCSKH(x)}
                            >
                              <RiPencilFill />
                              <UI.Typography ml={1} variant="subtitle2">
                                Sửa
                              </UI.Typography>
                            </UI.IconButton>
                            <UI.IconButton
                              size={"small"}
                              sx={{ cursor: "pointer" }}
                              onClick={() => handleXoaCoHoiCSKH(x)}
                            >
                              <MdOutlineCancel />
                              <UI.Typography ml={1} variant="subtitle2">
                                Xoá
                              </UI.Typography>
                            </UI.IconButton>
                          </UI.HStack>
                        </UI.Box>
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
