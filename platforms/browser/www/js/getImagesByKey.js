'use strict';

function getImagesByKey( key ){
isDownloaded(key); 
}

//---------------------------------------------------------------------

 function getMainTypeFromKey(key){
	var subTypeArray = key.split("/");
	return	subTypeArray[ subTypeArray.length - 2].substr(2).toUpperCase();
  }

//---------------------------------------------------------------------

  function makeSubTypeImageCard(array){
	clearAllPages();
	displayMenuPage();
	var len  =  array.length;
 
	for(var i = 0 ; i < len ; i++ ){
				//if(array[i].image !== "")
		 					getImagesForSubType(array[i].image , array[i].details , array[i].key );
	}
}

//---------------------------------------------------------------------


//--------------------------------------------------

function makeImageWithContent(mainDesc,array){
	clearAllPages();
	displayMenuPage();
	var len  =  array.length;
	console.log(mainDesc);
	for(var i = 0 ; i < len ; i++ ){
		if(i==0){
			var ID = "trans"+i;
		 	getFirstImagforTransformations(array[i].title , array[i].description , array[i].image,ID,mainDesc);
		 }else{

			var ID = "trans"+i;
		 	getImagesForTransformations(array[i].title , array[i].description , array[i].image,ID );
		 	console.log(array[i].title , array[i].description , array[i].image )
		 }

	}
}


//------------For Main Heading with first transformation-----------------
function getFirstImagforTransformations( title , description , image,ID,mainDesc){

	try{
		var divv = document.createElement("div");
		document.getElementById("imgContainerEnd").appendChild(divv);				
		divv.setAttribute("class" , "container");
		divv.setAttribute("data-order" ,parseInt(ID));

		var Mainhead =  document.createElement("h2");
		Mainhead.innerHTML="Transformations";
		divv.appendChild(Mainhead);

		var MainheadContent =  document.createElement("p");
		MainheadContent.innerHTML=mainDesc;
		MainheadContent.setAttribute("style","font-size: calc(0.5rem + 2.5vmin);font-family: arial; line-height: 1.428;color: #333");
		divv.appendChild(MainheadContent);

		var div = document.createElement("div");
		div.setAttribute("style","margin-bottom:5px;box-shadow: 0 2px 2px 0 rgba(0,0,0,0.16), 0 0 0 1px rgba(0,0,0,0.08);")
		div.setAttribute("class","col-md-12 col-lg-12 col-sm-12 col-xs-12")
		divv.appendChild(div);

		var img = document.createElement("img");
		div.appendChild(img);
		img.setAttribute("id" , ID );
		img.setAttribute("style","margin-top:11px")
		img.setAttribute("class" , "img-responsive");

		if(image.indexOf(".jpg") > -1 || image.indexOf(".JPG") > -1 )	
			getImagesFromServer(image , ID); 

		var heading = document.createElement("h3");
		heading.innerHTML = title;
		heading.setAttribute("class","imgname");
		div.appendChild(heading);

		var descriptionContent = document.createElement("p");
		descriptionContent.innerHTML = description;
		descriptionContent.setAttribute("style","font-size: calc(0.5rem + 2.5vmin);font-family: arial; line-height: 1.428;color: #333");
		div.appendChild(descriptionContent);
				 
	}catch(err){console.log(err);}
 }


//------------For all transformations-----------------

