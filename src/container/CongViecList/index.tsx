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
import { useGetListNhanVienQuery } from "@/store/nhanVien";

interface INhiemVuList {
  listNhiemVuData?: any;
  isLoadingListNhiemVu?: boolean;
  refetchListNhiemVu?: () => any;
  onEditNhiemVu?: (data: any) => any;
  onChangeTrangThai?: () => any;
}

function CongViecList(props: INhiemVuList) {
  const {
    listNhiemVuData,
    isLoadingListNhiemVu,
    refetchListNhiemVu,
    onEditNhiemVu,
    onChangeTrangThai,
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

  const [updateNhiemVu, { isLoading: isLoadingUpdateNhiemVu }] =
    useLazyPutNhiemVuByIdQuery();

  const [searchTrangThaiNhiemVu, { data: trangThaiNhiemVuData }] =
    useLazyGetTrangThaiNhiemVuQuery();

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
    updateNhiemVu({ id: data?.id, payload }).finally(() => {
      refetchListNhiemVu();
      onChangeTrangThai();
    });
  };

  React.useEffect(() => {
    searchTrangThaiNhiemVu({});
  }, []);

  console.log(nhanVienData);

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
                      {nhanVienData?.[x?.nv_giao_id]
                        ? getInitials(nhanVienData?.[x?.nv_giao_id])
                        : "N/A"}
                    </UI.Avatar>
                    <UI.Box>
                      <UI.HStack>
                        {getDiffTime(x?.ngaybatdau)}{" "}
                        <UI.Typography variant="subtitle2">
                          Cần làm for <b>{nhanVienData?.[x?.nv_giao_id]}</b>
                        </UI.Typography>
                      </UI.HStack>
                      <UI.HStack>
                        <UI.Chip
                          sx={{ fontSize: 12 }}
                          label={
                            trangThaiNhiemVuData?.[x?.trangthai]
                              ? trangThaiNhiemVuData?.[x?.trangthai]
                              : "Chưa set trạng thái"
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
