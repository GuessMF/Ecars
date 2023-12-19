import React from "react";
import Select from "react-select";

type OptionType = {
  value: string;
  label: string;
};

type CustomSelectProps = {
  options: OptionType[];
  //   onChange: (selectedOption: {value: string; label: string}) => void;
  //  onChange: (selectedOption: OptionType) => void;
};

const CustomSelect: React.FC<CustomSelectProps> = ({options}) => {
  const transformedOptions: {value: string; label: string}[] = options.map(
    (option) => ({
      value: option.value,
      label: option.label,
    })
  );

  return <Select options={transformedOptions} />;
};

export default CustomSelect;
