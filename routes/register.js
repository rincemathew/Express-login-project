var express = require('express');
var router = express.Router();

const { dataT } = require('../listUsers')

router.get('/', function(req, res, next) {
    if(req.session.userid) {
      res.render('login', { email: req.session.userid });
    } else{
      res.render('register', { title: 'Register new User' });
  
    }
  });

  router.post('/',(req,res)=>{
    if(req.body.email!=='' && req.body.password!==''){
        dataT.push({
            email:req.body.email,
            password:req.body.password
        })  
        res.redirect('/');
        // res.render('register', { title: 'good move' }); 
    }else{
      res.render('register', { title: 'Type valid username and password' }); 
    }
  })

  module.exports = router;