const express = require('express');
const router = express.Router();
const ctrlUser = require('../controllers/user.controller');
const jwtHelper = require('../config/jwtHelper');

router.post('/edit/:email/:domaine/:name',ctrlUser.saveinfo);
router.post('/reserve/:Expertemail/:day/:time/:Clientemail',ctrlUser.reserve);
router.post('/register', ctrlUser.register);
router.post('/authenticate', ctrlUser.authenticate);
router.post('/delete/:email/:day', ctrlUser.delete);
router.put('/update/:id', ctrlUser.update);
router.get('/userProfile',jwtHelper.verifyJwtToken, ctrlUser.userProfile);
router.get('/consult/:email', ctrlUser.getconsult);
router.get('/searchName/:Search_Name', ctrlUser.searchbyName) ;
router.get('/expert/:email', ctrlUser.getall) ;
router.get('/searchDomaine/:Search_Domaine', ctrlUser.searchbyDomaine) ;
//router.get('/searchName/:Search_Name/:dispoday', ctrlUser.searchbyName) ;
//router.get('/searchDomaine/:Search_Domaine/:dispoday', ctrlUser.searchbyDomaine) ;
router.get('/daydetails/:email', ctrlUser.getdays) ;
router.get('/casecolor/:expertName/:consultday', ctrlUser.getcolor) ;
router.get('/reservation/:email', ctrlUser.getreservation) ;
router.get('/expertDetails/:_id', ctrlUser.getexpert) ;

module.exports = router;
