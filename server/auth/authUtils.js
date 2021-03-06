var bcrypt = require('bcrypt-nodejs');

module.exports = {
  hashPassword: function(password, cb) {
    bcrypt.hash(password, null, null, function(error, hash) {
      if (error) {
        console.error('bcrypt hash error:', error);
      }
      cb(error, hash);
    });
  },

  checkPassword: function(user, pGuess, cb) {
    bcrypt.compare(pGuess, user.password_hash, function(error, match) {
      if (error) {
        console.error('bcrypt check error:', error);
      }
      cb(error, match);
    });
  },

  loggedInAdmin: function(req, res, next) {
    if (req.isAuthenticated() && req.session.passport.user.admin_only) {
      next();
    } else if (req.isAuthenticated()) {
      res.status(401).end('Logged in as client');
    }
    else {
      res.status(401).end('Not logged in');
    }
  },

  loggedInClient: function(req, res, next) {
    if (req.isAuthenticated() && !req.session.passport.user.admin_only) {
      next();
    } else if (req.isAuthenticated()) {
      res.status(401).end('Logged in as admin');
    } else {
      res.status(401).end('Not logged in');
    }
  }

};
