"use strict";

	//var myWindow = window.open;

var num_login_attempts = 0;
	
function setLoginAndGoHomePage( url ){

		if( url !== undefined ){
		
			
		localStorage.setItem("isLogin" , 1 );
		window.location.href =  url ;
		}
}	
	
	
//---------------------------------------------------------------------
	function goForLogin(){
		window.location = "./sigin.html";
	}

//---------------------------------------------------------------------

	function goForRegistration(){
		window.location = "./register.html";
	}

//---------------------------------------------------------------------
	function goForLogintemp()
	{
		if (deviceIsOnline())
			window.location = "./template/sigin.html";
		else
			window.plugins.toast.showLongCenter("No internet connection.  Unable to log you in.");
	}

//---------------------------------------------------------------------
	function goForRegistrationtemp()
	{
		if (deviceIsOnline())
			window.location = "./template/register.html";
		else
			window.plugins.toast.showLongCenter("No internet connection.  Unable to register you.");
	}

//---------------------------------------------------------------------
	function setGender(gender){
		var Gender = gender;
		toggleGender(gender);
	}
//---------------------------------------------------------------------

	function toggleGender(gender){
		if(gender === 'm'){
			document.getElementById('male').style.backgroundColor= "#800080";
			document.getElementById('female').style.backgroundColor= "#400040";
		}else{
			document.getElementById('male').style.backgroundColor= "#400040";
			document.getElementById('female').style.backgroundColor= "#800080";
		}

	}

//---------------------------------------------------------------------

	function goForMoreInfo(){
		window.location = "info.html";
	}

//---------------------------------------------------------------------

	function setFittnessLevel(level){
		var fLevel = level;
	}


	//---------------------------------------------------------------------

	function goForEquipment(){
		window.location = "equipment.html";
	}

//---------------------------------------------------------------------

	function setEquipmentLevel(ql){
		var sqquipmentLevel = ql ;
	}

//---------------------------------------------------------------------

	function goForFittnessLevel(){
		window.location = "fitnessLevel.html";
	}

//---------------------------------------------------------------------

function updateFittasticRegistrationSource(user_id, registration_source, successCallback)
{
	//alert('Updating Fittastic Registration Source: ' + registration_source);	
	var obj = new Object();
	obj.fittastic_registration_source =  registration_source; 	
	
	var update_user_url = _REGISTRATION_URL + "/" + user_id;
	callWordpressAPIPost(update_user_url,obj,successCallback,apiPostFailureResponseCallBack);			
}

//---------------------------------------------------------------------

function createNewFittasticUserAccount(email, registration_source, password, successCallback)
{
	//alert('Creating new user account in wordpress: ' + email);	
	var obj = new Object();
	
	obj.username = email;
	obj.email = email;
	obj.password = password;
	obj.fittastic_registration_source =  registration_source; 	
	
	var create_user_account_url = _REGISTRATION_URL;
	callWordpressAPIPost(create_user_account_url,obj,successCallback,apiPostFailureResponseCallBack);			
}

//---------------------------------------------------------------------

function callWordpressAPI(url,method,callbacksuccess,callbackerror)
{
	var http = new XMLHttpRequest();

	http.open(method, url , true );
	//http.setRequestHeader("Access-Control-Allow-Origin","*");

	http.onreadystatechange = function() 
	{
		if (http.readyState == 4)
		{
			if((http.status >= 200) && (http.status < 300))
			{
				callbacksuccess(http);
			}
			else
			{
				callbackerror(http);
			}
		}
	}
	http.onerror = function(error)
	{
		callbackerror(http);
	}
	http.send();


}

function apiFailureResponseCallBack(http)
{
	if (http.status >= 500)
	{
		document.getElementById('error').innerHTML = _SERVICE_UNAVAILABLE;
	}
	else
	{
		document.getElementById('error').innerHTML =  "Oops something went wrong; please try again";
	}		
}

function callWordpressAPIPost(url,obj,callbacksuccess,callbackerror)
{
	var http = new XMLHttpRequest();
	http.open("POST", url , true );

	http.setRequestHeader("Authorization", "Basic Zml0bW9zaGE6V2Vya0l0R2lybDA4MTAh");
	http.setRequestHeader("Content-type", "application/json");

	//http.setRequestHeader("Access-Control-Allow-Origin","*");

	http.onreadystatechange = function() 
	{
		if (http.readyState == 4)
		{
			if((http.status >= 200) && (http.status < 300))
			{
				 
				callbacksuccess(http);
			}
			else
			{
				
				callbackerror(http);
			}
		}
	}
	http.onerror = function(error)
	{
		//alert('Error Failure: ' + http.responseText);
		callbackerror(http);
	}
	http.send(JSON.stringify(obj));
}

