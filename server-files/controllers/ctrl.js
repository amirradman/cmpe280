var nodemailer = require('nodemailer');
require('dotenv').config();



module.exports.home = (req,res)=>{
	if(!req.session.user){
		res.render('index');
	}
	else{
		res.render('LoggedIndex',{user: req.session.user});
	}
};

module.exports.get_login = (req,res)=>{
	res.render('login');
};

module.exports.post_login = (req,res)=>{
	var db = req.db;
	var collection = db.get('users');

	collection.find({$and : [{username: req.body.loginname},{password: req.body.loginpass}]},function(err,data){
		if(err)
			console.log("An error occured:"+err);
		else{
			if(data.length>0){
				req.session.user = data[0].username;
				req.session.fname = data[0].firstname;
				req.session.lname = data[0].lastname;
				req.session.skill = data[0].skill;
				req.session.password = data[0].password;
				res.render('LoggedIndex',{user: req.session.user});
			}
			else{
				res.render('login',{credentialMessage: "Invalid Credentials"});
			}
		}
	});
};

module.exports.get_registration = (req,res)=>{
	res.render('register');
};

module.exports.post_registration = (req,res)=>{
	var db = req.db;
 	var collection = db.get('users');
 	collection.find({username: req.body.username},function(err,data){
 		if(err)
 			console.log("An error occured" + err);
 		else{
 			if(data.length > 0){
 				res.render('register',{duplicateUsername: "Username already exists"});
 			}
 	else{
		var userName = req.body.username;
			var userNameTrimed = userName.trim();
		var firstName = req.body.firstname;
			var firstNameTrimed = firstName.trim();
		var lastName = req.body.lastname;
			var lastNameTrimed = lastName.trim();
		var passWord = req.body.password;
		var skills = req.body.skills;
		skills = skills.replace(/\s*,\s*/g, ",").trim();
		var skillList = skills.split(',');
		collection.insert({
			username: userNameTrimed,
			firstname: firstNameTrimed,
			lastname: lastNameTrimed,
			password: passWord,
			skill: skillList
			});
			res.redirect('/login');
 	}}});
 };

 module.exports.get_update = function(req,res){
 	var db = req.db;
 	var collection = db.get('users');
 	collection.find({username: req.session.user},function(err,data){
 		req.session.user = data[0].username;
		req.session.fname = data[0].firstname;
		req.session.lname = data[0].lastname;
		req.session.skill = data[0].skill;
 		res.render('profile',{profileUser: req.session.fname,un: req.session.user,fn: req.session.fname,ln: req.session.lname,sk: req.session.skill});
 	});
};

module.exports.post_update = function(req,res){
	var db = req.db;
	var collection = db.get('users');
	var firstName = req.body.firstname;
	var firstNameTrimed = firstName.trim();
	var lastName = req.body.lastname;
	var lastNameTrimed = lastName.trim();
	var skills = req.body.skills;
	skills = skills.replace(/\s*,\s*/g, ",").trim();
	var skillList = skills.split(',');
	collection.update({username: req.session.user},{$set: {firstname: firstNameTrimed, lastname:lastNameTrimed , skill: skillList}});
	res.render('profile', {updatemsg: "Profile updated successfully!",profileUser: firstNameTrimed,un: req.session.user,fn: firstNameTrimed,ln: lastNameTrimed,sk: skillList});
};

 module.exports.delete = function(req,res){
	var db = req.db;
	var collection = db.get('users');

	collection.remove({username: req.session.user},function(err){
		if(err)
			console.log("error deleting account"+err);
		else{
			req.session.destroy();
			res.redirect('/');
		}
	});
};

 module.exports.logout = function(req,res){
 	if(req.session.user){
 		req.session.destroy();
 		res.redirect('/');
 	}
 	else{
 		res.send("There is no session to be destroyed!");
 	}
 }

module.exports.loggedIn = function(req,res,next){
	if(req.session.user){
		next();
	}
	else{
		res.send("You must log in first");
	}
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



module.exports.get_manage = function(req,res){
	var db = req.db;
	var collection = db.get('users');
	collection.find({},{},function(err,docs){
			res.render('userlist', {"userlist" : docs});
		});
};

module.exports.adminLoggedIn = function(req,res,next){
	if(req.session.user === 'admin')
		next()
	else{
		var db = req.db;
 		var collection = db.get('users');
 		collection.find({username: req.session.user},function(err,data){
 		req.session.user = data[0].username;
		req.session.fname = data[0].firstname;
		req.session.lname = data[0].lastname;
		req.session.skill = data[0].skill;
 		res.render('profile',{updatemsg: "Login as admin to gain access",profileUser: req.session.fname,un: req.session.user,fn: req.session.fname,ln: req.session.lname,sk: req.session.skill});
 	});
 }};

 module.exports.delete_user = function(req,res){
 		var db = req.db;
		var collection = db.get('users');
		collection.remove({username: req.body.rmuser},function(err){
		if(err)
			console.log("error deleting account"+err);
		else{
			collection.find({},{},function(err,data){
			if(err)
				console.log(err);
			else{
			if(data.length == 0){
 				req.session.destroy();
 				res.redirect('/');
			}
			else{
				res.render('userlist', {"userlist" : data});
			}
		}
	 });
		}
	});

 };