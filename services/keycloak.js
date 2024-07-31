import logger from '../utils/logger.js';
import axios from 'axios';
import https from 'https';
import dotenv from "dotenv";
dotenv.config();

const keycloakServerUrl = process.env.KEYCLOAK_URL;

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

const getClientId = async (clientName, realmName, accessToken) => {
  try {

    const clientsResponse = await axios.get(`${keycloakServerUrl}/admin/realms/${realmName}/clients`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
      httpsAgent
    });

    const clients = clientsResponse.data;
    const client = clients.find(c => c.clientId === clientName);

    if (client) {
      logger.info(`Client ID retrieved`);
      return client.id;
    } else {
      logger.error(`getClientId service : Client ${clientName} not found.`);
      return null;
    }
  } catch (error) {
    logger.error(`getClientId service : ${error.message}`);
  }
};

const createUser = async (accessToken, realmName, user) => {
  const response = await axios.post(`${keycloakServerUrl}/admin/realms/${realmName}/users`, user, {
      headers: {
          Authorization: `Bearer ${accessToken}`
      },
      httpsAgent
  });

  return response.headers.location.split('/').pop(); // Extract user ID from location header
}

const assignRoleToUser = async (accessToken, realmName, userId, roleName) => {
  // Get the role ID
  const rolesResponse = await axios.get(`${keycloakServerUrl}/admin/realms/${realmName}/roles`, {
      headers: {
          Authorization: `Bearer ${accessToken}`
      },
      httpsAgent
  });

  const role = rolesResponse.data.find(role => role.name === roleName);
  if (!role) throw new Error(`Role ${roleName} not found`);

  // Assign the role to the user
  await axios.post(`${keycloakServerUrl}/admin/realms/${realmName}/users/${userId}/role-mappings/realm`, [role], {
      headers: {
          Authorization: `Bearer ${accessToken}`
      },
      httpsAgent
  });
}


const keycloakService = { getClientId, assignRoleToUser, createUser };
export default keycloakService;
