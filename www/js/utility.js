'use strict';

function setLaoder(imageId){
	try{
	document.getElementById(imageId).src = "../img/dwnloader.gif";
	}catch(err){ console.log(  err + "dwnloader");}
}


/* function getAllKeys(){
	var keys = [];
	for(var i = 0 ; i< localStorage.length ; i++)
		keys[i] = localStorage.key(i);

	return keys;
} */



/* function isDownloded(videoName){
	var	keyArray =  getAllKeys();
	for(var i = 0 ; i < keyArray.length ; i++)
		if( keyArray[i] === videoName )
			return keyArray[i];

	return "";
} */


/* function playVideo(videoName){
	//	navigator.notification.alert(videoName , null, "SRIDAMA", "OK");
	 window.requestFileSystem( 1, 0 , function(dir) {
		dir.root.getFile(videoName, { create: false, exclusive: true  }, function(file) {
		//  console.log("Access to the directory granted succesfully");
		//navigator.notification.alert("Access to the directory granted succesfully" , null, "SRIDAMA", "OK");
	var media = document.getElementById('videoPlayer');
	var	mediasrc = document.getElementById('videoPlayerSrc');
		mediasrc.src = file.toURL();

		media.load();
		media.play();


		} ,  onErrorCreateFile  );
    }, onErrorLoadFs );

} */


/* 
function isBase64BitURL(url){
	if(url.indexOf("data:"))
		return true;
	else
		return false;
} */




function removeLoader(imageId , oldSRC){
	try{
		if(oldSRC !== "")
	document.getElementById(imageId).src = oldSRC;
	}catch(err){}
}





function getNameByKey(key){

	  var name  = "";
 	name  = key.substr( key.lastIndexOf("/") + 1 );
	console.log("image-name: "+name);
	return name;  
	
	
}

function jpgKeyToMP4KEY(key){

	var newKey = key.substr(0 , key.lastIndexOf(".")  )+".mp4";
	console.log("video-name: "+newKey);
	return newKey ;
}



function setCancelBtn(imageId ,oldSRC , fileTransferobj){
	try{
		var obj = new Object();
		 		obj.imageId = imageId;
				obj.oldSRC = oldSRC;
				obj.fileTransferobj = fileTransferobj ;

		var p = document.createElement("i");
				p.setAttribute("class" , "vdCancelButton fa fa-times ");
				p.setAttribute("arial-hidden" , "true");

				document.getElementById(imageId+"d").appendChild(p);
				  p.onclick = function(imageId ,oldSRC , fileTransferobj){


					try {
							obj.fileTransferobj.abort();
							document.getElementById(obj.imageId).src = obj.oldSRC;
					} catch (e) {alert(e);}
				}

				//p.setAttribute("onclick" , "abortDownload(" + imageId +","+ oldSRC +","+ fileTransferobj  + ")");
				//p.setAttribute("onclik" , "abortDownload(" + obj + ")");

	}catch(err){ alert(err); }
}


 function abortDownload(){

	try 
	{
		FILE_OBJECT.abort();

	}catch(e){ }
}


function removeCancelButton(imageId){
	try{
	var rmCancelBtn = document.getElementById(imageId+"d");
		if(rmCancelBtn)
			rmCancelBtn.removeChild(rmCancelBtn.lastChild);
	}catch(err){console.log(err);}
}




function clearAllPages(){
	stopAboutMeVideoWhenBackButtonPressed();
	var pages = [ "imgContainerEnd" ];

	for(var i  = 0 ; i < 3 ; i++){

		try{ document.getElementById(pages[i]).innerHTML = "";}catch(err){}
	}

	 
	try{  document.getElementById("staticpage").style.display = "none";}catch(err){}
 }



 function  displayMenuPage(){
	 try{

		document.getElementById("menu_page").style.display = "block";
		document.getElementById("landing_page").style.display = "none";
		jQuery('nav').css('z-index', "-1");
		jQuery('#menuID').css('margin-top', "30%");
		 hideHeader('mealplan');
		 hideHeader('mealHeaderID');
		 
	 }catch(err){console.log(err);}
}





function displayLandingPage()
{
	try
	{

		document.getElementById("menu_page").style.display = "none";
		document.getElementById("landing_page").style.display = "table";
		//jQuery('nav').css('display', "none");
		//jQuery('nav').css('z-index', "-1");
		jQuery('#landingimage').css('z-index', -1 );
		//jQuery('nav').css('background', "none");
	}
	catch(err)
	{
		console.log(err);
	}
}

 function callDisplayLandingPage()
 {
 	stopAboutMeVideoWhenBackButtonPressed();
 	 jQuery('nav').css('display', "none");
	 jQuery('nav').css('z-index', "-1");    
	 displayLandingPage();
	 clearAllPages();
 }


