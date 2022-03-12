'use strict';
/* ---------------ACTOR Auth---------------------- */
const mongoose = require('mongoose');
const Actor = mongoose.model('Actors');
const admin = require('firebase-admin');

const getAuthenticadedActor = async function (idToken) {
  console.log('idToken: ' + idToken);

  let actorFromFB;
  let uid;
  let authTime;
  let exp;
  let error = false;

  try {
    actorFromFB = await admin.auth().verifyIdToken(idToken);

    uid = actorFromFB.uid;
    authTime = actorFromFB.auth_time;
    exp = actorFromFB.exp;
    console.log('idToken verificado para el uid: ' + uid);
    console.log('auth_time: ' + authTime);
    console.log('exp: ' + exp);
  } catch (exception) {
    error = true;
    console.log('authController - getAuthenticadedActor - exception');
    console.log(exception);
  }

  if (error === true) {
    return null;
  }

  if (error === false) {
    const mongoActor = await Actor.findOne({ email: uid });

    if (!mongoActor) {
      return null;
    } else {
      console.log('The actor exists in our DB');
      return mongoActor;
    }
  }
};

exports.getAuthenticadedActor = getAuthenticadedActor;

exports.verifyAuthenticadedActor = function (requiredRoles) {
  return async function (req, res, callback) {
    console.log('verifyAuthenticadedActor');

    if (!Object.prototype.hasOwnProperty.call(req.headers, 'idtoken')) {
      res.status(401).send('Token must be present in request header.');
    } else {
      const idToken = req.headers.idtoken;
      console.log('idToken: ', idToken);

      const authenticatedActor = await getAuthenticadedActor(idToken);
      console.log('authenticatedActor: ', authenticatedActor);

      if (authenticatedActor === null) {
        res.status(401).send('No actor was found with the given idToken.');
      } else {
        const actorRoles = authenticatedActor.role;

        let isAuth = false;

        for (let i = 0; i < requiredRoles.length; i++) {
          for (let j = 0; j < actorRoles.length; j++) {
            if (requiredRoles[i] === actorRoles[j]) {
              console.log('requiredRoles', requiredRoles[i], 'actorRoles', actorRoles[j]);

              if (authenticatedActor.isActive === true) {
                isAuth = true;
                // this forces a break, but for both for loops at once
                i = requiredRoles.length;
                j = actorRoles.length;
              }
            }
          }
        }

        if (isAuth) {
          // attach authenticated user to the request
          req.authenticatedActor = authenticatedActor;
          return callback();
        } else {
          // an access token is valid, but requires more privileges
          res.status(403).send('The actor has not the required roles.');
        }
      }
    }
  };
};

exports.verifyAuthenticatedActorCanAccessParameterActor = function () {
  return async function (req, res, callback) {
    console.log('verifyAuthenticatedActorCanAccessParameterActor');

    const authenticatedActor = req.authenticatedActor;
    const authenticatedActorIsAdministrator = authenticatedActor.role.includes('ADMINISTRATOR');

    if (!authenticatedActorIsAdministrator) {
      if (authenticatedActor._id.toString() !== req.params.actorId) {
        return res.status(403).send('Authenticated actor can not access this actor.');
      }
    }

    return callback();
  };
};

exports.verifyAuthenticatedActorCanAccessParameterSponsorship = function () {
  return async function (req, res, callback) {
    console.log('verifyAuthenticatedActorCanAccessParameterSponsorship');

    const authenticatedActor = req.authenticatedActor;
    const authenticatedActorIsAdministrator = authenticatedActor.role.includes('ADMINISTRATOR');
    
    if (!authenticatedActorIsAdministrator) {
      Sponsorship.findById(req.params.sponsorshipId, function (err, sponsorship) {
        if (err) {
          return res.status(500).json({ error: true, message: 'Error trying to get the sponsorship.' });
        } else {
          if (authenticatedActor._id.toString() !== sponsorship.sponsor_Id) {
            return res.status(403).send('Authenticated actor can not access this sponsorship.');
          }
        }
      });
    }

    return callback();
  };
}