function getImagesForTransformations( title , description , image,ID ){

	try{
		var mainDiv = document.createElement("div");
		document.getElementById("imgContainerEnd").appendChild(mainDiv);				
		mainDiv.setAttribute("class","container");

		var div = document.createElement("div");
		mainDiv.appendChild(div);
		div.setAttribute("class" , "col-md-12 col-lg-12 col-sm-12 col-xs-12");
		div.setAttribute("data-order" ,parseInt(ID));
		div.setAttribute("style","margin-bottom:5px;box-shadow: 0 2px 2px 0 rgba(0,0,0,0.16), 0 0 0 1px rgba(0,0,0,0.08);")


		var img = document.createElement("img");
		div.appendChild(img);
		img.setAttribute("id" , ID );
		img.setAttribute("style","margin-top:11px")
		img.setAttribute("class" , "img-responsive");			

		if(image.indexOf(".jpg") > -1 || image.indexOf(".JPG") > -1 )	
				getImagesFromServer(image , ID); 
							
		var heading = document.createElement("h3");
		heading.innerHTML = title;
		heading.setAttribute("class","imgname");
		div.appendChild(heading);

		var descriptionContent = document.createElement("p");
		descriptionContent.innerHTML = description;
		descriptionContent.setAttribute("style","font-size: calc(0.5rem + 2.5vmin);font-family: arial; line-height: 1.428;color: #333");
		div.appendChild(descriptionContent);		
	}catch(err){console.log(err);}
 }

//--------------------------------------------------




function getImagesForSubType( imgKey , array , key ){

	try{
		
		var ID = getNameByKey( imgKey );
		var nameAndLockinfo = getNameFromProperties( key ); //makeKeyForMainType(key)
		
			var 	div = document.createElement("div");
					document.getElementById("imgContainerEnd").appendChild(div);
					div.setAttribute("class" , "card img-thumbnail col-sm-12 col-xs-12 col-md-12 ")
					div.setAttribute('style' , 'margin:0px; margin-bottom:8px; padding:0px;');
				  
			var img = document.createElement("img");
					div.appendChild(img);
					img.src = "../img/dwnloader.gif"; 
					img.setAttribute("width" , "100%");
					//img.setAttribute("class" , "img-rounded");
					img.setAttribute("id" ,  ID );
					//setLaoder(ID);
					
					
					getImagesFromServer( imgKey , ID); 
					
				 var bar = document.createElement("div");
					bar.setAttribute("style" , "background-color: #000000; border: 1px solid black;opacity: 0.5;position: absolute;bottom: 0%;height: 40px;width:100%;");
					bar.setAttribute("onclick" , "goToSubcription()");
					//bar.setAttribute("class" , "img-rounded");

				var vdTypeName = document.createElement("h5");
					vdTypeName.setAttribute("class" , "card-title maintype_vdname ");
					vdTypeName.innerHTML =  nameAndLockinfo.name ;
					vdTypeName.setAttribute("style" , "color:#fff");

					if(   nameAndLockinfo.lock === "1" ){
				var lockIcon = document.createElement("i");
					lockIcon.setAttribute("class" , "fa fa-lock mainlock_image");
					lockIcon.setAttribute("aria-hidden" , "true");
					lockIcon.setAttribute("onclick" , "goToSubcription()");
					bar.appendChild(lockIcon);
					if(	subscription.lock == 1 ) 
						img.setAttribute("onclick" , "goToSubcription()");
					else
						img.setAttribute("onclick" , "callGetImagesByKeyWithKeyArray(" + JSON.stringify(array) + " )");	
				}	
				else img.setAttribute("onclick" , "callGetImagesByKeyWithKeyArray(" + JSON.stringify(array) + " )");
					
						
					//-----------newcode--------------//
					
					bar.appendChild(vdTypeName);
					div.appendChild(bar);
					if(typeof nameAndLockinfo.description !== 'undefined'){
					var div = document.createElement("div");
					document.getElementById("imgContainerEnd").appendChild(div);			
					var text = document.createElement("p");
					div.appendChild(text);
					text.innerHTML =  nameAndLockinfo.description;
					text.setAttribute("style","    box-shadow: 0 2px 2px 0 rgba(0,0,0,0.16),0 0 0 1px rgba(0,0,0,0.08);padding:12px;background-color:#fff;color:6e6e6e");
				}

				 
	}catch(err){console.log(err);}
 }

