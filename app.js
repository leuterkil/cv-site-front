if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
  }
const express = require("express");
const ejsMate = require('ejs-mate');
const path = require('path');
const axios = require('axios');
const nodemailer = require('nodemailer');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


const transporter = nodemailer.createTransport({
    port: 465,
    host: 'smtp.gmail.com',
    auth: {
      user: 'echarissopoulos@gmail.com',
      pass: process.env.GMAIL_PASSWORD
    },
    secure:true
  });

  app.use(express.urlencoded({extended:false}));

const port = process.env.PORT || 3000;

app.get('/',async (req,res)=>{
    results = await axios.get('https://cv-builder-back.herokuapp.com/api/resumes?populate=%2A');
    const atts = results.data.data[0].attributes;
    const user = atts.resume_user.data.attributes;
    const Educations = atts.Educations;
    const works = atts.WorkingExperiences;
    const skills = atts.Skills;
    const softSkills = atts.SoftSkills;
    const volunteers = atts.Volunteering;
    SocialResults = await axios.get(`https://cv-builder-back.herokuapp.com/api/resume-users/1?populate=%2A`);
    const social = SocialResults.data.data.attributes.Social;
    resultsProj = await axios.get('https://cv-builder-back.herokuapp.com/api/resumes?populate=Projects.projectIcon');
    const projects = resultsProj.data.data[0].attributes.Projects;
    resultsCer = await axios.get('https://cv-builder-back.herokuapp.com/api/resumes?populate=Certificates.thumbnail');
    const certificates = resultsCer.data.data[0].attributes.Certificates;

    res.render('index',{user,Educations,works,certificates,projects,skills,softSkills,volunteers,social});
});

app.post('/mail',(req,res)=>{

    const {cName,cMail,cText} = req.body;
    const mailOptions = {
        from: 'leuterkil@gmail.com',
        to: 'echarissopoulos@gmail.com',
        subject: `New Message from ${cName}`,
        text:  `Mail : ${cMail}\nText: ${cText.trim()}`
      };

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          res.render('success');
        }
      });
});


app.listen(port, () => {
    console.log(`The server listens on port ${port}`);
});