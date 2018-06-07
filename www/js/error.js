'use strict';

function onErrorCreateFile(error){
console.log(error);
	//console.log("onErrorCreateFile"+ error.code +  "\n" + error);


	if(error.code == 13   ){
	//navigator.notification.alert("already downloaded...", null, _CMP_NAME, "OK");
	//confirmForRedownload();

	}

	if( error.code == 22  )
		window.plugins.toast.showLongCenter("Low memory...");
		//navigator.notification.alert("Low memory...", null, _CMP_NAME, "OK");


	if(error.code == 8   ){
		//navigator.notification.alert("Video not found", null, _CMP_NAME, "OK");
		
	}
}
//---------------------------------------------------------------------

function onErrorLoadFs(error){
console.log(error);
	navigator.notification.alert("onErrorLoadFs" + error , null, _CMP_NAME, "OK");
	//removeLoader("img1");
}
//---------------------------------------------------------------------

function onErrorReadFile(error){
	navigator.notification.alert("onErrorReadFile" + error , null, _CMP_NAME, "OK");
	//removeLoader("img1");
}

//---------------------------------------------------------------------
function onErrorBlobWrite(error){
	navigator.notification.alert("onErrorBlobWrite" + error , null, _CMP_NAME, "OK");
	//removeLoader("img1");
}
//---------------------------------------------------------------------


//---------------------------------------------------------------------

function onErrorOffLineVideo(error){

	 navigator.notification.alert("onErrorOffLineVideo" + error, null, _CMP_NAME, "OK");
}

//---------------------------------------------------------------------
function onErrorOffLineVideoFS(error){

	navigator.notification.alert("onErrorOffLineVideoFS" + error, null, _CMP_NAME, "OK");
}
//---------------------------------------------------------------------



