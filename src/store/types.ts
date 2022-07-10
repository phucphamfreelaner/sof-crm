export interface IKhachHang {
  id: number;
  code: string;
  user_contact_id: number;
  created_by: number;
  updated_by: number;
  name: string;
  first_name: string;
  last_name?: any;
  email: string;
  danh_xung_key: string;
  nguon_key?: any;
  thanhpho_key: string;
  address?: any;
  phone: string;
  phone2?: any;
  file?: any;
  note: string;
  contact: string;
  quocgia_key: string;
  created_at: string;
  updated_at: string;
  da_cham_soc: number;
  zalo_user_id: number;
  whatsapp?: any;
  use_english: number;
  whatsapp_number?: any;
  zalo_number?: any;
  files: any[];
  tong_co_hoi: number;
  tong_bao_gia: number;
  tong_hop_dong: number;
}

export interface ICoHoi {
  id: number;
  code: string;
  customer_id: number;
  product_category_id: number;
  name: string;
  trang_thai_key: string;
  tien_trinh_key: string;
  muc_dich_key?: any;
  phone?: any;
  example: number;
  soluong: string;
  file?: any;
  note: string;
  created_by: number;
  created_at: string;
  updated_at: string;
  ngay_thay_doi_tien_trinh?: any;
  da_cham_soc: number;
  files: any[];
  co_hoi_file?: any;
}

export interface ICskhChannel1 {
  notification_channel_id: number;
  event_name: string;
}

export interface ICoHoiChannel1 {
  notification_channel_id: number;
  event_name: string;
}

export interface INhiemVuChannel1 {
  notification_channel_id: number;
  event_name: string;
}

export interface ICskhAutoChannel1 {
  notification_channel_id: number;
  event_name: string;
}

export interface INhiemVuThuongXuyenChannel1 {
  notification_channel_id: number;
  event_name: string;
}

export interface IChannelName {
  "cskh-channel-1": ICskhChannel1[];
  "co-hoi-channel-1": ICoHoiChannel1[];
  "nhiem-vu-channel-1": INhiemVuChannel1[];
  "cskh-auto-channel-1": ICskhAutoChannel1[];
  "nhiem-vu-thuong-xuyen-channel-1": INhiemVuThuongXuyenChannel1[];
}

export interface ISub {
  name: string;
  url: string;
  icon: string;
  status: boolean;
  type: string;
}

export interface IMenu {
  name: string;
  url: string;
  icon: string;
  status: boolean;
  sub: ISub[];
  target: string;
  type: string;
  image: string;
}

export interface IMenuNav {
  name: string;
  url: string;
  icon: string;
  status: boolean;
}

export interface INhomQuyen {
  id: number;
  name: string;
  status: number;
  quyen?: any;
  created_at: string;
  updated_at: string;
  menu: IMenu[];
  menu_nav: IMenuNav[];
}

export interface INhanVienXuLy {
  id: number;
  name: string;
  email: string;
  type: string;
  customer_id: number;
  created_at: string;
  updated_at: string;
  code: string;
  ten: string;
  ho: string;
  gioi_tinh: string;
  chi_nhanh_key: string;
  phong_ban_key: string;
  image: string;
  dia_chi: string;
  phone: string;
  username: string;
  chuc_vu_key: string;
  danh_xung_key: string;
  uu_tien: number;
  zalo_user_id: number;
  en_name?: any;
  en_ho: string;
  en_ten: string;
  short_name?: any;
  nhom_quyen_id: number;
  whatsapp_account: string;
  whatsapp_api_token: string;
  whatsapp_number?: any;
  zalo_number?: any;
  tong_co_hoi: number;
  tong_bao_gia: number;
  tong_hop_dong: number;
  tong_chot_don: number;
  ti_le_chot_don: number;
  tong_doanh_thu: string;
  tong_chi_phi: string;
  phan_tram_loi_nhuan: number;
  channel_name: IChannelName;
  nhom_quyen: INhomQuyen;
}

