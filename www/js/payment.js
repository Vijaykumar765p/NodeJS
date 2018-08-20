'use strict';
//---------------------------------------------------------------------
function loadProductDetails()
{
	if( deviceIsOnline() )
	{
		showHederMenuOption();
		/* var showproducts = true;
		if( subscription.daysremain > 5   )
		{
			showproducts = false;
			SubscriptionMsg( _NON_EXPIRING_SUBSCRIPTION );
		}
		if( showproducts ){ 
		
		//for testing purpose
		var button = "<button type=\"button\" onclick=\"restore()\" class=\"btn\">restore</button>";
			document.getElementById("imgContainerEnd").innerHTML = button; 
			 
			
		var container = document.createElement("button");
			container.setAttribute("class" , "btn");
			container.setAttribute("onclick" , "loadAutoRenewalSubscriptionHistory()");	
		var text = document.createTextNode("History");
			container.appendChild(text);
		document.getElementById("imgContainerEnd").appendChild(container);	
		//end of the testing purpose code*/	
		 
			
			
		
		if( _product.list.length > 0 	)
		{
			try
			{
			inAppPurchase.getProducts(  _product.list ).then(function (products) 
			{ 
				// alert('response: ' +  JSON.stringify(products));
				//console.log('If Isset products: ' +  products);
			   _product.details = products;  
			   
			var SED = _USER_INFO.fittastic_subscription_expiry_date || "" ; 
			if(  SED === "" )
				SubscriptionMsg( _UNSUBSCRIBED_USERS );
			else if( subscription.daysremain <= 0 )	
				SubscriptionMsg( _EXPIRED_SUBSCRIPTION );
			else if( subscription.daysremain > 0  && subscription.daysremain < 6 )	
				SubscriptionMsg( _EXPIRING_SUBSCRIPTION );
			else if( subscription.daysremain >= 6 )
				SubscriptionMsg( _NON_EXPIRING_SUBSCRIPTION ) ;  
					
		 
			
			var newnumarr=[];
			for(var i=0;i< _product.details.length;i++)
			{
				var splitstr= _product.details[i].title.split(" ");
				newnumarr.push(splitstr[0]); 
			}

			var newarrnumber=newnumarr.sort(function(a, b){return a - b});
			var formattedarr=[];
			for(var j=0;j<newarrnumber.length;j++)
			{
				for(var k=0;k< _product.details.length;k++)
				{
					var splitstr= _product.details[k].title.split(" ");
					if(splitstr[0]== newarrnumber[j])
					{
						formattedarr.push( _product.details[k]);
					}
				}
			}
			_product.details = formattedarr;
			var DiscountTitle = [ "Join / Extend Today" , "Save 20%" , "Best Value Save 33%" ];
			for( var i = _product.details.length - 1 ;   i >= 0 ;  i-- )
			{
				/* op+= "<h3>"+ _product.details[0].productId +"</h3>";*/	 
				var container = document.createElement("div");
				container.setAttribute("class" , "container");
				container.setAttribute("style" , "text-align: center;");
					 
				var row = document.createElement("div");
				row.setAttribute("class" , "row"); 
				row.setAttribute("style" , " text-align: center;"); 
				container.appendChild(row);
					
				var colDiv = document.createElement("div");
				row.appendChild(colDiv);
				colDiv.setAttribute("class" , "col-lg-12 col-sm-12 col-xs-12 col-md-12");
					
				var h4 = document.createElement("h4");	
				h4.setAttribute("style" , "color:#674ea7; ");
				var title = document.createTextNode(  _product.details[i].title );	
				h4.appendChild(title);
				colDiv.appendChild(h4);
				
				var  row2col2Div = document.createElement("div");
				row.appendChild(row2col2Div);
				row2col2Div.setAttribute("class" , "col-lg-12 col-sm-12 col-xs-12 col-md-12");	
		
				var span = document.createElement("span");	
				span.setAttribute("style" , "color:#8c468c; font-size: large;");
				row2col2Div.appendChild(span);
					
				var big = document.createElement("big");    
				big.setAttribute("style" , "margin-right: 3px;font-weight: 900;font-size:19px; ");
				var txtPrice = document.createTextNode(  _product.details[i].price );
				 
				big.appendChild(txtPrice);
				span.appendChild(big);
					
				var small = document.createElement("small");
				small.setAttribute("style" , " text-align: center !impoartant;"); 
				var txtCurrency = document.createTextNode(  _product.details[i].currency  );	
				small.appendChild(txtCurrency);
				span.appendChild(small);	
					
					
				var row4Div = document.createElement("div");
				row4Div.setAttribute("class" , "row"); 	
				container.appendChild(row4Div);			
				
				
				var discount_msg = getDiscountMessage( _product.details[i].productId );
				if( discount_msg !== "" ){
				var  row4col1Div = document.createElement("div");
				row4Div.appendChild(row4col1Div);
				row4col1Div.setAttribute("class" , "col-lg-12 col-sm-12 col-xs-12 col-md-12 ");		
				row4col1Div.setAttribute("style" , "text-algin:center;");					
				var discount = document.createElement("h6");
				discount.setAttribute("style" , "color:#8c468c;"); 
				var txtdiscount= document.createTextNode( "( " + discount_msg + " )" );						
				discount.appendChild(txtdiscount);
				row4col1Div.appendChild(discount);	
				}
				
					
				var row3Div = document.createElement("div");
				row3Div.setAttribute("class" , "row"); 	
				container.appendChild(row3Div);
					
				var row3col1Div = document.createElement("div");
				row3Div.appendChild(row3col1Div);
				row3col1Div.setAttribute("class" , "col-lg-12 col-sm-12 col-xs-12 col-md-12");	
			
					
				var btndiv = 	document.createElement("div");
				btndiv.setAttribute("style" , " text-align: center;");
				var txtButton = document.createTextNode( "Subscribe now" );	
				var button = document.createElement("button");
				button.setAttribute("onclick" ,  "selectPurchaseMethod('" +  _product.details[i].productId  +"' , '" +  _product.details[i].title  +"' )");
				btndiv.appendChild(button);
				row3col1Div.appendChild(btndiv);
				button.appendChild(txtButton);
				button.setAttribute("type" , "button");
				button.setAttribute("class" , "btn button_color join_now");
				row3col1Div.appendChild(btndiv);
					 
				var hr = document.createElement("hr");
				container.appendChild(hr);
				document.getElementById("imgContainerEnd").appendChild(container);
			}
			//Put Aicha's message here
			var container = document.createElement("div");
			container.setAttribute("class" , "container");
			container.setAttribute("style" , "text-align: center;");
				 
			var row = document.createElement("div");
			row.setAttribute("class" , "row"); 
			row.setAttribute("style" , " text-align: center;"); 
			container.appendChild(row);
				
			var colDiv = document.createElement("div");
			row.appendChild(colDiv);
			colDiv.setAttribute("class" , "col-lg-12 col-sm-12 col-xs-12 col-md-12");
				
			var h4 = document.createElement("h5");	
			h4.setAttribute("style" , "color:#674ea7; ");
			var title = document.createTextNode( "Our goal is to make fitness and nutrition easier.  That's why we have one afforable month to month plan for everyone." );	
			h4.appendChild(title);
			colDiv.appendChild(h4);
			

			

			var  row2col2Div = document.createElement("div");
			row.appendChild(row2col2Div);
			row2col2Div.setAttribute("class" , "col-lg-12 col-sm-12 col-xs-12 col-md-12");	
	
			var span = document.createElement("span");	
			span.setAttribute("style" , "color:#8c468c; font-size: large;");
			row2col2Div.appendChild(span);					
				
			var row4Div = document.createElement("div");
			row4Div.setAttribute("class" , "row"); 	
			container.appendChild(row4Div);		


			
			var hr = document.createElement("hr");
			container.appendChild(hr);
			document.getElementById("imgContainerEnd").appendChild(container);

			var blog = document.createElement("h5");	
			blog.setAttribute("style" , "color:#674ea7; font-weight: bold; border:1px solid #674ea7; padding:10px; margin-top:50px; ");

			var subscription_message="";
			if( cordova.platformId.toLowerCase() == "android" )
			{
				subscription_message= getNameFromProperties("androidsubscriptionmessage").name;		
			}
			else
			{
				subscription_message= getNameFromProperties("iossubscriptionmessage").name;
			}

			var blog_content = document.createTextNode( subscription_message );	
			blog.appendChild(blog_content);
			container.appendChild(blog);

			})
		  .catch(function(err) {
		  
		  //  alert( "fittastic0001: " +  JSON.stringify( err ));
		   
		  }); 
	 
			}
			catch(err)
			{
				//alert( "fittastic0000: " +  JSON.stringify( err ));
			}
		}
		else		
		{
			document.getElementById("imgContainerEnd").innerHTML = "<p style=\"color:#674ea7;text-align: center;\">No subscription plans are available</p>";
		}
	
	}
	else
	{
  		 noInternetMsgAndGoHomePage();
	}
}
 
 
//-------------------------------------------------------------------------------
 
 
 
