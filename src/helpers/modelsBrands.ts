interface CarModel {
  name: string;
}

interface CarBrand {
  name: string;
  models: CarModel[];
}

interface CarData {
  brands: CarBrand[];
}

const carData: CarData = {
  brands: [
    {
      name: "Acura",
      models: [{name: "MDX"}, {name: "RDX"}, {name: "RSX"}],
    },
    {
      name: "Alfa Romeo",
      models: [{name: "Giulietta"}, {name: "Giullia"}],
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
};

// Acura
// Alfa Romeo
// Aston Martin
// Audi
// Bentley
// BMW
// Ferrari
// Ford
// Infiniti
// Jaguar
// Land Rover
// Lexus
// Maserati
// Maybach
// Mercedes Benz
// Nissan
// Porsche
// Rolls Royce
// Tesla
// Toyota
// Volkswagen
// Volvo

export default carData;
