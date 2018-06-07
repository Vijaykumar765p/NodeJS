
 

//---------------------------------------------------------------------

function getOffLineVideoList(  ){

	 window.requestFileSystem( 1 , 0 , function (fs) {

	console.log('file system open: ' +fs.root);

	var dirReader = fs.root.createReader();
		dirReader.readEntries( gotDir , gotDirError );

		}, onErrorLoadFs);
		/* var videoNames = [];

	videoNames = getAllKeys();
	//makeVideoListDOM("name");
	for(var i=0 ; i<videoNames.length ; i++){
		if(videoNames[i] !== "isLogin"){
			makeVideoListDOM("'"+ videoNames[i] +"'");
		}
	} */
}

//---------------------------------------------------------------------

function gotDir( fileEntry ){

	var Offlineflag = 0 ;
	var n = fileEntry.length ;

	for( var i=0  ; i< n ; i++  )
	{
		console.log( fileEntry[i].name );
		try
		{
			if(  DWNLOAD_OBJECT.id !== undefined  &&  DWNLOAD_OBJECT.id.split(".")[0]  ==  fileEntry[i].name.split(".")[0] + "d"  )
				continue;
		
		}catch(err){console.log("gotDir :" + err );}

		if(  fileEntry[i].name.indexOf(".mp4") > -1   )
		{
				getImagePathForOfflineVideo( fileEntry[i].name );
				Offlineflag = 1 ;
		}
				  /* || fileEntry[i].name.indexOf(".pdf") > -1  */
				 //  if( fileEntry[i].name.indexOf(".mp4") > -1 || fileEntry[i].name.indexOf(".jpg") > -1 || fileEntry[i].name.indexOf(".pdf") > -1  )
				//	deleteALLOfflineVideo(fileEntry[i].name); 
				
	}

		if( Offlineflag == 0 )
			document.getElementById("imgContainerEnd").innerHTML = "<h6 style=\"margin-top:35%; text-align:center;color: #674ea7;    font-size: 1.9em; \">You do not have any downloaded videos. Select a video and click on download, then it will appear on this list.</h6>";
			 
}

//---------------------------------------------------------------------

function gotDirError(e){
	navigator.notification.alert( e  , null, "", "OK" );
}

//---------------------------------------------------------------------



function makeVideoListDOM( vdoName , fileEntry , isVideo ){

	var rowDiv = document.createElement("div");

		rowDiv.setAttribute("style" ,"margin:4px;");
		rowDiv.id= vdoName+"r";

	var colDiv =  document.createElement("div");
		colDiv.setAttribute("class" , "col-md-6 col-lg-6 col-sm-6 col-xs-6");
		colDiv.id= vdoName+"d";
		rowDiv.appendChild(colDiv);

	var cardDiv =  document.createElement("div");
		cardDiv.id = vdoName;
		cardDiv.setAttribute("class","row card text-center");
		//cardDiv.setAttribute("onclick" , "playOffLineVideo('"+vdoName+"')");
		colDiv.appendChild(cardDiv);

	var img =  document.createElement("img");
		img.src = fileEntry.toURL();
		img.setAttribute("height" ,  _VD_HEIGHT );
		img.setAttribute("class" , "img-rounded imgBlock ");
		 
		cardDiv.appendChild(img	);

		var bar = document.createElement("div");
			cardDiv.appendChild(bar);
			bar.setAttribute("class" , "imgTitle img-rounded");


		 var lockIcon = document.createElement("p");
			lockIcon.setAttribute("aria-hidden" , "true");
			lockIcon.setAttribute("class" , "fa fa-play playOffBtn ");
			lockIcon.setAttribute("onclick" , "playOffLineVideo('"+vdoName+"',"+ isVideo +"  )");
		cardDiv.appendChild(lockIcon);

	 

	var txt = document.createTextNode(  getNameFromProperties(  vdoName   ).name  );
	var h2 =  document.createElement("div");
		h2.setAttribute("class" , "card-title");
		h2.setAttribute("style" , " font-size: 0.9em;color: #fff;font-weight: bold;margin-top: 10px !important; !important;");
		h2.appendChild(txt);
		//h2.setAttribute("onclick" , "deleteOfflineVideo('"+vdoName+"' )");
		bar.appendChild(h2);
 


	/* var delDiv =  document.createElement("div");
		delDiv.setAttribute("class" , "col-md-2 col-lg-2 col-sm-2 col-xs-2");
		delDiv.setAttribute("onclick" , "deleteOfflineVideo('"+vdoName+"' )");
	var delOPtion = document.createElement("span");
		delOPtion.setAttribute("aria-hidden","true");
		delOPtion.setAttribute("class", "fa fa-ellipsis-v");
		delOPtion.setAttribute("style" , "color:#674ea7;margin-top:5%; ");
		  */


		//delDiv.appendChild(delOPtion);
		//rowDiv.appendChild(delDiv);
	document.getElementById("imgContainerEnd").appendChild(rowDiv);
}

function delSuccess(){
	console.log("--------------deleted------------------");
}

function delError(err){
	console.log("delError:  "+err);
}
//---------------------------------------------------------------------