function goToSubcription()
{
	if( deviceIsOnline() )
		notifySubscription();	
	else
		noInternetMsgAndGoHomePage();
}
	
	
//-------------------------------------------------------------------------------- 
		
			
function selectPurchaseMethod( productID , productType )
{
		 
		if( cordova.platformId.toLowerCase() == "android" )
		{
		  if( productIsAutoRenewalType(productID) == 0 )
			  {
					buyProduct( productID , productType );
			  }		
				else
			  {
					subscribeProduct( productID , productType );
			  }	
		}	
		else
		{
			subscribeProduct( productID , productType );
			
		}	
}	



//-------------------------------------------------------------------------------



function buyProduct( productID , productType )
{		 
	try {
	    inAppPurchase
	   .buy( productID )
	   .then(function (data){
			
			callSetSubscriptionExpiryDatetoServer( data , productType , productID );
	    	
			inAppPurchase.consume( data.productType, data.receipt, data.signature )
			.then(function (){
				
			}).catch(function (err){
			   // alert( JSON.stringify(err) );
			});
	
		}).catch(function (err){
			//alert( JSON.stringify(err) );
		});
	}
	catch(err)
	{
	//alert( "fittastic0003: " +   JSON.stringify( err ));
	}
}




//-------------------------------------------------------------------------------



