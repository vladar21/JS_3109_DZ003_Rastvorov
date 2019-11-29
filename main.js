
function get_params_form(form){

    // Форма, начало
    console.log("by id ", form.elements["t"].value);
    // for(var i=0;i<form.elements.length;i++)
    //     {
    //     console.log(form.elements[i].value);
    //     }
    
    var s = form.elements["t"].value;
    var y = form.elements["y"].value;
    var tp = form.elements["type"].value;
    
    //var s = unescape(t);
    console.log("s = ", s);    

    var xmlhttp = new XMLHttpRequest();
    var rXML;
    var reqget = "http://www.omdbapi.com/?i=tt3896198&apikey=365d77a0&s=" + s + "&y=" + y + "&type=" + tp + "&r=xml";
    console.log(reqget);
    
    // Форма, конец

    // Запрос, начало

    xmlhttp.open("GET", reqget, true);

    xmlhttp.onreadystatechange=function() {

        if (xmlhttp.readyState==4) {

            var xmlAll = xmlhttp.responseXML.querySelectorAll("result");
            //xmlAll = xmlhttp.responseXML;
            // console.log("xmlAll = ", xmlAll);
            var formax = xmlAll.length <= 5?i<xmlAll.length:5; 
            console.log("ternarnui = ", formax);
            
            var b = document.getElementById('body');
            var f = document.getElementById('foundedcontent');
            f.remove(b);

            var f1 = document.createElement('div');
            f1.className = "container content col-sm-12 col-md-12 products";
            f1.id = "foundedcontent";
            b.appendChild(f1);

            var r1 = document.createElement('div');
            r1.className = "row";
            f1.appendChild(r1); 

            for (let i=0; i<formax; i++){
                let x = xmlAll[i];
                console.log("x", x);
                let title = x.getAttribute('title');
                let type = x.getAttribute('type');
                let year = x.getAttribute('year');
                let poster = x.getAttribute('poster');

                // Создаем карточку фильма                  

                var d3 = document.createElement('div');
                d3.className = "col-sm-4 col-md-3";
                r1.appendChild(d3);

                var d4 = document.createElement('div');
                d4.className = "product";
                d3.appendChild(d4);

                var d5 = document.createElement('div');
                d5.className = "product-img";
                d4.appendChild(d5);

                var a = document.createElement('a');
                a.href = "#"; // ссылка на детальную информацию
                d4.appendChild(a);

                var img = document.createElement('img');
                img.src = poster;
                a.appendChild(img);

                var span1 = document.createElement('span');
                span1.className = "product-title";
                d4.appendChild(span1);

                var h5 = document.createElement('h5');
                span1.appendChild(h5);

                var a1 = document.createElement('a');
                a1.textContent = title;
                h5.appendChild(a1);

                var span2 = document.createElement('span');
                span2.className = "product-desc";
                span2.textContent = type;
                d4.appendChild(span2);

                var br = document.createElement('br');
                d4.appendChild(br);

                var span3 = document.createElement('span');
                span2.className = "product-price";
                span2.textContent = year;
                d4.appendChild(span3);

               

            
            }
        }
    }
    xmlhttp.send(null)

    // Запрос, конец

}


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


