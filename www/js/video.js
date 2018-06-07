
"use strict";
//fittastic_video_downloads 
var isDownloading = 0 ;
var DWNLOAD_OBJECT = {} ;
var isPLAYING = {};
var FILE_OBJECT ;
var parentId = "aboutmed";
var childId = "aboutme";
//---------------------------------------------------------------------

function saveVideo( url  , imageId ,videoName , notOverride )
{
	if (deviceIsOnline())
	{
		if( isDownloading == 0 )
		{

		window.requestFileSystem( 1 , 0 , function (fs) {
			console.log('file system open: ' +fs.root);
				fs.root.getFile( videoName , { create: true , exclusive:  notOverride   }, function (fileEntry) {

					 if( isPLAYING.id !==  undefined ){
						try{	document.getElementById(isPLAYING.id).innerHTML = isPLAYING.data; }catch(err){console.log("--------------saveVideo :"+err+"--------------");}
					 }
								download(fileEntry, url  , videoName , imageId );

					}, function(err){
						if( videoName.indexOf(".mp4") > -1 || videoName.includes(".mp4") )
							onErrorCreateFile(err);

					});
			}, function(err){
					if( videoName.indexOf(".mp4") > -1 || videoName.includes(".mp4") )
						onErrorLoadFs(err)
			});
		}else
		{
				if( videoName.indexOf(".mp4") > -1 || videoName.includes(".mp4") )
					//navigator.notification.alert( "Please download one video at a time" , null, _CMP_NAME , "OK");
					 window.plugins.toast.showLongBottom("Please download one video at a time");
		}
	}
	else
	{
		window.plugins.toast.showLongCenter("No internet connection.  Unable to download.");
	}
}

//---------------------------------------------------------------------

function download(fileEntry, uri  , saveAs , imageId ) 
{
	var fileTransfer = new FileTransfer();
	var oldSRC = "";

	if(saveAs.indexOf(".mp4") > -1 )
	{
		oldSRC = document.getElementById(imageId).src; // for restoring if user cancel 
				 setLaoder(imageId);
				 setCancelBtn(imageId ,oldSRC , fileTransfer );

				 setWaitingMsg( imageId  , true ); //true = for download msg

				 isDownloading = 1 ; // for single  download
				 FILE_OBJECT = fileTransfer ;
				 DWNLOAD_OBJECT.id = imageId + "d";
				 DWNLOAD_OBJECT.data = document.getElementById(imageId+"d").innerHTML;

				 try{ document.getElementById("downloadStatus").style.visibility = "visible";}catch(err){}
				 try{ document.getElementById("dwnStatusHome").style.visibility = "visible"; }catch(err){}

  /* fileTransfer.onprogress = function(progressEvent) {
			if (progressEvent.lengthComputable) {
			   console.log(progressEvent.loaded / progressEvent.total);
			} else {
			  console.log("not ");
			}
		}; */

	}

	if(saveAs.indexOf(".pdf") > -1 ){
		setLaoder(imageId);
	}


    var fileURL =  fileEntry.toURL();

	console.log("-------- " + saveAs + " downloading  ----------" );

    fileTransfer.download(
        uri ,
        fileURL  ,
        function (entry) 
		{
			console.log("-----   from success block " + saveAs + "downloaded   -------" );
			if( saveAs.indexOf(".pdf") > -1  )
			{
					 document.getElementById(imageId).setAttribute("onclick" , "optionForOfflinePDF(  '"+ imageId+"' )");
					 document.getElementById(imageId).src = "../img/dwnpdf.ico";
					 playOffLineVideo( saveAs , 0  ); //take care for both pdf and video 0 = pdf
			}
			else
			{

			 if(saveAs.indexOf(".mp4") > -1 )
			 {

				try{ document.getElementById("downloadStatus").style.visibility = "hidden";}catch(err){}
				try{ document.getElementById("dwnStatusHome").style.visibility = "hidden"; }catch(err){}

				functionListsToCall( saveAs , imageId , oldSRC );
				playVideoByFileObject( fileEntry , imageId);
				updateDownloadedVideListToServer( saveAs  );
			 }
			}
        },
        function (error) 
		{
			console.log("-----   from error block " + saveAs + "downloaded   -------" );
			 
			try{ document.getElementById("downloadStatus").style.visibility = "hidden";}catch(err){}
			try{ document.getElementById("dwnStatusHome").style.visibility = "hidden"; }catch(err){}

			if( error.code !== 1 )
				deleteCorruptedFiles(saveAs);

			if( error.code !== 4 && error.code !== 1 )
			{
					if(saveAs.indexOf(".mp4") > -1 || saveAs.indexOf(".pdf") > -1 )
						//navigator.notification.alert("Unable to download...", null, _CMP_NAME, "OK");
						  window.plugins.toast.showShortBottom("Unable to download...");
			}

			/* console.log("download error source " + error.source);
			console.log("download error target " + error.target);
			console.log("download error code" + error.code);
			console.log("download error code" + error.http_status);
			console.log("download error code" + error.exception); */

				functionListsToCall( saveAs , imageId , oldSRC );

			if( error.code == 1 )
			{
				if( saveAs.indexOf(".mp4") > -1 )
				{
					playVideoByFileObject( fileEntry , imageId);
					updateDownloadedVideListToServer( saveAs  );
				}	
					
				 if( saveAs.indexOf(".pdf") > -1 ) 
				 {
					 document.getElementById(imageId).setAttribute("onclick" , "optionForOfflinePDF(  '"+ imageId+"' )");
					 document.getElementById(imageId).src = "../img/dwnpdf.ico";
					 playOffLineVideo( saveAs ,  0  );	//0 = pdf
				 }
			}
        },
		true,

        {
            //headers: {
            //    "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
            //}
        }
    );
}