function subscribeProduct( productID , productType )
{		 
try {		
	  inAppPurchase
	  .subscribe(productID)
	  .then(function (data) {
	   callSetSubscriptionExpiryDatetoServer( data , productType , productID );
	  })
	  .catch(function (err){
	   // alert(err);
	  });

   }catch(err)
   {
   //alert(err);
   }
}



//-------------------------------------------------------------------------------



function SubscriptionMsg( msg )
{
	var rowDiv = document.createElement("h5");
	rowDiv.setAttribute("class" , "row container  "); 
	rowDiv.setAttribute("style" , " text-align: center;color: #674ea7;"); 
	var msg	= document.createTextNode( msg  );	
	rowDiv.appendChild(msg);
	document.getElementById("imgContainerEnd").appendChild(rowDiv);
}


//-------------------------------------------------------------------------------


// this method is called by fittness-level.js after loadin user info
var Month = ["January" , "February" , "March", "April",  "May" , "June" , "July" , "August" , "September" , "October" , "November" , "December"   ];
function makeSubscribeMsgByAddingExpDate()
{
	var duedate = "";
	if( _USER_INFO.id !== undefined )
	{
		var expdate = new Date( _USER_INFO.fittastic_subscription_expiry_date);
		if( expdate.toString() !== "Invalid Date")
			duedate =  Month[ expdate.getMonth()  ] +" "+ expdate.getDate() +", "+  expdate.getFullYear();
			
			_NON_EXPIRING_SUBSCRIPTION = "Your subscription expires on "+ duedate +". You may extend your subscription at any time.";
			_EXPIRED_SUBSCRIPTION = "Your subscription expired on "+ duedate +". To access premium content and features, please renew your subscription.";
			_EXPIRING_SUBSCRIPTION = "Your subscription expires on "+ duedate + ". Extend your subscription to maintain access to premium content and features.";
	}
} 


