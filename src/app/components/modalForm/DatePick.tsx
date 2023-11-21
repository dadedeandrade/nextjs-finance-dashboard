import { Stack } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Controller } from "react-hook-form";

type Props = {
  control: any;
  labelFirst: any;
  labelSecond: any;
  nameFirst: any;
  nameSecond: any;
};

const DatePick = ({
  control,
  nameFirst,
  labelFirst,
  labelSecond,
  nameSecond,
}: Props) => {
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
        <Controller
          name={nameFirst}
          control={control}
          render={({ field: { onChange, value } }) => (
            <DatePicker
              sx={{ width: "100%" }}
              label={labelFirst}
              value={value}
              onChange={onChange}
            />
          )}
        />
        To
        <Controller
          name={nameSecond}
          control={control}
          render={({ field: { onChange, value } }) => (
            <DatePicker
              sx={{ width: "100%" }}
              label={labelSecond}
              value={value}
              onChange={onChange}
            />
          )}
        />
      </Stack>
    </LocalizationProvider>
  );
};

export default DatePick;
