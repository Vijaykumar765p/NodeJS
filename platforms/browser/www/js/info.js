'use strict';

var gender = "";
var cal = null;
var isRedirect = false ; 

function init(){

	 _USER_INFO 	= getUserInfo(); 
	
	 document.getElementById("firstname").value  =  _USER_INFO.fittastic_user_first_name || "";
	 document.getElementById("lastname").value  =  _USER_INFO.fittastic_user_last_name || "" ;
	 
	if( _USER_INFO.fittastic_user_gender === "male" ){
			setMale();
			gender = "male";
		}
	if( _USER_INFO.fittastic_user_gender === "female" ){
			setFemale();
			gender = "female";
		}
		
	if( _USER_INFO.fittastic_weight !== "" && _USER_INFO.fittastic_weight !== "0" )
		document.getElementById("weight").value  =  _USER_INFO.fittastic_weight +" "+ _USER_INFO.fittastic_measurement_system_weight;
		
	var height_secondpart = "";
	if( _USER_INFO.fittastic_height_2 !== "" && _USER_INFO.fittastic_height_2 !== "0" )
			height_secondpart  = _USER_INFO.fittastic_height_2 + " in";
			else
			height_secondpart = "";
		 
	if( _USER_INFO.fittastic_height_1 !== "" && _USER_INFO.fittastic_height_1 !== "0"  && height_secondpart !== "" ) 
		document.getElementById("height").value  = _USER_INFO.fittastic_height_1+" "+ _USER_INFO.fittastic_measurement_system_height  +" "+ height_secondpart ; 
		 
	
	cal = new WinkelCalendar({
		container: 'ageTag',
		bigBanner: true,
		//defaultDate: '2016-1-12',
		format : "DD-MM-YYYY",
		onSelect : onDateChange

	});

	addSkipButton("./fitness_level.html");
	
	//console.log(cal.selectedDate);
	//console.log($(".wc-date-container").html());
	//console.log(document.getElementsByClassName("wc-date-container")[0].firstChild.innerHTML);
	document.getElementsByClassName("wc-date-container")[0].firstChild.innerHTML  = _USER_INFO.fittastic_user_age;
	if( _USER_INFO.fittastic_user_age === "" ) 
		document.getElementById("age").innerHTML =  "DOB";
	else	
		document.getElementById("age").innerHTML =  "Age";


}




function onDateChange(date){

	document.getElementById("age").innerHTML =  "Age";
	var _MS_PER_DAY = 1000 * 60 * 60 * 24;
	var a    = new Date();
	/* var b    = new Date("2017-07-25"); */

	var remainingDays    = Math.abs(dateDiffInDays(a, date));
	document.getElementsByClassName("wc-date-container")[0].firstChild.innerHTML = Math.floor(remainingDays/365.2425);

	function dateDiffInDays(a, b) {

	  var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
	  var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

	  return Math.floor((utc1 - utc2) / _MS_PER_DAY);
	}

}



$(document).ready(function(){
		 		
	$("#male").click(function(){
		setMale();
	});

	$("#female").click(function(){
		setFemale();
	});

	   $("#weight").click(function(){
		$('#weightModal').modal('toggle');
		 	lbsMeasurement();
	 });

	 $("#height").click(function(){
		 $("#heightModal").modal("toggle");
			ftHeight();
	 });
});



function setFemale(){
	$("#female").css({"background-color":"#8e7cc3"});
		$("#female").css({"color":"#fff"});
		$("#male").css({"background-color":"#fff"});
		$("#male").css({"color":"#8e7cc3"});
		gender =  $("#femaleId").val();
}

function setMale(){
		$("#male").css({"background-color":"#8e7cc3"});
		$("#male").css({"color":"#fff"});
		$("#female").css({"background-color":"#fff"});
		$("#female").css({"color":"#8e7cc3"});
		gender =  $("#maleId").val();
}