//-------------------------------------------------------------------------------



function callLoadProductDetails()
{
	getProductValidityDuration( 'productid' );
	//var  expdate = getSubscriptionExpiryDate( productID );
	if( deviceIsOnline() )
	{
		$('span').css('text-decoration' , 'none');
		displayMenuPage()
		clearAllPages();	
		makeSubscribeMsgByAddingExpDate();
		loadProductDetails();
	}
	else
	{
		window.plugins.toast.showLongCenter("No internet connection.  Device must be online to manage subscription.");
		displayLandingPage();
	}	

}
 

//------------------------------------------------------------------------------- 
 
 
function compare(a,b) {
console.log( a.title);
  if (a.title < b.title)
    return -1;
  if (a.title > b.title)
    return 1;
  return 0;
}
 
 
//-------------------------------------------------------------------------------



 
function noInternetMsgAndGoHomePage()
{	
	navigator.notification.confirm(
	"Device must be online to manage subscription" , function(option)
	{
		if(option == 1)
		{
			displayLandingPage();
		}
	}, _CMP_NAME , ['OK' ] );
}
 
 
//-------------------------------------------------------------------------------


 
function loadInAppPurchaseIds()
{
	/*var prductsList = getNameFromProperties("inapppurchase").ids || [];
	
		for( var i = 0 ; i < prductsList.length ; i++ )
		  _product.list.push( prductsList[i].productid ); */
	
	_product.list = [];
			
	var prductsdetails = getNameFromProperties("inapppurchase") || [];	  
	var platform_specific_product_details = [];	  
		 
	if( cordova.platformId.toLowerCase() === "android" )  
			platform_specific_product_details = prductsdetails.android.iap;
		else		
			platform_specific_product_details = prductsdetails.ios.iap;
				
	for( var i = 0 ; i < platform_specific_product_details.length ; i++ )
		  _product.list.push( platform_specific_product_details[i].productid ); 		
				
}


 //-------------------------------------------------------------------------------


function callSetSubscriptionExpiryDatetoServer( data , productType ,productID )
{
	try
	{
		document.getElementById("imgContainerEnd").style.opacity = "0.5"; 
	}
	catch(err)
	{ 
		//alert(err); 
	}
	
	var div = document.createElement("div");
		div.setAttribute("class" , "transparentbg" );
		
	try
	{ 
		document.getElementById("imgContainerEnd").appendChild(div); 
	}
	catch(err)
	{ 
		//alert(err); 
	}
	
	
	var  expdate = getSubscriptionExpiryDate( productID );
		 setSubscriptionExpiryDatetoServer( expdate ,  data.transactionId , productType ); 
		 
}


/*

function restore(){

   inAppPurchase
  .restorePurchases()
  .then(function (data) {
    alert("restore: ---  "+ JSON.stringify( data ) );
	
	for( var i = 0 ; i < data.length ; i ++ ){
	alert(JSON.stringify(data[i]));
	inAppPurchase.consume( data[i].productType, data[i].receipt, data[i].signature )
		.then(function (){
		alert('product was successfully consumed!');
		}).catch(function (err) {
		alert('product was error consumed!');
		alert( JSON.stringify(err) );
		});
    }
  })
  .catch(function (err) {
    alert("restorErr: ---  "+ JSON.stringify(err) );
  });

}
*/


function loadAutoRenewalSubscriptionHistory()
{

   inAppPurchase
  .restorePurchases()
  .then(function (data) 
  {

	for( var i = 0 ; i < data.length ; i ++ )
	{	
		var prd_details=getProductDetailsFromProperties(data[i].productId);
		
		if(prd_details.length>0 && prd_details.type==1)
		{
			storeAutoRenewalSubscriptionExpiryDate(data[i]);
		}
		
	}
     
  })
  .catch(function (err) 
  {
    //alert("historyErr: ---  "+ JSON.stringify(err) );
  });

}