//---------------------------------------------------------------------

 
 function getSorted() 
 {
 	var interval=setInterval(function()
 	{
	 	var items = $('.imgsort');
	 	if(items.length>0)
	 	{
	 		console.log(items);
	 		clearInterval(interval); 
	 	}
		items.sort(function(a, b){
		    return +$(a).data('order') - +$(b).data('order');
		});
		    
		items.appendTo('#imgContainerEnd');
	},1000)
}

//---------------------------------------------------------------------
//var interval;

 function callGetImagesByKeyWithKeyArray(array)
 {
//	 if(deviceIsOnline())
 // {

	 console.log(array);
	 clearAllPages();
	// addHistory(array);
	 
 	if(array[0].content_type === "image")
 	{
	 
		var len = array.length;
		for(var i = 0 ; i  < len ; i ++)
		{
			if(array[i].content_type === "image")
				getImagesByKey( array[i].key  );
			

		}

		getSorted();


			/* if( isDownloading == 1 )
				anyDownloadingThenShow(); */
	  }
	  else
	  {
	  	console.log("----------------------------------------");
	   makeSubTypeImageCard(array);
	  }

 //}
// else
// {
//	window.plugins.toast.showLongCenter("No internet connection.  Online videos not available.");
//	displayLandingPage();
// }
	
}



//---------------------------------------------------------------------

function makeImageDOMCard( ID , key , isLocalFile ){
				
					
				var div = document.createElement("div");
					document.getElementById("imgContainerEnd").appendChild(div);				
					div.setAttribute("class" , "col-xs-6 col-sm-6  card img-rounded imgsort");
					div.setAttribute("style" , "margin: 0px;margin-bottom: 1px; padding: 0px;");
					div.setAttribute("height" , _VD_HEIGHT +" !important");
					div.setAttribute("data-order" ,parseInt(ID));
					
				var colDiv = document.createElement("div");
					div.appendChild(colDiv);
					//colDiv.setAttribute("class" , "   ");
					colDiv.setAttribute("id" , ID+"d");
					//colDiv.setAttribute("style" ,  "" );
					

				var img = document.createElement("img");
					img.setAttribute("height" ,  _VD_HEIGHT +" !important; ");
					img.src = "../img/dwnloader.gif"; 
					colDiv.appendChild(img);
					img.setAttribute("id" , ID );
					//setLaoder(ID);
					img.setAttribute("class" , "img-rounded imgBlock");
					img.setAttribute("width","100%	");
					
							

				var bar = document.createElement("div");
					colDiv.appendChild(bar);
					bar.setAttribute("class" , "imgTitle img-rounded");


				/* var vdTypeName = document.createElement("p");
					bar.appendChild(vdTypeName);
					vdTypeName.setAttribute("class" , "card-title  ");
					vdTypeName.setAttribute("style" , "bottom: 35%; position: absolute; left:3%;font-size: 10px; color:#fff; ");
					vdTypeName.innerHTML =  getMainTypeFromKey(key); */
				var nameAndLockinfo = getNameFromProperties( key );	
				
				var vdName = document.createElement("p");
					bar.appendChild(vdName);
					vdName.setAttribute("class" , "card-title  ");
					vdName.setAttribute("style" , "    bottom: 0px;position: absolute;font-size: 0.9em;color: #fff;font-weight: bold;padding: 3px;");
					vdName.innerHTML = nameAndLockinfo.name;  //ID.split(".")[0];

    
				var lockIcon = document.createElement("p");
					bar.appendChild(lockIcon);
					lockIcon.setAttribute("aria-hidden" , "true");
					//lockIcon.setAttribute("onclick" , "goToSubcription()");
					//lockIcon.setAttribute("style" , "font-size: large;");
					
					

					
					
					if(isLocalFile){
							lockIcon.setAttribute("class" , "fa fa-play playBtn ");
							lockIcon.setAttribute("onclick" , "callOffLineVideoPlayer('" + ID+"d" +"','"+ ID.split(".")[0]+".mp4"  + "' )");
							getImagePathFromLocal(ID) ; 
					}else{
							img.setAttribute("onclick" , "confirmForDownloads('" + key+ "' )");
							//bar.setAttribute("onclick" , "goToSubcription()");	
							/* if( nameAndLockinfo.lock === "1" )
								lockIcon.setAttribute("class" , "fa fa-lock sublock_image "); */
							if(key.indexOf(".jpg") > -1 )	
								getImagesFromServer(key , ID); 
							else
								document.getElementById(ID).src = "../img/no_video.png";	
					}
					
}


