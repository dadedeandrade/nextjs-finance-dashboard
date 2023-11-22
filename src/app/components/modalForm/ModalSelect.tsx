import { FormValues } from "@/app/dashboard/layout";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { UseFormRegister } from "react-hook-form";

type Props = {
  labelId: string;
  id: "startDate" | "endDate" | "account" | "industry" | "state";
  label: string;
  inputLabel: string;
  availableOptions: string[];
  register: UseFormRegister<FormValues>;
};
const ModalSelect = ({
  labelId,
  id,
  label,
  inputLabel,
  availableOptions,
  register,
}: Props) => {
  return (
    <FormControl fullWidth>
      <InputLabel id={id}>{inputLabel}</InputLabel>
      <Select labelId={labelId} id={id} label={label} {...register(id)}>
        <MenuItem key={""} value={""}>
          None
        </MenuItem>
        {availableOptions.map((el) => {
          return (
            <MenuItem key={el} value={el}>
              {el}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default ModalSelect;