/* function mailToAicha(){
	//window.location.href = "mailto:anandg834@gmail.com";

	/* cordova.plugins.email.open({ app: 'mailto', subject: 'Sent with mailto' });

	cordova.plugins.email.open({
    to:      'anandg834@gmail',
    cc:      'anandg834@gmail',
    bcc:     ['anandg834@gmail', 'anandg834@gmail'],
    subject: 'Greetings',
    body:    'How are you? Nice greetings from anand'
});
	  try{
	cordova.plugins.email.addAlias('gmail', 'com.google.android.gm');

// Specify app by name or alias
cordova.plugins.email.open({
    app: 'gmail',
    subject: 'Sent from Gmail'
})
	 }catch(err){alert(err);}
	alert("mail");
}
 */

function internateTimeOut(ID){
 try{ 	document.getElementById(ID).src	=  "../img/error.png"; }catch(err){console.log("ID_NOT_FOUND  "+ID+" :"+err );}

}

function setWaitingMsg( imageID  , isDownloadMsg ){
	try{
		var note = document.createElement("b");
			 if( isDownloadMsg )
				note.appendChild(document.createTextNode("Please be patient while the video downloads."));
			else
				note.appendChild(document.createTextNode(" Please be patient while the video loads."));
			note.setAttribute("class" , "msg");
			note.id = imageID + "m";

			document.getElementById(imageID+"d").appendChild(note);




	}catch(err){console.log("ID_NOT_FOUND  "+ imageID +"d"+" :"+err );}
}


function removeWaitingMsg( imageID ){
	try{ document.getElementById(imageID+"m").remove(); }catch(err){console.log("ID_NOT_FOUND  "+imageID+"m"+" :"+err );}
}







/* var titleCase = function camelize(str) {
     if ((str===null) || (str===''))
       return false;
  else
	str = str.toString();

 return str.replace(/\w\S*/  /*    g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
} */

/* var isSilentMode = function(){
	try{
	SilentMode.isMuted(
    function() { //Callback
         navigator.notification.alert("Please turn off silent mode to listen audio" , null, _CMP_NAME, "OK");
    }, function() {  //Callback
        console.log('mute disabled');
    });
	}catch(err){alert("silet  :"+err);}
}
 */



function getNameFromProperties( key  )
{
	var l;
	if(VIDEO_CONFIG.length > 0 )
		 l = VIDEO_CONFIG.length ;
	else
	{
			VIDEO_CONFIG = JSON.parse( localStorage.getItem( "properties" )  || "[]" );
			l = VIDEO_CONFIG.length ;
	}

	 

	for(var i = 0 ;  i < l ; i ++ )
	{
		if(  VIDEO_CONFIG[i].folder == key  || ( VIDEO_CONFIG[i].video_id  && VIDEO_CONFIG[i].video_id == key.split(".")[0] ) )
			return VIDEO_CONFIG[i];
	}

	return {"lock":"1","name":""};
}


/* function makeKeyForMainType(key){
		if(key !== undefined ){
		var temp = key.split("/");
			var str = "";
			for(var i = 0  ; i < temp.length - 1 ; i++ ){
				if(i > 0)
					str+="/";
				str += temp[i];
			}
			return str;
		}else{
			return "";
		}
} */


function addHistory(id){

 try{	_BACK_HISTORY.unshift( id );
	if(_BACK_HISTORY.length > 1 )
	document.getElementById("backID").style.display = "block";
 }catch(err){ }

}


