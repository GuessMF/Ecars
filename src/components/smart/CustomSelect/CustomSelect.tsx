import React, {useEffect} from "react";
import Select from "react-select";

type OptionType = {
  value: string;
  label: string;
};

type CustomSelectProps = {
  options: OptionType[];
  onChange: (value: string) => void;
};

const CustomSelect: React.FC<CustomSelectProps> = ({options, onChange}) => {
  const transformedOptions: {value: string; label: string}[] = options.map(
    (option) => ({
      value: option.value,
      label: option.label,
    })
  );

  const initialOption = transformedOptions.find(
    (option) => option.value === ""
  );

  const [selectedCurrency, setSelectedCurrency] = React.useState(initialOption);

  const onClickCurrency = (selectedOption: any) => {
    setSelectedCurrency(selectedOption);
    onChange(selectedOption.value);
  };

  return (
    <Select
      value={selectedCurrency}
      options={transformedOptions}
      onChange={onClickCurrency}
    />
  );
};

export default CustomSelect;
