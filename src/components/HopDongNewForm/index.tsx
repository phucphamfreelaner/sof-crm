import React from "react";
import BaseForm from "@/components/BaseForm";
import { useBoolean } from "ahooks";
import VNnum2words from "vn-num2words";
import { capitalize } from "lodash-es";

interface IHopDongNewForm {
  nhanVienData?: any;
  onSearchNhanVien?: (text: any) => any;
  isLoadingSearchNhanVien?: boolean;

  LoaiHdData?: any;
  onSearchLoaiHd?: (text: any) => any;
  isLoadingSearchLoaiHd?: boolean;

  benHdData?: any;
  onSearchBenHd?: (text: any) => any;
  isLoadingBenHd?: boolean;

  companyData?: any;
  onSearchCompany?: (text: any) => any;
  isLoadingSearchCompany?: boolean;

  coHoiData?: any;
  onSearchCoHoi?: (text: any) => any;
  isLoadingSearchCoHoi?: boolean;

  loaiBaoGiaData?: any;
  onSearchLoaiBaoGia?: (text: any) => any;
  isLoadingLoaiBaoGia?: boolean;

  ngonNguData?: any;
  onSearchNgonNgu?: (text: any) => any;
  isLoadingNgonNgu?: boolean;

  loaiTienData?: any;
  onSearchLoaiTien?: (text: any) => any;
  isLoadingLoaiTien?: boolean;

  defaultValues?: any;
  onAddSanPham?: (index: any) => any;
  onAddQuyTrinh?: (index: any) => any;

  formRef?: any;

  sanPhamData?: any;
  onSearchSanPham?: (index: any) => any;

  donViTinhData?: any;
  onSearchDonViTinh?: (index: any) => any;

  chatLieuData?: any;
  onSearchChatLieu?: (text: any) => any;

  mauInData?: any;
  onSearchMauIn?: (text: any) => any;
  isLoadingMauIn?: any;
  getSanPhamById?: (id: any) => Promise<any>;
  getChatLieuByKey?: (key: string) => Promise<any>;
  getDonViTinhByKey?: (key: string) => Promise<any>;
}

