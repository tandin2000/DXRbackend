import loggerUtil from '../utils/logger.js';
import db from "../utils/db.js"


const createDataMapping = async (req, res) => {

  const companyLocation = req.body;
  const query = 'INSERT INTO data_mapping  SET ?';
  
  db.query(query, companyLocation, (err, results) => {
    if(err){
      loggerUtil.error(`createDataMapping controller: ${err}`);
      return res.status(500).send({message: 'Server Error'});
    }
    loggerUtil.info("data Mapping added successfully.");
    res.status(200).send({ message: "data Mapping added successful", data: results.insertId });
  });
  
};




const updateDataMapping = async (req, res) => {
  
  const query = 'UPDATE data_mapping SET ? WHERE id = ?';
  
  db.query(query, [req.body, req.params.id], (err, results) => {
    if (err) {
      loggerUtil.error(`updateDataMapping controller: ${err}`);
      return res.status(500).send({message: 'Error updating company'});
    }
    if (results.affectedRows === 0) {
      loggerUtil.error(`updateDataMapping controller: data Mapping not found`);
      return res.status(404).send({message: 'data Mapping not found'});
    }
    loggerUtil.info("data Mapping updated successfully.");
    res.status(200).send({ message: 'data Mapping updated successfully'});
  });
};

const getDataMapping = async (req, res) => {

  const companyId = req.params.id;
  const query = 'SELECT * FROM data_mapping WHERE company_id = ?';

  db.query(query, [companyId], (err, results) => {
    if (err) {
      loggerUtil.error(`getDataMapping controller: ${err}`);
      return res.status(500).send({ message: 'Server Error' });
    }
    if (results.length === 0) {
      return res.status(404).send({ message: 'No locations found for this company ID' });
    }
    loggerUtil.info("data Mappings retrieved successfully.");
    res.status(200).send({ message: "data Mappings retrieved successfully", data: results });
  });
};

const getDataMappingById = async (req, res) => {
  const query = 'SELECT * FROM data_mapping WHERE id = ?';
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

const deleteDataMapping = async (req, res) => {
  const query = 'DELETE FROM data_mapping WHERE id = ?';
  
  db.query(query, [req.params.id], (err, results) => {
    if (err) {
      loggerUtil.error(`deleteDataMapping controller: ${err}`);
      return res.status(500).send({ message: 'Server Error' });
    }
    if (results.affectedRows === 0) {
      loggerUtil.error(`deleteDataMapping controller: Mapping not found`);
      return res.status(404).send({ message: 'Mapping not found' });
    }
    loggerUtil.info("Mapping deleted successfully.");
    res.status(200).send({ message: 'Mapping deleted successfully' });
  });
};


const companyLocationController = { deleteDataMapping, createDataMapping, updateDataMapping, getDataMapping, getDataMappingById};
export default companyLocationController;

