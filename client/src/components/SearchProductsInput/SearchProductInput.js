import { useEffect, useMemo, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import Token from '../../Token/Token';
import { useDispatch, useSelector } from 'react-redux';
import { addDataPurchase } from '../../actions/purchases';

const { REACT_APP_URL_API } = process.env;

export default function SearchProductsInput() {
  const token = Token();
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);
  const newPurchase = useSelector((state) => state.newPurchase);
  const dispatch = useDispatch();

  const fetchData = async (isOpened) => {
    let active = true;
    if (!inputValue && !isOpened) {
      setOptions(value ? [value] : []);
      return undefined;
    }

    const res = await fetch(`${REACT_APP_URL_API}/product?search=${inputValue}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await res.json();
    if (active) {
      let newOptions = [];

      if (value) {
        newOptions = [value];
      }

      if (result) {
        newOptions = [...newOptions, ...result.data];
      }

      setOptions(newOptions);
    }

    return () => {
      active = false;
    };
  };

  useEffect(() => {
    fetchData();
  }, [value, inputValue]);

  const handleChange = (newValue) => {
    setOptions(newValue ? [newValue, ...options] : options);
    setValue(newValue);
    if (newValue) {
      const productDataObj = {
        productId: newValue.id,
        name: newValue.name,
        stock: newValue.stock,
        price: newValue.price,
      };
      newPurchase.productList = [...newPurchase.productList, productDataObj]
      dispatch(addDataPurchase(newPurchase));
    }
  };

  return (
    <Autocomplete
      id="SearchProductsInput"
      getOptionLabel={(option) => option.name}
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      noOptionsText="No encontramos productos"
      onOpen={() => fetchData(true)}
      onChange={(event, newValue) => {
        handleChange(newValue);
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => <TextField variant="standard" {...params} label="Buscar productos" />}
      renderOption={(props, option) => {
        return (
          <li {...props}>
            <Grid container alignItems="center">
              <Grid item sx={{ display: 'flex', width: 44 }}>
                <Inventory2OutlinedIcon sx={{ color: 'text.secondary' }} />
              </Grid>
              <Grid item sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}>
                <Box key={option.id} component="span" sx={{ fontWeight: option.highlight ? 'bold' : 'regular' }}>
                  {option.name}
                </Box>

                <Typography variant="body2" color="text.secondary">
                  Id: {option.id}
                </Typography>
              </Grid>
            </Grid>
          </li>
        );
      }}
    />
  );
}
