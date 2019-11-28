var xmlhttp = new XMLHttpRequest();
var rXML;
xmlhttp.open("GET", "http://www.omdbapi.com/?i=tt3896198&apikey=365d77a0&t=Last&y=2019&r=xml", true);
xmlhttp.onreadystatechange=function() {
    if (xmlhttp.readyState==4) {
        rXML = xmlhttp.responseXML;
        console.log(rXML);
        var xmlAll = xmlhttp.responseXML.querySelectorAll("movie");
        console.log(xmlAll);
        for (let i=0; i<xmlAll.length;i++){
            let x = xmlAll[i];
            console.log("x", x);
            var title = "";
            var type = "";
            var year = "";
            var poster = "";
            
            var attr = x.attributes;
            console.log(attr);
            
            title = x.getAttribute('title');
            type = x.getAttribute('type');
            year = x.getAttribute('year');
            poster = x.getAttribute('poster');
            
            
            document.getElementById("demo").innerHTML = title + " " + type + " " + year + " " + poster;
            

        
        }
    }
}
xmlhttp.send(null)

function myFunction(xml) {
    var x, i, xmlDoc, txt;
    xmlDoc = xml;//.responseXML;
    txt = "";
    x = xml;//xmlDoc.getElementsByTagName('movie');
    for (i = 0; i < x.length; i++) {
        txt += x[i].getAttribute('title') + "<br>";
        console.log(x[i]);
    }
    document.getElementById("demo").innerHTML = txt;
}





// x = xmlhttp.responseXML.getElementsByTagName("movie")[0];
// console.log("x = ", x);

// y = x.childNodes[0];
// console.log("y = ", y);





// var xhr = new XMLHttpRequest();
// xhr.onload = function() {
//   dump(xhr.responseXML.documentElement.nodeName);
// }
// xhr.onerror = function() {
//   dump("Error while getting XML.");
// }
// xhr.open("GET", "http://www.omdbapi.com/?i=tt3896198&apikey=365d77a0&t=Last&y=2019&r=xml");
// xhr.responseType = "document";
// xhr.overrideMimeType('text/xml');
// xhr.onload = function () {
//     if (xhr.readyState === xhr.DONE) {
//       if (xhr.status === 200) {
//         //console.log(xhr.response);
//         console.log(xhr.responseXML);
//       }
//     }
//   };
  
// xhr.send(null);

// parser = new DOMParser();
// xmlDoc = xhr.responseXML;

// //document.getElementById("demo").innerHTML =
// xmlDoc.getElementsByTagName("movie")[0].childNodes[0].nodeValue;


