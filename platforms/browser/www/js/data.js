'use strict';
 
 
 function loadMenuData(){
  
 try{
	var http = new XMLHttpRequest();
	http.open("GET", _MENU_DATA_URL , true );
	//http.setRequestHeader("Authorization", "Basic Zml0bW9zaGE6V2Vya0l0R2lybDA4MTAh");
	//http.setRequestHeader("Content-type", "application/json");
		http.onreadystatechange = function() {
			if(http.readyState == 4 && http.status == 200) {
				//console.log( JSON.parse( http.responseText ).fitness_level );
			  //localStorage.setItem( "USER_INFO" ,  http.responseText  );
			  data =   JSON.parse( Base64.decode(  http.responseText ) );
			  
			  localStorage.setItem("data" , JSON.stringify(data) );
			  try{	len = data[0].details[1].details.length;    }catch(err){ }
			  
			  
			} 

			http.onerror = function(error){
				data = JSON.parse(localStorage.getItem( "data" ) || "[]" );		
				try{	len = data[0].details[1].details.length;    }catch(err){ }
 
				 	 
			}
	}
	http.send();
}catch(err){alert(err);}	
}
 
 
 
 
 

 
 loadMenuData();

