import styled from "@emotion/styled";
import Button from "@mui/material/Button";

export const OutlineButton = styled(Button)(() => ({
  borderColor: " #cbd5e1",
  color: " #cbd5e1",
  "&:hover": {
    borderColor: "#f8fafc",
    color: "#f8fafc",
    boxShadow: "none",
  },
  "&:active": {
    boxShadow: "none",
    color: "#f8fafc",
    borderColor: "#f8fafc",
  },
  "&:focus": {
    boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
  },
}));
