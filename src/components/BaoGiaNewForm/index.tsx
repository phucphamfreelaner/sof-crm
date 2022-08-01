import React from "react";
import * as UI from "@/libs/ui";
import BaseForm from "@/components/BaseForm";
import { useBoolean } from "ahooks";
interface IBaoGiaNewForm {
  gap?: string;
  size?: "medium" | "small";
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
    gap,
    size = "medium",
  } = props;

  const [isVAT, setIsVAT] = useBoolean(false);
  const [isShipFee, setIsShipFee] = useBoolean(false);
  const [tgGiaoHang, setTgGiaoHang] = React.useState("15-20");
  const theme = UI.useTheme();

  const calcTotal = (fromEl: any) => {
    const sl = +fromEl.getValues("so_luong") || 0;
    const don_gia = +fromEl.getValues("don_gia") || 0;
    const thue = +fromEl.getValues("thue") || 0;
    const phu_thu = +fromEl.getValues("phu_thu") || 0;
    const phi_khac = +fromEl.getValues("phi_khac") || 0;

    fromEl.setValue("thanh_tien", don_gia * sl + thue + phu_thu + phi_khac);
  };

  return (
    <BaseForm
      sx={{ width: "100%" }}
      templateColumns="repeat(6, 1fr)"
      gap={gap || theme.spacing(2)}
      defaultValues={defaultValues}
      watchFields={["thong_tin_chung", "san_pham"]}
      onWatchChange={(data) => {
        if (data?.thong_tin_chung?.vat) setIsVAT.setTrue();
        else setIsVAT.setFalse();

        if (data?.thong_tin_chung?.["phi_giao_hang"]) setIsShipFee.setTrue();
        else setIsShipFee.setFalse();

        if (data?.thong_tin_chung?.["time"])
          setTgGiaoHang(data?.thong_tin_chung?.["time"]);

        const sanPham = data?.["san_pham"] || [];

        formRef?.current?.setValue(
          "tong_gia_tri",
          (sanPham as any[]).reduce(
            (total, x) =>
              total +
              (+x?.don_gia || 0) * (+x?.so_luong || 1) +
              (+x?.thue || 0) +
              (+x?.phu_thu || 0) +
              (+x?.phi_khac || 0),
            0
          )
        );
      }}
      ref={formRef}
      fields={[
        {
          name: "san_pham",
          colSpan: 6,
          size,
          type: "array-fields",
          label: "",
          gap: "12px",
          onAddRow: onAddSanPham,
          addBtnLabel: "Thêm sản phẩm",
          direction: "row",
          templateColumns: "repeat(1, 1fr)",
          fields: [
            {
              name: "product_id",
              label: "Tên sản phẩm",
              type: "autocomplete",
              autocompleteOptions: sanPhamData,
              onSearchChange: onSearchSanPham,
              mapValueKey: "name",
              onGetDataByValue: (id) => getSanPhamById(id),
              size,
              colSpan: 1,
            },
            {
              name: "src",
              label: "Đường dẫn",
              type: "input",
              colSpan: 1,
              size,
            },
            {
              name: "nganh_hang",
              label: "Ngành hàng",
              type: "input",
              colSpan: 1,
              size,
            },
            {
              name: "don_vi_key",
              label: "Đơn vị tính",
              type: "autocomplete",
              colSpan: 1,
              size,
              autocompleteOptions: donViTinhData,
              onSearchChange: onSearchDonViTinh,
              onGetDataByValue: (key: any) => getDonViTinhByKey(key),
              mapValueKey: "name",
            },
            {
              name: "so_luong",
              label: "Số lượng",
              type: "input",
              textType: "number",
              colSpan: 1,
              size,
              onValueChange: (__, fromEl) => {
                calcTotal(fromEl);
              },
            },
            {
              name: "don_gia",
              label: "Đơn giá",
              type: "input-mask",
              textType: "number",
              colSpan: 1,
              size,
              onValueChange: (__, fromEl) => {
                calcTotal(fromEl);
              },
            },
            {
              name: "thue",
              label: "Thuế",
              type: "input-mask",
              textType: "number",
              colSpan: 1,
              size,
              onValueChange: (__, fromEl) => {
                calcTotal(fromEl);
              },
            },
            {
              name: "phu_thu",
              label: "Phụ thu",
              type: "input-mask",
              textType: "number",
              colSpan: 1,
              size,
              onValueChange: (__, fromEl) => {
                calcTotal(fromEl);
              },
            },

            {
              name: "phi_khac",
              label: "Phí khác",
              type: "input-mask",
              textType: "number",
              colSpan: 1,
              size,
              onValueChange: (__, fromEl) => {
                calcTotal(fromEl);
              },
            },

            {
              name: "thanh_tien",
              label: "Tổng đơn",
              type: "input-mask",
              textType: "number",
              colSpan: 1,
              size,
            },

            {
              name: "note",
              label: "Ghi chú",
              type: "input",
              multiline: true,
              rows: 2,
              colSpan: 1,
              size,
            },
          ],
        },
        {
          name: "tong_gia_tri",
          label: "TỔNG GIÁ TRỊ SẢN PHẨM",
          onValueChange(tongGiaTri, { setValue, getValues }) {
            const tyGia = +getValues("ty_gia") || 0;
            const phuThu = +getValues("phu_thu") || 0;
            const datCoc = +getValues("datcoc") || 0;
            setValue("tong_gia_tri_vnd", +tongGiaTri * tyGia);
            setValue("phi_dich_vu", +tongGiaTri * tyGia * 0.03);
            setValue(
              "tong_don_hang",
              tongGiaTri * tyGia + +tongGiaTri * tyGia * 0.03 + phuThu
            );
            setValue(
              "tong_gia_tri_con_lai",
              (tongGiaTri * tyGia + +tongGiaTri * tyGia * 0.03 + phuThu) *
                (datCoc / 100)
            );
          },
          textType: "number",
          type: "input-mask",
          colSpan: 2,
          colStart: 5,
          size,
        },
        {
          name: "ty_gia",
          label: "TỶ GIÁ (QUỐC GIA)",
          type: "input-mask",
          textType: "number",
          colSpan: 2,
          colStart: 5,
          size,
          onValueChange(tyGia, { setValue, getValues }) {
            const tongGiaTri = +getValues("tong_gia_tri") || 0;
            const phuThu = +getValues("phu_thu") || 0;
            const datCoc = +getValues("datcoc") || 0;
            setValue("tong_gia_tri_vnd", tongGiaTri * tyGia);
            setValue("phi_dich_vu", tongGiaTri * tyGia * 0.03);
            setValue(
              "tong_don_hang",
              tongGiaTri * tyGia + tongGiaTri * tyGia * 0.03 + phuThu
            );
            setValue(
              "tong_gia_tri_con_lai",
              (tongGiaTri * tyGia + tongGiaTri * tyGia * 0.03 + phuThu) *
                (datCoc / 100)
            );
          },
        },
        {
          name: "tong_gia_tri_vnd",
          label: "TỔNG GIÁ TRỊ SẢN PHẨM (VND)",
          textType: "number",
          type: "input-mask",
          colSpan: 2,
          colStart: 5,
          size,
        },
        {
          name: "phi_dich_vu",
          label: "PHÍ DỊCH VỤ (3%)",
          textType: "number",
          type: "input-mask",
          colSpan: 2,
          colStart: 5,
          size,
        },
        {
          name: "phu_thu",
          label: "PHỤ THU",
          textType: "number",
          type: "input-mask",
          colSpan: 2,
          colStart: 5,
          size,
          onValueChange(phuThu, { setValue, getValues }) {
            const tyGia = +getValues("ty_gia");
            const tongGiaTri = +getValues("tong_gia_tri") || 0;

            const datCoc = +getValues("datcoc") || 0;
            setValue("tong_gia_tri_vnd", tongGiaTri * tyGia);
            setValue("phi_dich_vu", tongGiaTri * tyGia * 0.03);

            setValue(
              "tong_don_hang",
              tongGiaTri * tyGia + tongGiaTri * tyGia * 0.03 + +phuThu
            );
            setValue(
              "tong_gia_tri_con_lai",
              (tongGiaTri * tyGia + tongGiaTri * tyGia * 0.03 + +phuThu) *
                (datCoc / 100)
            );
          },
        },
        {
          name: "tong_don_hang",
          label: "TỔNG ĐƠN HÀNG",
          textType: "number",
          type: "input-mask",
          colSpan: 2,
          colStart: 5,
          size,
        },
        {
          name: "datcoc",
          label: "ĐẶT CỌC (80-100%)",
          type: "input",
          textType: "number",
          colSpan: 2,
          colStart: 5,
          size,
          onValueChange(datCoc, { setValue, getValues }) {
            const tongDonHang = +getValues("tong_don_hang") || 0;
            setValue("tong_gia_tri_con_lai", tongDonHang * (datCoc / 100));
          },
        },
        {
          name: "tong_gia_tri_con_lai",
          label: "CÒN LẠI: TỔNG GIÁ TRỊ",
          textType: "number",
          type: "input-mask",
          colSpan: 2,
          colStart: 5,
          size,
        },

        {
          name: "thong_tin_chung",
          label: "Thông tin chung",
          type: "collapse-fields",
          colSpan: 6,
          size,
          gap: "10px",
          templateColumns: "repeat(6, 1fr)",
          templateRows: "repeat(2, 1fr)",
          fields: [
            {
              name: "chu_thich",
              label: "chu_thich",
              type: "label",
              colSpan: 3,
              size,
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
              size,
            },
            {
              name: "time",
              label: "TG giao hàng",
              type: "input",
              colSpan: 1,
              size,
            },
            {
              name: "datcoc",
              label: "Đặt cọc (%)",
              type: "input",
              colSpan: 1,
              size,
              textType: "number",
            },
            {
              name: "vat",
              label: "Thuế VAT",
              type: "checkbox",
              colSpan: 1,
              size,
            },
            {
              name: "phi_giao_hang",
              label: "Giao hàng có tính thuế",
              type: "checkbox",
              colSpan: 2,
              size,
            },
          ],
        },

        {
          name: "dieukhoan",
          label: "Các điều khoản khác",
          type: "input",
          colSpan: 3,
          size,
          multiline: true,
          rows: 4,
        },
        {
          name: "note",
          label: "Ghi chú",
          type: "input",
          colSpan: 3,
          size,
          multiline: true,
          rows: 4,
        },
        {
          name: "company_id",
          label: "Công ty",
          type: "autocomplete",
          colSpan: 2,
          size,
          isLoading: isLoadingSearchCompany,
          autocompleteOptions: companyData || [],
          onSearchChange: onSearchCompany,
          onGetDataByValue: (key: any) => getCongTyById(key),
          mapValueKey: "ten",
        },
        {
          name: "cohoi_id",
          label: "Cơ hội",
          type: "autocomplete",
          colSpan: 2,
          size,
          isLoading: isLoadingSearchCoHoi,
          autocompleteOptions: coHoiData || [],
          onSearchChange: onSearchCoHoi,
        },
        {
          name: "loai_bao_gia_key",
          label: "Loại báo giá",
          type: "autocomplete",
          colSpan: 2,
          size,
          isLoading: isLoadingLoaiBaoGia,
          autocompleteOptions: loaiBaoGiaData || [],
          onSearchChange: onSearchLoaiBaoGia,
        },
        {
          name: "ngon_ngu_key",
          label: "Ngôn ngữ",
          type: "autocomplete",
          colSpan: 2,
          size,
          isLoading: isLoadingNgonNgu,
          autocompleteOptions: ngonNguData || [],
          onSearchChange: onSearchNgonNgu,
        },
        {
          name: "loai_tien_key",
          label: "Loại tiền",
          type: "autocomplete",
          colSpan: 2,
          size,
          isLoading: isLoadingLoaiTien,
          autocompleteOptions: loaiTienData || [],
          onSearchChange: onSearchLoaiTien,
        },
        {
          name: "template_id",
          label: "Mẫu",
          type: "autocomplete",
          colSpan: 2,
          size,
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
