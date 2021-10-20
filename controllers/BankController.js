const Users = require('../models/User');
const Document = require('../models/Document');
const Bank = require('../models/Bank');
const InfraConfigured = require('../models/InfraConfigured');
const jwt = require('jsonwebtoken');
const {
    getToken,
    createUser,
    checkRoles,
    checkInfraAdmin,
    editusers,
} = require("../middlewares/keyClock") ;



exports.addBank = async (req, res) => {
	let data = new Bank();
	const password = Math.random().toString(36).slice(-8);
	const { token,name,bcode,address1,state,zip,country,ccode,mobile,email,logo,contract,otp_id,otp} = req.body;
	if (
		name == "" ||
		address1 == "" ||
		state == "" ||
		mobile == "" ||
		email == ""
	) {
		res.send({ status: 0, message: "Please provide valid inputs"});
		return;
	}
		 
		Bank.findOne(
						{
							$or: [{ bcode: bcode }, { mobile: mobile }, { email: email }],
						},
						(err1, bank) => {
							if (err1) {
								console.log(err1);
								var message1 = err1;
								if (err1.message) {
									message1 = err1.message;
								}
								res.send({
									status: 0,
									message: message1,
								});
							} else if (bank != null) {
								res.send({
									status: 0,
									message:
										"Bank with either same code/mobile/email already exist.",
								});
							} else {
									
										if (err2) {
											const createUserResponse = await keyclock.createUser(token,mobile,password,email,keyclock_constant.groups.BANK_GROUP);
											if(createUserResponse){
												res.send({status: 0,message: "Error creating Bank Admin"});
											} else {
													data.name = name;
													data.bcode = bcode;
													data.address1 = address1;
													data.state = state;
													data.country = country;
													data.zip = zip;
													data.ccode = ccode;
													data.mobile = mobile;
													data.username = mobile;
													data.email = email;
													data.user_id = user._id;
													data.logo = logo;
													data.contract = contract;
													data.password = password;

													data.save((err3, d) => {
														if (err3) {
															console.log(err);
															var message3 = err3;
															if (err3.message) {
																message3 = err3.message;
															}
															res.send({
																status: 0,
																message: message3,
															});
														} else {
															let data2 = new Document();
															data2.bank_id = d._id;
															data2.contract = contract;
															data2.save((err4) => {});
															res.send({
																status: 1,
																message: "Added Bank successfully",
															});
														}
													});
											}											
										}								
							}
						}
					);				
};