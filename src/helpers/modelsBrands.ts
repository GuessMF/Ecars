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
      name: "acura",
      models: [{name: "mdx"}, {name: "rdx"}, {name: "rsx"}],
    },
    {
      name: "alfa romeo",
      models: [{name: "giulietta"}, {name: "giullia"}, {name: "stelvio"}],
    },
    {
      name: "audi",
      models: [{name: "a8"}, {name: "rs 6"}, {name: "rs 7"}, {name: "rs q8"}],
    },
    {
      name: "aston martin",
      models: [{name: "dbx"}, {name: "v8"}, {name: "db 9"}],
    },
    {
      name: "bentley",
      models: [
        {name: "continental gt"},
        {name: "bentayga"},
        {name: "flying spur"},
        {name: "mulsanne"},
      ],
    },
    {
      name: "bmw",
      models: [
        {name: "3"},
        {name: "5"},
        {name: "6"},
        {name: "7"},
        {name: "m3"},
        {name: "m5"},
        {name: "x3"},
        {name: "x5"},
        {name: "x7"},
      ],
    },
    {
      name: "ferrari",
      models: [
        {name: "california"},
        {name: "roma"},
        {name: "f8"},
        {name: "portofino"},
      ],
    },
    {
      name: "ford",
      models: [
        {name: "mustang"},
        {name: "f-150 raptor"},
        {name: "bronco"},
        {name: "shelby"},
      ],
    },
    {
      name: "infiniti",
      models: [{name: "qx80"}, {name: "qx60"}],
    },
    {
      name: "jaguar",
      models: [
        {name: "e-type"},
        {name: "f-type"},
        {name: "f-pace"},
        {name: "e-pace"},
      ],
    },
    {
      name: "land rover",
      models: [
        {name: "range rover"},
        {name: "defender"},
        {name: "range rover velar"},
      ],
    },
    {
      name: "lexus",
      models: [{name: "lx600"}, {name: "lx570"}, {name: "lx500"}],
    },
    {
      name: "maserati",
      models: [
        {name: "quattroporte"},
        {name: "grecale"},
        {name: "granturismo"},
      ],
    },
    {
      name: "maybach",
      models: [{name: "62"}, {name: "57"}],
    },
    {
      name: "mercedes benz",
      models: [
        {name: "g-klasse"},
        {name: "s-klasse"},
        {name: "maybach s-klasse"},
        {name: "gls"},
      ],
    },
    {
      name: "nissan",
      models: [{name: "gt-r"}, {name: "skyline gt-r"}, {name: "patrol"}],
    },
    {
      name: "porsche",
      models: [
        {name: "911"},
        {name: "cayenne"},
        {name: "macan"},
        {name: "panamera"},
      ],
    },
    {
      name: "rolls royce",
      models: [
        {name: "cullinan"},
        {name: "ghost"},
        {name: "phantom"},
        {name: "wraith"},
      ],
    },
    {
      name: "tesla",
      models: [
        {name: "model 3"},
        {name: "model s"},
        {name: "model y"},
        {name: "model x"},
      ],
    },
    {
      name: "toyota",
      models: [{name: "land cruiser 300"}, {name: "land cruiser 200"}],
    },
    {
      name: "volkswagen",
      models: [{name: "multivan"}, {name: "touareg"}],
    },
    {
      name: "volvo",
      models: [{name: "xc90"}, {name: "s90"}, {name: "xc70"}, {name: "s80"}],
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
