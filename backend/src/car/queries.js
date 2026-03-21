const getCars = "SELECT * FROM car";
const getCarByIdQuery = "SELECT * FROM car WHERE car_uid = $1";
const addCarQuery =
  "INSERT INTO car (car_uid, make, model, price) VALUES ($1, $2, $3, $4) RETURNING *";
const deleteCarQuery = "DELETE FROM car WHERE car_uid = $1 RETURNING *";
const updateCarQuery =
  "UPDATE car SET make = $1, model = $2, price = $3 WHERE car_uid = $4 RETURNING *";
const getCarsByPersonQuery =
  "SELECT car.* FROM car JOIN person ON person.car_uid = car.car_uid WHERE person.person_uid = $1";

export {
  getCars,
  getCarByIdQuery,
  addCarQuery,
  deleteCarQuery,
  updateCarQuery,
  getCarsByPersonQuery,
};
