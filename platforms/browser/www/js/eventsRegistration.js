function onDeviceReady(){
	 
	  document.addEventListener("offline", offline ,false);
	  document.addEventListener("online", online , false); 			
	  document.addEventListener("backbutton", backBtnEvents , errorBackBtnEvents );
	  document.addEventListener("resume", onResume, false);
	  //StatusBar.styleDefault();
	 // try{ SilentMode.init();}catch(err){alert(err);}
	  
	   if( typeof updateDownloadedVideosArray === 'function'  )
  	  {	
		//this function is only available after login
	  	 updateDownloadedVideosArray();
  	  }	 
	 
	console.log('--------------------Device ready---------------------');
	 
}

 
function backBtnEvents(e){
	if( "1" === localStorage.getItem("isLogin")){
		e.preventDefault();
		callDisplayLandingPage();
		stopAboutMeVideoWhenBackButtonPressed();
	}
}

function errorBackBtnEvents(e){
	backBtnEvents(e);
}
 
function offline(){
	offlinemode = 0;
	window.plugins.toast.showLongCenter("No internet connection.  Restricted to offline content and features.");
	console.log("offline");
}

function online(){
	offlinemode = 1;
	console.log("online");
}

function yesMuted(){
		window.plugins.toast.showLongCenter("Please turn off silent mode, to listen audio.");
}

function notMuted(){
	   //navigator.notification.alert("You can listen audio." , null, _CMP_NAME, "OK");
	   //window.plugins.toast.showLongCenter("Please turn off silent mode, to listen audio.");
}

function onResume(){
	
	if( deviceIsOnline() )
	{  
		if( typeof loadAutoRenewalSubscriptionHistory === 'function'  )
		{
			//this function is only available after login
			loadAutoRenewalSubscriptionHistory();
			getUserInfoFromServer();
		}	
	}
	console.log("onresume");
 }
 

 
document.addEventListener('deviceready', onDeviceReady , false);
	
 


