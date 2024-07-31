import logger from '../utils/logger.js';
import db from "../utils/db.js";
import axios from 'axios';
import https from 'https';
import dotenv from "dotenv";
import keycloakService from '../services/keycloak.js';
dotenv.config();

// Create an https agent to bypass self-signed certificate issues
const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
  });
// Login Controller
const Login = async (req, res) => {
  /*
  #swagger.tags = ['Login']
  #swagger.description = 'Endpoint to handle login.'
  */
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  const query = 'SELECT company_id FROM loginuser WHERE username = ?';
  const query2 = 'SELECT name,realm_key  FROM company WHERE _id = ?';
  try {
    const [result] = await db.promise().query(query, [username]);
    if (result.length > 0) {
      const { company_id } = result[0];
      const  responseToken = [];
      const company_ids = JSON.parse(company_id);
      let count = 0
      for (const company_id of company_ids) {
        const [result2] = await db.promise().query(query2, [company_id]);
        if (result2.length > 0) {
          const { name, realm_key } = result2[0];
          const data = new URLSearchParams();
          data.append('client_id', process.env.GENERAL_CLIENT_ID);
          data.append('client_secret', realm_key);
          data.append('grant_type', 'password');
          data.append('username', username);
          data.append('password', password);
    
          try {
            const response = await axios.post(
              `https://94.156.35.171:8081/realms/${name}/protocol/openid-connect/token`,
              data,
              {
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                },
                httpsAgent,
              }
            );
    
            const payload = {
              company: {
                _id: company_id,
                name: name,
                jwt: response.data,
              },
            };
            count++;
            responseToken.push(payload);
          } catch (error) {
            logger.error('Login Axios: realm or credentials invalid');
            // Handle the error appropriately here
          }
        } else {
          logger.error('Login controller: realm_key not defined');
          // Handle the error appropriately here
        }
      }
    
      res.status(200).json({ message: "Logged In" , data: responseToken});
      
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    logger.error( err.message);
    return res.status(500).json({ message: 'Database query error', error: err.message });
  }
};

// Logout Controller
const Logout = async (req, res) => {
  /*
  #swagger.tags = ['Logout']
  #swagger.description = 'Endpoint to handle Logout.'
  */
  // const { companyId, refreshToken } = req.body;
  const {data} = req.body;

  data.map(async(data) => {
  const { companyId, refreshToken } = data;
  const query = 'SELECT name,realm_key  FROM company WHERE _id = ?';
  try {
      const [result] = await db.promise().query(query, [companyId]);
      if(result.length > 0){
        const {name, realm_key} = result[0]
        const data = new URLSearchParams();
        data.append('client_id', process.env.GENERAL_CLIENT_ID);
        data.append('client_secret', realm_key);
        data.append('refresh_token', refreshToken);
        
        axios.post(`https://94.156.35.171:8081/realms/${name}/protocol/openid-connect/logout`, data, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            httpsAgent,
          })
      }else{
        res.status(404).json({ message: 'Server Error' });
        logger.error('Login controller: realm_key not defined');
      }
  } catch (err) {
    logger.error( err.message);
    return res.status(500).json({ message: 'Database query error', error: err.message });
  }
  })
  res.status(200).json({ message: "Logged Out"});

};

// Assign User
const RegisterUser = async (req, res) => {

 const {username, email, contact_number, company_id, roleName, firstName, lastName } = req.body;
 const payloadEmployee = {
   username,
   email: email.toLowerCase(),
   contact_number,
   role: roleName
  }
  
  const payloadLoginUser = {
    username: email.toLowerCase(),
    company_id: `[${company_id}]`
  }
  console.log(payloadLoginUser)
  const query = 'INSERT INTO employee SET ?';
  const query2 = 'INSERT INTO employee_details SET ?';
  const query3 = 'INSERT INTO loginuser SET ?';
  const query4 = 'SELECT name FROM company WHERE _id = ?';
  try {
    const keycloakBaseUrl = process.env.KEYCLOAK_URL;

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

    const user = {
      username: username,
      enabled: true,
      emailVerified: true,
      firstName: firstName,
      lastName: lastName,
      email: email.toLowerCase(),
      credentials: [{
          type: 'password',
          value: 'abcd@1234',
          temporary: false
      }]
  };

  const [result4] = await db.promise().query(query4, [company_id]);
  const { name } = result4[0];

  const userId = await keycloakService.createUser(accessToken,name, user);
  logger.info(`User created with ID: ${userId}`);

  await keycloakService.assignRoleToUser(accessToken,name, userId, roleName);
  
  logger.info(`Role ${roleName} assigned to user ${userId}`);
  // return res.status(200).send({message: "Created Successfully" });

  db.query(query, payloadEmployee, (err, results) => {
    if(err){
      logger.error(`RegisterUser employee controller: ${err}`);
      return res.status(500).send({message: 'Server Error'});
    }
    logger.info("RegisterUser Controller : Employee added successfully.");
    const payloadEmployeeDetails = {
      company_id,
      employee_id:results.insertId
    }
    db.query(query2, payloadEmployeeDetails, (err, results) => {
      if(err){
        logger.error(`RegisterUser EmployeeDetails controller: ${err}`);
        return res.status(500).send({message: 'Server Error'});
      }
      logger.info("RegisterUser Controller :EmployeeDetails added successfully.");
      db.query(query3, payloadLoginUser, (err, results) => {
        if(err){
          logger.error(`RegisterUser Controller :UserLogin create : ${err}`);
          return res.status(500).send({message: 'Server Error'});
        }
        logger.info("RegisterUser Controller :UserLogin added successfully.");
        return res.status(200).send({ message: 'Registered' });

      });
    });
  });

  } catch (error) {
    logger.error(`create user error: ${error}`);
    return res.status(500).send({ message: 'Server Error' });
  }
  
};

const employeeController = { Login, Logout , RegisterUser};
export default employeeController;
