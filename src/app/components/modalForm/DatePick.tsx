import { Stack } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const DatePick = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack
        alignItems={"center"}
        justifyContent={"center"}
        gap={3}
        sx={{
          flexDirection: { xs: "column", sm: "row" },
        }}
        width={"100%"}
      >
        <DatePicker sx={{ width: "100%" }} label={"Start date"} />
        To
        <DatePicker sx={{ width: "100%" }} label={"End date"} />
      </Stack>
    </LocalizationProvider>
  );
};

export default DatePick;
