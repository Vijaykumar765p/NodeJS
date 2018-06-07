var header =  "<nav class =\"navbar  \" style=\"border: none;\"  id=\"headId\"  style=\"width:100%;\"  role = \"navigation\"> " +
          		  "<div class = \"navbar-header header\">" +
          					"<h2 class=\"fa fa-chevron-left navbar-toggle menu_border \" style=\"font-size:203%;color:#fff;float:left;border: none;margin: 12px 0px 0px 0px;\" onclick=\"goBackPage()\"></h2>"+
          		 "</div>" +
            "</nav>";
try{  document.getElementById('header').innerHTML = header; }catch(err){}





function goBackPage(){
	  window.history.back();
}

function goFittnessLevelPage(){
	 window.location.href = "./fitness_level.html";	
}

function addSkipButton( redirect_page_name  ){
	var colDiv = document.createElement("div");
			colDiv.setAttribute("class" , "navbar-header header");
			
		var h2 = document.createElement("h2");
			colDiv.appendChild(h2);
			h2.setAttribute("class" , "fa fa-chevron-right navbar-toggle menu_border");	
			h2.setAttribute("style" , "font-size: 203%;color: #fff;margin: -39px 0px 0px 89%; ");	
			h2.onclick = function(){
				window.location.href = redirect_page_name ; 
			}
 
	document.getElementById("headId").appendChild(colDiv);


}