interface CarModel {
  name: string;
}

interface CarBrand {
  name: string;
  models: CarModel[];
}
interface OtherTypes {
  value: string;
}

interface CarData {
  brands: CarBrand[];
  fuels: OtherTypes[];
  years: OtherTypes[];
  colors: OtherTypes[];
  transmissions: OtherTypes[];
  vehicleType: OtherTypes[];
  interior: OtherTypes[];
  wheels: OtherTypes[];
  seats: OtherTypes[];
  location: OtherTypes[];
  exportStatus: OtherTypes[];
  owners: OtherTypes[];
  engineValue: OtherTypes[];
  currency: OtherTypes[];
}

const carData: CarData = {
  brands: [
    {
      name: "Acura",
      models: [{name: "MDX"}, {name: "RDX"}, {name: "RSX"}],
    },
    {
      name: "Alfa Romeo",
      models: [{name: "Giulietta"}, {name: "Giullia"}, {name: "Stelvio"}],
    },
    {
      name: "Audi",
      models: [{name: "A8"}, {name: "RS 6"}, {name: "RS 7"}, {name: "RS Q8"}],
    },
    {
      name: "Aston Martin",
      models: [{name: "DBX"}, {name: "V8"}, {name: "DB 9"}],
    },
    {
      name: "Bentley",
      models: [
        {name: "Continental GT"},
        {name: "Bentayga"},
        {name: "Flying Spur"},
        {name: "Mulsanne"},
      ],
    },
    {
      name: "BMW",
      models: [
        {name: "3"},
        {name: "5"},
        {name: "6"},
        {name: "7"},
        {name: "M3"},
        {name: "M5"},
        {name: "X3"},
        {name: "X5"},
        {name: "X7"},
      ],
    },
    {
      name: "Ferrari",
      models: [
        {name: "California"},
        {name: "Roma"},
        {name: "F8"},
        {name: "Portofino"},
      ],
    },
    {
      name: "Ford",
      models: [
        {name: "Mustang"},
        {name: "F-150 Raptor"},
        {name: "Bronco"},
        {name: "Shelby"},
      ],
    },
    {
      name: "Infiniti",
      models: [{name: "QX80"}, {name: "QX60"}],
    },
    {
      name: "Jaguar",
      models: [
        {name: "E-Type"},
        {name: "F-Type"},
        {name: "F-Pace"},
        {name: "E-Pace"},
      ],
    },
    {
      name: "Land Rover",
      models: [
        {name: "Range Rover"},
        {name: "Defender"},
        {name: "Range Rover Velar"},
      ],
    },
    {
      name: "Lexus",
      models: [{name: "LX600"}, {name: "LX570"}, {name: "LX500"}],
    },
    {
      name: "Maserati",
      models: [
        {name: "Quattroporte"},
        {name: "Grecale"},
        {name: "GranTurismo"},
      ],
    },
    {
      name: "Maybach",
      models: [{name: "62"}, {name: "57"}],
    },
    {
      name: "Mercedes Benz",
      models: [
        {name: "G-Klasse"},
        {name: "S-Klasse"},
        {name: "Maybach S-Klasse"},
        {name: "GLS"},
      ],
    },
    {
      name: "Nissan",
      models: [{name: "GT-R"}, {name: "Skyline GT-R"}, {name: "Patrol"}],
    },
    {
      name: "Porsche",
      models: [
        {name: "911"},
        {name: "Cayenne"},
        {name: "Macan"},
        {name: "Panamera"},
      ],
    },
    {
      name: "Rolls Royce",
      models: [
        {name: "Cullinan"},
        {name: "Ghost"},
        {name: "Phantom"},
        {name: "Wraith"},
      ],
    },
    {
      name: "Tesla",
      models: [
        {name: "Model 3"},
        {name: "Model S"},
        {name: "Model Y"},
        {name: "Model X"},
      ],
    },
    {
      name: "Toyota",
      models: [{name: "Land Cruiser 300"}, {name: "Land Cruiser 200"}],
    },
    {
      name: "Volkswagen",
      models: [{name: "Multivan"}, {name: "Touareg"}],
    },
    {
      name: "Volvo",
      models: [{name: "XC90"}, {name: "S90"}, {name: "XC70"}, {name: "S80"}],
    },
  ],
  fuels: [
    {value: "Gasoline"},
    {value: "Diesel"},
    {value: "Hybrid"},
    {value: "Electric"},
  ],
  years: [],
  colors: [
    {value: "White"},
    {value: "Black"},
    {value: "Silver"},
    {value: "Gray"},
    {value: "Blue"},
    {value: "Red"},
    {value: "Green"},
    {value: "Brown"},
    {value: "Gold"},
    {value: "Purple"},
    {value: "Orange"},
    {value: "Yellow"},
    {value: "Pink"},
  ],
  transmissions: [{value: "Automatic"}, {value: "Manual"}],
  vehicleType: [
    {value: "SUV"},
    {value: "Sedan"},
    {value: "Hatchback"},
    {value: "Coupe"},
    {value: "StationWagon"},
    {value: "Van"},
    {value: "Convertible"},
    {value: "PickUp"},
  ],

  interior: [
    {value: "Black"},
    {value: "White"},
    {value: "Brown"},
    {value: "Orange"},
    {value: "Yellow"},
    {value: "Red"},
  ],
  wheels: [
    {value: "14"},
    {value: "15"},
    {value: "16"},
    {value: "17"},
    {value: "18"},
    {value: "19"},
    {value: "20"},
    {value: "21"},
    {value: "22"},
    {value: "23"},
  ],
  seats: [
    {value: "2"},
    {value: "3"},
    {value: "4"},
    {value: "5"},
    {value: "6"},
    {value: "7"},
  ],
  location: [
    {value: "SaintPetersburg"},
    {value: "Moscow"},
    {value: "Almaty"},
    {value: "Minsk"},
    {value: "Dubai"},
    {value: "AbuDhabi"},
    {value: "Shanghai"},
  ],
  exportStatus: [{value: "Can be exported"}, {value: "Can't be exported"}],
  owners: [
    {value: "None"},
    {value: "One"},
    {value: "Two"},
    {value: "Three"},
    {value: "More"},
  ],
  engineValue: [],
  currency: [{value: "RUB"}, {value: "USD"}, {value: "EUR"}],
};

const createYears = () => {
  const startValue = new Date().getFullYear();
  const endValue = 1980;
  for (let i = startValue; i >= endValue; i--) {
    carData.years.push({value: i.toString()});
  }
};

const createEngineValue = () => {
  const startValue = 0.1;
  const endValue = 10;
  for (let i = startValue; i <= endValue; i += 0.1) {
    carData.engineValue.push({value: i.toFixed(1)});
  }
};
createYears();
createEngineValue();

export default carData;
