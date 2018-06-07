

jQuery(document).ready(function () {

 jQuery('#free-workouts').css('text-decoration' , 'underline');
 jQuery('nav').css('z-index', "-1");

 jQuery('span').click(function(){
   $('span').css('text-decoration' , 'none');
   $(this).css('text-decoration' , 'underline');
 });

 jQuery('#landingmenu').click(function(){
   //displayMenuPage();
   jQuery('nav').css('z-index', "0");
   jQuery('nav').css('display', "block");
   jQuery('nav').css('opacity', 1);
   jQuery('#menuID').css('margin-top', "0px");
   jQuery('#landingimage').css('z-index', 0 );
 });

 
 $("nav").focusout(function(){
   jQuery('nav').css('display', "none");
   jQuery('#landingimage').css('z-index', -1 );
});

 jQuery('.closemenu').click(function(){
    jQuery('nav').css('display', "none");
	jQuery('#landingimage').css('z-index', -1 );
 });

jQuery("#hamburger , ul").click(function (){

    if(jQuery('nav').css('display') === "none"){
       jQuery('nav').css('display', "block");
       jQuery('nav').css('opacity', 1);
       jQuery('nav').css('z-index', 0 );
       jQuery('#landingimage').css('z-index', 0 );
	   
   }else{
       jQuery('nav').css('display', "none");
        jQuery('nav').css('z-index', -1 );
	   jQuery('#landingimage').css('z-index', -1 );
     }

       jQuery(".contain").animate({"marginLeft": ["75%", 'easeOutExpo']}, {
           duration: 700
       });
});

   //close the menu
   jQuery("#contentLayer").click(function () {

       //enable all scrolling on mobile devices when menu is closed
       jQuery('.contain').unbind('touchmove');

       //set margin for the whole container back to original state with a jquery UI animation
       jQuery(".contain").animate({"marginLeft": ["-1", 'easeOutExpo']}, {
           duration: 700,
           complete: function () {
               jQuery('#content').css('width', 'auto');
               jQuery('#contentLayer').css('display', 'none');
               jQuery('nav').css('opacity', 0);
               jQuery('#content').css('min-height', 'auto');

           }
       });
   });

});
