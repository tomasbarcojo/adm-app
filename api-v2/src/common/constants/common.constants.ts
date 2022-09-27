export interface I_COMMON_CONSTANTS {
  COUNTRY_CODES_BY_PHONE_CODE: {
    [phoneCode: number]: string;
  };
}

const COMMON_CONSTANTS_F: () => I_COMMON_CONSTANTS = () => {
  return {
    COUNTRY_CODES_BY_PHONE_CODE: {
      57: 'CO',
      52: 'MX',
      55: 'BR',
    },
    LANGUAGES_BY_COUNTRY_CODE: {
      CO: 'es-CO',
      MX: 'es-MX',
      BR: 'pt-BR',
    },
  };
};

export const COMMON_CONSTANTS = COMMON_CONSTANTS_F();
