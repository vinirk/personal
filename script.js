
    
function GetURLParameter(sParam){
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++){
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam){
            return sParameterName[1];
        }
    }
}

function callbackFunction(xmlhttp) 
{
    if (xmlhttp.response) {
        localStorage.setItem("ad_cart", JSON.stringify({
            "data":{
                "data":{
                    /* Reference: http://es6-features.org/#SpreadOperator */
                    /* copy arguments of an iterable collection */
                    ...xmlhttp.response
                }
            }
        }));
    }
}

var ml = GetURLParameter('ml');
if(ml){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = callbackFunction(xmlhttp);
    xmlhttp.open("POST", "/cart/update.js", false);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    // xmlhttp.setRequestHeader('Authorization', 'Basic ' + window.btoa("magic" + ":" + "links")); 
    xmlhttp.send(JSON.stringify({"attributes[ml]": ml}));
    xmlhttp.onreadystatechange = callbackFunction(xmlhttp);
}

