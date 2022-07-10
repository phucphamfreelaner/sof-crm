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
  onSearchChatLieu?: (index: any) => any;
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

        if (data?.thong_tin_chung?.["tg_giao_hang"])
          setTgGiaoHang(data?.thong_tin_chung?.["tg_giao_hang"]);
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
          addBtnLabel: "Thêm sản phẩm",
          fields: [
            {
              name: "ten_san_pham",
              label: "Tên sản phẩm",
              type: "autocomplete",
              autocompleteOptions: sanPhamData,
              onSearchChange: onSearchSanPham,
              colSpan: 3,
            },
            {
              name: "chat_lieu",
              label: "Chất liệu",
              type: "autocomplete",
              autocompleteOptions: chatLieuData,
              onSearchChange: onSearchChatLieu,
              colSpan: 3,
            },
            {
              name: "don_vi_tinh",
              label: "Đơn vị tính",
              type: "autocomplete",
              colSpan: 3,
              autocompleteOptions: donViTinhData,
              onSearchChange: onSearchDonViTinh,
            },
            {
              name: "so_luong",
              label: "Số lượng",
              type: "input",
              textType: "number",
              colSpan: 2,
              onValueChange: (data, fromEl) => {
                const sl = +fromEl.getValues("thanh_tien");
                fromEl.setValue("thanh_tien", +data * sl);
              },
            },
            {
              name: "don_gia_von",
              label: "Đơn giá vốn",
              type: "input-mask",
              textType: "number",
              colSpan: 3,
            },
            {
              name: "don_gia",
              label: "Đơn giá",
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
              label: "Thành tiền",
              type: "input-mask",
              textType: "number",
              colSpan: 3,
            },
            {
              name: "ghi_chu",
              label: "Ghi chú",
              type: "input",
              colSpan: 3,
            },
          ],
        },
        {
          name: "thong_tin_chung",
          label: "Thông tin chung",
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
                    Các điều khoản chung
                  </UI.Typography>
                  <ul style={{ fontSize: "14px" }}>
                    {!isShipFee && <li>Giao hàng miễn phí toàn quốc</li>}
                    <li>
                      Báo giá trên {isVAT ? "đã" : "chưa"} bao gồm thuế VAT
                    </li>
                    <li>
                      Thời gian giao hàng: Trong vòng {tgGiaoHang} ngày làm việc
                    </li>
                    <li>Báo giá có giá trị trong vòng 30 ngày</li>
                    <li>Đặt cọc 50% tổng giá trị đơn hàng</li>
                  </ul>
                </UI.VStack>
              ),
            },
            {
              name: "ngay_bao_gia",
              label: "Ngày báo giá",
              type: "date-picker",
              colSpan: 1,
            },
            {
              name: "tg_giao_hang",
              label: "TG giao hàng",
              type: "input",
              colSpan: 1,
            },
            {
              name: "dat_coc",
              label: "Đặt cọc (%)",
              type: "input",
              colSpan: 1,
              textType: "number",
            },
            {
              name: "vat",
              label: "Thuế VAT",
              type: "checkbox",
              colSpan: 1,
            },
            {
              name: "phi_giao_hang",
              label: "Giao hàng có tính thuế",
              type: "checkbox",
              colSpan: 2,
            },
          ],
        },
        {
          name: "dieu_khoan",
          label: "Các điều khoản khác",
          type: "input",
          colSpan: 3,
          multiline: true,
          rows: 4,
        },
        {
          name: "note",
          label: "Ghi chú",
          type: "input",
          colSpan: 3,
          multiline: true,
          rows: 4,
        },
        {
          name: "company",
          label: "Công ty",
          type: "autocomplete",
          colSpan: 2,
          isLoading: isLoadingSearchCompany,
          autocompleteOptions:
            companyData?.map((x: any) => ({
              label: x.ten,
              value: x.id,
            })) || [],
          onSearchChange: onSearchCompany,
        },
        {
          name: "name",
          label: "Cơ hội",
          type: "autocomplete",
          colSpan: 2,
          isLoading: isLoadingSearchCoHoi,
          autocompleteOptions: coHoiData || [],
          onSearchChange: onSearchCoHoi,
        },
        {
          name: "loai_bao_gia",
          label: "Loại báo giá",
          type: "autocomplete",
          colSpan: 2,
          isLoading: isLoadingLoaiBaoGia,
          autocompleteOptions: loaiBaoGiaData || [],
          onSearchChange: onSearchLoaiBaoGia,
        },
        {
          name: "ngon_ngu",
          label: "Ngôn ngữ",
          type: "autocomplete",
          colSpan: 2,
          isLoading: isLoadingNgonNgu,
          autocompleteOptions:
            ngonNguData?.map((x: any) => ({
              label: x.ten,
              value: x.code,
            })) || [],
          onSearchChange: onSearchNgonNgu,
        },
        {
          name: "loai_tien",
          label: "Loại tiền",
          type: "autocomplete",
          colSpan: 2,
          isLoading: isLoadingLoaiTien,
          autocompleteOptions: loaiTienData || [],
          onSearchChange: onSearchLoaiTien,
        },
      ]}
    />
  );
}

export default BaoGiaNewForm;
