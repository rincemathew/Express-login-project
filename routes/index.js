var express = require('express');
var router = express.Router();

const { dataT } = require('../listUsers')


// let dataT=[{
//   email:'admin@gmail.com',
//   password:'1234'
// },
// {
//   email:'rince@gmail.com',
//   password:'12345'
// }]

let data = {}

let session

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.userid) {
    res.render('login', { email: req.session.userid });
  } else{
    res.render('index', { title: 'Login Page' });

  }
});




router.post('/',(req,res)=>{
  console.log(req.body)
  for(i=0;i<dataT.length;i++) {
    if(dataT[i].email===req.body.email){
      data = {email:dataT[i].email,
      password:dataT[i].password}
      break;
    }
  }
  if(req.body.email==data.email && req.body.password===data.password){
      session = req.session
      session.userid=req.body.email;
      console.log(session.userid)
      // res.redirect('/login')   
      res.render('login', { email: req.session.userid }); 
  }else{
    res.render('index', { title: 'invalid username and password' }); 
  }
})

router.get('/logout', function(req, res, next) {
      req.session.destroy()
      res.redirect('/')
    
  });
module.exports = router;