function saveAboutInfo(){

	var ccode = document.getElementById('ccode').value.trim();
	var mobile = document.getElementById('mobile').value.trim();

if ( ValidateMobile(ccode,mobile) )
	{
		console.log(ccode+"----------------"+mobile);
	// var age = document.getElementsByClassName("wc-date-container")[0].firstChild.innerHTML;
	// console.log(gender + $("#firstname").val() + $("#lastname").val() + age + $("#weight").val()  + $("#height").val());
	var age=0;
    try{ age = parseInt(age); } catch(err){ age = 0 ;} 

	var obj = new Object();
		obj.fittastic_user_age = age;
		obj.fittastic_user_gender = gender;
		obj.fittastic_user_first_name = $("#firstname").val() || "";
		obj.fittastic_user_last_name = $("#lastname").val() || "";
		obj.fittastic_phone_number= ccode + mobile;
		
		if( weight == 0 )
			obj.fittastic_weight = _USER_INFO.fittastic_weight ;  
		else
			obj.fittastic_weight = weight + "";
		
		if( measurement_system_weight === "" )
			obj.fittastic_measurement_system_weight = _USER_INFO.fittastic_measurement_system_weight || "";	
		else		
			obj.fittastic_measurement_system_weight = measurement_system_weight + "";

		if( height_1 == 0 )	
		obj.fittastic_height_1 = _USER_INFO.fittastic_height_2 ; 
		else
		obj.fittastic_height_1 = height_1 +"";
		
		if( height_2 == 0 )	
		obj.fittastic_height_2 = _USER_INFO.fittastic_height_2 ; 
		else
		obj.fittastic_height_2	=	height_2 +"";
		
		if( measurement_system_height === "" )
		obj.fittastic_measurement_system_height = _USER_INFO.fittastic_measurement_system_height; 
		else
		obj.fittastic_measurement_system_height = measurement_system_height +"";
		
	
	var http = new XMLHttpRequest();
	http.open("POST", _REGISTRATION_URL +"/"+ _USER_ID , true);
	http.onerror =function(e){
		document.getElementById('error').innerHTML = String(e.type) +": "+" Please check your internet";
	}

	http.setRequestHeader("Authorization", "Basic Zml0bW9zaGE6V2Vya0l0R2lybDA4MTAh");
	http.setRequestHeader("Content-type", "application/json");

	http.onreadystatechange = function() {
		console.log(http);
		console.log("----------------------------------");
		if(http.readyState == 4 && http.status == 200) {
			localStorage.setItem("USER_INFO" , this.responseText );
				
			window.plugins.toast.showLongBottom("Successfully saved");
			
		}else{

			if(http.readyState == 4 && http.status == 400  ) {
			document.getElementById('error').innerHTML = "Bad Input";
		}else{
			if(http.readyState == 4 && http.status == 500) {
				document.getElementById('error').innerHTML = "Server error";
		}else{
			if(http.readyState == 4 && http.status == 201  ) {
			//window.location.href = "./fitness_level.html";
		}
	}
}
}
//document.getElementById('error').innerHTML = http.data.message ;

}

	http.send(JSON.stringify(obj));
}
else{
	document.getElementById('infoerror').innerHTML = "Please enter valid mobile number";
}
}

var i = 1 ;
function increment(){
	return ++parseInt($("#curNumber").val());
}

function decrement(){

	return --parseInt($("#curNumber").val());
}
localStorage.setItem("curNumber" , i);


function createWeightNumber(){
	var res = "";
	for(var i = 35 ; i <= 181 ; i++ )
		res+="<li value=\""+ i +"\" id=\""+i+"\" onclick=\"getWeight(" + i +","+ "'kg'" + ")\" >"+i+"</li>";
	$("#ul").html(res);

	$("#kg").css({"background-color":"#8e7cc3"});
	$("#kg").css({"color":"#fff"});
	$("#lbs").css({"background-color":"white"});
	$("#lbs").css({"color":"#8e7cc3"});
}

var measurement_system_weight = "";
var weight = 0 ;
function getWeight(getWeight , unit){
	//$("#"+weight).css({"background-color":"#8e7cc3", "color":"white"});
	document.getElementById("weight").value = getWeight +" " +unit ;
	measurement_system_weight = unit ;
	weight  = getWeight
	try{
	console.log(getWeight +" "+unit);
	}catch(err){alert(err);}
}

function lbsMeasurement(){
	weight = 0 ;
	var res = "";
	for(var i = 77 ; i <= 399 ; i++ )
		res+="<li value=\""+  i   +"\" id=\""+ i  +"\" onclick=\"getWeight( " + i +","+ "'lbs'" + ")\" >"+ i  +"</li>";

	$("#ul").html(res);
	$("#kg").css({"background-color":"white"});
	$("#kg").css({"color":"#8e7cc3"});
	$("#lbs").css({"background-color":"#8e7cc3"});
	$("#lbs").css({"color":"#fff"});
}