function apiPostFailureResponseCallBack(http)
{
	//alert('API Post Failure: ' + http.responseText)
	if (http.status >= 500)
	{
		window.plugins.toast.showLongBottom(_SERVICE_UNAVILABLE);
	}
	else
	{
		//alert(http.status);
		window.plugins.toast.showLongBottom("Oops something went wrong; please try again");
	}		
}


//------------------------------------------------------------------------------------------------------------



function verifyEmailSuccessResponseCallBack(http)
{
	var res = JSON.parse( http.responseText || "[]" );
	if(  res[0].id &&  parseInt( res[0].id ) > 0 )
	{
		var email = document.getElementById('forgotemail').value;
		setUserId(String( JSON.parse( http.responseText)[0].id ) ); //Question - Need to understand why we do this here
		setUserInfo( JSON.stringify(  JSON.parse( http.responseText )[0] ) );  //Question - Need to understand why we do this
			
		
		if(parseInt( JSON.parse( http.responseText)[0].id) > 0  &&  String( JSON.parse( http.responseText)[0].id ) !== "null" ) //Question - This is confusing.  Why are we checking if we check a few lines above?
		{
			sendAuthorizationCodetoEmail( email ); 
		}
		else
		{
			document.getElementById('forgoterror').innerHTML = "Invalid email address";
		}
		
	}
	else
	{
		document.getElementById('forgoterror').innerHTML =  "Invalid email address";
	}
}



function verifyForgotAuthorizationSuccessResponseCallBack(http)
{
	var res = JSON.parse( http.responseText || "[]" );
	 
	 
		if( JSON.parse( http.responseText) ===  "0" )
		{
			var email = document.getElementById('forgotemail').value;
			document.getElementById('forgoterror').innerHTML = "";
			document.getElementById('forgotemail').value = "";
			document.getElementById('forgotemail').setAttribute("placeholder" , "Enter authentication code here");
			document.getElementById('heading').innerHTML = "Check your email for authentication code and enter below.";
			document.getElementById('button').innerHTML = "Verify Authentication Code";
			document.getElementById('button').setAttribute("onclick" , "verifyForgotAuthorizationCode( '"+email+"'  )");						
						
		}
		else if(  JSON.parse( http.responseText) ===  "1" )
		{
			document.getElementById('button').innerHTML = "Oops, something went wrong. Please try again."
		}
		else if(  JSON.parse( http.responseText) ===  "-1" )
		{
			document.getElementById('forgoterror').innerHTML = "System Error: Invalid Syntax";
		}
 
	else
	{
		document.getElementById('error').innerHTML =  "Unable to log you in.  Please try again.  If problem persists, try resetting your password.";
	}
}


function verifyForgotAuthorizationFailureResponseCallBack(http)
{
	if (http.status >= 500)
	{
		document.getElementById('forgoterror').innerHTML = _SERVICE_UNAVILABLE;
	}
	else
	{
		document.getElementById('forgoterror').innerHTML =  "Oops something went wrong while verifying your authorization code; please try again";
	}		
}

function sendAuthorizationCodetoEmail(email)
{					

	var forgot_url=_FORGOT_PASSWORD + email + "&otp=" +   generateOTP();
	callWordpressAPI(forgot_url,'GET',verifyForgotAuthorizationSuccessResponseCallBack,verifyForgotAuthorizationFailureResponseCallBack);  // Question - this is really call fittastic API, but I will leave for now due to release pressure
 
}

function passwordResetSuccessResponseCallBack(http)
{
	var res = JSON.parse( http.responseText || "[]" );
	if(   res.id &&  parseInt(res.id)  > 0 )
	{
		setUserInfo( http.responseText );
		if(parseInt( JSON.parse( http.responseText).id) > 0  &&  String( JSON.parse( http.responseText).id ) !== "null" )
		{		
			setLoginAndGoHomePage("./menulisting.html");
		}
		
								 
		try
		{
			document.getElementById('forgotpasspage').style.display = "none";
			document.getElementById('divID').style.display = "block";
		}
		catch(err)
		{

		}	
		
	}
	else
	{
		document.getElementById('error').innerHTML =  "Unable to log you in.  Please try again.  If problem persists, try resetting your password.";
		document.getElementById('forgoterror').innerHTML =  "Unable to log you in.  Please try again.  If problem persists, try resetting your password.";
	}
}


