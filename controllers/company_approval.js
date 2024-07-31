import loggerUtil from '../utils/logger.js';
import db from "../utils/db.js"
// create CompanyApproval
const createCompanyApproval = async (req, res) => {
  /*
  #swagger.tags = ['CompanyApproval']
  #swagger.description = 'Endpoint to handle create company_approval.'
  */
  const company_approval = req.body;
  const query = 'INSERT INTO company_approval SET ?';
  
  db.query(query, company_approval, (err, results) => {
    if(err){
      loggerUtil.error(`createCompanyApproval controller: ${err}`);
      return res.status(500).send({message: 'Server Error'});
    }
    loggerUtil.info("CompanyApproval added successfully.");
    res.status(200).send({ message: "CompanyApproval added successful", data: results.insertId });
  });
  
};

// get CompanyApproval
const getCompanyApproval = async (req, res) => {
  /*
  #swagger.tags = ['CompanyApproval']
  #swagger.description = 'Endpoint to retrieve company_approval.'
  */
  const query = 'SELECT * FROM company_approval WHERE _id = ?';
  db.query(query, [req.params.id], (err, results) => {
    if (err) {
      loggerUtil.error(`getCompanyApproval controller: ${err}`);
      return res.status(500).send({message: 'Server Error'});
    }
    if (results.length === 0) {
      loggerUtil.error(`getCompanyApproval controller: CompanyApproval not found`);
      return res.status(404).send({message: 'CompanyApproval not found'});
    }
    loggerUtil.info("CompanyApproval retrieved successfully.");
    res.status(200).send({ message: "CompanyApproval retrieved successful", data: results[0] });

  });
};

// Update CompanyApproval
const updateCompanyApproval = async (req, res) => {
  /*
  #swagger.tags = ['CompanyApproval']
  #swagger.description = 'Endpoint to update company_approval.'
  */
  const query = 'UPDATE company_approval SET ? WHERE _id = ?';
  
  db.query(query, [req.body, req.params.id], (err, results) => {
    if (err) {
      loggerUtil.error(`updateCompanyApproval controller: ${err}`);
      return res.status(500).send({message: 'Error updating company_approval'});
    }
    if (results.affectedRows === 0) {
      loggerUtil.error(`CompanyApproval not found`);
      return res.status(404).send({message: 'CompanyApproval not found'});
    }
    loggerUtil.info("CompanyApproval updated successfully.");
    res.status(200).send({ message: 'CompanyApproval updated successfully'});
  });
};

const company_approvalController = { createCompanyApproval, getCompanyApproval, updateCompanyApproval};
export default company_approvalController;

