const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const User = require('../model/user');

const authMiddleware = async (req, res, next) => {
  try {
    // Get the token from the cookie
    const token = req.cookies.token;

    if (!token) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Unauthorized' });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch the user from the database using the decoded user ID
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Unauthorized' });
    }

    // Attach the user object to the request for further processing
    req.user = user;
    req.userId = decoded.userId; // Assign userId to req.userId

    // Call next to proceed with the request handling
    next();
  } catch (error) {
    console.error(error);
    return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Unauthorized' });
  }
};

const authAuthorization = (role) => {
  return async (req, res, next) => {
    try {
      // Check if the user has the required role for accessing the route
      if (!req.user || req.user.role !== role) {
        return res.status(StatusCodes.FORBIDDEN).json({ error: 'Forbidden to acess this route ' });
      }
      
      // Call next to proceed with the request handling
      next();
    } catch (error) {
      console.error(error);
      return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Unauthorized' });
    }
  };
};

module.exports = { authMiddleware, authAuthorization };
