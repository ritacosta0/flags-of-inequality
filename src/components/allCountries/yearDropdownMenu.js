import { yearList } from "../../utils/yearList";
import flagsData from "../../data/rainbow.json";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import SortIcon from "@mui/icons-material/Sort";
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

export default function YearDropdownMenu(props) {
  const handleChange = (event) => {
    props.setYear(event.target.value);
  };
  const yearArray = yearList(flagsData);

  return (
    <>
      <Box sx={{ minWidth: 120 }}>
        <FormControl>
          <InputLabel id="demo-simple-select-label">Year</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={props.year}
            label="Country"
            onChange={handleChange}
          >
            {yearArray.map((year) => (
              <MenuItem value={year}>{year}</MenuItem>
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
              <ArrowDownwardIcon></ArrowDownwardIcon>
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
              <ArrowDownwardIcon></ArrowDownwardIcon>
            </>
          }
        >
          Sort alphabetically
        </Button>
      </Stack>
    </>
  );
}
