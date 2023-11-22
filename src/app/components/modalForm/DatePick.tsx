import { FormValues } from "@/app/dashboard/layout";
import { Stack } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useMemo } from "react";
import { Control, Controller, FieldError } from "react-hook-form";

type Props = {
  control: Control<FormValues, any>;
  labelFirst: string;
  labelSecond: string;
  nameFirst: "startDate" | "endDate" | "account" | "industry" | "state";
  nameSecond: "startDate" | "endDate" | "account" | "industry" | "state";
  endDateError: FieldError | undefined;
};

const DatePick = ({
  control,
  nameFirst,
  labelFirst,
  labelSecond,
  nameSecond,
  endDateError,
}: Props) => {
  const errorMessage = useMemo(() => {
    if (endDateError) {
      return "Please select a end date that is above the start date";
    }
    return "";
  }, [endDateError]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack
        alignItems={"start"}
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
              slotProps={{
                actionBar: {
                  actions: ["clear"],
                },
              }}
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
              onError={(e) => console.log(e)}
              slotProps={{
                actionBar: {
                  actions: ["clear"],
                },
                textField: {
                  helperText: errorMessage,
                },
              }}
              onAccept={(newDate) => {
                console.log(newDate);
              }}
            />
          )}
        />
      </Stack>
    </LocalizationProvider>
  );
};

export default DatePick;