//---------------------------------------------------------------------

 function playVideoByFileObject( fileEntry  , imageId ) {
	/* var	media = document.getElementById('videoPlayer');
	var mediasrc = document.getElementById('videoPlayerSrc');
		mediasrc.src = fileEntry.toURL();
		media.load();
		media.play(); */
		//isSilentMode();

		var video = document.createElement('video');
			video.id = "videoPlayer";
			video.controls = "controls";
			video.setAttribute("class",  "img-rounded subVDSIZE");
			video.setAttribute('style' , "height:200px !important;");
			//video.setAttribute("style","margin:3px !important");
			video.setAttribute("controlsList",  "nodownload");
			video.setAttribute("autoPlay",  "true");
			var source = document.createElement('source');
				source.id = "videoPlayerSrc";
				source.src = fileEntry.toURL();
				source.type = "video/mp4";
			video.autoPlay = true;
			video.appendChild(source);




		try{
		/* var mainDiv = document.getElementById(imageId+"d");
		if(mainDiv)
			mainDiv.removeChild(mainDiv.firstChild);
			mainDiv.insertBefore( video , mainDiv.firstChild ); */
			document.getElementById(imageId+"d").innerHTML = "";
			document.getElementById(imageId+"d").appendChild(video);
		}catch(err){console.log(err);}

}

//---------------------------------------------------------------------

  
//---------------------------------------------------------------------

 function remotePlay( key  )
 {
 
	var bases64EncodeKey  =  Base64.encode( jpgKeyToMP4KEY(  ecodeHasFromKey(   encodeURI( key ) ) ) );
	var URL  = _STREAM_URL + bases64EncodeKey;
	console.log("stream url   " +  URL);

 try
 {
	 if(  isDownloading == 0 )
	 {
		if( isPLAYING.id !==  undefined )
		{
			try{ document.getElementById(isPLAYING.id).innerHTML = isPLAYING.data; }catch(err){ console.log(err); }
		}	
		
	var imageID =  getNameFromProperties( key ).video_id ; //getNameByKey(key);
	var videoName = imageID.split(".")[0] + ".mp4";

		isPLAYING.data = document.getElementById(imageID + "d").innerHTML;
		isPLAYING.id = imageID+"d";

	var oldIMGSRC = document.getElementById(imageID).src;
		setLaoder(imageID );
		setWaitingMsg( imageID  , false );
	var http = new XMLHttpRequest();
		http.open("GET", URL , true );
		http.onreadystatechange = function() 
		{
	
		if(http.readyState == 4 && http.status == 200) 
		{
			var data =	http.responseText.split("\"");
			var	 vdurl = "";
			for(var i = 0 ; i < data.length ; i ++)
				vdurl += data[i];

	var video = document.createElement('video');
				video.id = "videoPlayer";
				video.controls = "controls";
				video.setAttribute("class",  " subVDSIZE");
				video.setAttribute('style' , "height:200px !important;");
				//video.setAttribute('style' , "margin:1px;");
				video.setAttribute("controlsList",  "nodownload ");
				video.setAttribute('webkit-playsinline', '');
				video.setAttribute("autoPlay",  "true");
	var source = document.createElement('source');
				source.id = "videoPlayerSrc";
				source.src = vdurl ;			
				source.type = "video/mp4";
				video.appendChild(source);
				document.getElementById(imageID).remove();
				document.getElementById(imageID+"d").appendChild(video) ;




	video.onloadeddata = function() { removeWaitingMsg(imageID); }
	video.onended = function(){ /* document.getElementById(imageID).src = oldIMGSRC;*/}
		}
	}	
			
	http.onerror = function(error){	}
	http.send();
	
	}else navigator.notification.alert("Multiple downloads/Play not allowed" , null, _CMP_NAME, "OK");
 
 }
 catch(err)
	{
		// navigator.notification.alert("Network error..." , null, _CMP_NAME, "OK");
			try
			{ 
			document.getElementById(isPLAYING.id).innerHTML = isPLAYING.data; 
			isPLAYING = {} ; 
			navigator.notification.alert("Unable to play..." , null, _CMP_NAME, "OK");
			}
			catch(err){console.log(err);}
			stopAboutMeVideo();
	}
}

 //---------------------------------------------------------------------

 function confirmForDownloads(key)
 {
	if(deviceIsOnline())
	{
	   navigator.notification.confirm(
        'Please select an option:',  
        function callDownloadOption(option)
		{
			selectDownloadOption(option , key );
		},                   
		_CMP_NAME ,           
        ['Download','Play','Cancel' ]      
		);
	}
	else
	{
		window.plugins.toast.showLongCenter("No internet connection.  Online videos not available.");
		displayLandingPage();
	}
 }
 //---------------------------------------------------------------------

 function selectDownloadOption(option , key ){
	 if(option == 1)
		 	DownLoadVideoByKeyOrPlay(key);
		else if(option == 2)
			remotePlay(key);
		else {
			//for cancel
		}
 }


 //---------------------------------------------------------------------

 //---------------------------------------------------------------------
