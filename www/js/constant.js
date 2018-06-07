'use strict';

//resource urls
var _CMP_NAME = ""; //FITTASTIC by Aicha
var _VD_HEIGHT = "204px";
var _DATAJSON = "ZGF0YS5qc29u";
var _TOKEN = "?token=Zml0dGFzdGljYXBwdG9rZW4=";
var _IP = "http://fittasticapi-2060801130.us-west-2.elb.amazonaws.com";
var _PORT = ":2000";
var _SERVER_IMG_URL =  _IP + _PORT + "/gets3image"+_TOKEN+"&key=";
var _SERVER_VD_URL =  _IP + _PORT + "/"+_TOKEN+"&key=";
//var _VD_LOCK_DETAIL_URL =  _IP + _PORT + "/gets3image"+_TOKEN+"&key=cHJvcGVydGllcy5qc29u";
var _VD_LOCK_DETAIL_URL =  _IP + _PORT + "/gets3image"+_TOKEN+"&key=cHJvcGVydGllcy1zdGFnZS5qc29u";
var _TR_DETAIL_URL =  _IP + _PORT + "/gets3image"+_TOKEN+"&key=dHJhbnNmb3JtYXRpb25zLmpzb24=";
var _MENU_DATA_URL =  _IP + _PORT + "/gets3image"+_TOKEN+"&key=" + _DATAJSON ;
var _Measure_VD_URL = _SERVER_VD_URL + "MyN0b29scy8xI2hvd190b19tZWFzdXJlX3lvdXJzZWxmL1Jlc18gTWVhc3VyZW1lbnQubXA0";
var _STREAM_URL = _IP + _PORT + "/gets3videocloudfront?key=";
var _MEALSPLAN_DATA_URL =  _SERVER_IMG_URL ;

 //account urls
var _FORGOT_PASSWORD =  _IP + _PORT + "/forgotpassword?email=";
var _GENERATE_OTP_URL  =  _IP + _PORT + "/registeraccountemailotp?email=";
/*
0 -> success
-1 -> invalid credentials
1 -> mail not sent

http://fittasticapi-2060801130.us-west-2.elb.amazonaws.com:2000/gets3image?token=Zml0dGFzdGljYXBwdG9rZW4=&key=
*/
var _REGISTRATION_URL = "http://af92b51d4fe48bcf1b7ca550d7d31bab-1691120527.us-west-2.elb.amazonaws.com/wp-json/wp/v2/users";
var _LOGIN_URL = "http://af92b51d4fe48bcf1b7ca550d7d31bab-1691120527.us-west-2.elb.amazonaws.com/api/user/generate_auth_cookie/?username=";



//social share
var _SOCIAL_SHARE_MSG = "Hi there! Download the Get FITT with Aicha app for healthly meal plans, wellness tips, and AWESOME workout programs that will get you FITTer in just 30 Days!";
var _SOCIAL_SHARE_SUB = "FITTNESS";
var _SOCIAL_SHARE_IMG_URL = null;
var _SOCIAL_SHARE_AICHA_URL  = "https://itunes.apple.com/us/app/get-fitt-with-aicha/id1320025553?mt=8";
 

//general msg
var _SERVICE_UNAVAILABLE = "Services unavailable. Make sure your device as internet access. If this problem continues to persist, please contact customer support.";


//Subscription 
 
var _NON_EXPIRING_SUBSCRIPTION = ""; // msg dynamically created by payment.js file
var _EXPIRED_SUBSCRIPTION = "";  // msg dynamically created by payment.js file
var _EXPIRING_SUBSCRIPTION = "" ;
var _UNSUBSCRIBED_USERS = "To access premium content and features, please purchase a subscription.";




//global variable	
/*  var module = {}; */
//var require = {};
var transformations = [];
var _BACK_HISTORY = [];
var data = [];
var  VIDEO_CONFIG = [];
var len = 0;
var offlinemode = 0;
var _USER_ID = localStorage.getItem("userID") || "";
var _USER_INFO = JSON.parse("{}"); 
var _DOWNLOADED_VIDEO_ID_ARRAY = [] ;
var subscription ={
	lock       : 1 ,  //1 lock ; 0 = unlock
	daysremain : 0 
};	


//IAP payment  product id's
var _product = { list:[] , details:[] };

//calling in fittness.js
function checkSubscriptionExpiryDate(){

var _MS_PER_DAY = 86400000 ; // 1000 * 60 * 60 * 24;
var expdate = new Date(  JSON.parse( localStorage.getItem(  localStorage.getItem( "userID") || "{}" ) || "{}"  ).fittastic_subscription_expiry_date || "");

	if( expdate.toString() !== "Invalid Date" ){
		var today = new Date();
		var utc2 = Date.UTC(expdate.getFullYear(), expdate.getMonth(), expdate.getDate());
		var utc1 = Date.UTC( today.getFullYear(), today.getMonth(), today.getDate() );
		var remaining_days = (	utc2 - utc1) / _MS_PER_DAY  ;
		 if( remaining_days  >= 1 ) 
				subscription.lock = 0;	
			else
				subscription.lock = 1;	
			
		subscription.daysremain	= remaining_days;			
		console.log((	utc2 - utc1) / _MS_PER_DAY +"days has to go" ); 
		
}else
	subscription.lock = 1;	
}

checkSubscriptionExpiryDate();



// to make it global function are here instead of utility file
function setUserInfo( userInfo){
	
	if( _USER_ID !== ""){
	
		localStorage.setItem( _USER_ID , userInfo );
		_USER_INFO 	= getUserInfo();
		
	}else
		window.location.href = "./sigin.html";
}

function getUserInfo(){

if( _USER_ID !== "")
	return  JSON.parse( localStorage.getItem( _USER_ID ) || "{}" ) || []  ; 
else
	window.location.href = "./sigin.html";	

}

function setUserId( USER_ID ){

	localStorage.setItem( "userID" , String(USER_ID) );
	_USER_ID = localStorage.getItem("userID") || "";
}