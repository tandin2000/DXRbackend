import loggerUtil from '../utils/logger.js';
import db from "../utils/db.js"
import companyConfiguration from './companyConfiguration.js';

// // create createCompanyLocationConfiguration
const createCompanyLocationConfiguration = async (req, res) => {
  /*
  #swagger.tags = ['CompanyLocationConfiguration']
  #swagger.description = 'Endpoint to handle create company locationConfiguration.'
  */
  const {company_id,location_id, carder_id, department_id, salary_date, month_start, month_end, max_percentage_override} = req.body;
  const req1 = {company_id,location_id,carder_id,department_id
  }
  const query = 'INSERT INTO company_location_configuration  SET ?';
  
  db.query(query, req1, (err, results) => {
    if(err){
      loggerUtil.error(`createCompanyLocationConfiguration controller: ${err}`);
      return res.status(500).send({message: 'Server Error'});
    }
    loggerUtil.info("Company LocationConfiguration added successfully.");
    // res.status(200).send({ message: "Company Location Configuration added successful", data: results.insertId });
    const req2 = {
      company_id,salary_date,month_start,month_end,max_percentage_override,
      company_location_configuration_id: results.insertId
    }
    req.body = req2
    companyConfiguration.createCompanyConfiguration(req, res)
  });
  
};


// create createCompanyLocationConfiguration
const createCompanyLocationConfigurationUser = async (req, res) => {
  /*
  #swagger.tags = ['CompanyLocationConfiguration']
  #swagger.description = 'Endpoint to handle create company locationConfiguration.'
  */
  const companyLocationConfiguration = req.body;
  const query = 'INSERT INTO company_location_configuration  SET ?';
  
  db.query(query, companyLocationConfiguration, (err, results) => {
    if(err){
      loggerUtil.error(`createCompanyLocationConfiguration controller: ${err}`);
      return res.status(500).send({message: 'Server Error'});
    }
    loggerUtil.info("Company LocationConfiguration added successfully.");
    res.status(200).send({ message: "Company Location Configuration added successful", data: results.insertId });
  });
  
};

// Update updateCompanyLocationConfiguration
const updateCompanyLocationConfiguration = async (req, res) => {
  /*
  #swagger.tags = ['CompanyLocationConfiguration']
  #swagger.description = 'Endpoint to update company locationConfiguration.'
  */
  const { location_id, carder_id, salary_date, month_start, month_end, max_percentage_override } = req.body;

  const companyLocationConfig = { location_id, carder_id };
  const companyConfig = { salary_date, month_start, month_end, max_percentage_override };
  const query = 'UPDATE company_location_configuration SET ? WHERE _id = ?';
  const query2 = 'UPDATE company_configuration SET ? WHERE company_location_configuration_id = ?';
  
  db.query(query, [companyLocationConfig, req.params.id], (err, results) => {
    if (err) {
      loggerUtil.error(`updateCompanyLocationConfiguration controller: ${err}`);
      return res.status(500).send({message: 'Error updating company'});
    }
      db.query(query2, [companyConfig, req.params.id], (err, results) => {
        if (err) {
          loggerUtil.error(`updateCompany_configuration controller: ${err}`);
          return res.status(500).send({message: 'Error updating company'});
        }
        if (results.affectedRows === 0) {
          loggerUtil.error(`updateCompany_configuration controller: Company LocationConfiguration not found`);
          return res.status(404).send({message: 'Company location configuration not found'});
        }
        loggerUtil.info("Company LocationConfiguration updated successfully.");
        res.status(200).send({ message: 'Company location configuration updated successfully'});
      });
  });
};

const getCompanyLocationConfiguration = async (req, res) => {
  /*
  #swagger.tags = ['CompanyLocation']
  #swagger.description = 'Endpoint to handle get company location by company_id.'
  */
  const companyId = req.params.id;
  const query = `
    SELECT clc.*, cc.*
    FROM company_location_configuration clc
    JOIN company_configuration cc ON clc._id = cc.company_location_configuration_id
    WHERE clc.company_id = ?`;

  db.query(query, [companyId], (err, results) => {
    if (err) {
      loggerUtil.error(`getCompanyLocationConfiguration controller: ${err}`);
      return res.status(500).send({ message: 'Server Error' });
    }
    if (results.length === 0) {
      return res.status(404).send({ message: 'No Company Location Configuration found for this company ID' });
    }
    loggerUtil.info("Company Location Configuration retrieved successfully.");
    res.status(200).send({ message: "Company Location Configuration retrieved successfully", data: results });
  });
};


const getCompanyLocationConfigurationById = async (req, res) => {
  const query = `
    SELECT clc.*, cc.*
    FROM company_location_configuration clc
    JOIN company_configuration cc ON clc._id = cc.company_location_configuration_id
    WHERE clc._id = ?`;

  db.query(query, [req.params.id], (err, results) => {
    if (err) {
      loggerUtil.error(`getCompanyLocationConfigurationById controller: ${err}`);
      return res.status(500).send({ message: 'Server Error' });
    }
    if (results.length === 0) {
      loggerUtil.error(`getCompanyLocationConfigurationById controller: Company Location Configuration not found`);
      return res.status(404).send({ message: 'Company Location Configuration not found' });
    }
    loggerUtil.info("getCompanyLocationConfigurationById retrieved successfully.");
    res.status(200).send({ message: "Company Location Configuration retrieved successfully", data: results[0] });
  });
};


const deleteCompanyLocationConfiguration = async (req, res) => {
  const deleteCompanyConfigQuery = 'DELETE FROM company_configuration WHERE company_location_configuration_id = ?';
  const deleteLocationConfigQuery = 'DELETE FROM company_location_configuration WHERE _id = ?';
  
  db.query(deleteCompanyConfigQuery, [req.params.id], (err, results) => {
    if (err) {
      loggerUtil.error(`deleteCompanyLocationConfiguration controller: ${err}`);
      return res.status(500).send({ message: 'Server Error' });
    }
    db.query(deleteLocationConfigQuery, [req.params.id], (err, results) => {
      if (err) {
        loggerUtil.error(`deleteCompanyLocationConfiguration controller: ${err}`);
        return res.status(500).send({ message: 'Server Error' });
      }
      if (results.affectedRows === 0) {
        loggerUtil.error(`deleteCompanyLocationConfiguration controller: Company Location Configuration not found`);
        return res.status(404).send({ message: 'Company Location Configuration not found' });
      }
      loggerUtil.info("Company Location Configuration deleted successfully.");
      res.status(200).send({ message: 'Company Location Configuration deleted successfully' });
    });
  });
};

const companyLocationConfigurationController = { deleteCompanyLocationConfiguration, createCompanyLocationConfiguration,createCompanyLocationConfigurationUser, updateCompanyLocationConfiguration, getCompanyLocationConfiguration, getCompanyLocationConfigurationById};
export default companyLocationConfigurationController;

