function sortCarByYearAscendingly(cars) {
  // Sangat dianjurkan untuk console.log semua hal hehe
  console.log(cars);

  // Clone array untuk menghindari side-effect
  // Apa itu side effect?
  const result = [...cars];
  let mobil = cars.slice();

  // Tulis code-mu disini
  let n = mobil.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - 1 - i; j++) {
      if (mobil[j].year > mobil[j + 1].year) {
        let temp = mobil[j];
        mobil[j] = mobil[j + 1];
        mobil[j + 1] = temp;
      }
    }
  }
  // Rubah code ini dengan array hasil sorting secara ascending
  return mobil;
}