//---------------------------------------------------------------------


function getImagesFromServer( KEY , ID){
	
	
	if( DWNLOAD_OBJECT.id === ID + "d" ){
		 anyDownloadingThenShow();
	}else{
	
	try{
		 
		var bases64EncodeKey  =  Base64.encode( KEY );
		var URL  = _SERVER_IMG_URL + bases64EncodeKey;
		console.log(URL);

		
			var xhttp = new XMLHttpRequest();
				xhttp.open("GET", URL, true);
				
	xhttp.onreadystatechange = function() {
					
			if (this.readyState == 4 ) {
				
			 if (xhttp.status >= 200 && xhttp.status < 304) {
					var imgval =this.responseText.replace("\"" , "");
						imgval=imgval.replace("\"" , "");
						
					try{	document.getElementById(ID).src	= "data:image/jpeg;base64,"+imgval; }catch(err){console.log("ID_NOT_FOUND"+ ID +" :"+err );}
					 
				}else{
					internateTimeOut( ID );
				}
			}
				
		  };
		  xhttp.onerror = function(error){   }
		  
		 // xhttp.setRequestHeader("Cache-Control" , "max-age=604800, public");
		  xhttp.send();
	}catch(err){console.log(err);}
  }
}


//---------------------------------------------------------------------





 function getImagePathFromLocal(img){
		 
		  
		 window.requestFileSystem( 1 , 0 , function (fs) {
			fs.root.getFile( img.split(".")[0] + ".jpg" , { create : false    }, 
			
				function(fileEntry) {
					 try{   document.getElementById(img).src = fileEntry.toURL(); }catch(err){console.log("ID_NOT_FOUND"+ID+" :"+err );}
					}, 
				function(err){
						 
					try{	document.getElementById(img).src = "../img/no_video.png";  }catch(err){console.log("ID_NOT_FOUND"+ID+" :"+err );}
				});
		}, onErrorLoadFs);
 	}
	
//---------------------------------------------------------------------	



