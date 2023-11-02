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
      models: [{name: "1"}, {name: "2"}, {name: "3"}],
    },
    {
      name: "Audi",
      models: [{name: "A8"}, {name: "RS 6"}, {name: "RS 7"}, {name: "RS Q8"}],
    },
    {
      name: "Alfa Romeo",
      models: [{name: "Giulietta"}, {name: "Giullia"}],
    },
    {
      name: "Aston Martin",
      models: [{name: "DBX"}, {name: "V8"}, {name: "Escape"}],
    },
    // Добавьте другие марки и их модели по аналогии
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