function makeVideoPlayer(divID){
	try{
			var video = document.createElement('video');
			video.id = divID + "p";
			video.controls = "controls";
			video.setAttribute("class",  "img-rounded subVDSIZE");
			video.setAttribute('style' , "height:200px !important;");
			video.setAttribute("controlsList",  "nodownload");
			video.setAttribute("autoPlay",  "true");
			var source = document.createElement('source');
				source.id = divID + "s";
				source.src = '';
				source.type = "video/mp4";
				video.autoPlay = true;
				video.appendChild(source);
			document.getElementById(divID).innerHTML = "";
			document.getElementById(divID).appendChild(video) ;
		}catch(err){console.log("makeVideoPlayer :" + err);}
}

 //---------------------------------------------------------------------

function DownLoadVideoByKeyOrPlay(key)
{
	var name = getNameFromProperties( key ).video_id ;
	var imageID = name;   //getNameByKey(key);

	if( key.indexOf(".pdf") > -1 )
	{
		var URL  = _SERVER_VD_URL + Base64.encode(key);
		console.log(URL);
		saveVideo( URL , imageID , imageID , true );

	}
	else
	{
		var mp4Key = jpgKeyToMP4KEY( key );
		var saveAs = [ name + ".jpg"  ,  name + ".mp4" ];
		var URLs = [ key , mp4Key ];

	for(var i = 0 ; i < 2 ; i++)
	{
		console.log("file:  " + i );
		var URL  = _SERVER_VD_URL + Base64.encode(URLs[i]);
		console.log(URL);
		saveVideo( URL , imageID , saveAs[i] , true ); // true  =  mot override
	}
  }
}



 //---------------------------------------------------------------------




function confirmForRedownload(){

		navigator.notification.confirm(
			 'Already downloaded. Do you want to again download it?',  // message
			 selectRedownloadOption,                  // callback to invoke
			_CMP_NAME ,            // title
			 ['Redownload','Play','Cancel' ]              // buttonLabels
	 );
}

//---------------------------------------------------------------------

