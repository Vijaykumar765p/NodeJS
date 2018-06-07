'use strict';

var   MEAL_DATA = [];
var showbackbutton = undefined ;
var INDEX  = 0;
var _NO_INTERNET_MSG_FOR_MEAL_PLAN = "No internet connection. Online meal plans not available.";

function goToMEALPLANS( innerIdex )
{

	/*if( subscription.daysremain > 0 )
	{*/
	
		displayMenuPage();
		hideHederMenuOption();
		showHeader('mealHeaderID');
		clearAllPages();
		showbackbutton = undefined ;
		console.log(  data[1].details[innerIdex] );
		INDEX = innerIdex ;
		getMealsData( data[1].details[innerIdex].key ,  innerIdex  );
		
	/*}
	else
	{
		goToSubcription();
	}*/
}

function goToSession()
{
		if( deviceIsOnline() )
	{
		if( subscription.daysremain > 0 )
	{

	getImageForBG( data[1].details[ INDEX ].key + data[1].details[ INDEX ].key.split("/")[1] + "_bg.png",'session' );
	$('span').css('text-decoration', 'none');
	$('#plan').css('text-decoration' , 'underline');
	clearAllPages();
 
	if( MEAL_DATA.length>0 )
	{
	
		var sessionhtml="<div  style=\"    padding-left: 25px;    padding-top: 30px;    padding-right: 25px;  \" id='mealdiv'> <span class=\"fa fa-angle-left container\" aria-hidden=\"true\" style='color: #674ea7;font-size: 35px !important;position: absolute;margin-top: 10px;margin-left: -12px;font-weight: bold;' onclick=\"displayMealPlanMenu('showbackbuttonstatus')\"></span><h4 style='margin-top: 16px; text-align: center;'><b style=\"color:#674ea7;font-size: 20px;\">"+MEAL_DATA[0].plan_name+"</b></h4><div id='bgbuttonlist'>";
		for(var i=0;i<MEAL_DATA[0].session.length;i++)
		{
			sessionhtml+="<button type='button' class='btn button_meal_list' onclick=goToOptions("+i+")>"+MEAL_DATA[0].session[i].name+"</button>";		

		}
		sessionhtml+="</div></div>";
		document.getElementById("imgContainerEnd").innerHTML=sessionhtml;
	}

	var bgdivhight  = "";
	try{	bgdivhight = document.getElementById('mealdiv').clientHeight; }catch(err){}
	console.log(bgdivhight);
	var setbgdivhight=526;
	if(parseInt(bgdivhight)>526)
	{
		setbgdivhight=parseInt(bgdivhight)+50;
	}
	document.getElementById("imgContainerEnd").style.height=setbgdivhight+'px';
	//document.getElementById("imgContainerEnd").setAttribute("style" , 'height:-webkit-fill-available; width: 100%;height: '+setbgdivhight+'px; background-repeat: no-repeat;');
}else{
	goToSubcription();
}
	}
	else
	{
	window.plugins.toast.showLongCenter(  _NO_INTERNET_MSG_FOR_MEAL_PLAN );
	displayLandingPage();
	}	
		
 }
 

function goToOptions( dataind )
{	
	if( deviceIsOnline() )
	{

	if(document.getElementById("imgContainerEnd").style.backgroundImage.length <= 0 )
	 getImageForBG( data[1].details[ INDEX ].key + data[1].details[ INDEX ].key.split("/")[1] + "_bg.png",'option' );
	 $('span').css('text-decoration', 'none');
	 clearAllPages();
	 	 
	if(MEAL_DATA.length>0)
	{
		var sessionhtml="<div style=\"padding-left: 25px;    padding-top: 30px;    padding-right: 25px;   \" id='mealdiv'> <span class=\"fa fa-angle-left\" aria-hidden=\"true\" style='color: #674ea7;font-size: 35px !important;position: absolute;margin-top: 10px;margin-left: -12px;font-weight: bold;' onclick=\"goToSession()\"   ></span> <h4 style='margin-left: 30px;'><b style=\"color:#674ea7;font-size: 15px;\">"+MEAL_DATA[0].plan_name+"-"+MEAL_DATA[0].session[dataind].name+" Options</b></h4><div id='bgbuttonlist'>";
		for(var i=0;i<MEAL_DATA[0].session[dataind].options.length;i++)
		{
			sessionhtml+="<button type='button' class='btn button_meal_list' onclick=goToOptionDetails("+dataind+","+i+")>"+MEAL_DATA[0].session[dataind].options[i].name+"</button>";		
		}

		sessionhtml+="</div></div>";
		document.getElementById("imgContainerEnd").innerHTML=sessionhtml;
	}

	var bgdivhight=document.getElementById('mealdiv').clientHeight;
	console.log(bgdivhight);
	var setbgdivhight=526;
	if(parseInt(bgdivhight)>526)
	{
		setbgdivhight=parseInt(bgdivhight)+50;
	}

	document.getElementById("imgContainerEnd").style.height=setbgdivhight+'px';

	}
	else
	{
	window.plugins.toast.showLongCenter( _NO_INTERNET_MSG_FOR_MEAL_PLAN );
	displayLandingPage();
	}	
}



