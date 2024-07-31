import loggerUtil from '../utils/logger.js';
import db from "../utils/db.js"
// create createCompanyConfiguration
const createCompanyConfiguration = async (req, res) => {
  /*
  #swagger.tags = ['CompanyConfiguration']
  #swagger.description = 'Endpoint to handle create company configuration.'
  */
  const companyConfiguration = req.body;
  const query = 'INSERT INTO company_configuration  SET ?';
  db.query(query, companyConfiguration, (err, results) => {
    if(err){
      loggerUtil.error(`createCompanyConfiguration controller: ${err}`);
      return res.status(500).send({message: 'Server Error'});
    }
    loggerUtil.info("Company Configuration added successfully.");
    res.status(200).send({ message: "Company Configuration added successful", data: results.insertId });
  });
  
};

// Update updateCompanyConfiguration
const updateCompanyConfiguration = async (req, res) => {
  /*
  #swagger.tags = ['CompanyConfiguration']
  #swagger.description = 'Endpoint to update company configuration.'
  */
  const query = 'UPDATE company_configuration SET ? WHERE _id = ?';
  
  db.query(query, [req.body, req.params.id], (err, results) => {
    if (err) {
      loggerUtil.error(`updateCompanyConfiguration controller: ${err}`);
      return res.status(500).send({message: 'Error updating company'});
    }
    if (results.affectedRows === 0) {
      loggerUtil.error(`updateCompanyConfiguration controller: Company Configuration not found`);
      return res.status(404).send({message: 'Company Configuration not found'});
    }
    loggerUtil.info("Company Configuration updated successfully.");
    res.status(200).send({ message: 'Company Configuration updated successfully'});
  });
};


const companyConfigurationController = { createCompanyConfiguration, updateCompanyConfiguration};
export default companyConfigurationController;

