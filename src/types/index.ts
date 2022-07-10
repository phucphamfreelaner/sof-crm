export interface IGetCustomersList {
  per_page: string;
  current_page: number;
  next_page_url: string;
  prev_page_url?: any;
  from: number;
  to: number;
  data: ICustomer[];
}

export interface ICongTy {
  id: number;
  customer_id: number;
  thanhpho_key?: any;
  quan_key?: any;
  phuong_key?: any;
  linh_vuc_key?: any;
  nhom_kh_key?: any;
  nhom_kd_key?: any;
  tax: string;
  name: string;
  bank_account?: any;
  bank?: any;
  soluong: number;
  address: string;
  address2?: any;
  giay_uy_quyen?: any;
  dai_dien: string;
  chuc_vu_key: string;
  created_at: string;
  updated_at: string;
}

export interface IDanhXung {
  id: number;
  group: string;
  key: string;
  name: string;
  default: string;
  parent_id: number;
  created_at: string;
  updated_at: string;
  uu_tien: number;
  en_name: string;
}

export interface ICustomer {
  id: number;
  code: string;
  user_contact_id: number;
  created_by: number;
  updated_by: number;
  name?: any;
  first_name: string;
  last_name?: any;
  email?: any;
  danh_xung_key: string;
  nguon_key?: any;
  thanhpho_key: string;
  address: string;
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
  cong_ty?: ICongTy;
  danh_xung?: IDanhXung;
}
