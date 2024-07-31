import loggerUtil from '../utils/logger.js';
import db from "../utils/db.js";
import axios from 'axios';
import https from 'https';
import keycloakService from '../services/keycloak.js';
import dotenv from "dotenv";
dotenv.config();

// create Company

const createCompany = async (req, res) => {
  /*
  #swagger.tags = ['Company']
  #swagger.description = 'Endpoint to handle create company.'
  */

  const company = req.body;
  const query = 'INSERT INTO company SET ?';
  try {
    const keycloakBaseUrl = process.env.KEYCLOAK_URL;
    const realmNameCreate = company.name;
    const createClientName = process.env.GENERAL_CLIENT_ID;
    const SalcashClientId = process.env.SALCASH_CLIENT_ID

    // Create an https agent that disables SSL verification
    const httpsAgent = new https.Agent({
      rejectUnauthorized: false
    });

    const data = new URLSearchParams();
    data.append('client_id', process.env.MASTER_CLIENT_ID);
    data.append('client_secret', process.env.MASTER_CLIENT_SECRET);
    data.append('grant_type', 'password');
    data.append('username', process.env.MASTER_USERNAME);
    data.append('password', process.env.MASTER_PASSWORD);

    // Obtain an access token from Keycloak
    const tokenResponse = await axios.post(
      `${keycloakBaseUrl}/realms/master/protocol/openid-connect/token`,
      data,
      {headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            httpsAgent,}
    );
    const accessToken = tokenResponse.data.access_token;

    // Create a new realm in Keycloak
    await axios.post(
      `${keycloakBaseUrl}/admin/realms`,
      { realm: realmNameCreate, enabled: true },
      { headers: { Authorization: `Bearer ${accessToken}` }, httpsAgent }
    ).then(async()=>{

      const rolesResponse = await axios.get(
        `${keycloakBaseUrl}/admin/realms/COMPANY_TEMPLATE/roles`,
        { headers: { Authorization: `Bearer ${accessToken}` }, httpsAgent }
      );
      
    const roles = rolesResponse.data;
      
    // Create roles in the new realm
    for (const role of roles) {
      if(role?.description.length < 1){
        await axios.post(
          `${keycloakBaseUrl}/admin/realms/${realmNameCreate}/roles`,
          {
            name: role?.name,
            description: role?.description
          },
          { headers: { Authorization: `Bearer ${accessToken}` }, httpsAgent }
        );
      }
    }

      // Create a new client in the realm
      await axios.post(
        `${keycloakBaseUrl}/admin/realms/${realmNameCreate}/clients`,
        {
          clientId: createClientName,
          enabled: true,
          serviceAccountsEnabled: true,
          authorizationServicesEnabled: true,
          directAccessGrantsEnabled: true
        },
        { headers: { Authorization: `Bearer ${accessToken}` }, httpsAgent }
      ).then(async()=>{
          const clientID = await keycloakService.getClientId(createClientName,realmNameCreate, accessToken );
          if(clientID){
              // Get the client secret
              await axios.get(
                `${keycloakBaseUrl}/admin/realms/${realmNameCreate}/clients/${clientID}/client-secret`,
                { headers: { Authorization: `Bearer ${accessToken}` }, httpsAgent }
              ).then((secretResponse)=>{
                const clientSecret = secretResponse.data.value;
                company.realm_key = clientSecret;  
                db.query(query, company, (err, results) => {
                  if(err){
                    loggerUtil.error(`createCompany controller: ${err}`);
                    return res.status(500).send({message: 'Server Error'});
                  }
                  loggerUtil.info("Company added successfully.");
                  res.status(200).send({ message: "Company added successful", data: results.insertId });
                });
              }).catch(error=>{
                loggerUtil.error( `keycloak client secret fetch : ${error}`);
                res.status(404).json({ message: 'Server Error' });
              });
          }else{
            res.status(404).json({ message: 'Server Error' });
          }
          
      }).catch(error=>{
        loggerUtil.error( `keycloak creation: ${error}`);
        res.status(404).json({ message: 'Already exist' });
      });

    }).catch(error=>{
      loggerUtil.error( `keycloak realms creation: ${error.message}`);
      res.status(404).json({ message: 'Already exist' });
    });
  } catch (error) {
    loggerUtil.error(`create company error: ${error.message}`);
    return res.status(500).send({ message: 'Server Error' });
  }
  
};

