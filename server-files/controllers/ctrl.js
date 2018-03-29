var nodemailer = require('nodemailer');
require('dotenv').config();


module.exports.home = (req,res)=>{
	res.render('index');
};

module.exports.get_login = (req,res)=>{

};

module.exports.post_login = (req,res)=>{
		
};

module.exports.get_registration = (req,res)=>{
	res.render('register');
};

module.exports.post_registration = (req,res)=>{
	var userName = req.body.username;
	var passWord = req.body.password;
	var skills = req.body.skills;
	var skillList = skills.split(" ");
	var db = req.db;
 	var collection = db.get('users');
	collection.insert({
		username: userName,
		password: passWord,
		skill: skillList
	});
	res.redirect('../');
};

module.exports.post_contact = (req,res)=>{
	var name = req.body.name;
	var email = req.body.email;
	var recipient = req.body.rec;
	var comment = req.body.comment;

	var body = "The following form was submitted. \n Name: " + name + "\n Email: " + email + "\n Comment/Questions:  " + comment;

	var transporter = nodemailer.createTransport({
		service: process.env.NODEMAILER_SERVICE,
		auth: {
			user: process.env.NODEMAILER_USER,
			pass: process.env.NODEMAILER_PASS
		}
	});
	
	var mailOption = {
			from: email,
			to: recipient,
			subject: 'Form Submitted',
			text: body
	};
	transporter.sendMail(mailOption,function(err,info){
		if(err){
			console.log("Mail was not sent."+err);
		}
		else{
			console.log("Thank you for your feedback!");
			res.redirect('../');
		}
	});

};