/* function goBackDiv(){

		 _BACK_HISTORY.shift();

			if(_BACK_HISTORY.length <= 1 )
					document.getElementById("backID").style.display = "none";

			switch ( _BACK_HISTORY[0]   )  {
			case "getFreeWorkoutImages()":
				  highLightSelectedOption(1);
				  getFreeWorkoutImages(0);
				break;
			case "goToWORKOUT_BY_TYPE()":
				highLightSelectedOption(2);
				goToWORKOUT_BY_TYPE(0);
				break;
			case "goToFITTPROGRAMS()":
				highLightSelectedOption(0);
				goToFITTPROGRAMS(0);
				break;
			case "redirectToMethod( 0 , 0 )":
				redirectToMethod( 0 , 0 , 0 );
				highLightSelectedOption(0);
				break;
			case "redirectToMethod( 0 , 1 )":
			   redirectToMethod( 0 , 1 , 0 );
			   highLightSelectedOption(1);
				break;
			case "redirectToMethod( 0 , 2  )":
				redirectToMethod( 0 , 2 , 0 );
				highLightSelectedOption(2);
				break;
			case  "pdf":
				redirectToMethod( 0 , 3 , 0 );
				break;
			case  "openMyDownLoads()":
				openMyDownLoads(0);
				break;
			case  "success":
				redirectToMethod( 3 , 0 , 0 );
				break;
			case  "showFittnessLevels":
				redirectToMethod( 5 , 0 , 0 );
				break;
			case  "showHowToMeasureVideo":
				redirectToMethod( 2 , 0 , 0 );
				break;
			case  "showProfile":
				redirectToMethod( 5 , 2 , 0 );
				break;
			case  "help":
				redirectToMethod( 5 , 3 , 0 );
				break;
		}

} */

/* setInterval(function(){
if(_BACK_HISTORY.length > 0)

else
	document.getElementById("backID").style.display = "none";
}, 2000); */



function callShowDownloadProgress(){
	displayMenuPage();
	showDownloadProgress();
}

//afer seeing pdf displaying previous div
function loadPdfDiv(){

	document.getElementById("imgContainerEnd").innerHTML  = pdfBackUpDiv;
}


function getSubscriptionExpiryDate( productId  )
{
	var month = 0;
	var day = 0;
	var year = 0;
	
	var durationObject = getProductValidityDuration(productId);
	 
	 day 	= durationObject.day;
	 month 	= durationObject.month;
	 year 	= durationObject.year;
	 
	 var today  = new Date();
	
	
	//add previous subscription days
	if( subscription.daysremain > 0 )
	{
	today.setDate( today.getDate() + subscription.daysremain );
	}
		
	today.setDate(  today.getDate() + day  );
	today.setMonth(  today.getMonth() + month  );
	today.setFullYear(  today.getFullYear() + year  );
	
	console.log( today );
  	var calculated_expiry_date = today.toString();
	
	try
	{	
		if( _USER_INFO.id !== undefined )
		{
			_USER_INFO.fittastic_subscription_expiry_date = calculated_expiry_date;
			 setUserInfo( JSON.stringify( _USER_INFO ) );
		}
	 
	}
	catch(err){}
	
	return calculated_expiry_date;
}