function doRegistrationSuccessResponseCallBack(http)
{
	var res = JSON.parse( http.responseText || "[]" );
	if(  res.id &&  parseInt(res.id ) > 0)
	{	
		var user_id = String( JSON.parse( http.responseText ).id );
		setUserId( String( JSON.parse( http.responseText ).id ));
		setUserInfo( http.responseText );
		var email = document.getElementById("email").value;
		document.getElementById("error").innerHTML  = "" ;		
		document.getElementById('input').innerHTML  = document.getElementById('changepassworddom').innerHTML; 
		document.getElementById('button').innerHTML = "Set password";
		document.getElementById('heading').innerHTML = "Please set your password";
		document.getElementById('button').setAttribute("onclick" , "doResetPassword('" + email + "','goTomenulistingPage')");
					
	}
	else
	{
		document.getElementById('error').innerHTML =  "Unable to log you in.  Please try again.  If problem persists, try resetting your password.";
		
	}
}

function doRegistrationWithEmail( email  ) 
{
			 
		var obj = new Object();
			obj.username = email;
			obj.email =    email;
			obj.password = "fittastic123!"; //Temp while user confirms authorization code
			obj.fittastic_registration_source = 'fittasticbyaicha';

				
		var reset_url= _REGISTRATION_URL;

		callWordpressAPIPost(reset_url,obj,doRegistrationSuccessResponseCallBack,apiPostFailureResponseCallBack);
	 
}


//All Facebook related signin and registration methods in this section

var fbLogin = function () 
{
	alert("Welcome to facebook page");
	if (deviceIsOnline())
	{
		try 
		{	 
			alert("alert1! plugin login Successfull")
			facebookConnectPlugin.login(['public_profile', 'email' ], fbLoginSuccess, fbLoginError);
		}
		catch(err)
		{
			alert("alert2! Plugin login failed")
			window.plugins.toast.showLongBottom(err);
		}
	}
	else
		window.plugins.toast.showLongCenter("No internet connection.  Unable to log you in.");

}

var fbLoginSuccess = function (userData) 
{
	try
	{
		alert("alert3! fblogin() function");
		console.log( "userID"  +  JSON.stringify(userData.authResponse.userID)  );
		console.log( "accessToken" +  JSON.stringify(userData.authResponse.accessToken)  );
		console.log( "status"  + JSON.stringify(userData.status)  );
		console.log( "expiresIn" + JSON.stringify(userData.authResponse.expiresIn)  );

		facebookConnectPlugin.api(	userData.authResponse.userID+"/?fields=id,email,first_name,last_name,age_range,birthday",
									['public_profile', 'email'], function(data) 
																{
																	//alert( JSON.stringify(data) );		
																	//alert("Name: "+ data.first_name+" Email: "+ data.email );
				
																	localStorage.setItem("FB_firstname" , data.first_name   );
																	localStorage.setItem("FB_lastname" , data.last_name );
																	localStorage.setItem("FB_useremail" , data.email );
																	//Okay, this is where a major change happens.  We are not going to
																	//just call doRegistration, we are going to check if the an account
																	//already exists with the facebook associated email address (data.email)
																	checkIfAccountExistsInWordpress(data.email,checkIfFBAccountExistsInWordpressResponseCallBackSuccess);
																	//--- Old Stuff --- doFBRegistration( data.email.substr( 0  ,  data.email.indexOf("@")) , data.email , "facebook" );
																}, function(error) 
																	{
																		window.plugins.toast.showLongBottom(error);
																	});

	}
	catch(err)
	{
		window.plugins.toast.showLongBottom(err);
	}

};


var fbLoginError = function (error) {
	alert("Alert4! checks error");
	window.plugins.toast.showLongBottom('Unable to sign you in using Facebook.  Please try again.');
};

