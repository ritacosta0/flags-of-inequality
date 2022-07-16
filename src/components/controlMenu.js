import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

export default function ControlMenu(props) {
  return (
    <ButtonGroup variant="outlined" aria-label="outlined primary button group">
      <Button onClick={() => props.setButtonValue("single country")}>
        Single Country
      </Button>
      <Button onClick={() => props.setButtonValue("all countries")}>
        All Countries
      </Button>
    </ButtonGroup>
  );
}
