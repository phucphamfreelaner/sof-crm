import { ICustomer } from "..";

export interface ICohoi {
  id: number;
  code: string;
  co_hoi_chua_cham_soc?: any;
  co_hoi_cskh?: any[];
  co_hoi_file?: any;
  customer_id: number;
  created_at: string;
  created_by: number;
  updated_at: string;
  da_cham_soc: number;
  example: number;
  file?: any;
  files?: any[];
  khach_hang?: ICustomer;
  muc_dich_key?: any;
  name: string;
  ngay_thay_doi_tien_trinh?: any;
  nhan_vien_tao: any;
  note?: string;
  phone?: any;
  product_category_id: number;
  soluong: string;
  tien_trinh: any;
  tien_trinh_key: string;
  trang_thai: any;
  trang_thai_key: string;
}