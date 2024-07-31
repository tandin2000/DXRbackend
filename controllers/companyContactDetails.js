import loggerUtil from '../utils/logger.js';
import db from "../utils/db.js"
// create createCompanyContactDetails
const createCompanyContactDetails = async (req, res) => {
  /*
  #swagger.tags = ['CompanyContactDetails']
  #swagger.description = 'Endpoint to handle create company carder.'
  */
  const companyContactDetails = req.body;
  const query = 'INSERT INTO company_contact_details  SET ?';
  
  db.query(query, companyContactDetails, (err, results) => {
    if(err){
      loggerUtil.error(`createCompanyContactDetails controller: ${err}`);
      return res.status(500).send({message: 'Server Error'});
    }
    loggerUtil.info("Company Carder added successfully.");
    res.status(200).send({ message: "Company Carder added successful", data: results.insertId });
  });
  
};


// Update updateCompanyContactDetails
const updateCompanyContactDetails = async (req, res) => {
  /*
  #swagger.tags = ['CompanyContactDetails']
  #swagger.description = 'Endpoint to update company carder.'
  */
  const query = 'UPDATE company_contact_details SET ? WHERE id = ?';
  
  db.query(query, [req.body, req.params.id], (err, results) => {
    if (err) {
      loggerUtil.error(`updateCompanyContactDetails controller: ${err}`);
      return res.status(500).send({message: 'Error updating company'});
    }
    if (results.affectedRows === 0) {
      loggerUtil.error(`updateCompanyContactDetails controller: Company Carder not found`);
      return res.status(404).send({message: 'Company Carder not found'});
    }
    loggerUtil.info("Company Carder updated successfully.");
    res.status(200).send({ message: 'Company Carder updated successfully'});
  });
};

const getCompanyContactDetails = async (req, res) => {
  /*
  #swagger.tags = ['CompanyContactDetails']
  #swagger.description = 'Endpoint to handle get company location by company_id.'
  */
  const companyId = req.params.id;
  const query = 'SELECT * FROM company_contact_details WHERE company_id = ?';

  db.query(query, [companyId], (err, results) => {
    if (err) {
      loggerUtil.error(`getCompanyContactDetails controller: ${err}`);
      return res.status(500).send({ message: 'Server Error' });
    }
    if (results.length === 0) {
      return res.status(404).send({ message: 'No Carder found for this company ID' });
    }
    loggerUtil.info("Company Carder retrieved successfully.");
    res.status(200).send({ message: "Company Carder retrieved successfully", data: results });
  });
};

const getCompanyContactDetailsById = async (req, res) => {
  const query = 'SELECT * FROM company_contact_details WHERE id = ?';
  db.query(query, [req.params.id], (err, results) => {
    if (err) {
      loggerUtil.error(`getCompanyContactDetailsById controller: ${err}`);
      return res.status(500).send({message: 'Server Error'});
    }
    if (results.length === 0) {
      loggerUtil.error(`getCompanyContactDetailsById controller: CompanyContactDetails not found`);
      return res.status(404).send({message: 'CompanyContactDetails not found'});
    }
    loggerUtil.info("CompanyContactDetails retrieved successfully.");
    res.status(200).send({ message: "CompanyContactDetails retrieved successful", data: results[0] });

  });
};

const deleteCompanyContactDetails = async (req, res) => {
  const query = 'DELETE FROM company_contact_details WHERE id = ?';
  
  db.query(query, [req.params.id], (err, results) => {
    if (err) {
      loggerUtil.error(`deleteCompanyContactDetails controller: ${err}`);
      return res.status(500).send({ message: 'Server Error' });
    }
    if (results.affectedRows === 0) {
      loggerUtil.error(`deleteCompanyContactDetails controller: Company Contact Details not found`);
      return res.status(404).send({ message: 'Company Contact Details not found' });
    }
    loggerUtil.info("Company Contact Details deleted successfully.");
    res.status(200).send({ message: 'Company Contact Details deleted successfully' });
  });
};

const companyContactDetails = { deleteCompanyContactDetails, createCompanyContactDetails, updateCompanyContactDetails, getCompanyContactDetails, getCompanyContactDetailsById};
export default companyContactDetails;

