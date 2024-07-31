import loggerUtil from '../utils/logger.js';
import db from "../utils/db.js"
// create AdvanceRequest
const createAdvanceRequest = async (req, res) => {
  /*
  #swagger.tags = ['AdvanceRequest']
  #swagger.description = 'Endpoint to handle create advance_request.'
  */
  const advance_request = req.body;
  const query = 'INSERT INTO advance_request SET ?';
  
  db.query(query, advance_request, (err, results) => {
    if(err){
      loggerUtil.error(`createAdvanceRequest controller: ${err}`);
      return res.status(500).send({message: 'Server Error'});
    }
    loggerUtil.info("AdvanceRequest added successfully.");
    res.status(200).send({ message: "AdvanceRequest added successful", data: results.insertId });
  });
  
};

// get AdvanceRequest
const getAdvanceRequest = async (req, res) => {
  /*
  #swagger.tags = ['AdvanceRequest']
  #swagger.description = 'Endpoint to retrieve advance_request.'
  */
  const query = 'SELECT * FROM advance_request WHERE _id = ?';
  db.query(query, [req.params.id], (err, results) => {
    if (err) {
      loggerUtil.error(`getAdvanceRequest controller: ${err}`);
      return res.status(500).send({message: 'Server Error'});
    }
    if (results.length === 0) {
      loggerUtil.error(`getAdvanceRequest controller: AdvanceRequest not found`);
      return res.status(404).send({message: 'AdvanceRequest not found'});
    }
    loggerUtil.info("AdvanceRequest retrieved successfully.");
    res.status(200).send({ message: "AdvanceRequest retrieved successful", data: results[0] });

  });
};

// get AdvanceRequest
const getAdvanceRequestByCompanyId = async (req, res) => {
  /*
  #swagger.tags = ['AdvanceRequest']
  #swagger.description = 'Endpoint to retrieve advance_request.'
  */
  const companyId = req.params.company_id;

  // const query = 'SELECT * FROM advance_request WHERE company_id = ?';
  const query = `
    SELECT 
      ar.*, 
      ar._id AS advance_request_id,
      e.*, 
      ed.* 
    FROM 
      advance_request ar
      LEFT JOIN employee e ON ar.employee_id = e._id
      LEFT JOIN employee_details ed ON ar.employee_details_id = ed._id
    WHERE 
      ar.company_id = ?
  `;
  db.query(query, [companyId], (err, results) => {
    if (err) {
      loggerUtil.error(`getAdvanceRequest controller: ${err}`);
      return res.status(500).send({message: 'Server Error'});
    }
    if (results.length === 0) {
      loggerUtil.info("AdvanceRequest retrieved successfully.");
      res.status(200).send({ message: "AdvanceRequest retrieved successful", data: [] });
    }else{
      loggerUtil.info("AdvanceRequest retrieved successfully.");
      res.status(200).send({ message: "AdvanceRequest retrieved successful", data: results });
    }
   

  });
};

const getAdvanceRequestsForCurrentMonth = async (req, res) => {
  /*
  #swagger.tags = ['AdvanceRequest']
  #swagger.description = 'Endpoint to retrieve advance_requests for the current month for a specific employee_id and company_id.'
  */
  // Extract the employee_id and company_id from request parameters
  const { employee_id, company_id } = req.params;
  // Get the first and last day of the current month
  const currentMonthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  const currentMonthEnd = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);

  const query = `
    SELECT * 
    FROM advance_request 
    WHERE employee_id = ? 
      AND company_id = ? 
      AND request_date BETWEEN ? AND ?
  `;
  db.query(query, [employee_id, company_id, currentMonthStart, currentMonthEnd], (err, results) => {
    if (err) {
      loggerUtil.error(`getAdvanceRequestsForCurrentMonth controller: ${err}`);
      return res.status(500).send({message: 'Server Error'});
    }
    if (results.length === 0) {
      loggerUtil.info("AdvanceRequests retrieved successfully.");
      res.status(200).send({ message: "AdvanceRequests retrieved successfully", data: [] });
    }else{
      loggerUtil.info("AdvanceRequests retrieved successfully.");
      res.status(200).send({ message: "AdvanceRequests retrieved successfully", data: results });
    }
  });
};


// Update AdvanceRequest
const updateAdvanceRequest = async (req, res) => {
  /*
  #swagger.tags = ['AdvanceRequest']
  #swagger.description = 'Endpoint to update advance_request.'
  */
  const query = 'UPDATE advance_request SET ? WHERE _id = ?';
  
  db.query(query, [req.body, req.params.id], (err, results) => {
    if (err) {
      loggerUtil.error(`updateAdvanceRequest controller: ${err}`);
      return res.status(500).send({message: 'Error updating advance_request'});
    }
    if (results.affectedRows === 0) {
      loggerUtil.error(`AdvanceRequest not found`);
      return res.status(404).send({message: 'AdvanceRequest not found'});
    }
    loggerUtil.info("AdvanceRequest updated successfully.");
    res.status(200).send({ message: 'AdvanceRequest updated successfully'});
  });
};

const advance_requestController = { createAdvanceRequest,getAdvanceRequestsForCurrentMonth,getAdvanceRequestByCompanyId, getAdvanceRequest, updateAdvanceRequest};
export default advance_requestController;