function selectRedownloadOption(option){
	var storedKey  = localStorage.getItem("_KEY");
	if(option == 1){
			var imageID = getNameByKey(storedKey);
			var videoName = imageID.split(".")[0]+".mp4";


		var bases64EncodeKey  =  Base64.encode(jpgKeyToMP4KEY(storedKey));
		var URL  = _SERVER_VD_URL + bases64EncodeKey;
				console.log(URL);
				saveVideo( URL , imageID , videoName , true );

		 //DownLoadVideoByKeyOrPlay(storedKey);
	 }else{
		 if(option == 2){
				 var imageID = getNameByKey(storedKey);
			 	 var videoName = imageID;
					 videoName = videoName.split(".")[0];
					 videoName =	videoName+".mp4";
					 callOffLineVideoPlayer( imageID ,  videoName );
						// remotePlay();
	 } else {
							 //for cancel
	 }
 }
}



 //---------------------------------------------------------------------


 function isDownloaded(key){

var ID = getNameFromProperties( key ).video_id ;  //getNameByKey(key);
var fileName ="";
var flag = 0;
   if( ID.indexOf("pdf") > -1   )
   {
	   fileName = ID ;
		flag = 1;
   }
   else
   {
	   fileName =  ID + ".mp4"           //makeKeyAsName ( jpgKeyToMP4KEY( key ) ) ;
   }

try{
		window.requestFileSystem( 1 , 0 , function (fs) {

				fs.root.getFile(  fileName , { create: false   }, function (fileEntry) {


					if( flag == 0 ){
						 if( DWNLOAD_OBJECT.id === ID + "d" )
							 makeImageDOMCard( ID , key  , false ); //current downloading tracking
						 else
							 makeImageDOMCard( fileName , key  , true );//fileName encrypted file name
					}else{

						//if( DWNLOAD_OBJECT.id === ID + "d" )for pdf
						//	 listPDF(  key  , false ); //current downloading tracking
						// else
							 makePdfDOMCard( ID , key  , true );
					}


					}, function(err){
						 if(flag == 0 )
							makeImageDOMCard( ID , key , false );
						else
							makePdfDOMCard(  ID , key  , false );

					});
			}, onErrorLoadFs);

	}catch(err){console.log(err);}
}
 //---------------------------------------------------------------------









 function makeString(data){
	 for(var i =  0 ;  i< data.length ; i++)
			data = data.replace("\"" , "\\\"");
		console.log( data);
		return data;

 }


 //---------------------------------------------------------------------



function anyDownloadingThenShow(){
try{

	if( DWNLOAD_OBJECT.id !==  undefined )
		document.getElementById(DWNLOAD_OBJECT.id).innerHTML = DWNLOAD_OBJECT.data;
		document.getElementById(DWNLOAD_OBJECT.id).childNodes[2].addEventListener("click" ,
		function(){
			abortDownload();
});

}catch(err){alert("--------------anyDownloadingThenShow :"+err+"--------------" );}
}



 function showDownloadProgress(){

 clearAllPages();
 try{
	 if( DWNLOAD_OBJECT.id === undefined )
	 document.getElementById("imgContainerEnd").innerHTML = "<h4 style=\"margin-top:10%; text-align:center; \">No video downloading yet...</h4>";
 else{

	var div = document.createElement("div");
		document.getElementById("imgContainerEnd").appendChild(div);
		div.setAttribute("class" , "card img-rounded img-thumbnail col-sm-12 col-xs-12 col-md-12 ")
		div.setAttribute('style' , 'margin:0px; margin-bottom:1px; padding:0px;text-align: center;');
		div.id = DWNLOAD_OBJECT.id;

		anyDownloadingThenShow();
		document.getElementById(DWNLOAD_OBJECT.id).childNodes[2].classList.remove("vdCancelButton");
		document.getElementById(DWNLOAD_OBJECT.id).childNodes[2].classList.add("myDWNVDButton");

		document.getElementById(DWNLOAD_OBJECT.id).childNodes[3].classList.remove("msg");
		document.getElementById(DWNLOAD_OBJECT.id).childNodes[3].classList.add("myDWNVDMsg");
	 }
 }catch(err){console.log("showDownloadProgress  :" + err);}


	/*  FILE_OBJECT.onprogress = function(progressEvent) {
    if (progressEvent.lengthComputable) {
       console.log(progressEvent.loaded / progressEvent.total);
    } else {
      console.log("not ");
    }
		}; */
 }


function reLoad(){
	//window.location.reload();
}


function functionListsToCall( saveAs , imageId , oldSRC ){
	if(saveAs.indexOf(".mp4") > -1 ){
			document.getElementById("downloadStatus").style.visibility = "hidden";
			isDownloading = 0 ;
			DWNLOAD_OBJECT = {};
			removeLoader( imageId , oldSRC );
			removeWaitingMsg(imageId);
			removeCancelButton(imageId);

		}
}


function deleteCorruptedFiles(saveAs){
	var files = [ saveAs.split(".")[0]+".mp4" , saveAs.split(".")[0]+".jpg" ];
		for(var i = 0 ; i < 2 ; i++ )
			deleteALLOfflineVideo( files[i] );
}


