var FITTNESS_LEVEL = "<div class=\"container\" >"
+"  <p style=\"color: #674ea7;font-size: 20px;text-align: center;\" >What is your Fittness level?</p>"
+"	<div class=\"col-lg-12 col-md-12 col-sm-12\" style=\" top:20px;\" > "
+"  <button class=\"btn btn-sm  fitness_level form-control myButton \" id=\"beginner\" >Beginner</button>"
+"  <button class=\"btn btn-sm  fitness_level form-control myButton\" style=\"padding-left: 33px!important;\" id=\"intermediate\" >Intermediate</button>"
+"		<button class=\"btn btn-sm  fitness_level form-control myButton\" id=\"advanced\"   >Advanced</button>"
+ "	<button class=\"btn btn-sm submit form-control myButton\"  onclick=\"saveFittnessLevel()\"  style=\" margin-top: 31px;\">Save</button> "
+" </div>"		 
+" <br>"
+" </div>";


var isRedirect;
 

var obj = {};	
obj.fitness_level = "beginner";

function callShowFittnessLevels( status ){
	showFittnessLevels();
	isRedirect = status ;
	
	if( typeof isRedirect   === "undefined" )	
		addSkipButton("./menulisting.html");
 }

 function showFittnessLevels(){
			var USER_INFO =  getUserInfo();	
			
				if( typeof  USER_INFO !== "object" ){
					getUserInfoFromServer();
				}	
			document.getElementById("imgContainerEnd").innerHTML = FITTNESS_LEVEL;
			
			if( USER_INFO.hasOwnProperty("fitness_level") ) {
		 	try{

		 		jQuery('#' + USER_INFO.fitness_level ).addClass("login_button");
		 	}catch(err){}
				obj.fitness_level = USER_INFO.fitness_level ;
			}else
				jQuery('#beginner').addClass("login_button");
		 
			 
			 
			jQuery('.fitness_level').click(function(){
				 
			jQuery('.login_button').addClass("fitness_level");
			jQuery('.login_button').removeClass("login_button");
		
			$(this).removeClass("fitness_level");
			$(this).addClass("login_button");
			console.log($(this)[0].id);
			
			obj.fitness_level = $(this)[0].id;
	});
		
 }
 
 
 
 
 
 function saveFittnessLevel(){
	  
	 
	var http = new XMLHttpRequest();
	
	http.open("POST", _REGISTRATION_URL +"/"+   _USER_ID  , true);
	http.onerror =function(e){
		document.getElementById('error').innerHTML = String(e.type) +": "+" Please check your internet";
	}

	http.setRequestHeader("Authorization", "Basic Zml0bW9zaGE6V2Vya0l0R2lybDA4MTAh");
	http.setRequestHeader("Content-type", "application/json");

		http.onreadystatechange = function() {
			if(http.readyState == 4 && http.status == 200) {
			
					setUserInfo( http.responseText );
				
				if( typeof isRedirect   === "undefined" )		
					window.location.href = "./menulisting.html";
				else
					window.plugins.toast.showLongBottom("Successfully saved");
				
			}else{

				if(http.readyState == 4 && http.status == 400  ) {
				document.getElementById('error').innerHTML = "Bad Input";
			}else{
				if(http.readyState == 4 && http.status == 500) {
					document.getElementById('error').innerHTML = "Server error";
			}else{
				if(http.readyState == 4 && http.status == 201  ) {
				window.location.href = "./fitness_level.html";
			}
		  }
		}
	  }
	//document.getElementById('error').innerHTML = http.data.message ;
	}
	http.send(JSON.stringify(obj));
 }
 
 
 
 function getUserInfoFromServer(){
 
	if( _USER_ID === "" || _USER_ID === "null" || _USER_ID === undefined ){
	  window.location.href = "./sigin.html";
	  localStorage.setItem("isLogin" , 0 );
	
}else{
 
		try{
			var http = new XMLHttpRequest();
			http.open("POST", _REGISTRATION_URL +"/"+  _USER_ID , true );
			http.setRequestHeader("Authorization", "Basic Zml0bW9zaGE6V2Vya0l0R2lybDA4MTAh");
			http.setRequestHeader("Content-type", "application/json");
				http.onreadystatechange = function() {
					if(http.readyState == 4 && http.status == 200) {
						 
						setUserId(String( JSON.parse( http.responseText ).id ) );
						setUserInfo( http.responseText );
						 
						checkSubscriptionExpiryDate();
						 
					} 

					
					http.onerror = function(error)
					{
						checkSubscriptionExpiryDate();
					}
			}
			http.send();
		}catch(err){ }	
	}
}
 
	
getUserInfoFromServer();



	