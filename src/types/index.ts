export interface ICustomer {
  id: number;
  code: string;
  user_contact_id: number;
  created_by: number;
  updated_by: number;
  name?: any;
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
  nguon?: any;
}

export interface IGetCustomersList {
  per_page: string;
  current_page: number;
  next_page_url: string;
  prev_page_url?: any;
  from: number;
  to: number;
  data: ICustomer[];
}
