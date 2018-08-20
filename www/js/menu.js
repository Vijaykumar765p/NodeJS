"use strict";

function makeMenu()
{
	console.log("makeMenu");
	var i;
	document.getElementById("menuID").innerHTML  =  "";
	try
	{

		// menu image
		var MainMenu =document.createElement("div");
		MainMenu.setAttribute("class" , "tab");
		var img =	document.createElement("img");
		img.setAttribute("id" , "tab-" + 10 );

		img.setAttribute("style" , "object-fit: fill;height:200px;width:100%;" )
		img.src = "../img/menu-image.jpg";
		MainMenu.appendChild(img);
		document.getElementById("menuID").appendChild(MainMenu);
		var l = 0;
	
		if(data.length > 0 )
			l = data.length ;
		else
		{
			data = JSON.parse(localStorage.getItem( "data" ) || "[]" );
			l = data.length ;
		}
		
		for(  i = 0 ; i< l ; i++ )
		{
			if( data[i].name !== ""  )
			{
				var MainMenu =	document.createElement("div");
				MainMenu.setAttribute("class" , "tab");

				var input =	document.createElement("input");
				input.setAttribute("id" , "tab-" + i );
				input.setAttribute("type" , "checkbox");
				input.setAttribute("name" , "tabs");

				var label =	document.createElement("label");
				label.setAttribute("for" , "tab-" + i);
				var menuName  = document.createTextNode(  getNameFromProperties( data[i].key ).name  ); //data[i].name.toUpperCase()
				label.appendChild(menuName);
				MainMenu.appendChild(label);
							
				if(data[i].details.length > 0 )
					if(data[i].key && data[i].key !== "2#meal_plan/" )
						MainMenu.insertBefore( input,label);

				var div = document.createElement("div");
				div.setAttribute("class" , "panel");
				var subdata = "";
			
				try
				{
					if(	data[i].details[0].id === "how to measure yourself" )
						 subdata  = data[i].details[0].details;
					else 
						 subdata =   data[i].details;	 
						 
				}
				catch(err)
				{    
					subdata =   data[i].details;    
				}							
				
				if(  subdata[0].key &&  subdata[0].key !==  "2#meal_plan/" )
				{
					for(var j = 0 ; j< subdata.length ; j++ )
					{
						if( subdata[j].key !== undefined  && subdata[j].key !== "" )
						{
							var div = document.createElement("div");
							div.setAttribute("class" , "tab-content button_content");

							var innerButton = document.createElement("button");
							innerButton.setAttribute("class" , "btn btn-link");
							innerButton.setAttribute("onclick" , "openSubMenu( './" + i +"_" +subdata[j].name+".html',' " + subdata[j].key +  "'," + i +"," + j + ")");
							innerButton.setAttribute("data-toggle" , "collapse");
							innerButton.setAttribute("data-target" , "#f9");
							innerButton.setAttribute("data-parent" , "#accordion");
							var name = getNameFromProperties( subdata[j].key.replace(" " , "") ).name;
							try
							{
								innerButton.appendChild(  document.createTextNode( name  )  );
							}
							catch(err)
							{
								
							}

							div.appendChild(innerButton);

							if( name !== "")
								MainMenu.appendChild(div);
						}
					}
				}	
				document.getElementById("menuID").appendChild(MainMenu);
			}
		}


	}
	catch(err)
	{
	}
	makeStaticMenu(i);
}




function openMyDownLoads( divHistory )
{
	if( subscription.daysremain > 0 )
	{
	
		$('span').css('text-decoration' , 'none');
		clearAllPages();
		displayMenuPage();
		showHederMenuOption();
		getOffLineVideoList();
		
	}
	else
	{
		goToSubcription();
	}
	
/*	if( divHistory === undefined )
		addHistory("openMyDownLoads()"); */
}

function openSubMenu(URL , VALUE , OuterIndex , InnerIndex )
{
	redirectToMethod(OuterIndex , InnerIndex );
}


function logOut()
{
	abortDownload();
	localStorage.setItem("isLogin" , 0 );
	window.location.href = "../index.html";
}

function callMealPlan()
{
	if (deviceIsOnline())
	{
		if( isFullMenu() )
			displayMealPlanMenu( 'showbackbuttonstatus'  );
		else
			window.plugins.toast.showLongCenter("Please wait while menu is loading...");
	}
	else
	{
		window.plugins.toast.showLongCenter("No internet connection. Online meal plans not available.");
		displayLandingPage();
	}
}