//This function is not used.  Can safely be removed
function doFBRegistration( fbusername , fbuseremail , registration_source ) 
{	
	//window.plugins.toast.showLongBottom('Facebook doRegistration');	
	alert("Alert5! registration");
	var obj = new Object();
	obj.username = fbusername;
	obj.email =    fbuseremail;
	obj.fittastic_registration_source = 'facebook';
	
	if( typeof registration_source === "string" )
	{
        var pass;
        pass = "fittastic123!";
	}
	obj.password =  pass ;

	obj.fittastic_registration_source =  registration_source || "fittasticbyaicha" ; 
	
	var reset_url= _REGISTRATION_URL;
	callWordpressAPIPost(reset_url,obj,fbRegistrationSuccessResponseCallBack,fbRegistrationSuccessResponseCallBack);			
			
}

//This function is not used.  Can be safely be removed
function fbRegistrationSuccessResponseCallBack(http)
{
	//window.plugins.toast.showLongBottom('Successfull FB Registration');
	var userInfo = getUserInfo();
	userInfo.fittastic_user_first_name  = localStorage.getItem("FB_firstname") || "" ;
	userInfo.fittastic_user_last_name  = localStorage.getItem("FB_lastname") || "" ;
									
	localStorage.setItem("FB_firstname" , "" );
	localStorage.setItem("FB_lastname" , "" );
	localStorage.setItem("FB_useremail" , "" );		
	setLoginAndGoHomePage("./template/menulisting.html");
}


//For sign-in attempts using facebook.  We need to know if the
//account exists in the wordpress user table
function checkIfAccountExistsInWordpress(email,successCallback)
{
	alert("Alert6! checks Account already exist")
	//window.plugins.toast.showLongBottom("Checking if email account already registered...");
	try
	{
		var email_url=_REGISTRATION_URL +"/?email="+ email;
		callWordpressAPI(email_url,'GET',successCallback,apiFailureResponseCallBack);
	}
	catch(err)
	{
		window.plugins.toast.showLongBottom(err);
	}
}


function checkIfFBAccountExistsInWordpressResponseCallBackSuccess(http)
{
	alert("Alert7! checks Account existance in wordpress");
	//window.plugins.toast.showLongBottom(http.responseText);
	var res = JSON.parse( http.responseText || "[]" );
	//alert(JSON.stringify(res[0]));

	var wp_account_record = res[0];	
	//alert(wp_account_record.id);
	if( wp_account_record.id && parseInt(wp_account_record.id) > 0 )
	{
		//This means that a record exists in the WP database with the email associated to the FB account
		//Now we need to check if the fittastic_registration_source = 'Facebook', 'Fittastic' or '' and 
		//process accordingly
		//alert('Checking Registration Source...');
		//alert(wp_account_record.fittastic_registration_source);
		if (wp_account_record.fittastic_registration_source == 'facebook')
		{
			directFBUserToLandingPage(http);
		}
		else if (wp_account_record.fittastic_registration_source == 'fittasticbyaicha')
		{
			//Instruct the user to login with email and password
			window.plugins.toast.showLongBottom('You have registered the email address linked to this Facebook account.  Please select the LOGIN option and enter your email address and password when prompted.');
		}
		else
		{
			//This is a unique case where legacy email addresses were not linked to the registration source
			//So if the registration source is blank, update it with 'Facebook', so that next time around
			//the facebook users will automatically be signed in
			//alert('Updating registration source to Facebook');
			updateFittasticRegistrationSource(wp_account_record.id, 'facebook', directFBUserToLandingPage);
		}
		//var email = document.getElementById('email').value;
		//if( res.user.id && parseInt(res.user.id)> 0 )
		//{
		//	localStorage.setItem("accountExistsCheckOnRegistration" , email );
		//	window.location.href = "./sigin.html";	
		//	//document.getElementById('error').innerHTML = "you already registered";//redirect
		//}
		//else
		//{	
		//	sendEmailwithAuthorizationCodeForRegistration( email ); 
		//}
	}
	else
	{
		//Register with Facebook
		//alert('New facebook registration');
		alert("Alert8! Register's with facebook");
		if( localStorage.getItem("FB_useremail") !== "" )
		{
			var email = localStorage.getItem("FB_useremail");
			createNewFittasticUserAccount(email, 'facebook', 'fittastic123!', directFBUserToLandingPage);
		}
		else
		{
			window.plugins.toast.showLongBottom("Error while logging into Facebook.  Please try signing into Facebook again.");
		}
	}
}

