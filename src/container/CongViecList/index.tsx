import React from "react";
import * as UI from "@/libs/ui";
import Loading from "@/components/Loading";
import viLocale from "date-fns/locale/vi";
import { formatDistance, differenceInDays } from "date-fns";
import { TiTick } from "react-icons/ti";
import { RiPencilFill } from "react-icons/ri";
import { MdOutlineCancel } from "react-icons/md";
import {
  useLazyPutNhiemVuByIdQuery,
  useLazyGetTrangThaiNhiemVuQuery,
} from "@/store/nhiemVu";

interface INhiemVuList {
  listNhiemVuData?: any;
  isLoadingListNhiemVu?: boolean;
  refetchListNhiemVu?: () => any;
  onEditNhiemVu?: (data: any) => any;
}

function CongViecList(props: INhiemVuList) {
  const {
    listNhiemVuData,
    isLoadingListNhiemVu,
    refetchListNhiemVu,
    onEditNhiemVu,
  } = props;
  const getDiffTime = (start, end) => {
    const dateDiff = differenceInDays(new Date(start), new Date(end));
    const dateDiffStr = formatDistance(new Date(start), new Date(end), {
      locale: viLocale,
      addSuffix: true,
    });
    if (dateDiff < 0)
      return <UI.Typography color="red">{dateDiffStr}</UI.Typography>;
    else if (dateDiff === 0)
      return <UI.Typography color="#b49b78">{dateDiffStr}</UI.Typography>;
    else return <UI.Typography color="#309a4b">{dateDiffStr}</UI.Typography>;
  };

  const [updateNhiemVu, { isLoading: isLoadingUpdateNhiemVu }] =
    useLazyPutNhiemVuByIdQuery();

  const [searchTrangThaiNhiemVu, { data: trangThaiNhiemVuData }] =
    useLazyGetTrangThaiNhiemVuQuery();

  const handleChangeTrangThai = (data, status) => {
    const payload = {
      ...data,
      trangthai: status,
    };
    updateNhiemVu({ id: data?.id, payload }).finally(() => {
      refetchListNhiemVu();
    });
  };

  React.useEffect(() => {
    searchTrangThaiNhiemVu({});
  }, []);

  return (
    <>
      {isLoadingListNhiemVu ? (
        <Loading />
      ) : (
        <UI.VStack alignItems={"start"} mt={2}>
          {listNhiemVuData &&
            listNhiemVuData?.map((x: any) => {
              return (
                <UI.VStack key={x?.id} mb={"10px"}>
                  <UI.HStack justifyContent={"start"}>
                    <UI.Avatar
                      sx={{
                        height: 32,
                        mr: 2,
                        width: 32,
                        backgroundColor: "#283da9",
                      }}
                      src=""
                    >
                      {"AD"}
                    </UI.Avatar>
                    <UI.Box>
                      <UI.HStack>
                        {getDiffTime(x?.ngayketthuc, x?.ngaybatdau)}{" "}
                        <UI.Typography>Cần làm for Admin</UI.Typography>
                      </UI.HStack>
                      <UI.HStack>
                        <UI.Chip
                          label={
                            trangThaiNhiemVuData
                              ? trangThaiNhiemVuData?.[x?.trangthai]
                              : x?.trangthai
                          }
                          size="small"
                        />
                        {x?.ten && (
                          <UI.Typography variant="subtitle2">
                            {x?.ten.substring(0, 30)}
                            {x?.ten?.length > 30 ? "..." : ""}
                          </UI.Typography>
                        )}
                      </UI.HStack>
                      <UI.HStack spacing={"20px"}>
                        <UI.IconButton
                          disabled={x?.trangthai === "da-hoan-thanh"}
                          size={"small"}
                          sx={{ cursor: "pointer" }}
                          onClick={() =>
                            handleChangeTrangThai(x, "da-hoan-thanh")
                          }
                        >
                          <TiTick />
                          <UI.Typography ml={1} variant="subtitle2">
                            Hoàn tất
                          </UI.Typography>
                        </UI.IconButton>
                        <UI.IconButton
                          size={"small"}
                          sx={{ cursor: "pointer" }}
                          onClick={() => onEditNhiemVu(x)}
                        >
                          <RiPencilFill />
                          <UI.Typography ml={1} variant="subtitle2">
                            Sửa
                          </UI.Typography>
                        </UI.IconButton>
                        <UI.IconButton
                          disabled={x?.trangthai === "da-huy-nhiem-vu"}
                          size={"small"}
                          sx={{ cursor: "pointer" }}
                          onClick={() =>
                            handleChangeTrangThai(x, "da-huy-nhiem-vu")
                          }
                        >
                          <MdOutlineCancel />
                          <UI.Typography ml={1} variant="subtitle2">
                            Huỷ
                          </UI.Typography>
                        </UI.IconButton>
                      </UI.HStack>
                    </UI.Box>
                  </UI.HStack>
                </UI.VStack>
              );
            })}
        </UI.VStack>
      )}
      {/* <UI.CardActions sx={{ justifyContent: "flex-end" }}>
        <LoadingButton
          loading={isLoadingCreateNhiemVu || isLoadingUpdateNhiemVu}
          onClick={() =>
            elList.current.handleSubmit((listNhiemVuData) => handleSaveNhiemVu(listNhiemVuData, id))()
          }
          endIcon={<FaSave />}
          variant="outlined"
          size='small'
        >
          {id ? "Cập nhật nhiệm vụ" : "Lưu nhiệm vụ"}
        </LoadingButton>
      </UI.CardActions> */}
    </>
  );
}

export default CongViecList;
