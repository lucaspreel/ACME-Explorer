'use strict'
/* ---------------ACTOR Auth---------------------- */
const mongoose = require('mongoose')
const Actor = mongoose.model('Actors')
const admin = require('firebase-admin')

let getAuthenticadedActor = async function (idToken) {

  console.log('idToken: ' + idToken);

  let actorFromFB;
  let uid;
  let authTime;
  let exp;
  let error = false;

  try 
  {

    actorFromFB = await admin.auth().verifyIdToken(idToken);

    uid = actorFromFB.uid;
    authTime = actorFromFB.auth_time;
    exp = actorFromFB.exp;
    console.log('idToken verificado para el uid: ' + uid);
    console.log('auth_time: ' + authTime);
    console.log('exp: ' + exp);
    
  } 
  catch (error) 
  {
    error = true;
    console.log("authController - getAuthenticadedActor");
    console.log(error);
  }

  if(error == true)
  {
    return null;
  }

  if(error == false)
  {
  
    const mongoActor = await Actor.findOne({ email: uid });
    
    if (!mongoActor) 
    {
      return null;
    } 
    else 
    {
      console.log('The actor exists in our DB')
      // console.log('actor: ' + mongoActor)
      return mongoActor;
    }

  }

}

exports.getAuthenticadedActor = getAuthenticadedActor;

exports.verifyAuthenticadedActor = function (requiredRoles) {

  return async function (req, res, callback) {

    if(!req.headers.hasOwnProperty("idtoken"))
    {
      res.status(401).send("Token must be present in request header.");
    }
    else
    {

      const idToken = req.headers.idtoken;
      console.log('idToken: ', idToken);

      const authenticatedActor = await getAuthenticadedActor(idToken);
      console.log('authenticatedActor: ', authenticatedActor);

      if(authenticatedActor === null)
      {
        res.status(401).send("No actor was found with the given idToken.");
      }
      else
      {

        let actorRoles = authenticatedActor.role;

        let isAuth = false;

        for (let i = 0; i < requiredRoles.length; i++) 
        {
          for (let j = 0; j < actorRoles.length; j++) 
          {
            if (requiredRoles[i] === actorRoles[j]) 
            {
              console.log("requiredRoles", requiredRoles[i], "actorRoles", actorRoles[j])

              if (authenticatedActor.isActive === true) 
              {
                isAuth = true;
                //this force a break, but for both for loops at once
                i = requiredRoles.length;
                j = actorRoles.length;
              }
            }
          }
        }

        if(isAuth) 
        {
          //attach authenticated user to the request
          req.authenticatedActor = authenticatedActor;
          return callback();
        } 
        else 
        {
          // an access token is valid, but requires more privileges
          res.status(403).send('The actor has not the required roles')
        } 

      }
      
    }
  }

}