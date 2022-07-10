import { ICustomer } from "..";

export interface IHopDong {
  id: number;
  code: string;
  baogia_id: number;
  dai_dien_id: number;
  loai_hd_key: string;
  loai_hop_dong?: ILoaiHopDong;
  nhan_vien_tao?: any;
  chucvu?: any;
  cachgoi?: any;
  phone?: any;
  quy_cach_pham_chat: string;
  ngayky: string;
  ngaytao: string;
  ngaygiao: string;
  time: string;
  chiphivanchuyen: string;
  thanh_tien: number;
  vat: number;
  tong_tien: number;
  tong_tien_chu: string;
  so_tien_da_thu: number;
  so_tien_con_lai: number;
  dia_chi_giao?: any;
  created_by: number;
  updated_by: number;
  tong_tien_vat: number;
  name: string;
  customer_id: number;
  created_at: string;
  updated_at: string;
  company_id: string;
  thoi_han_thanh_toan: number;
  cohoi_id: number;
  ngon_ngu_key: string;
  loai_tien_key: string;
  thanh_tien_goc: number;
  vat_phan_tram: number;
  template_id: number;
  so_tien_da_thu_locate: number;
  so_tien_con_lai_locate: number;
  tong_tien_locate: number;
  tong_tien_goc_locate: number;
  tong_tien_vat_locate: number;
  file_objects: any[];
  khach_hang?: ICustomer;
  bao_gia_co_hoi_tien_trinh?: any;
}

export interface IGetHopDongList {
  per_page: string;
  current_page: number;
  next_page_url: string;
  prev_page_url: string;
  from: number;
  to: number;
  data: IHopDong[];
}

export interface ILoaiHopDong {
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
