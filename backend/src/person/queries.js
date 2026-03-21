const getPerson = "SELECT * FROM person";
const getPersonByIdQuery = "SELECT * FROM person WHERE person_uid = $1";
const emailCheckQuery = "SELECT s FROM person s WHERE s.email = $1";
const addPersonQuery =
  "INSERT INTO person (first_name, last_name, email, car_uid) VALUES ($1, $2, $3, $4) RETURNING *";
const deletePersonQuery =
  "DELETE FROM person WHERE person_uid = $1 RETURNING *";
const updatePersonQuery =
  "UPDATE person SET first_name = $1, last_name = $2, email = $3, car_uid = $4 WHERE person_uid = $5 RETURNING *";
export {
  getPerson,
  getPersonByIdQuery,
  emailCheckQuery,
  addPersonQuery,
  deletePersonQuery,
  updatePersonQuery,
};