function kgMeasurement(){
	createWeightNumber();
	weight = 0 ;
 }

 function saveWeight(){
	// $('#weight').modal('toggle');
	heightArray = [];
 }

 function ftHeight(){

	height_1 = 0;
	height_2 = 0;
	measurement_system_height = "";

	var res = "";
	for(var i = 3 ; i <= 7 ; i++ )
		res+="<li value=\""+  i   +"\" id=\""+ i+"ft"  +"\" onclick=\"getHeight( " + i +","+ "'ft'" + ")\" >"+ i  +"</li>";

	$("#cmUL").html(res);

	res = "";
	for(var i = 0 ; i <= 11 ; i++ )
		res+="<li value=\""+  i   +"\" id=\""+ i+"in"  +"\" onclick=\"getHeight( " + i +","+ "'in'" + ")\" >"+ i  +"</li>";
	 $("#ftUL").show();
	$("#ftUL").html(res);
	 $('#cm').css({'background-color':'white'});
	 $("#cm").css({"color":"#8e7cc3"});
	$("#ft").css({"background-color":"#8e7cc3"});
	$("#ft").css({"color":"#fff"});

 }

 function cmHeight(){
	 height_1 = 0;
	 height_2 = 0;
	 measurement_system_height = "";

	 var res = "";
	for(var i = 91 ; i <= 241 ; i++ )
		res+="<li value=\""+  i  +"\" id=\""+ i+"cm"  +"\" onclick=\"getHeight( " + i +","+ "'cm'" + ")\" >"+ i  +"</li>";
	 $("#ftUL").hide();
	$("#cmUL").html(res);
	$("#ft").css({"background-color":"white"});
	 $("#ft").css({"color":"#8e7cc3"});
	$("#cm").css({"background-color":"#8e7cc3"});
	$("#cm").css({"color":"#fff"});
 }

var heightArray = [];
var height_2 = 0 ;
var height_1  = 0 ;
var measurement_system_height = "" ;

 function getHeight(number , unit){

	 console.log(number + unit);

	 if(  "in"  === unit ){
		 	heightArray[1] = number + " "+unit ;
			height_2 = number ;
	} else{ if( "ft" ===  unit ){

		 heightArray[0] = number + " "+unit ;
		 height_1 = number;
		 measurement_system_height = unit;

	 }else{ if( "cm" ===  unit ){
		  heightArray[0] = number + " "+unit ;
			height_1 = number;
 		 measurement_system_height = "ft";
		}
	}
}


	   var ftORcm = heightArray[0] || "" ;
	   var In = heightArray[1] || "" ;

	 document.getElementById("height").value = ftORcm +" "+In  ;

 if(unit === 'cm' || unit === 'ft'){
		 $('#cmUL li').css({'background-color':'#fff'});
		 $('#cmUL li').css({"color":"#8e7cc3"});
 		 $('#'+number+unit).css({'background-color':'#8e7cc3'});
		 $('#'+number+unit).css({'color':'#fff'});
 }else{

		 $('#ftUL li').css({'background-color':'#fff'});
		 $('#ftUL li').css({"color":"#8e7cc3"});
 		 $('#'+number+unit).css({'background-color':'#8e7cc3'});
		 $('#'+number+unit).css({'color':'#fff'});

	 }
 }
 
 
function getUserINFO(){
 
 if( _USER_ID === "")
	   window.location.href = "./sigin.html";
		 
	
else{
  
		
	var http = new XMLHttpRequest();
	http.open("POST", _REGISTRATION_URL +"/"+ _USER_ID , true);
	http.onerror =function(e){
		document.getElementById('error').innerHTML = String(e.type) +": "+" Please check your internet";
	}

	http.setRequestHeader("Authorization", "Basic Zml0bW9zaGE6V2Vya0l0R2lybDA4MTAh");
	http.setRequestHeader("Content-type", "application/json");

	http.onreadystatechange = function() {
		if(http.readyState == 4 && http.status == 200) {
			//console.log( JSON.parse( http.responseText ) ); 
			//userInfo =  JSON.parse( http.responseText ); 
			
				setUserInfo( http.responseText );
			 
			
			//init();
			
		}/* else{

			if(http.readyState == 4 && http.status == 400  ) {
			document.getElementById('error').innerHTML = "Bad Input";
		}else{
			if(http.readyState == 4 && http.status == 500) {
				document.getElementById('error').innerHTML = "Server error";
		}else{
			if(http.readyState == 4 && http.status == 201  ) {
			//window.location.href = "./fitness_level.html";
		}
	}
  }
} */
 

}

	http.send(JSON.stringify());

}

}


getUserINFO();
    
    
   
   
   
function ValidateMobile( ccode,mobile )   
{  
 if ((ccode.length + mobile.length)>0 && (ccode.length + mobile.length)>=11)  
  {  
    return true ; 
  }  
    
    return false; 
}  
   




