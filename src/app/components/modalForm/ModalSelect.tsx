import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

type Props = {
  labelId: string;
  id: string;
  value: string;
  label: string;
  onChangeFn: (event: SelectChangeEvent) => void;
  inputLabel: string;
  availableOptions: string[];
};
const ModalSelect = ({
  labelId,
  id,
  label,
  onChangeFn,
  inputLabel,
  value,
  availableOptions,
}: Props) => {
  return (
    <FormControl fullWidth>
      <InputLabel id={id}>{inputLabel}</InputLabel>
      <Select
        labelId={labelId}
        id={id}
        value={value}
        label={label}
        onChange={onChangeFn}
      >
        {availableOptions.map((el) => {
          return <MenuItem key={el} value={el}>{el}</MenuItem>;
        })}
      </Select>
    </FormControl>
  );
};

export default ModalSelect;