function confirmForPDFDownloads(key)
{
  if(deviceIsOnline())
  {
	remoteViewPDF( key );
	/*   navigator.notification.confirm(
        'Please select an option:',  
        function callPDFDownloadOption(option){ 
			selectDownloadPDFOption(option , key );
		},                
      _CMP_NAME ,          
       	   ['View','Cancel' ] 
    );*/
  }
  else
  {
	window.plugins.toast.showLongCenter("No internet connection.  Online pdf not available.");
	displayLandingPage();
  }
}



 function optionForOfflinePDF(key){
 //localStorage.setItem("_KEY" , key);
	   navigator.notification.confirm(
        'Please select an option:',  // message
        function callPDFDownloadOption(option){
			selectOptionForOfflinePDF(option , key );
		},                  // callback to invoke
      _CMP_NAME ,            // title
        ['View','Cancel' ]              // buttonLabels
    );
 }



 function selectOptionForOfflinePDF( option , key ){
	 if( option == 1 )
		  playOffLineVideo( getNameByKey(key) , 0  );// take care both video and pdf , 0 == pdf
  }
 //---------------------------------------------------------------------

 function selectDownloadPDFOption( option , key ){
	 /* if(option == 1)
		 DownLoadVideoByKeyOrPlay(key); */
			 if(option == 1 )
				 remoteViewPDF(key);


 }
 //---------------------------------------------------------------------
var  pdfBackUpDiv = "";
function remoteViewPDF( key , isAddBackButton ){
 
	 pdfBackUpDiv = "";	
	 
	var backbutton = "";
	if( isAddBackButton === undefined){
	
		backbutton = "<button type=\"button\" class=\" btn-sm   okBtn\"   "
						+   "onclick=\"loadPdfDiv()\" >  <p class=\"fa "
						+	"fa-arrow-right\" aria-hidden=\"true\"  "
						+	" ></p></button>";
	
		pdfBackUpDiv = document.getElementById("imgContainerEnd").innerHTML;
		
	}
	
	var ID = getNameByKey(key); 
	document.getElementById("imgContainerEnd").innerHTML = "";
	document.getElementById("imgContainerEnd").innerHTML = "<div onclick=\"zoomImage('pdfBackUpDiv')\" classs=\"row\"><div classs=\"col-sm-12 col-xs-12 col-md-12  col-lg-12\">"
														+ 	" <img src=\"../img/dwnloader.gif\" style=\"width:"
														+	"100%;float:right;\"   id=\"pdfBackUpDiv\" />  "+ backbutton +"  </div></div>";
	getImagesFromServer( key , "pdfBackUpDiv");

}
 
 //replace  '/' with  '-'  and '#' with 'has'
function makeKeyAsName( key ){

	var name  = "" ;
	var array  =  key.split("/");

	for(var i = 0  ; i < array.length  ;   i++  ) {
		if( i > 0 )
			name +=  "-";
	   name += array[i];
	}

	array  =  name.split("#");
	name  = "" ;
	for(var i = 0  ; i < array.length  ;   i++  ) {
		if( i > 0 )
			name +=  "has";
	   name += array[i];
	}
console.log( "KeyAsName:  " + name  );
return name;

}
 
 //replace '-'  with  '/'  and 'has' with '#'
 function makeKeyFromName( name ){

	var key  = "" ;
	var array  =  name.split("-");

	for(var i = 0  ; i < array.length  ;   i++  ) {
		if( i > 0 )
			key +=  "/";
	   key += array[i];
	}

	array  =  key.split("has");
	key  = "" ;
	for(var i = 0  ; i < array.length  ;   i++  ) {
		if( i > 0 )
			key +=  "#";
	   key += array[i];
	}
console.log( "KeyFromName:  " + key  );
return key;

}
 
 ////////////////////////////////////////////////////////////////////////////////////////
function updatingDownloadedVideosArray( videoEntry )
{
	var n = videoEntry.length ;
	_DOWNLOADED_VIDEO_ID_ARRAY = [] ;
	
	for( var i=0  ; i< n ; i++  )
		if( videoEntry[i].name.indexOf(".mp4") )
		 _DOWNLOADED_VIDEO_ID_ARRAY.push(  videoEntry[i].name.split(".")[0]  );
	
	storeDownloadedVideosIdArray( _DOWNLOADED_VIDEO_ID_ARRAY );
} 
 
////////////////////////////////////////////////////////////////////////////////////////
 
 function updateDownloadedVideosArray()
 {
 	getDownloadedVideoList( updatingDownloadedVideosArray );
 }
 