function hideLeftMenuOption(){
 
try{
	if( document.getElementById("menuID").childNodes.length >= 6 ){
		document.getElementById("menuID").childNodes[6].style.display  = "none";
		document.getElementById("menuID").childNodes[5].style.display  = "none";
		//document.getElementsByClassName('tab')[7].addEventListener("click" , openMyDownLoads ,false);
		document.getElementsByClassName('tab')[2].addEventListener("click" , callMealPlan ,false);
		}
}catch(err){console.log(err);}
}




 function makeStaticMenu(i)
 {
 
 
	var MainMenu =	document.createElement("div");
				MainMenu.setAttribute("class" , "tab");
				MainMenu.setAttribute("onclick" , "openMyDownLoads()");
				var input =	document.createElement("input");
							input.setAttribute("id" , "tab-" + 11 );
							input.setAttribute("type" , "checkbox");
							input.setAttribute("name" , "tabs");

				var label =	document.createElement("label");
							label.setAttribute("for" , "tab-" + 11);
							
				var myDonwloadName  = "My Downloaded Videos";
				try{
					myDonwloadName =	getNameFromProperties( data[6].key ).name ;
				}catch(err){ myDonwloadName  = "My Downloaded Videos";     }
				
				var menuName  = document.createTextNode( myDonwloadName );
								label.appendChild(menuName);

					MainMenu.appendChild(label);
					document.getElementById("menuID").appendChild(MainMenu);
 
 

	 try{

	var socialshare = [
				{"name":"Share via WhatsApp", 			"fnt":"shareWithWhatsup()"},
				{"name":"Share via Facebook", 			"fnt":"shareWithFacebook()"},
				{"name":"Share and link via Twitter", 	"fnt":"shareWithTwitter()"},
			  //{"name":"Share via Instagram", 			"fnt":"shareWithInstagram()"},
				{"name":"Share via SMS", 				"fnt":"shareWithMSG()"},
			//	{"name":"Share via Other", 				"fnt":"shareWithOther()"}
						];

	var MainMenu =	document.createElement("div");
				MainMenu.setAttribute("class" , "tab");

				var input =	document.createElement("input");
							input.setAttribute("id" , "tab-" + i );
							input.setAttribute("type" , "checkbox");
							input.setAttribute("name" , "tabs");

					var label =	document.createElement("label");
						label.setAttribute("for" , "tab-" + i);
					var menuName  = document.createTextNode("Social Share");

						label.appendChild(menuName);

						MainMenu.appendChild(label);

							MainMenu.insertBefore( input,label);

			var div = document.createElement("div");
				div.setAttribute("class" , "panel");


				for(var j = 0 ; j< socialshare.length ; j++ ){

					var div = document.createElement("div");
						div.setAttribute("class" , "tab-content button_content");
						 ;
					var innerButton = document.createElement("button");
						innerButton.setAttribute("class" , "btn btn-link");


						innerButton.setAttribute("onclick" , socialshare[j].fnt );

						innerButton.setAttribute("data-toggle" , "collapse");
						innerButton.setAttribute("data-target" , "#f9");
						innerButton.setAttribute("data-parent" , "#accordion");
						var submenuName;
						try{
						 submenuName  = document.createTextNode(socialshare[j].name);
						}catch(err){}
						innerButton.appendChild(submenuName);

						div.appendChild(innerButton);
						MainMenu.appendChild(div);
				}
				document.getElementById("menuID").appendChild(MainMenu);


	 }catch(err){alert(err);}


	 //mail
	 /* try{
		 var MainMenu =	document.createElement("div");
				MainMenu.setAttribute("class" , "tab");

				var input =	document.createElement("input");
							input.setAttribute("id" , "tab-9"  );
							input.setAttribute("type" , "checkbox");
							input.setAttribute("name" , "tabs");

					var label =	document.createElement("label");
						label.setAttribute("for" , "tab-9");
					var menuName  = document.createTextNode("ASK AICHA");

						label.appendChild(menuName);

						MainMenu.appendChild(label);

							MainMenu.insertBefore( input,label);

			var div = document.createElement("div");
				div.setAttribute("class" , "panel");

					var div = document.createElement("div");
						div.setAttribute("class" , "tab-content button_content");
						 ;
					var innerButton = document.createElement("button");
						innerButton.setAttribute("class" , "btn btn-link");


						innerButton.setAttribute("onclick" , "mailToAicha()" );

						innerButton.setAttribute("data-toggle" , "collapse");
						innerButton.setAttribute("data-target" , "#f9");
						innerButton.setAttribute("data-parent" , "#accordion");
						var submenuName;

						 submenuName  = document.createTextNode( "Hi There!  I am here to HELP you meet your health and fitness goals.  Ask me anything that is on your mind and I will get back to you!  / Niko hapa kuku saidia na kuku elimisha kuhusu kuwa na afya bora.  Una swali gani?");

						innerButton.appendChild(submenuName);

						div.appendChild(innerButton);
						MainMenu.appendChild(div);

				document.getElementById("menuID").appendChild(MainMenu);
	 }catch(err){console.log(err);}
	  */

	  
	  var MainMenu =	document.createElement("div");
				MainMenu.setAttribute("class" , "tab");
				MainMenu.setAttribute("onclick" , "callLoadProductDetails()");
				var input =	document.createElement("input");
							input.setAttribute("id" , "tab-" + 11 );
							input.setAttribute("type" , "checkbox");
							input.setAttribute("name" , "tabs");

					var label =	document.createElement("label");
						label.setAttribute("for" , "tab-" + 11);
					var menuName  = document.createTextNode("Manage Subscription");

						label.appendChild(menuName);

						MainMenu.appendChild(label);
						document.getElementById("menuID").appendChild(MainMenu);


	// Show profile
	var MainMenu =	document.createElement("div");
				MainMenu.setAttribute("class" , "tab");
				MainMenu.setAttribute("onclick" , "showProfile()");
				var input =	document.createElement("input");
							input.setAttribute("id" , "tab-" + 13 );
							input.setAttribute("type" , "checkbox");
							input.setAttribute("name" , "tabs");

					var label =	document.createElement("label");
						label.setAttribute("for" , "tab-" + 13);
					var menuName  = document.createTextNode("Show Profile");

						label.appendChild(menuName);

						MainMenu.appendChild(label);
						document.getElementById("menuID").appendChild(MainMenu);

	//logout
	var MainMenu =	document.createElement("div");
				MainMenu.setAttribute("class" , "tab");
				MainMenu.setAttribute("onclick" , "logOut()");
				var input =	document.createElement("input");
							input.setAttribute("id" , "tab-" + 12 );
							input.setAttribute("type" , "checkbox");
							input.setAttribute("name" , "tabs");

					var label =	document.createElement("label");
						label.setAttribute("for" , "tab-" + 12);
					var menuName  = document.createTextNode("Logout");

						label.appendChild(menuName);

						MainMenu.appendChild(label);
						document.getElementById("menuID").appendChild(MainMenu);


		

 }


