const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
    const userId = decodedToken.userId;
    const isAdmin = decodedToken.isAdmin;
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      // passer les valeurs de userId et isAdmin dans res, pour les récupérer dans les autres middleware et le controleur
      res.locals.userId = userId;
      console.log(res.locals.userId);
      res.locals.isAdmin = isAdmin;
      console.log(res.locals.isAdmin);
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};