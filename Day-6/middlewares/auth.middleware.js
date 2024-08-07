const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
     try {
          let authHeader = req.headers.authorization;
          if (authHeader && authHeader.startsWith("Bearer ")) {
               let token = authHeader.split(" ")[1];
               jwt.verify(token, process.env.SECRET_KEY, (err, result) => {
                    if (err) {
                         return res.status(403).send("Invalid token, permission denied");
                    }
                    next();
               });
          } else {
               return res.send("please provide token")
          }
     } catch (error) {
          res.status(500).send("Unauthorized access");
     }
};

module.exports = auth;
