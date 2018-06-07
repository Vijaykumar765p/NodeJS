$(document).ready(function () 
{
  var trigger = $('.hamburger'),
      overlay = $('.overlay'),
     isClosed = false;

    trigger.click(function () {
      hamburger_cross();      
    });

    function hamburger_cross() {

      if (isClosed == true) {          
        overlay.hide();
        trigger.removeClass('is-open');
        trigger.addClass('is-closed');
        isClosed = false;
      } else {   
        overlay.show();
        trigger.removeClass('is-closed');
        trigger.addClass('is-open');
        isClosed = true;
      }
  }
  
  $('[data-toggle="offcanvas"]').click(function () {
        $('#wrapper').toggleClass('toggled');
  });  
});


var _SERVER_HIT_COUNT = 0 ;
function finalizeMenu()
{
	stopMenuThread();
	hideLeftMenuOption();
	loadInAppPurchaseIds();
	createSocialShareMsg();
	loadAutoRenewalSubscriptionHistory();
	try {	document.getElementById("loader").style.display = "none"; }catch(err){}
	//document.body.style.backgroundImage= "";
	//	document.getElementById("menuID").classList.remove("loaderBG"); for adding bg class="loaderBG" 
	//displayLandingPage();			
}


function  generateMenu()
{
	if(  !deviceIsOnline()  )
	{	
		makeMenu();
		finalizeMenu();
		window.plugins.toast.showLongCenter("No internet connection.  Restricted to offline content and features.");
	}
	else
	{	
		if( _SERVER_HIT_COUNT < 4  )
		{
			if( !isFullMenu() )
			{
				if( data.length > 0  && VIDEO_CONFIG.length > 0 )
				{
					makeMenu();
					finalizeMenu();
				}
				else
				{
					if( data.length <= 0 )
						loadMenuData();	
					if( VIDEO_CONFIG.length <= 0 )
						loadPropertiesData();
					_SERVER_HIT_COUNT ++ ;
				}
			}
			else
			{
				makeMenu();
				finalizeMenu();
			}
		} 
		else
		{
			if( !isFullMenu() )
				window.plugins.toast.showLongCenter("Initialization Error.  Please log out and log back in.");
				makeMenu();
				finalizeMenu();
		}
	 }
}



function stopMenuThread(){
 clearInterval( menuThread );
}

var menuThread = setInterval( generateMenu  , 2000 );