function directFBUserToLandingPage(http)
{
	alert("Alert9! takes FB user to app landing page")
	 //alert('About to direct user to homepage: ' + http.responseText);
	 var res = JSON.parse( http.responseText.Success || "[]" );
	 if( parseInt(String( JSON.parse( http.responseText ).id )) > 0  ||  parseInt(String( JSON.parse( http.responseText )[0].id )) > 0  )
	 {
	  //alert('Redirecting FB user to homepage for user_id...' +  parseInt(String( JSON.parse( http.responseText ).id )));

	  var userId = parseInt(String( JSON.parse( http.responseText ).id )) ||  parseInt(String( JSON.parse( http.responseText )[0].id ));
	  

	  setUserId( userId );
	  setLoginAndGoHomePage("template/menulisting.html");
	 }
	 else
	 {
	  window.plugins.toast.showLongBottom('Error logging you in.  Please try again.'); 
	 }
 
}


//Email registration and signin related methods


//Can safely be removed; No longer used.  Replaced by checkIfAccountExistsInWordpress 
function checkIfAccountExists(email)
{
	try
	{
		var email_url=_REGISTRATION_URL +"/?email="+   email;
		callWordpressAPI(email_url,'GET',existUserSuccessResponseCallBack,apiFailureResponseCallBack);
	}
	catch(err)
	{
		window.plugins.toast.showLongBottom(err);
	}
}


function userRegistrationByEmail()
{
	var email = document.getElementById('email').value.trim();
	if( ValidateEmail(email) )
	{
		checkIfAccountExistsInWordpress( email, checkIfEmailAccountExistsInWordpressResponseCallBackSuccess);
		//checkIfAccountExists(email.trim()); old stuff
	}
	else
	{
		document.getElementById('error').innerHTML = "Please enter valid email address";
	}
}

function checkIfEmailAccountExistsInWordpressResponseCallBackSuccess(http)
{
	var email = document.getElementById('email').value; //Email entered in form by user when registering
	var res = JSON.parse( http.responseText || "[]" );
	if(  res[0].id &&  parseInt(res[0].id) > 0 )
	{	 
		localStorage.setItem("accountExistsCheckOnRegistration" , email.trim() );
		window.location.href = "./sigin.html";	
		//document.getElementById('error').innerHTML = "you already registered";//redirect
	 
	}
	else
	{
		sendEmailwithAuthorizationCodeForRegistration( email.trim() ); 
	}
}


function registrationEmailWithAuthorizationCodeSuccessResponseCallBack(http)
{
	var res = JSON.parse( http.responseText || "[]" );
	if( JSON.parse( http.responseText) ===  "0" )
	{						
		document.getElementById("otpinput").style.display = "block";
		document.getElementById("email").style.display = "none";

		var email = document.getElementById('email').value;
		document.getElementById('error').innerHTML = "";
		document.getElementById('otpinput').value = "";
		document.getElementById('otpinput').setAttribute("placeholder" , "Enter authentication code here");
		document.getElementById('heading').innerHTML = "Check your email for authentication code and enter below.";
		document.getElementById('button').innerHTML = "Verify Authentication Code";
		document.getElementById('button').setAttribute("onclick" , "verifyAuthorizationCodeForRegistration( '"+ email +"'  )");						
					
	}
	else if(  JSON.parse( http.responseText) ===  "1" )
	{
		document.getElementById('button').innerHTML = "Oops, something went wrong. Please try again.";
	}
	else if(  JSON.parse( http.responseText) ===  "-1" )
	{
		document.getElementById('error').innerHTML = "System Error: Invalid Syntax";
	} 
}



function sendEmailwithAuthorizationCodeForRegistration( email )
{

	var generate_otp_url = _GENERATE_OTP_URL + email + "&otp=" +   generateOTP();
	callWordpressAPI(generate_otp_url,'GET',registrationEmailWithAuthorizationCodeSuccessResponseCallBack,apiFailureResponseCallBack);

}