function HopDongNewForm(props: IHopDongNewForm) {
  const {
    LoaiHdData,
    isLoadingSearchLoaiHd,
    onSearchLoaiHd,

    nhanVienData,
    isLoadingSearchNhanVien,
    onSearchNhanVien,

    benHdData,
    isLoadingBenHd,
    onSearchBenHd,

    ngonNguData,
    onSearchNgonNgu,
    isLoadingNgonNgu,

    loaiTienData,
    onSearchLoaiTien,
    isLoadingLoaiTien,

    defaultValues,
    onAddSanPham,
    onAddQuyTrinh,

    sanPhamData,
    onSearchSanPham,
    chatLieuData,
    onSearchChatLieu,
    donViTinhData,
    onSearchDonViTinh,
    formRef,
    mauInData,
    onSearchMauIn,
    isLoadingMauIn,
    getSanPhamById,
    getChatLieuByKey,
    getDonViTinhByKey,
  } = props;

  const [isVAT, setIsVAT] = useBoolean(false);

  return (
    <BaseForm
      sx={{ width: "100%" }}
      templateColumns="repeat(6, 1fr)"
      gap="26px"
      defaultValues={defaultValues}
      watchFields={["vat"]}
      onWatchChange={(data) => {
        if (data?.vat) setIsVAT.setTrue();
        else setIsVAT.setFalse();
      }}
      ref={formRef}
      fields={[
        {
          name: "loai_hd_key",
          label: "Lo???i h???p ?????ng",
          type: "autocomplete",
          colSpan: 2,
          isLoading: isLoadingSearchLoaiHd,
          autocompleteOptions: LoaiHdData || [],
          onSearchChange: onSearchLoaiHd,
        },

        {
          name: "time",
          label: "S??? ng??y giao",
          type: "input",
          colSpan: 2,
        },

        {
          name: "dai_dien_id",
          label: "?????i di???n",
          type: "autocomplete",
          colSpan: 2,
          isLoading: isLoadingSearchNhanVien,
          autocompleteOptions: nhanVienData || [],
          onSearchChange: onSearchNhanVien,
        },

        {
          name: "vat",
          label: "VAT",
          type: "checkbox",
          colSpan: 1,
        },
        {
          name: "vat_phan_tram",
          label: "VAT %",
          type: "input",
          textType: "number",
          colSpan: 1,
          isDisabled: !isVAT,
        },
        {
          name: "tong_tien",
          label: "T???ng ti???n b???ng s???",
          colSpan: 2,
          type: "input-mask",
          textType: "number",
          onValueChange: (data, fromEl) => {
            const sl = capitalize(VNnum2words(fromEl.getValues("tong_tien")));
            fromEl.setValue("tong_tien_chu", `${sl} ?????ng`);
          },
        },
        {
          name: "tong_tien_chu",
          label: "T???ng ti???n b???ng ch???",
          colSpan: 2,
          type: "input",
        },
        {
          name: "loai_tien_key",
          label: "Lo???i ti???n",
          type: "autocomplete",
          colSpan: 2,
          isLoading: isLoadingLoaiTien,
          autocompleteOptions: loaiTienData || [],
          onSearchChange: onSearchLoaiTien,
        },
        {
          name: "ngon_ngu_key",
          label: "Ng??n ng???",
          type: "autocomplete",
          colSpan: 2,
          isLoading: isLoadingNgonNgu,
          autocompleteOptions: ngonNguData || [],
          onSearchChange: onSearchNgonNgu,
        },
        {
          name: "template_id",
          label: "M???u",
          type: "autocomplete",
          colSpan: 2,
          isLoading: isLoadingMauIn,
          autocompleteOptions: mauInData || [],
          onSearchChange: onSearchMauIn,
        },
        {
          name: "quy_cach_pham_chat",
          label: "Quy c??ch ph???m ch???t",
          colSpan: 3,
          multiline: true,
          type: "text-editor",
        },
        {
          name: "dia_chi_giao",
          label: "?????a ch??? giao",
          colSpan: 3,
          multiline: true,
          rows: 4,
          type: "input",
        },
        {
          name: "hinh_thuc_thanh_toan",
          label: "H??nh th???c thanh to??n",
          colSpan: 6,
          multiline: true,
          type: "radio",
          radioDirection: "row",
          radioOptions: [
            {
              label: "Nh???p tay",
              value: "nhap_tay",
            },
            {
              label: "??u ti??n %",
              value: "uu_tien_phan_tram",
            },
            {
              label: "??u ti??n gi??",
              value: "uu_tien_gi??",
            },
          ],
        },
        {
          name: "file_tmp",
          label: "Th??m File thi???t k???",
          colSpan: 3,
          multiline: true,
          type: "upload-file",
        },
        {
          name: "quy_trinh",
          label: "Quy Tr??nh Thanh To??n",
          colSpan: 6,
          type: "array-fields",
          gap: "12px",
          onAddRow: onAddQuyTrinh,
          addBtnLabel: "Th??m quy tr??nh",
          fields: [
            {
              name: "phan_tram",
              label: "Ph???n tr??m",
              type: "input",
              textType: "number",
              colSpan: 3,
            },
            {
              name: "tong_tien_dot_locate",
              label: "S??? ti???n",
              type: "input-mask",
              textType: "number",
              colSpan: 6,
              onValueChange: (data, fromEl) => {
                const sl = capitalize(
                  VNnum2words(fromEl.getValues("tong_tien_dot_locate"))
                );
                fromEl.setValue("tong_tien_chu", `${sl} ?????ng`);
              },
            },
            {
              name: "tong_tien_chu",
              label: "S??? ti???n b???ng ch???",
              type: "input",
              colSpan: 14,
            },
          ],
        },
        {
          name: "san_pham",
          colSpan: 6,
          type: "array-fields",
          gap: "12px",
          label: "S???n Ph???m",
          //onAddRow: onAddSanPham,
          //addBtnLabel: "Th??m s???n ph???m",
          fields: [
            {
              name: "product_id",
              label: "T??n s???n ph???m",
              type: "autocomplete",
              autocompleteOptions: sanPhamData,
              onSearchChange: onSearchSanPham,
              mapValueKey: "name",
              onGetDataByValue: (id) => getSanPhamById(id),
              colSpan: 3,
            },
            {
              name: "chat_lieu_key",
              label: "Ch???t li???u",
              type: "autocomplete",
              autocompleteOptions: chatLieuData,
              onSearchChange: onSearchChatLieu,
              onGetDataByValue: (key: any) => getChatLieuByKey(key),
              mapValueKey: "name",
              colSpan: 4,
            },
            {
              name: "don_vi_key",
              label: "????n v??? t??nh",
              type: "autocomplete",
              colSpan: 3,
              autocompleteOptions: donViTinhData,
              onSearchChange: onSearchDonViTinh,
              onGetDataByValue: (key: any) => getDonViTinhByKey(key),
              mapValueKey: "name",
            },
            {
              name: "so_luong",
              label: "S??? l?????ng",
              type: "input",
              textType: "number",
              colSpan: 3,
              onValueChange: (data, fromEl) => {
                const sl = +fromEl.getValues("thanh_tien");
                fromEl.setValue("thanh_tien", +data * sl);
              },
            },
            {
              name: "thue",
              label: "Thu???",
              type: "input-mask",
              textType: "number",
              colSpan: 3,
            },
            {
              name: "phi_chuyen_noi_dia",
              label: "Ph?? VC n??? ?????a",
              type: "input-mask",
              textType: "number",
              colSpan: 3,
            },
            {
              name: "phi_mua_ho",
              label: "Ph?? mua h???",
              type: "input-mask",
              textType: "number",
              colSpan: 3,
            },
            {
              name: "phi_khac",
              label: "Ph?? kh??c",
              type: "input-mask",
              textType: "number",
              colSpan: 2,
            },
            {
              name: "ty_gia",
              label: "T??? gi??",
              type: "input-mask",
              textType: "number",
              colSpan: 3,
            },
            {
              name: "thanh_tien_chua_phu_thu",
              label: "T???ng ????n(ch??a ship, ph??? thu)",
              type: "input-mask",
              textType: "number",
              colSpan: 3,
            },
            {
              name: "dat_coc",
              label: "?????t c???c",
              type: "input-mask",
              textType: "number",
              colSpan: 3,
            },
            {
              name: "phu_thu",
              label: "Ph??? thu",
              type: "input-mask",
              textType: "number",
              colSpan: 3,
            },

            {
              name: "don_gia",
              label: "????n gi??",
              type: "input-mask",
              textType: "number",
              colSpan: 3,
              onValueChange: (data, fromEl) => {
                const sl = +fromEl.getValues("so_luong");
                fromEl.setValue("thanh_tien", +data * sl);
              },
            },
            {
              name: "thanh_tien",
              label: "Th??nh ti???n",
              type: "input-mask",
              textType: "number",
              colSpan: 3,
            },
            {
              name: "tong_thanh_tien",
              label: "T???ng th??nh ti???n",
              type: "input-mask",
              textType: "number",
              colSpan: 3,
            },
            {
              name: "note",
              label: "Ghi ch??",
              type: "input",
              colSpan: 2,
            },
          ],
        },

        {
          name: "chiphivanchuyen",
          label: "Chi ph?? v???n chuy???n",
          type: "autocomplete",
          colSpan: 2,
          isLoading: isLoadingBenHd,
          autocompleteOptions: benHdData || [],
          onSearchChange: onSearchBenHd,
        },
        {
          name: "created_at",
          label: "Ng??y t???o",
          type: "date-picker",
          colSpan: 2,
        },

        {
          name: "thoi_han_thanh_toan",
          label: "Th???i h???n thanh to??n",
          type: "input",
          textType: "number",
          colSpan: 2,
        },
      ]}
    />
  );
}

export default HopDongNewForm;
