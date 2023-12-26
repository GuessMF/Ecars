import React, {useEffect} from "react";
import Select from "react-select";

type OptionType = {
  value: string;
  label: string;
};

type CustomSelectProps = {
  value: string;
  options: OptionType[];
  onChange: (value: string) => void;
};

const CustomSelect: React.FC<CustomSelectProps> = ({
  value,
  options,
  onChange,
}) => {
  const transformedOptions: {value: string; label: string}[] = options.map(
    (option) => ({
      value: option.value,
      label: option.label,
    })
  );

  const initialOption = transformedOptions.find(
    (option) => option.value === value
  );

  useEffect(() => {
    if (initialOption) {
      setSelectedCurrency(initialOption);
    }
  }, []);

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
