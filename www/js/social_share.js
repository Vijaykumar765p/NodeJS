'use strict';

//parameter for social share : message,subject,file,url,

var _isMSG_UPDATED = 0 ;


function setSocialShareMsgFromServer(){

	_SOCIAL_SHARE_MSG = getNameFromProperties("social_share").name || _SOCIAL_SHARE_MSG;
	_isMSG_UPDATED = 1 ;
	
}

function shareWithWhatsup()
{
	if (deviceIsOnline())
	{
		if( _isMSG_UPDATED == 0 )
		{
			setSocialShareMsgFromServer();
		}
		window.plugins.socialsharing.shareViaWhatsApp(_SOCIAL_SHARE_MSG,_SOCIAL_SHARE_IMG_URL , _SOCIAL_SHARE_AICHA_URL , onShareSuccess, onShareError);
	}
	else
	{
		window.plugins.toast.showLongCenter("No internet connection.  Unable to send message.");
		displayLandingPage();
	}
}
 
 
function shareWithFacebook()
{
	if (deviceIsOnline())
	{
		if( _isMSG_UPDATED == 0 )
		{
			setSocialShareMsgFromServer();
		}
		window.plugins.socialsharing.shareViaFacebook( _SOCIAL_SHARE_MSG, _SOCIAL_SHARE_IMG_URL, _SOCIAL_SHARE_AICHA_URL, onShareSuccess, onShareError);  
	}
	else
	{
		window.plugins.toast.showLongCenter("No internet connection.  Unable to send message.");
		displayLandingPage();
	}
 
 }
 

function shareWithTwitter()
{
	if (deviceIsOnline())
	{
		if( _isMSG_UPDATED == 0 )
		{
			setSocialShareMsgFromServer();
		}
		window.plugins.socialsharing.shareViaTwitter(_SOCIAL_SHARE_MSG, _SOCIAL_SHARE_IMG_URL, _SOCIAL_SHARE_AICHA_URL);
	}
	else
	{
		window.plugins.toast.showLongCenter("No internet connection.  Unable to send message.");
		displayLandingPage();
	}
}
 
function shareWithInstagram()
{
	if (deviceIsOnline())
	{
		if( _isMSG_UPDATED == 0 )
		{
			setSocialShareMsgFromServer();
		}
		window.plugins.socialsharing.shareViaInstagram(_SOCIAL_SHARE_MSG, _SOCIAL_SHARE_IMG_URL,onShareSuccess, onShareError );
 	}
	else
	{
		window.plugins.toast.showLongCenter("No internet connection.  Unable to send message.");
		displayLandingPage();
	}
}
 
function shareWithMSG()
{
	if (deviceIsOnline())
	{
		if( _isMSG_UPDATED == 0 )
		{
			setSocialShareMsgFromServer();
		}
		var download_link_msg = " Get FITT With Aicha " + _SOCIAL_SHARE_AICHA_URL ;//download link to normal message
		window.plugins.socialsharing.shareViaSMS({'message':_SOCIAL_SHARE_MSG + download_link_msg , 'subject':_SOCIAL_SHARE_SUB, 'image': _SOCIAL_SHARE_IMG_URL}, null, onShareSuccess, onShareError);
 	}
	else
	{
		window.plugins.toast.showLongCenter("No internet connection.  Unable to send message.");
		displayLandingPage();
	}
}

 
 
function shareWithOther()
{
	if (deviceIsOnline())
	{
		if( _isMSG_UPDATED == 0 )
		{
			setSocialShareMsgFromServer();
		}
		window.plugins.socialsharing.share(_SOCIAL_SHARE_MSG, _SOCIAL_SHARE_SUB,  _SOCIAL_SHARE_IMG_URL, onShareSuccess , onShareError); 
 	}
	else
	{		
		window.plugins.toast.showLongCenter("No internet connection.  Unable to send message.");
		displayLandingPage();
	}
}
 
 function onShareSuccess( result ) {
 // console.log("Share completed? " + result.completed); // On Android apps mostly return false even while it's true
 // console.log("Shared to app: " + result.app); // On Android result.app is currently empty. On iOS it's empty when sharing is cancelled (result.completed=false)
}

 function onShareError(msg) {
 	
 	window.plugins.toast.showShortBottom("Either the application you are sharing with is not installed or there was an error sending your message.");
  	//console.log("Sharing failed with message: " + msg);
}


function createSocialShareMsg(){
	var SOCIAL_DATA = [];	
		
	if(cordova.platformId.toLowerCase() === "android")
		SOCIAL_DATA = getNameFromProperties("social_share_config").android[0];
	else
		SOCIAL_DATA = getNameFromProperties("social_share_config").ios[0];
		
	_SOCIAL_SHARE_MSG =  SOCIAL_DATA.message;
	_SOCIAL_SHARE_SUB = SOCIAL_DATA.subject;
	_SOCIAL_SHARE_IMG_URL = SOCIAL_DATA.imgUrl;
	_SOCIAL_SHARE_AICHA_URL  = SOCIAL_DATA.downloadlink;
		
}