function doResetPassword( email , goToHomePage )
{
 
	if( document.getElementById('forgotpass').value  !== "" && document.getElementById('confirmforgotpass').value  !== "" && document.getElementById('forgotpass').value === document.getElementById('confirmforgotpass').value )
	{
		//alert('About to reset password...');
		var obj = new Object();				 
		//obj.email = email ; 
		obj.password =  document.getElementById('forgotpass').value;
		obj.fittastic_registration_source = 'fittasticbyaicha';
				
		var reset_url= _REGISTRATION_URL+"/" + _USER_ID;
		//alert(reset_url);

		callWordpressAPIPost(reset_url,obj,passwordResetSuccessResponseCallBack,apiPostFailureResponseCallBack);
				
	}
	else
	{
		try{	document.getElementById('forgoterror').innerHTML = "Passwords do not match.  Please try again.";	}catch(err){}
		try{	document.getElementById('error').innerHTML = "Passwords do not match.  Please try again.";	}catch(err){}
	}
}



function checkUserSourceSuccessFromWP(http)
{
	//alert(http.responseText);
	var res =  JSON.parse( http.responseText);
	if( res[0].id && parseInt( res[0].id  ) )
	{	
		if( res[0].fittastic_registration_source === 'fittasticbyaicha' )
		{
			//alert('fittasticbyaicha reg source...will attempt login');
			var  email = document.getElementById('email').value;
			var url_login=_LOGIN_URL + email + '&password=' + document.getElementById('pwd').value +'&insecure=cool';
			//alert(url_login);
			callWordpressAPI(url_login,'GET',loginSuccessResponseCallBack,apiFailureResponseCallBack);
		}
		else if ( res[0].fittastic_registration_source === 'facebook' )
		{
			//Instruct the user to login with email and password
			window.plugins.toast.showLongBottom('You previously signed in using a Facebook account linked with this email address.  Please sign in with Facebook.');
			window.location.href='../index.html';
		}
		else
		{
			//alert('Updating reg source on first log in...');
			//Special case where fittastic_registration_source is not either Facebook or fittasticbyaicha
			//We have to update the WP record, set = 'fittasticbyaicha'
			updateFittasticRegistrationSource(res[0].id, 'fittasticbyaicha', function()
																			{ 
																				var  email = document.getElementById('email').value;
																				var url_login=_LOGIN_URL + email + '&password=' + document.getElementById('pwd').value +'&insecure=cool';
																				callWordpressAPI(url_login,'GET',loginSuccessResponseCallBack,apiFailureResponseCallBack);
																			});
		}
	}
	else
	{
		document.getElementById("error").innerHTML = "It appears that email address is not registered.  Please check the email address you entered and try again.  Otherwise, go ahead and register or signin with your Facebook account.";
	}
}




function doLogin()
{
	// alert('Attemptin to log in...');
	if ((document.getElementById('email').value == "" || document.getElementById('email').value == null) ||
		(document.getElementById('pwd').value == "" || document.getElementById('pwd').value == null))
	{
		document.getElementById('error').innerHTML = "You must enter an email address and password.";
	}
	else
	{
		try
		{

			//We really should check of the account exists first.  If it doesn't, then instruct user to create an account
			var  email = document.getElementById('email').value.trim();
			// alert(email);
			if(ValidateEmail(email))
			{
				checkIfAccountExistsInWordpress(email ,checkUserSourceSuccessFromWP );

			}
			else
			{
				document.getElementById('error').innerHTML =  "Invalid Email Address"; 
			}
		}
		catch(err)
		{
			document.getElementById('error').innerHTML =  _SERVICE_UNAVILABLE;
		}
	}
}

function loginSuccessResponseCallBack(http)
{
	//alert('In login success call back ' + http.responseText);
	var res = JSON.parse( http.responseText || "[]" );
	if (res.status == "error")
	{
		//alert('Error: ' + res.error);
		num_login_attempts++ ;
		
		if( num_login_attempts <= 3  )
			window.plugins.toast.showLongBottom('Invalid credentials. Please try again');
			//document.getElementById('error').innerHTML =  'Invalid credentials. Please try again';
		else
			window.plugins.toast.showLongBottom('Invalid credentials. Try resetting your password by clicking Forgot Password');
			//document.getElementById('error').innerHTML =  'Invalid credentials. Try resetting your password by clicking Forgot Password';	
	}
	else
	{
		if( res.user.id  && parseInt( res.user.id ) > 0 )
		{
			//alert('Successfully logged in; now setting userID and redirecting to menulisting...');
			//This is where we need to check that the registration_source = 'fittasticbyaicha'.  If it is, then
			//set and redirect, else alert that user must Sign in with Facebook.
			//if (wp_account_record.fittastic_registration_source == 'fittasticbyaicha')
			//if( res.user.id.toString().length > 0 )
			//{
			num_login_attempts = 0 ;
			setUserId( String( res.user.id ) );
			setLoginAndGoHomePage("./menulisting.html");
			//}
		}
		else
		{
			//alert('Unable to log you in...');
			document.getElementById('error').innerHTML =  "Unable to log you in.  Please try again.  If problem persists, try resetting your password.";
		}
	}
}



