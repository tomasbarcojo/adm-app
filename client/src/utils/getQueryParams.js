/* eslint-disable no-extra-boolean-cast */
export const getQueryParams = (params) => {
  const reducer = (accumulator, currentKey) => {
    if (params[currentKey] == null) return accumulator;

    if (Array.isArray(params[currentKey])) {
      if (params[currentKey].length < 1) return accumulator;
      return `${accumulator}${!!accumulator ? "&" : ""}${currentKey}=${params[
        currentKey
      ].join(",")}`;
    }

    return `${accumulator}${!!accumulator ? "&" : ""}${currentKey}=${
      params[currentKey]
    }`;
  };

  return Object.keys(params).reduce(reducer, "");
};