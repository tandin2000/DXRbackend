import loggerUtil from '../utils/logger.js';
import db from "../utils/db.js"
// create createCompanyLocation
const createCompanyLocation = async (req, res) => {
  /*
  #swagger.tags = ['CompanyLocation']
  #swagger.description = 'Endpoint to handle create company location.'
  */
  const companyLocation = req.body;
  const query = 'INSERT INTO company_location  SET ?';
  
  db.query(query, companyLocation, (err, results) => {
    if(err){
      loggerUtil.error(`createCompanyLocation controller: ${err}`);
      return res.status(500).send({message: 'Server Error'});
    }
    loggerUtil.info("Company Location added successfully.");
    res.status(200).send({ message: "Company Location added successful", data: results.insertId });
  });
  
};


// Update updateCompanyLocation
const updateCompanyLocation = async (req, res) => {
  /*
  #swagger.tags = ['CompanyLocation']
  #swagger.description = 'Endpoint to update company location.'
  */
  const query = 'UPDATE company_location SET ? WHERE _id = ?';
  
  db.query(query, [req.body, req.params.id], (err, results) => {
    if (err) {
      loggerUtil.error(`updateCompanyLocation controller: ${err}`);
      return res.status(500).send({message: 'Error updating company'});
    }
    if (results.affectedRows === 0) {
      loggerUtil.error(`updateCompanyLocation controller: Company Location not found`);
      return res.status(404).send({message: 'Company Location not found'});
    }
    loggerUtil.info("Company Location updated successfully.");
    res.status(200).send({ message: 'Company Location updated successfully'});
  });
};

const getCompanyLocation = async (req, res) => {
  /*
  #swagger.tags = ['CompanyLocation']
  #swagger.description = 'Endpoint to handle get company location by company_id.'
  */
  const companyId = req.params.id;
  const query = 'SELECT * FROM company_location WHERE company_id = ?';

  db.query(query, [companyId], (err, results) => {
    if (err) {
      loggerUtil.error(`getCompanyLocation controller: ${err}`);
      return res.status(500).send({ message: 'Server Error' });
    }
    if (results.length === 0) {
      return res.status(404).send({ message: 'No locations found for this company ID' });
    }
    loggerUtil.info("Company Locations retrieved successfully.");
    res.status(200).send({ message: "Company Locations retrieved successfully", data: results });
  });
};

const getLocationById = async (req, res) => {
  const query = 'SELECT * FROM company_location WHERE _id = ?';
  db.query(query, [req.params.id], (err, results) => {
    if (err) {
      loggerUtil.error(`getLocationById controller: ${err}`);
      return res.status(500).send({message: 'Server Error'});
    }
    if (results.length === 0) {
      loggerUtil.error(`getLocationById controller: Location not found`);
      return res.status(404).send({message: 'Location not found'});
    }
    loggerUtil.info("Location retrieved successfully.");
    res.status(200).send({ message: "Location retrieved successful", data: results[0] });

  });
};

const deleteCompanyLocation = async (req, res) => {
  const query = 'DELETE FROM company_location WHERE _id = ?';
  
  db.query(query, [req.params.id], (err, results) => {
    if (err) {
      loggerUtil.error(`deleteCompanyLocation controller: ${err}`);
      return res.status(500).send({ message: 'Server Error' });
    }
    if (results.affectedRows === 0) {
      loggerUtil.error(`deleteCompanyLocation controller: Company Location not found`);
      return res.status(404).send({ message: 'Company Location not found' });
    }
    loggerUtil.info("Company Location deleted successfully.");
    res.status(200).send({ message: 'Company Location deleted successfully' });
  });
};


const companyLocationController = { createCompanyLocation, updateCompanyLocation, getCompanyLocation, getLocationById, deleteCompanyLocation};
export default companyLocationController;

