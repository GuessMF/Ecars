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
  useEffect(() => {
    console.log(value);
  }, [value]);
  console.log(options);

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
    console.log(selectedOption);

    setSelectedCurrency(selectedOption);
    onChange(selectedOption.value);
  };

  return (
    <Select
      classNamePrefix="custom__select"
      value={selectedCurrency}
      options={transformedOptions}
      onChange={onClickCurrency}
    />
  );
};

export default CustomSelect;
// import React, {useEffect, useState} from "react";
// import Select from "react-select";

// type OptionType = {
//   value: string;
//   label: string;
// };

// type CustomSelectProps = {
//   value: string;
//   options: OptionType[];
//   onChange: (value: string) => void;
// };

// const CustomSelect: React.FC<CustomSelectProps> = ({
//   value,
//   options,
//   onChange,
// }) => {
//   const [selectedCurrency, setSelectedCurrency] = useState(() => {
//     const initialOption = options.find((option) => option.value === value);
//     return initialOption
//       ? {value: initialOption.value, label: initialOption.label}
//       : null;
//   });

//   useEffect(() => {
//     if (selectedCurrency === null) {
//       const initialOption = options.find((option) => option.value === value);
//       if (initialOption) {
//         setSelectedCurrency({
//           value: initialOption.value,
//           label: initialOption.label,
//         });
//       }
//     }
//   }, [value, options, selectedCurrency]);

//   const transformedOptions: {value: string; label: string}[] = options.map(
//     (option) => ({
//       value: option.value,
//       label: option.label,
//     })
//   );

//   const onClickCurrency = (selectedOption: any) => {
//     setSelectedCurrency(selectedOption);
//     onChange(selectedOption.value);
//   };

//   return (
//     <Select
//       value={selectedCurrency}
//       options={transformedOptions}
//       onChange={onClickCurrency}
//     />
//   );
// };

// export default CustomSelect;
