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
              name: "product_id",
              label: "Tên sản phẩm",
              type: "autocomplete",
              autocompleteOptions: sanPhamData,
              onSearchChange: onSearchSanPham,
              colSpan: 3,
            },
            {
              name: "chat_lieu_key",
              label: "Chất liệu",
              type: "autocomplete",
              autocompleteOptions: chatLieuData,
              onSearchChange: onSearchChatLieu,
              colSpan: 4,
            },
            {
              name: "don_vi_key",
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
              colSpan: 3,
              onValueChange: (data, fromEl) => {
                const sl = +fromEl.getValues("thanh_tien");
                fromEl.setValue("thanh_tien", +data * sl);
              },
            },
            {
              name: "thue",
              label: "Thuế",
              type: "input-mask",
              textType: "number",
              colSpan: 3,
            },
            {
              name: "phi_chuyen_noi_dia",
              label: "Phí VC nộ địa",
              type: "input-mask",
              textType: "number",
              colSpan: 3,
            },
            {
              name: "phi_mua_ho",
              label: "Phí mua hộ",
              type: "input-mask",
              textType: "number",
              colSpan: 3,
            },
            {
              name: "phi_khac",
              label: "Phí khác",
              type: "input-mask",
              textType: "number",
              colSpan: 2,
            },
            {
              name: "ty_gia",
              label: "Tỷ giá",
              type: "input-mask",
              textType: "number",
              colSpan: 3,
            },
            {
              name: "thanh_tien_chua_phu_thu",
              label: "Tổng đơn(chưa ship, phụ thu)",
              type: "input-mask",
              textType: "number",
              colSpan: 3,
            },
            {
              name: "dat_coc",
              label: "Đặt cọc",
              type: "input-mask",
              textType: "number",
              colSpan: 3,
            },
            {
              name: "phu_thu",
              label: "Phụ thu",
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
              name: "tong_thanh_tien",
              label: "Tổng thành tiền",
              type: "input-mask",
              textType: "number",
              colSpan: 3,
            },
            {
              name: "ghi_chu",
              label: "Ghi chú",
              type: "input",
              colSpan: 2,
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
              name: "ngaybaogia",
              label: "Ngày báo giá",
              type: "date-picker",
              colSpan: 1,
            },
            {
              name: "time",
              label: "TG giao hàng",
              type: "input",
              colSpan: 1,
            },
            {
              name: "datcoc",
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
          name: "dieukhoan",
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
          name: "company_id",
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
          name: "cohoi_id",
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
          name: "ngon_ngu_key",
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
          name: "loai_tien_key",
          label: "Loại tiền",
          type: "autocomplete",
          colSpan: 2,
          isLoading: isLoadingLoaiTien,
          autocompleteOptions: loaiTienData || [],
          onSearchChange: onSearchLoaiTien,
        },
        {
          name: "template_id",
          label: "Mẫu",
          type: "autocomplete",
          colSpan: 2,
          isLoading: isLoadingMauIn,
          autocompleteOptions: mauInData || [],
          onSearchChange: onSearchMauIn,
        },
      ]}
    />
  );
}

export default BaoGiaNewForm;