////////////////////////////////////////////////////////////////////////////////////////

 function getDownloadedVideoList( callback )
 {
	window.requestFileSystem( 1 , 0 , function( fs ) 
	{
	
	var dirReader = fs.root.createReader();
	dirReader.readEntries( callback , gotDirError );

	}, onErrorLoadFs );
 
 }
//////////////////////////////////////////////////////////////////////////////////////// 
 
 function storeDownloadedVideosIdArray( downloaded_video_id_array  )
 {
	localStorage.setItem("DWN_VD_LIST" ,  JSON.stringify( downloaded_video_id_array   )  );
	 
 }
////////////////////////////////////////////////////////////////////////////////////////
/* function getDownloadedVideosIdArray()
{
	return  localStorage.getItem("DWN_VD_LIST");
	 
} */
 
 
 function playAboutMeVideo()
 {

 
	if( deviceIsOnline() )
	{ 				 			


			clearAllPages();
			showHederMenuOption1();
			displayMenuPage(); 

			var Id = getNameFromProperties( "AboutMe.mp4" ).video_id;
			
			try{ document.getElementById(parentId).children[0].id = Id; }catch(err){}
				
			
			 
			try{ document.getElementById("landing_page").style.display="none"; }catch(err){}
			try{ document.getElementById( parentId ).style.display = "block";  }catch(err){} 
			try{ document.getElementById( Id ).parentNode.id = Id+"d";         }catch(err){}
              			 
			 remotePlay( getNameFromProperties( "AboutMe.mp4" ).folder   ); 

			 
		var msgThread = setInterval( function(){
			if(document.getElementById( Id+"m" )){
				document.getElementById( Id+"m" ).classList.remove("msg");
				clearInterval(msgThread);	
			}},90);
		
/*		 $( window ).resize(function() {
		 			var fullScreenThread = setInterval( function(){
			if(document.getElementById("videoPlayer"))
			{
			 $('#videoPlayer').bind('webkitfullscreenchange mozfullscreenchange fullscreenchange', 
				function(e){
					if( !(document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen) ){
					  
					 stopAboutMeVideo(Id);
				}});
			
				document.getElementById("videoPlayer").setAttribute("style" , "object-fit: contain;");
				var video = document.getElementById("videoPlayer");
				if (video.requestFullscreen) {
					video.requestFullscreen();
					clearInterval(fullScreenThread);
					
				}
				else if (video.msRequestFullscreen) {
					video.msRequestFullscreen();
					clearInterval(fullScreenThread);
				}
				else if (video.mozRequestFullScreen) {
					video.mozRequestFullScreen();
					clearInterval(fullScreenThread);
				}
				else if (video.webkitRequestFullScreen) {
					video.webkitRequestFullScreen();
					clearInterval(fullScreenThread);
				 
				}}}, 1000);	
		 });
*/
	
	}
	else
	{
		window.plugins.toast.showLongCenter("No internet connection.  Online videos not available.");
	}	
 
} 
 
 
 function stopAboutMeVideo(Id){
 
	
	try{
	document.getElementById( Id+"d" ).innerHTML = "<img src=\"\" id=\"aboutme\">";//original id
	document.getElementById("landing_page").style.display = "block";
	document.getElementById( Id+"d" ).style.display = "none";
	document.getElementById(childId).parentNode.id = parentId;//original id
	$('#videoPlayer').unbind();
	isPLAYING = {};
	}catch(err){}
 
}




 function stopAboutMeVideoWhenBackButtonPressed()
 {
   try{
	 document.getElementById( "backButtonEvent" ).innerHTML = "<div id=\"aboutmed\" style=\" width:100%;height:100%;display:none;text-align: center !important;color: #674ea7;\">"
	+"	<img src=\"\" id=\"aboutme\">" 
	+"</div>";
	$('#videoPlayer').unbind();
	isPLAYING = {};
	}catch(err){}
  
 }
 


















 
 /*  function createUrlForStreaming( URL,options ){
	var http = new XMLHttpRequest();
		http.open("GET", URL , true );
		http.onreadystatechange = function() 
		{
	
			if(http.readyState == 4 && http.status == 200) 
			{
				var data =	http.responseText.split("\"");
				 	 URL = "";
				for( var i = 0 ; i < data.length ; i ++ )
					URL += data[i];
					window.plugins.streamingMedia.playVideo( URL, options); 
			}		
		}
		
		http.onerror = function(error){	}
		http.send();
}			 */	