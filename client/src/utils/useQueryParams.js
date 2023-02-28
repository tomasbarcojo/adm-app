import { useNavigate } from 'react-router-dom';

export function useQueryParams() {
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(navigate.location.search);

  const setParam = (paramName, paramValue) => {
    urlParams.set(paramName, paramValue);
    const pathName = navigate.location.pathname;
    const newRoute = `${pathName}?${urlParams.toString()}`;
    navigate(newRoute, { replace: true });
  };
  const getObject = () => {
    const result = {};
    urlParams.forEach((value, key) => {
      result[key] = value;
    });

    return result;
  };
  return {
    params: getObject(),
    setParam,
  };
}