//---------------------------------------------------------------------



function isLogin()
{
		if( 1 == localStorage.getItem("isLogin"))
			window.location.href = "./template/menulisting.html";
}


function goBackPage()
{
	  window.history.back();
}
//---------------------------------------------------

//Should be in utility.js
function getUserInfoFromServer(email)
{
	try
	{
		if(	localStorage.getItem("FB_useremail") !== ""  ||  email !=='undefined' )
		{
			var email = email || localStorage.getItem("FB_useremail");

			var url_user_info =_REGISTRATION_URL +"/?email="+   email;

			callWordpressAPI(url_user_info,'GET',verifyEmailSuccessResponseCallBack,apiFailureResponseCallBack);
		}	
	}
	catch(err)
	{
		window.plugins.toast.showLongBottom(err);
	}	
}

function displayForgotPassword()
{
	 document.getElementById('divID').style.display = 'none'; 
	 document.getElementById('forgotpasspage').style.display = 'block'; 
}

function verifyEmailtoResetPassword()
{

 	var email = document.getElementById('forgotemail').value;
 	
 	if(email !== "")
 	{
		var url_user_info =_REGISTRATION_URL +"/?email="+   email;
		callWordpressAPI(url_user_info,'GET',verifyEmailSuccessResponseCallBack,apiFailureResponseCallBack); 	}
	else
	{
		document.getElementById('forgoterror').innerHTML = "Please enter registered email address";	
	}
	

}


function verifyForgotAuthorizationCode( email )
{
	 //var OPT = localStorage.getItem("OTP");	
	 if( document.getElementById('forgotemail').value.trim() === localStorage.getItem("OTP")  )
	 {	 
		document.getElementById('input').innerHTML  = document.getElementById('changepassworddom').innerHTML; 
		document.getElementById('button').innerHTML = "Change password";
		document.getElementById('heading').innerHTML = "Please reset your password";
		document.getElementById('button').setAttribute("onclick" , "doResetPassword( '"+ email +"' )");
		document.getElementById('forgoterror').innerHTML = "";	 	 
	 }
	 else
	 {
		document.getElementById('forgoterror').innerHTML = "Invalid Authentication Code";
	 }
}



function generateOTP(){
 
 localStorage.setItem("OTP" , String( Math.random()).substr(2 , 4) );
 
 return localStorage.getItem("OTP"); 
}




function openPrivacyPolicy(){
cordova.InAppBrowser.open("http://www.fittasticbyaicha.com/privacy-policy/" , "_blank" ,"location=no");

}



//registration 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




function checkAccountExistsOnRegistrationStatus()
{
	if( localStorage.getItem("accountExistsCheckOnRegistration") !== "" && 
		localStorage.getItem("accountExistsCheckOnRegistration") !== null )
	{
		document.getElementById('email').value = localStorage.getItem("accountExistsCheckOnRegistration");
		document.getElementById('error').innerHTML = "Account Already Exists.  Please enter your password or click Forgot Password.";
		localStorage.setItem("accountExistsCheckOnRegistration" , "" );
	}
}





function verifyAuthorizationCodeForRegistration( email )
{
	 //var OPT = localStorage.getItem("OTP");	
	 if( document.getElementById('otpinput').value.trim() === localStorage.getItem("OTP")  )
	 {
	 
		doRegistrationWithEmail( email );
	 
		/* document.getElementById('input').innerHTML  = document.getElementById('changepassworddom').innerHTML; 
		document.getElementById('button').innerHTML = "Change password";
		document.getElementById('heading').innerHTML = "Please reset yours password";
		document.getElementById('button').setAttribute("onclick" , "doRegistrationWithEmail('" + email + "')");
		document.getElementById('forgoterror').innerHTML = ""; */
		 
	 
	 }
	 else
	 {
		document.getElementById('error').innerHTML = "Invalid Authentication Code";
	 }
}




function ValidateEmail( mail )   
{  
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test( mail ))  
  {  
    return true ; 
  }  
    
    return false; 
}  


