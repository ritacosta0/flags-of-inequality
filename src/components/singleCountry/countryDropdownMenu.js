import { countryList } from "../../utils/countryList";
import flagsData from "../../data/rainbow.json";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function CountryDropdownMenu(props) {
  const handleChange = (event) => {
    props.setCountry(event.target.value);
  };
  const countryArray = countryList(flagsData);

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl>
        <InputLabel id="demo-simple-select-label">Country</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props.country}
          label="Country"
          onChange={handleChange}
        >
          {countryArray.map((country) => (
            <MenuItem value={country}>{country}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