function goToOptionDetails( dataind , optionindex )
{
	if( deviceIsOnline() )
	{
	 	    if( MEAL_DATA.length > 0 )
	    {
			removeBackgroungImageOfDiv();
			clearAllPages();
			$('span').css('text-decoration', 'none');
			console.log(data[1].details[ INDEX ].key + MEAL_DATA[ 0 ].session[dataind].options[ optionindex ].image);
			getImagesFromServer(  data[1].details[ INDEX ].key + MEAL_DATA[ 0 ].session[dataind].options[ optionindex ].image , 'aboutimg'  );
			
	    	var sessionhtml="<div style=\"margin-top: 90px;\"> <span class=\"fa fa-angle-left\" aria-hidden=\"true\" style='color:#674ea7;font-size: xx-large !important ;position: absolute;margin-top: -6px;margin-left:12px' onclick=\"goToOptions(" +  dataind  + ")\"   ></span>   <h4 style=' margin-left: 40px;  '><b style=color:#674ea7;>"+MEAL_DATA[0].plan_name+"-"+MEAL_DATA[0].session[dataind].name+" "+MEAL_DATA[0].session[dataind].options[optionindex].name+"</b></h4>";
			
				sessionhtml+= "<div class=\"diet_plan img-rounded\" style=\"border: none; padding: 0px;\"> <img src=\"../img/dwnloader.gif\"   id=\"aboutimg\" style=\"width: 100%;border-radius: 6px;\"></div>"
				
	    		sessionhtml+="<div class='container'> <p class='preparation' style='color:#674ea7;'>"+MEAL_DATA[0].session[dataind].options[optionindex].title+"</p> <p class='preparation' ><b>Ingredients</b><br>"+MEAL_DATA[0].session[dataind].options[optionindex].ingredients.replace(/(?:\r\n|\r|\n)/g, '<br />')+"</p> <p class='preparation'><b>Preparation</b><br>"+MEAL_DATA[0].session[dataind].options[optionindex].preparation.replace(/(?:\r\n|\r|\n)/g, '<br />')+"</p> </div>";		

	    	sessionhtml+="<div>";
	    	document.getElementById("imgContainerEnd").innerHTML=sessionhtml;
		}

		document.getElementById("imgContainerEnd").style.height='100%';

	}
	else
	{
	window.plugins.toast.showLongCenter( _NO_INTERNET_MSG_FOR_MEAL_PLAN );
	displayLandingPage();
	}	
 }





function getMealsData( mealkey  , innerIdex )
{
	if( deviceIsOnline() )
	{

	try
	{
		$(".button_meal").css('color', 'white');
		var  KEY  =  Base64.encode( mealkey + "data.json" ); 
		var url = _MEALSPLAN_DATA_URL +  KEY ;
		console.log( url );
		INDEX = innerIdex;
		var http = new XMLHttpRequest();
		http.open("GET" , url , true );
		 
		http.onreadystatechange = function() 
		{
			if(http.readyState == 4 && http.status == 200) 
			{
				MEAL_DATA  =   JSON.parse( ( Base64.decode(  http.responseText ) ) ) || "[]" ;			  
				createAboutMealDOM( innerIdex );
		
				console.log("--------------meal data-------------");
				console.log(MEAL_DATA);
				 
			} 
			
		}
		
		http.onerror = function(error)
		{
			window.plugins.toast.showLongCenter( _NO_INTERNET_MSG_FOR_MEAL_PLAN );
			displayLandingPage();
		}
		
		http.send();
	}
	catch(err){ console.log(err); }

	}
	else
	{
	window.plugins.toast.showLongCenter( _NO_INTERNET_MSG_FOR_MEAL_PLAN );
	displayLandingPage();
	}	
 
}

