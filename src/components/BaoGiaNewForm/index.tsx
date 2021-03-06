import React from "react";
import * as UI from "@/libs/ui";
import BaseForm from "@/components/BaseForm";
import { useBoolean } from "ahooks";
interface IBaoGiaNewForm {
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
  getCongTyById?: (key: string) => Promise<any>;
  getMauInById?: (key: string) => Promise<any>;
}

function BaoGiaNewForm(props: IBaoGiaNewForm) {
  const {
    companyData,
    onSearchCompany,
    isLoadingSearchCompany,
    coHoiData,
    onSearchCoHoi,
    isLoadingSearchCoHoi,
    loaiBaoGiaData,
    onSearchLoaiBaoGia,
    isLoadingLoaiBaoGia,
    ngonNguData,
    onSearchNgonNgu,
    isLoadingNgonNgu,
    loaiTienData,
    onSearchLoaiTien,
    isLoadingLoaiTien,
    defaultValues,
    onAddSanPham,
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
    getCongTyById,
    getMauInById,
  } = props;

  const [isVAT, setIsVAT] = useBoolean(false);
  const [isShipFee, setIsShipFee] = useBoolean(false);
  const [tgGiaoHang, setTgGiaoHang] = React.useState("15-20");

  return (
    <BaseForm
      sx={{ width: "100%" }}
      templateColumns="repeat(6, 1fr)"
      gap="26px"
      defaultValues={defaultValues}
      watchFields={["thong_tin_chung"]}
      onWatchChange={(data) => {
        if (data?.thong_tin_chung?.vat) setIsVAT.setTrue();
        else setIsVAT.setFalse();

        if (data?.thong_tin_chung?.["phi_giao_hang"]) setIsShipFee.setTrue();
        else setIsShipFee.setFalse();

        if (data?.thong_tin_chung?.["time"])
          setTgGiaoHang(data?.thong_tin_chung?.["time"]);
      }}
      ref={formRef}
      fields={[
        {
          name: "san_pham",
          colSpan: 6,
          type: "array-fields",
          label: "",
          gap: "12px",
          onAddRow: onAddSanPham,
          addBtnLabel: "Th??m s???n ph???m",
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
          name: "thong_tin_chung",
          label: "Th??ng tin chung",
          type: "collapse-fields",
          colSpan: 6,
          gap: "10px",
          templateColumns: "repeat(6, 1fr)",
          templateRows: "repeat(2, 1fr)",
          fields: [
            {
              name: "chu_thich",
              label: "chu_thich",
              type: "label",
              colSpan: 3,
              rowSpan: 2,
              labelContent: (
                <UI.VStack alignItems="flex-start" w="100%">
                  <UI.Typography fontWeight={700} variant="body2">
                    C??c ??i???u kho???n chung
                  </UI.Typography>
                  <ul style={{ fontSize: "14px" }}>
                    {!isShipFee && <li>Giao h??ng mi???n ph?? to??n qu???c</li>}
                    <li>
                      B??o gi?? tr??n {isVAT ? "????" : "ch??a"} bao g???m thu??? VAT
                    </li>
                    <li>
                      Th???i gian giao h??ng: Trong v??ng {tgGiaoHang} ng??y l??m vi???c
                    </li>
                    <li>B??o gi?? c?? gi?? tr??? trong v??ng 30 ng??y</li>
                    <li>?????t c???c 50% t???ng gi?? tr??? ????n h??ng</li>
                  </ul>
                </UI.VStack>
              ),
            },
            {
              name: "ngaybaogia",
              label: "Ng??y b??o gi??",
              type: "date-picker",
              colSpan: 1,
            },
            {
              name: "time",
              label: "TG giao h??ng",
              type: "input",
              colSpan: 1,
            },
            {
              name: "datcoc",
              label: "?????t c???c (%)",
              type: "input",
              colSpan: 1,
              textType: "number",
            },
            {
              name: "vat",
              label: "Thu??? VAT",
              type: "checkbox",
              colSpan: 1,
            },
            {
              name: "phi_giao_hang",
              label: "Giao h??ng c?? t??nh thu???",
              type: "checkbox",
              colSpan: 2,
            },
          ],
        },
        {
          name: "dieukhoan",
          label: "C??c ??i???u kho???n kh??c",
          type: "input",
          colSpan: 3,
          multiline: true,
          rows: 4,
        },
        {
          name: "note",
          label: "Ghi ch??",
          type: "input",
          colSpan: 3,
          multiline: true,
          rows: 4,
        },
        {
          name: "company_id",
          label: "C??ng ty",
          type: "autocomplete",
          colSpan: 2,
          isLoading: isLoadingSearchCompany,
          autocompleteOptions: companyData || [],
          onSearchChange: onSearchCompany,
          onGetDataByValue: (key: any) => getCongTyById(key),
          mapValueKey: "ten",
        },
        {
          name: "cohoi_id",
          label: "C?? h???i",
          type: "autocomplete",
          colSpan: 2,
          isLoading: isLoadingSearchCoHoi,
          autocompleteOptions: coHoiData || [],
          onSearchChange: onSearchCoHoi,
        },
        {
          name: "loai_bao_gia_key",
          label: "Lo???i b??o gi??",
          type: "autocomplete",
          colSpan: 2,
          isLoading: isLoadingLoaiBaoGia,
          autocompleteOptions: loaiBaoGiaData || [],
          onSearchChange: onSearchLoaiBaoGia,
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
          name: "loai_tien_key",
          label: "Lo???i ti???n",
          type: "autocomplete",
          colSpan: 2,
          isLoading: isLoadingLoaiTien,
          autocompleteOptions: loaiTienData || [],
          onSearchChange: onSearchLoaiTien,
        },
        {
          name: "template_id",
          label: "M???u",
          type: "autocomplete",
          colSpan: 2,
          isLoading: isLoadingMauIn,
          autocompleteOptions: mauInData || [],
          onSearchChange: onSearchMauIn,
          onGetDataByValue: (key: any) => getMauInById(key),
          mapValueKey: "tieu_de",
        },
      ]}
    />
  );
}

export default BaoGiaNewForm;
