import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import SortIcon from "@mui/icons-material/Sort";
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";

import { yearsList } from "../../data";

export default function YearDropdownMenu({ year, setYear }) {
  const handleChange = (event) => {
    setYear(event.target.value);
  };

  return (
    <>
      <Box sx={{ minWidth: 120 }}>
        <FormControl>
          <InputLabel id="demo-simple-select-label">Year</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={year}
            label="Country"
            onChange={handleChange}
          >
            {yearsList.map((year, index) => (
              <MenuItem key={index} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Stack direction="row" spacing={2}>
        <Button
          variant="outlined"
          size="small"
          startIcon={
            <>
              <SortIcon />
              <ArrowDownwardIcon />
            </>
          }
        >
          Sort by global ranking
        </Button>
        <Button
          variant="outlined"
          size="small"
          startIcon={
            <>
              <SortByAlphaIcon />
              <ArrowDownwardIcon />
            </>
          }
        >
          Sort alphabetically
        </Button>
      </Stack>
    </>
  );
}