export interface ICskhChannel12 {
  notification_channel_id: number;
  event_name: string;
}

export interface ICoHoiChannel12 {
  notification_channel_id: number;
  event_name: string;
}

export interface INhiemVuChannel12 {
  notification_channel_id: number;
  event_name: string;
}

export interface ICskhAutoChannel12 {
  notification_channel_id: number;
  event_name: string;
}

export interface INhiemVuThuongXuyenChannel12 {
  notification_channel_id: number;
  event_name: string;
}

export interface IChannelName2 {
  "cskh-channel-1": ICskhChannel12[];
  "co-hoi-channel-1": ICoHoiChannel12[];
  "nhiem-vu-channel-1": INhiemVuChannel12[];
  "cskh-auto-channel-1": ICskhAutoChannel12[];
  "nhiem-vu-thuong-xuyen-channel-1": INhiemVuThuongXuyenChannel12[];
}

export interface ISub2 {
  name: string;
  url: string;
  icon: string;
  status: boolean;
  type: string;
}

export interface IMenu2 {
  name: string;
  url: string;
  icon: string;
  status: boolean;
  sub: ISub2[];
  target: string;
  type: string;
  image: string;
}

export interface IMenuNav2 {
  name: string;
  url: string;
  icon: string;
  status: boolean;
}

export interface INhomQuyen2 {
  id: number;
  name: string;
  status: number;
  quyen?: any;
  created_at: string;
  updated_at: string;
  menu: IMenu2[];
  menu_nav: IMenuNav2[];
}

export interface INhanVienNhap {
  id: number;
  name: string;
  email: string;
  type: string;
  customer_id: number;
  created_at: string;
  updated_at: string;
  code: string;
  ten: string;
  ho: string;
  gioi_tinh: string;
  chi_nhanh_key: string;
  phong_ban_key: string;
  image: string;
  dia_chi: string;
  phone: string;
  username: string;
  chuc_vu_key: string;
  danh_xung_key: string;
  uu_tien: number;
  zalo_user_id: number;
  en_name?: any;
  en_ho: string;
  en_ten: string;
  short_name?: any;
  nhom_quyen_id: number;
  whatsapp_account: string;
  whatsapp_api_token: string;
  whatsapp_number?: any;
  zalo_number?: any;
  tong_co_hoi: number;
  tong_bao_gia: number;
  tong_hop_dong: number;
  tong_chot_don: number;
  ti_le_chot_don: number;
  tong_doanh_thu: string;
  tong_chi_phi: string;
  phan_tram_loi_nhuan: number;
  channel_name: IChannelName2;
  nhom_quyen: INhomQuyen2;
}

export interface ILoaiTien {
  id: number;
  group: string;
  key: string;
  name: string;
  default: string;
  parent_id: number;
  created_at: string;
  updated_at: string;
  uu_tien: number;
  en_name?: any;
}

export interface IBaoGia {
  id: number;
  code: string;
  customer_id: number;
  cohoi_id: number;
  contact_user_id: number;
  loai_bao_gia_key: string;
  name: string;
  ngaybaogia: string;
  time: string;
  file?: any;
  datcoc: number;
  vat: number;
  shipping_price: number;
  dieukhoan?: any;
  note?: any;
  created_by: number;
  updated_by: number;
  tong_tien: number;
  tong_tien_vat: number;
  created_at: string;
  updated_at: string;
  company_id: string;
  ngon_ngu_key: string;
  loai_tien_key: string;
  tong_tien_goc: number;
  vat_phan_tram: number;
  template_id: number;
  tong_hop_dong: number;
  tong_tien_vat_locate: number;
  tong_tien_locate: number;
  tong_tien_goc_locate: number;
  khach_hang: IKhachHang;
  co_hoi: ICoHoi;
  nhan_vien_xu_ly: INhanVienXuLy;
  nhan_vien_nhap: INhanVienNhap;
  loai_tien: ILoaiTien;
}
