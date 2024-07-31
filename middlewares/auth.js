import jwt from 'jsonwebtoken';

import loggerUtil from '../utils/logger.js';

// Middleware to validate token (i.e., isAuthenticated)
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    loggerUtil.info('Access denied. No token provided.');
    return res.status(401).send('Access denied. No token provided.');

  }

  const companyId = req.header('CompanyId');
  if (!companyId) {
    loggerUtil.info('Access denied. No companyId provided.');
    return res.status(401).send('Access denied. No companyId provided.');

  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.decodedToken = decoded;
    req.receivedCompanyId = companyId;

    next();
  } catch (ex) {
    loggerUtil.info('Invalid token');
    res.status(400).send('Invalid token.');
  }
};

// Middleware to check user role based on company
const checkRole = (roles) => async (req, res, next) => {
  try {
    // Find the company data for the given companyId
    const companyData = req.decodedToken.companyData.find(company => company.companyId === req.receivedCompanyId);
    if (!companyData) {
      loggerUtil.info('Unauthorized');
      return res.status(403).send('Unauthorized');
    }

    // Check if the user has any of the required roles for the company
    const hasRequiredRole = roles.some(requiredRoleId => companyData.roles.includes(requiredRoleId));
    if (!hasRequiredRole) {
      loggerUtil.info('Unauthorized');
      return res.status(403).send('Unauthorized');
    }

    next();
  } catch (err) {
    loggerUtil.error(err.message);
    res.status(400).send('Server Error');
  }
};

const authMiddleware = { verifyToken, checkRole };
export default authMiddleware;