function getDiscountMessage(productId)
{

	var prductsdetails = getNameFromProperties("inapppurchase") || [];	
	var product_details = [];
	
	if( cordova.platformId.toLowerCase() === "android" )
		 product_details = prductsdetails.android.iap;
	else
		 product_details = prductsdetails.ios.iap;
				
	for( var i = 0 ; i < product_details.length ; i++ )
	{
		  if( product_details[i].productid == productId )
			return	product_details[i].discountmsg; 
	}
	
	 
			  
	
	return "";  // default  "" empty string  
}




function productIsAutoRenewalType( productid )
{
	// 1  means auto renewal type
	// 0 means non auto renewal type
	// this is only needed for android
	
	var prductsdetails = getNameFromProperties("inapppurchase") || [];	  
	var product_details = prductsdetails.android.iap;
				
	for( var i = 0 ; i < product_details.length ; i++ )
	{
		  if( product_details[i].productid == productid )
			return	product_details[i].type; 
	}
	
	return 0; // default non auto renewal 
}



function getProductDetailsFromProperties(productid)
{
	var prductsdetails = getNameFromProperties("inapppurchase") || [];	
	var product_details = [];
	
	if( cordova.platformId.toLowerCase() === "android" )
		 product_details = prductsdetails.android.iap;
	else
		 product_details = prductsdetails.ios.iap;
			

	for( var i = 0 ; i < product_details.length ; i++ )
	{
		  if( product_details[i].productid == productid )
		  {
		  		return	product_details[i]; 
		  }
			
	}

	return product_details;
}


function getProductValidityDuration( productid )
{
	// need for both android and ios
	
	var prductsdetails = getNameFromProperties("inapppurchase") || [];	
	var product_details = [];
	
	if( cordova.platformId.toLowerCase() === "android" )
		 product_details = prductsdetails.android.iap;
	else
		 product_details = prductsdetails.ios.iap;
			
	for( var i = 0 ; i < product_details.length ; i++ )
	{
		  if( product_details[i].productid == productid )
			return	product_details[i].duration; 
	}
	
	return {"year":0,"month":0,"day":0}; // default no duration  


}


function createAutoRenewalSubscriptionExpiryDate( purchase_details )
{
	//only for auto renewal product
	
	var calculated_expiry_date = "";
	
	var purchase_date="";
	//if( purchase_details.receipt.autoRenewing == true )
	if( cordova.platformId.toLowerCase() === "android" )
	{
		purchase_date = new Date(purchase_details.receipt.PurchaseTime);
	}
	else if( cordova.platformId.toLowerCase() === "ios" )
	{
		purchase_date =	new Date(purchase_details.date);		
	}

		
	var validity_duratin_object = getProductValidityDuration(purchase_details.productId);
		
	purchase_date.setDate(purchase_date.getDate() + validity_duratin_object.day);
	purchase_date.setMonth(purchase_date.getMonth() + validity_duratin_object.month);
	purchase_date.setFullYear(purchase_date.getFullYear() + validity_duratin_object.year);
		
			calculated_expiry_date = purchase_date;
			
		return	calculated_expiry_date.toString();	
	
}



function storeAutoRenewalSubscriptionExpiryDate( purchase_details )
{
		
	var calculated_expiry_date = createAutoRenewalSubscriptionExpiryDate( purchase_details );
	var locally_stored_expiry_date = getLocalStorageExpiryDate();
	
	var result = compare2Dates(calculated_expiry_date , locally_stored_expiry_date);

	
	if( result >= 0 )
	{
		// adding extended expiry date to remaining  expiry date
		
		var  final_expiry_date = getSubscriptionExpiryDate(purchase_details.productId); 
			
		// 3rd parameter product title. 	
		 setSubscriptionExpiryDatetoServer(final_expiry_date ,  purchase_details.transactionld , "Auto_Renewal_Product"); 
		// alert("done");
	}	 
}


function getLocalStorageExpiryDate()
{
	return	getUserInfo().fittastic_subscription_expiry_date ;

}
 
 
function compare2Dates(datestring1 , datestring2)
{
	var a = new Date(datestring1);
	var b = new Date(datestring2);

	 var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
	 var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

	 return ( utc1 - utc2 );

} 