function callCreatePDFDOM(array){
	var len = array.length;
	if( array.name !== "" &&  array.name !== undefined ){
		for(var i = 0 ; i < len ; i ++)
			createPDFDOM(array[i].details , array[i].key  , array[i].name);
	}else{
		listAllPDF(array);
	}
}


	function createPDFDOM( array , key , name ){
	
	try{
		
		
		
			var 	div = document.createElement("div");
					div.setAttribute("class" , "card img-rounded img-thumbnail col-sm-12 col-xs-12 col-md-12 ")
					div.setAttribute('style' , 'margin:0px; margin-bottom:1px; padding:0px;');
					document.getElementById("imgContainerEnd").appendChild(div);
				  
			var img = document.createElement("img");
					img.setAttribute("width" , "100%");
					img.setAttribute("class" , "img-rounded");
					//img.setAttribute("id" ,  ID );
					img.src = "../img/pdf.jpeg"; 
					img.setAttribute("onclick" , "listAllPDF(" + JSON.stringify(array) + " )");
					div.appendChild(img);
					//setLaoder(ID);
					//getImagesFromServer(key , ID); 
					
				 var bar = document.createElement("div");
					bar.setAttribute("style" , "background-color: #000000; border: 1px solid black;opacity: 0.7;position: absolute;bottom: 0%;height: 40px;width:100%;");
					//bar.setAttribute("onclick" , "goToSubcription()");
					bar.setAttribute("class" , "img-rounded");
				
				var nameAndLockinfo = getNameFromProperties( key );
				
				var vdTypeName = document.createElement("h5");
					vdTypeName.setAttribute("class" , "card-title maintype_vdname ");
					vdTypeName.innerHTML = nameAndLockinfo.name;

				if(nameAndLockinfo.lock === "1"){
					
				var lockIcon = document.createElement("i");
					lockIcon.setAttribute("class" , "fa fa-lock mainlock_image");
					lockIcon.setAttribute("aria-hidden" , "true");
					lockIcon.setAttribute("onclick" , "goToSubcription()");
					bar.appendChild(lockIcon);
				}
					bar.appendChild(vdTypeName);
					div.appendChild(bar);
				

				 
		}catch(err){console.log();}


	
	}
	
	
	
	
	
	
	function listAllPDF(array){
		console.log(array);
		clearAllPages();
		
	 if(array[0].content_type === "image"){
	 
		var len = array.length;
		for(var i = 0 ; i  < len ; i ++){
			//if(array[i].content_type === "pdf")
				listPDF( array[i].key  );
		}
			/* if( isDownloading == 1 )
				anyDownloadingThenShow(); */
				
  }else{
	 callCreatePDFDOM(array);
 }
		
	}
	
	
	
	function listPDF( pdfkey  ){
		isDownloaded(pdfkey); 
	}	
	
	
	function makePdfDOMCard( ID , pdfkey , isDownloaded ){
		
		 
		var colDiv = document.createElement("div");
					document.getElementById("imgContainerEnd").appendChild(colDiv);
					colDiv.setAttribute("class" , "col-xs-6 col-sm-6  ");
					colDiv.setAttribute("style" , "margin-bottom:1px;width:182px !important;");
					//colDiv.setAttribute("height" , _VD_HEIGHT +" !important");
					
					
				var div = document.createElement("div");
					colDiv.appendChild(div);
					div.setAttribute("class" , "card-title  pdf-icon fold ");
					 div.setAttribute("id" , ID );
					//div.setAttribute("id" , ID+"d");
					
					
				var img = document.createElement("img");
				//	div.appendChild(img);
				//	img.setAttribute("id" , ID );
					
					 
					//img.setAttribute("height" , ""+ _VD_HEIGHT +" !important;  ");
					
					
					//setLaoder(ID);
							

				var bar = document.createElement("div");
					//bar.setAttribute("class" , "pdftitle ");
					div.appendChild(bar);

				var nameAndLockinfo = getNameFromProperties( pdfkey );
				var vdTypeName = document.createElement("p");
					vdTypeName.setAttribute("style" , "margin-top: 15px;font-size: 16px !important;");
					 
					vdTypeName.innerHTML =  nameAndLockinfo.name;
					bar.appendChild(vdTypeName);
					
				/* var vdName = document.createElement("p");
					vdName.setAttribute("class" , "card-title  ");
					vdName.setAttribute("style" , "bottom: -10%; position: absolute; left:3%;font-size: 10px;color:#fff; ");
					vdName.innerHTML = ID.split(".")[0];
					bar.appendChild(vdName); */
					if( isDownloaded ){
					//.setAttribute("class" , "img-rounded  offlinePDF");
				div.setAttribute("onclick" , "optionForOfflinePDF('" + pdfkey+ "' )");
					//	img.src = "../img/dwnpdf.ico"; 
						
					}else{
					div.setAttribute("onclick" , "confirmForPDFDownloads('" + pdfkey+ "' )");
					//	img.src = "../img/dwnpdf.ico";    //"../img/pdf.jpeg"; 
					//	img.setAttribute("class" , "img-rounded  pdfImgBlock ");
						if( nameAndLockinfo.lock === "1" ){ 	
						  var lockIcon = document.createElement("p");
							lockIcon.setAttribute("aria-hidden" , "true");
							lockIcon.setAttribute("onclick" , "goToSubcription()");
							lockIcon.setAttribute("style" , "font-size: large;");
							bar.appendChild(lockIcon);  
						}
					}
		
	}