function playOffLineVideo(videoName , isVideo ){
	try{
		// if(! document.getElementById("videoPlayer"))


		/* document.getElementById(videoName+"r").removeChild(document.getElementById(videoName+"r").lastChild);
		document.getElementById(videoName+"r").removeChild(document.getElementById(videoName+"r").lastChild); */
	 window.requestFileSystem( 1, 0 , function(dir) {
		dir.root.getFile(videoName, { create: false  }, function(file) {

	if( isVideo == 1){
			makeVideoPlayer(videoName);
			var media = document.getElementById(videoName + "p");
			var	mediasrc = document.getElementById(videoName + "s");
				mediasrc.src = file.toURL();

				media.load();
				media.play();
				//isSilentMode();
		}else{
			//cordova.InAppBrowser.open( file.toURL() , 'random_string' ,  'location=no');

				  var object = "<iframe  id='if' src='" + file.toURL() + "' style='width: 100%; height:  -webkit-fill-available !important;' frameborder='0'  onclick='hideShareButton()'  ></iframe>";
//ndfHFb-c4YZDc-Wrql6b	
      $("#imgContainerEnd").html(object); 
	  //$("#imgContainerEnd").addClass("hide");
	  $('#if').click(function() {
    hideShareButton();
});


			
		}


		} ,  onErrorCreateFile  );
    }, onErrorLoadFs );
	}catch(err){console.log("playOffLineVideo :"+err);}
}

//---------------------------------------------------------------------
// function onErrorCreateFile(error){
// 	console.log("onErrorCreateFile"+ error.code +  "\n" + error);
//
// 	//removeLoader("img1");
// 	if(error.code == 8 || error.code == '8' )
// 	navigator.notification.alert("Video not found", null, "SRIDAMA", "OK");
// }
//---------------------------------------------------------------------

function onErrorLoadFs(error){
	navigator.notification.alert("onErrorLoadFs" + error , null, "SRIDAMA", "OK");
	//removeLoader("img1");
}


//---------------------------------------------------------------------
/* function makeVideoPlayer(divID){
	try{
			var video = document.createElement('video');
			video.id = "videoPlayer";
			video.controls = "controls";
			video.setAttribute("class",  "img-rounded subVDSIZE");
			video.setAttribute('style' , "height:" + _VD_HEIGHT +" !important;");
			video.setAttribute("controlsList",  "nodownload");
			video.setAttribute("autoPlay",  "true");

			var source = document.createElement('source');
				source.id = "videoPlayerSrc";
				source.src = '';
				source.type = "video/mp4";
				video.autoPlay = true;
				video.appendChild(source);
			document.getElementById(divID).innerHTML = "";
			document.getElementById(divID).appendChild(video) ;
		}catch(err){console.log("makeVideoPlayer :" + err);}
	}
 */
//---------------------------------------------------------------------

function callOffLineVideoPlayer( divID ,  videoName ){
	makeVideoPlayer( divID);
	 window.requestFileSystem( 1, 0 , function(dir) {
		dir.root.getFile(videoName, { create: false }, function(file) {
			var media = document.getElementById(divID + "p");
			var	mediasrc = document.getElementById(divID + "s");
			mediasrc.src = file.toURL();

			media.load();
			media.play();

		} ,  onErrorCreateFile );
    }, onErrorLoadFs );
}


//---------------------------------------------------------------------

  function deleteOfflineVideo( vdoName ){

  var files = [ vdoName , vdoName.split(".")[0]+".jpg"];
	  for(var i = 0 ; i < 2 ; i++){
		  try{
			window.requestFileSystem( 1 , 0 , function (fs) {
				fs.root.getFile( files[i] , { create: false    },
				function (fileEntry) {

				fileEntry.remove(function(){

				try{
					document.getElementById(vdoName+"r").remove();
				}catch(err){console.log("delted: " + err);}

				} , delError);
				},
						onErrorCreateFile);
			}, onErrorLoadFs);
		  }catch(err){console.log(err);}
	  }


}

//---------------------------------------------------------------------

function getImagePathForOfflineVideo(vdoName){
	/* if( vdoName.indexOf(".pdf") > -1 ){
			var pdfImgObj = {
				toURL : function(){
						return "../img/dwnpdf.ico";
						}
				};
			makeVideoListDOM( vdoName , pdfImgObj , 0 ); // 0 = "pdf"
	}else{ */

	  window.requestFileSystem( 1 , 0 , function (fs) {
			fs.root.getFile( vdoName.split(".")[0]+".jpg"  , { create : false    },
				function (fileEntry) {
					makeVideoListDOM( vdoName , fileEntry , 1 ); // 1 = ".mp4"
						},
					function(){
						var vdImgObj = {
							toURL : function(){
									return "../img/no_video.png";
									}
							};
					makeVideoListDOM( vdoName , vdImgObj , 1 );
			});
		}, onErrorLoadFs);

	//}
}
//---------------------------------------------------------------------

function deleteALLOfflineVideo( vdoName ){


		 try{
			window.requestFileSystem( 1 , 0 , function (fs) {
				fs.root.getFile( vdoName  , { create: false    },
				function(fileEntry) {
						 fileEntry.remove(delSuccess , delError);

					},
						onErrorCreateFile);
			  }, onErrorLoadFs);
		  }catch(err){console.log(err);}

}

function formatName(name){

var arr  =  name.split("-");
return arr[  arr.length - 1 ];
}