var attemp = 0 ;
function setSubscriptionExpiryDatetoServer( expdate , transactionId , productType )
{
	
 var obj = new Object();
	obj.fittastic_subscription_expiry_date = expdate;
	obj.fittastic_subscription_transaction_id = transactionId ;
	obj.fittastic_subscription_type = productType ;
											 
  
	var http = new XMLHttpRequest();
	http.open("POST", _REGISTRATION_URL +"/"+  _USER_ID , true );
	http.onerror =function(e){
		
		checkSubscriptionExpiryDate();
		document.getElementById("imgContainerEnd").style.opacity = "";
		displayLandingPage();
	}

	http.setRequestHeader("Authorization", "Basic Zml0bW9zaGE6V2Vya0l0R2lybDA4MTAh");
	http.setRequestHeader("Content-type", "application/json");

	http.onreadystatechange = function(){
		 
		if(http.readyState == 4 && http.status == 200){
			setUserInfo( this.responseText );
			checkSubscriptionExpiryDate();
			document.getElementById("imgContainerEnd").style.opacity = "";
			displayLandingPage();
			
		}else{

			if(http.readyState == 4 && http.status == 400  ) {
					if( attemp == 0 )
					{ 
					setSubscriptionExpiryDatetoServer( expdate , transactionId , productType );
					attemp++;
					}else attemp = 0;
			}else{
				if(http.readyState == 4 && http.status == 500) {
					if( attemp == 0 ){
						setSubscriptionExpiryDatetoServer( expdate , transactionId , productType );
						attemp++;
					}else attemp = 0;
					 
				}else{
					if(http.readyState == 4 && http.status == 201  ) {
					setUserInfo( this.responseText );
					checkSubscriptionExpiryDate();
					document.getElementById("imgContainerEnd").style.opacity = "";
					displayLandingPage();
					}
				}
			}
		} 
	}
	
	http.send(JSON.stringify(obj));
}

	
 
 function hideHederMenuOption(){
 
	$('#free-workouts').css('display','none');
	$('#fitt-programs').css('display','none');
	$('#workout-type').css('display','none');
	 $('#About-me').css('display','none');
 
 }
 
 function showHeader( id ){
	$( '#'+ id ).css('display','block');
 }
 
 function hideHeader( id ){
	$( '#'+ id ).css('display','none');
 }

  function showHederMenuOption(){
 
	$('#free-workouts').css('display','block');
	$('#fitt-programs').css('display','block');
	$('#workout-type').css('display','block');
	$('#mealHeaderID').css('display','none');
	$('#mealplan').css('display','none');
	$('#About-me').css('display','none');

	document.getElementById("imgContainerEnd").setAttribute("style" , "margin-top: 82px;");
 }

 function showHederMenuOption1(){
 
	$('#free-workouts').css('display','none');
	$('#fitt-programs').css('display','none');
	$('#workout-type').css('display','none');
	$('#mealHeaderID').css('display','none');
	$('#mealplan').css('display','none');
	$('#About-me').css('display','block');
	document.getElementById("imgContainerEnd").setAttribute("style" , "margin-top: 82px;");
 }

 
 
 
 function ecodeHasFromKey( key ){
 
 key = key.split("#");
 
 var newKey  = "";
 
	for( var i = 0 ;  i < key.length ; i ++ ){
		if( i > 0)
			newKey += "%23";
			newKey += key[i];
 }
 
 return newKey;
 
 }
 
 
  function notifySubscription(){

	var msg = "";
    var SED = _USER_INFO.fittastic_subscription_expiry_date || "" ; 
	if(  SED === "" )
		msg = _UNSUBSCRIBED_USERS ;	
		/* else{ 
			makeSubscribeMsgByAddingExpDate();
		if( subscription.daysremain < 0 )	
			msg = _EXPIRED_SUBSCRIPTION ;
		else if( subscription.daysremain > 0  && subscription.daysremain < 6 )	
			msg = _EXPIRING_SUBSCRIPTION ; 	
		else if( subscription.daysremain >= 6 )
			msg = _NON_EXPIRING_SUBSCRIPTION ; 
		}*/	
 	if( msg !== "" ) {	
		/* 	setTimeout( function(){ */
	 navigator.notification.confirm(
			msg , function(option){
					if(option == 1){
						try{
							callLoadProductDetails();
							//	else
									//window.plugins.toast.showLongBottom("Please sign in for subscription");
						}catch(err){}
					}
					else
					{
						displayLandingPage();
					}	 

					}, _CMP_NAME , ['Subscribe Now', 'Subscribe Later' ] );
		/* 	}, 9000 );	 */
	}else{
		callLoadProductDetails();
	}	
}



function cordovaOrMenuDataNotLoadedError()
{
	if( deviceIsOnline()  ) 
		window.plugins.toast.showLongCenter("Please wait while menu loads...");
	else
		window.plugins.toast.showLongCenter("No internet connection...");
}


function isFullMenu(){

	if( document.getElementById("menuID").childNodes.length > 5 )
	 return  true;
	else
	return false;	
	
}

function deviceIsOnline() 
{
 try{ // Handle the online event
    var networkState = navigator.connection.type;

    if (networkState !== Connection.NONE) 
		return true;
    else
		return false;
 }catch(err){ }
}


function updateUserInfoToServer( userinfo  )
{
	if( deviceIsOnline()  ) 
	{
  try
  {
	var http = new XMLHttpRequest();
	http.open("POST", _REGISTRATION_URL +"/"+  _USER_ID , true );
	http.onerror =function(e){}

	http.setRequestHeader("Authorization", "Basic Zml0bW9zaGE6V2Vya0l0R2lybDA4MTAh");
	http.setRequestHeader("Content-type", "application/json");

	http.onreadystatechange = function()
	{
		if(http.readyState == 4 && http.status == 200) 
		{
			setUserInfo( this.responseText );
			checkSubscriptionExpiryDate();
		} 
	} 
	
	http.send(JSON.stringify(userinfo));
	}catch(err){}
	}
	else
	{
	  window.plugins.toast.showLongCenter("No internet connection...");
	  displayLandingPage();
	}
}

	 
function updateDownloadedVideListToServer( saveAs )
{
	_USER_INFO = getUserInfo();
	if( _USER_INFO.fittastic_video_downloads &&  _USER_INFO.fittastic_video_downloads !== undefined )
	_USER_INFO.fittastic_video_downloads += "," + saveAs.split(".")[0];
	updateUserInfoToServer( _USER_INFO );

}

function zoomImage( pdfBackUpDiv )
{
	 
	window.cordova.zoomImage(pdfBackUpDiv , ".gif");
	
}


 