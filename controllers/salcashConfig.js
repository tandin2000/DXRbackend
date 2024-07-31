import loggerUtil from '../utils/logger.js';
import db from "../utils/db.js"

// Update updateSalcashFee
const updateSalcashFee = async (req, res) => {
  const query = 'UPDATE salcash_config SET ? WHERE _id = 1';
  
  db.query(query, [req.body], (err, results) => {
    if (err) {
      loggerUtil.error(`updateSalcashFee controller: ${err}`);
      return res.status(500).send({message: 'Error updating Fee'});
    }
    loggerUtil.info("Salcash Fee updated successfully.");
    res.status(200).send({ message: 'Salcash Fee updated successfully'});
  });
};


const getSalcashFee = async (req, res) => {
  const query = 'SELECT * FROM salcash_config WHERE _id = 1';
  db.query(query, (err, results) => {
    if (err) {
      loggerUtil.error(`getSalcashFee controller: ${err}`);
      return res.status(500).send({message: 'Server Error'});
    }
    if (results.length === 0) {
      loggerUtil.error(`getSalcashFee controller: Fee not found`);
      return res.status(404).send({message: 'Fee not found'});
    }
    loggerUtil.info("Fee retrieved successfully.");
    res.status(200).send({ message: "Fee retrieved successful", data: results[0] });

  });
};


const companyLocationController = { updateSalcashFee, getSalcashFee};
export default companyLocationController;

