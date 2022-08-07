import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
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

export default function Controls({
  year,
  setYear,
  setOrderRanking,
  setOrderAlphabetical,
  orderRanking,
  orderAlphabetical,
  setSortDict,
}) {
  const handleChange = (event) => {
    setYear(event.target.value);
  };
  const handleClickAlphabetical = () => {
    setOrderAlphabetical(!orderAlphabetical);
    setSortDict({ type: "country", ascending: !orderAlphabetical });
  };
  const handleClickRanking = () => {
    setOrderRanking(!orderRanking);
    setSortDict({ type: "hate", ascending: !orderRanking });
  };
  console.log(orderAlphabetical);

  return (
    <Stack direction="row" spacing={4} my={4}>
      <Box>
        <FormControl size="small">
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
          onClick={handleClickRanking}
          variant="outlined"
          size="small"
          startIcon={
            <>
              <SortIcon />
              {orderRanking ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
            </>
          }
        >
          Sort by global ranking
        </Button>
        <Button
          onClick={handleClickAlphabetical}
          variant="outlined"
          size="small"
          startIcon={
            <>
              <SortByAlphaIcon />
              {orderAlphabetical ? (
                <ArrowUpwardIcon />
              ) : (
                <ArrowDownwardIcon />
              )}{" "}
            </>
          }
        >
          Sort alphabetically
        </Button>
      </Stack>
    </Stack>
  );
}
