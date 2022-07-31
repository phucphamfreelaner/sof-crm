import * as UI from "@/libs/ui";
import { useGetDonViTinhByKeyQuery } from "@/store/donViTinh";
import { useGetLoaiTienByKeyQuery } from "@/store/loaiTien";
import { useGetSanPhamByIdQuery } from "@/store/sanPham";

export const ProductName = ({ id }: { id: string }) => {
  const { data, isLoading } = useGetSanPhamByIdQuery({ id }, { skip: !id });
  return isLoading ? (
    <UI.Skeleton width="100%" />
  ) : (
    <UI.Typography variant="caption">{data?.name}</UI.Typography>
  );
};

export const UnitName = ({ code }: { code: string }) => {
  const { data, isLoading } = useGetDonViTinhByKeyQuery(
    { value: code },
    { skip: !code }
  );
  return isLoading ? (
    <UI.Skeleton width="100%" />
  ) : (
    <UI.Typography variant="caption">{data?.name}</UI.Typography>
  );
};

export const CurrencyType = ({ code }: { code: string }) => {
  const { data, isLoading } = useGetLoaiTienByKeyQuery(
    { value: code },
    { skip: !code }
  );
  return isLoading ? (
    <UI.Skeleton width="100%" />
  ) : (
    <UI.Typography variant="caption">{data?.name}</UI.Typography>
  );
};