function createAboutMealDOM( innerIdex )
{
	if( deviceIsOnline() )
	{
		removeBackgroungImageOfDiv();
		if( MEAL_DATA.length > 0 )
		{
			if( innerIdex !== undefined )
			INDEX = innerIdex;
			hideHeader('mealplan');
			showHeader('mealHeaderID');
			$('span').css('text-decoration', 'none');
			$('#about').css('text-decoration' , 'underline');
			console.log( data[1].details[ innerIdex || INDEX ].key + MEAL_DATA[0].image);
			getImagesFromServer(  data[1].details[ innerIdex || INDEX ].key + MEAL_DATA[0].image , 'aboutimg'  );
			
			if( showbackbutton !== undefined )	
				var backbutton = "<span class=\"fa fa-angle-left container\" aria-hidden=\"true\" style='color:#674ea7;font-size: 35px !important ;position: absolute;margin-top: -6px; margin-left:12px;' onclick=\"displayMealPlanMenu('displaybackbutton')\"   ></span>";
			else
				var backbutton = "";
			
			document.getElementById("imgContainerEnd").innerHTML="<div style=\"margin-top: 90px;\">" +  backbutton  + "<h4 class='line_box' ><b style='color:#674ea7; font-size:20px ' onclick=\"goToSession()\" >"+ MEAL_DATA[0].plan_name +"</b></h4>   <div class=\"diet_plan img-rounded\" style=\"border: none; padding: 0px;\"><img src=\"../img/dwnloader.gif\"   id=\"aboutimg\" style=\"width: 100%;border-radius: 6px;\"></div><p class='diet_plan'>"+ MEAL_DATA[0].about +"</p></div>";
		}
	}
	else
		window.plugins.toast.showLongCenter( _NO_INTERNET_MSG_FOR_MEAL_PLAN );
}




 


function displayMealPlanMenu( showbackbuttonstatus  )
{
	/*if( subscription.daysremain > 0 )
	{*/
		if (deviceIsOnline())
		{
			displayMenuPage();
			hideHederMenuOption();
			showbackbutton = showbackbuttonstatus;
			clearAllPages();
			 
			hideHeader('mealHeaderID');
			showHeader('mealplan');	
			getImageForBG( data[1].key + data[1].key.split("/")[0] + ".png",'detail');
			if( data[1].details.length > 0 )
			{
				var mealOption = "<div id='mealdiv' style=\"padding-left: 30px;    padding-top: 90px;    padding-right: 30px;  \">";
				for( var i = 0 ; i < data[1].details.length ; i++ )
				{	
					if( data[1].details[i].id )
					{
					mealOption+="<button type='button' class='btn button_meal' onclick=\"getMealsData('" + data[1].details[i].key +"',"+ i+ ")\">"+  getNameFromProperties( data[1].details[i].key ).name     +"</button>";		
					}	
				}

				mealOption+="</div>";
				document.getElementById("imgContainerEnd").innerHTML = mealOption;

			}
		}
		else
		{
			window.plugins.toast.showLongCenter( _NO_INTERNET_MSG_FOR_MEAL_PLAN );
			displayLandingPage();
		}
	/*}
	else
	{	
		goToSubcription();
	}*/
} 




function getImageForBG( KEY,type ){

var bases64EncodeKey  =  Base64.encode( KEY );
var URL  = _SERVER_IMG_URL + bases64EncodeKey;
	console.log("BG   "+ URL);

var xhttp = new XMLHttpRequest();
	xhttp.open("GET", URL, true);
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 ) {
			 if (xhttp.status >= 200 && xhttp.status < 304) {
					var imgval =this.responseText.replace("\"" , "");
						imgval=imgval.replace("\"" , "");
						
					setBackgroungImageOfDiv( 'imgContainerEnd'  , "data:image/jpeg;base64,"+imgval ,type ); 
					 
			}else{
					//alert( xhttp );
			}
		}
				
	  };
		  xhttp.onerror = function(error){  }
xhttp.send();
}


function setBackgroungImageOfDiv( id , url,type){
    var urlString = 'url(' + url + ')';

	document.getElementById("imgContainerEnd").classList.add("mealBG");

    //alert(document.getElementById("imgContainerEnd").style.height);

  var bgdivhight = "";
  try{ bgdivhight=document.getElementById('mealdiv').clientHeight; }catch(err){}

	var setbgdivhight=520;
	if(parseInt(bgdivhight)>520)
	{
		setbgdivhight=bgdivhight+50;
	}

	if(type=='session' || type=='option')
	{
		document.getElementById("deviceready").setAttribute("style" , 'margin: 5px');
		document.getElementById("imgContainerEnd").setAttribute("style" , 'margin-top: 58px;width: 100%;');
	}
	else
	{
		document.getElementById("imgContainerEnd").setAttribute("style" , 'margin-top: 58px;height:-webkit-fill-available; width: 100%;height: '+setbgdivhight+'px; background-repeat: no-repeat;');
   		 document.getElementById( id ).style.backgroundImage =  urlString;
	}
	
}

function removeBackgroungImageOfDiv(){
	document.getElementById("imgContainerEnd").style.backgroundImage = "";
	document.getElementById("imgContainerEnd").classList.remove("mealBG");
}