// get Companies
const getCompanies = async (req, res) => {
  /*
  #swagger.tags = ['Company']
  #swagger.description = 'Endpoint to retrieve all company.'
  */
  const query = 'SELECT * FROM company';
  db.query(query, (err, results) => {
    if (err) {
      loggerUtil.error(`getCompanies controller: ${err}`);
      return res.status(500).send({message: 'Server Error'});
    }
    loggerUtil.info("Companies retrieved successfully.");
    res.status(200).send({ message: "Companies retrieved successful", data: results });
  });
  
};

// get Company
const getCompany = async (req, res) => {
  /*
  #swagger.tags = ['Company']
  #swagger.description = 'Endpoint to retrieve company.'
  */
  const query = 'SELECT * FROM company WHERE _id = ?';
  db.query(query, [req.params.id], (err, results) => {
    if (err) {
      loggerUtil.error(`getCompany controller: ${err}`);
      return res.status(500).send({message: 'Server Error'});
    }
    if (results.length === 0) {
      loggerUtil.error(`getCompany controller: Company not found`);
      return res.status(404).send({message: 'Company not found'});
    }
    loggerUtil.info("Company retrieved successfully.");
    res.status(200).send({ message: "Company retrieved successful", data: results[0] });

  });
};

// Update Company
const updateCompany = async (req, res) => {
  /*
  #swagger.tags = ['Company']
  #swagger.description = 'Endpoint to update company.'
  */
  const query = 'UPDATE company SET ? WHERE _id = ?';
  
  db.query(query, [req.body, req.params.id], (err, results) => {
    if (err) {
      loggerUtil.error(`updateCompany controller: ${err}`);
      return res.status(500).send({message: 'Error updating company'});
    }
    if (results.affectedRows === 0) {
      loggerUtil.error(`Company not found`);
      return res.status(404).send({message: 'Company not found'});
    }
    loggerUtil.info("Company updated successfully.");
    res.status(200).send({ message: 'Company updated successfully'});
  });
};

// Update Status
// const updateCompanyStatus = async (req, res) => {
//   /*
//   #swagger.tags = ['Company']
//   #swagger.description = 'Endpoint to update company status.'
//   */
  
// };

// Search Companies
const searchCompanies = async (req, res) => {
  /*
  #swagger.tags = ['Company']
  #swagger.description = 'Endpoint to search for companies by name, industry, nick_name, or business_registration_number.'
  */
  
  const { name, industry, nick_name, business_registration_number } = req.query;

  let query = 'SELECT * FROM company WHERE 1=1';
  const queryParams = [];

  if (name) {
    query += ' AND name LIKE ?';
    queryParams.push(`%${name}%`);
  }

  if (industry) {
    query += ' AND industry LIKE ?';
    queryParams.push(`%${industry}%`);
  }

  if (nick_name) {
    query += ' AND nick_name LIKE ?';
    queryParams.push(`%${nick_name}%`);
  }

  if (business_registration_number) {
    query += ' AND business_registration_number LIKE ?';
    queryParams.push(`%${business_registration_number}%`);
  }

  db.query(query, queryParams, (err, results) => {
    if (err) {
      loggerUtil.error(`searchCompanies controller: ${err}`);
      return res.status(500).send({ message: 'Server Error' });
    }
    loggerUtil.info("Companies searched successfully.");
    res.status(200).send({ message: "Companies retrieved successfully", data: results });
  });
};


const companyController = { createCompany, getCompanies, getCompany, updateCompany, searchCompanies};
export default companyController;

