import * as UI from "@/libs/ui";
import { GridRenderCellParams, useGridApiContext } from "@mui/x-data-grid";

import {
  useGetDonViTinhByKeyQuery,
  useGetDonViTinhListQuery,
} from "@/store/donViTinh";
import {
  useGetLoaiTienByKeyQuery,
  useGetLoaiTienListQuery,
} from "@/store/loaiTien";
import {
  useGetSanPhamByIdQuery,
  useGetSanPhamListQuery,
} from "@/store/sanPham";

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

export const NganhHangSelectCell = (props: GridRenderCellParams) => {
  const { id, value, field } = props;
  const apiRef = useGridApiContext();

  const { data: sanPhamData } = useGetSanPhamListQuery({});

  const handleChange = async (event: any) => {
    await apiRef.current.setEditCellValue({
      id,
      field,
      value: event.target.value,
    });
    apiRef.current.stopCellEditMode({ id, field });
  };

  return (
    <UI.TextField
      placeholder="Chọn ngàng hàng"
      value={value}
      onChange={handleChange}
      size="small"
      select
    >
      {sanPhamData?.map((x) => (
        <UI.MenuItem key={x.id} value={x.id}>
          {x.name}
        </UI.MenuItem>
      ))}
    </UI.TextField>
  );
};

export const DonViTinhSelectCell = (props: GridRenderCellParams) => {
  const { id, value, field } = props;
  const apiRef = useGridApiContext();

  const { data: donViTinhData } = useGetDonViTinhListQuery({});

  const handleChange = async (event: any) => {
    await apiRef.current.setEditCellValue({
      id,
      field,
      value: event.target.value,
    });
    apiRef.current.stopCellEditMode({ id, field });
  };

  return (
    <UI.TextField
      placeholder="Chọn đơn vị"
      value={value}
      onChange={handleChange}
      size="small"
      select
    >
      {donViTinhData?.map((x: any) => (
        <UI.MenuItem key={x?.id} value={x?.value}>
          {x?.label}
        </UI.MenuItem>
      ))}
    </UI.TextField>
  );
};

export const LoaiTienSelectCell = (props: GridRenderCellParams) => {
  const { id, value, field } = props;
  const apiRef = useGridApiContext();

  const { data: loaiTienData } = useGetLoaiTienListQuery({});

  const handleChange = async (event: any) => {
    await apiRef.current.setEditCellValue({
      id,
      field,
      value: event.target.value,
    });
    apiRef.current.stopCellEditMode({ id, field });
  };

  return (
    <UI.TextField
      placeholder="Chọn loại tiền"
      value={value}
      onChange={handleChange}
      size="small"
      select
    >
      {loaiTienData?.map((x: any) => (
        <UI.MenuItem key={x?.id} value={x?.value}>
          {x?.label}
        </UI.MenuItem>
      ))}
    </UI.TextField>
  );
};
