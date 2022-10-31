import { useHistory } from 'react-router-dom';

export function useQueryParams() {
  const history = useHistory();
  const urlParams = new URLSearchParams(history.location.search);

  const setParam = (paramName, paramValue) => {
    urlParams.set(paramName, paramValue);
    const pathName = history.location.pathname;
    const newRoute = `${pathName}?${urlParams.toString()}`;
    history.replace(newRoute);
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
