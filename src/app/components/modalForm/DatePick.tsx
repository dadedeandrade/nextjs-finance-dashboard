import { FormValues } from "@/app/dashboard/layout";
import { Stack } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Control, Controller } from "react-hook-form";

type Props = {
  control: Control<FormValues, any>;
  labelFirst: string;
  labelSecond: string;
  nameFirst: "startDate" | "endDate" | "account" | "industry" | "state";
  nameSecond: "startDate" | "endDate" | "account" | "industry" | "state";
  defaultValueFirst: any;
  defaultValueSecond: any;
};

const DatePick = ({
  control,
  nameFirst,
  labelFirst,
  labelSecond,
  nameSecond,
  defaultValueFirst,
  defaultValueSecond,
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
          render={({ field: { onChange, ref, value } }) => (
            <DatePicker
              sx={{ width: "100%" }}
              label={labelFirst}
              defaultValue={""}
              slotProps={{
                actionBar: {
                  actions: ["clear"],
                },
              }}
<<<<<<< HEAD
              value={value ?? new Date()}
=======
              value={value ?? ""}
>>>>>>> ffb561ba6e98a11a73b89ded94a6560532085b3a
              onChange={onChange}
              ref={ref}
            />
          )}
        />
        To
        <Controller
          name={nameSecond}
          control={control}
          render={({ field: { onChange, ref, value } }) => (
            <DatePicker
              sx={{ width: "100%" }}
              label={labelSecond}
              slotProps={{
                actionBar: {
                  actions: ["clear"],
                },
              }}
              onAccept={(newDate) => {
                console.log(newDate);
              }}
              value={value ?? new Date()}
              onChange={onChange}
              ref={ref}
            />
          )}
        />
      </Stack>
    </LocalizationProvider>
  );
};

export default DatePick;
