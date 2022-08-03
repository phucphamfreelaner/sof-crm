import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import qs from "qs";

export const useQueryParams = () => {
  const { search, pathname } = useLocation();
  const navigate = useNavigate();

  const [queryParams, _setQueryParams] = React.useState<any>({});

  React.useEffect(() => {
    const _search = qs.parse(search.substring(1));
    _setQueryParams(_search);
  }, [search]);

  const setSearchParams = (data: any) => {
    const searchParamsString = qs.stringify(data, { encode: false });
    navigate({ pathname: pathname, search: searchParamsString });
  };
  return [queryParams, setSearchParams];
};
