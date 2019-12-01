
function get_params_form(form){
    // Чистим форму от данных предыдущего запроса
    var fid = document.getElementById('foundedcontent');
    if (fid) fid.remove(document);

    // Форма, начало
    var s = form.elements["t"].value;
    var y = form.elements["y"].value;
    var tp = form.elements["type"].value;
    var p = 1;
    
    //var reqget = "http://www.omdbapi.com/?i=tt3896198&apikey=365d77a0&s=" + s + "&y=" + y + "&type=" + tp + "&page=" + p + "&r=xml";
    var basicreqget = "http://www.omdbapi.com/?i=tt3896198&apikey=365d77a0&s=" + s + "&y=" + y + "&type=" + tp;
    var reqget = basicreqget + "&page=" + p + "&r=xml";     
    console.log('url = ', reqget);

    // Форма, конец

    // Запрос, начало

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", reqget, true);

    xmlhttp.onreadystatechange=function() {

        if (xmlhttp.readyState==4) {
            var root = xmlhttp.responseXML.querySelector("root");
            var sumsearch = root.getAttribute("totalResults") * 1;
            console.log("sumsearch = ", sumsearch);        

            var xmlAll = xmlhttp.responseXML.querySelectorAll("result");
            var formax = xmlAll.length <= 10?xmlAll.length:10; 

            var b = document.getElementById('body');

            // var f = document.createElement('div');
            // f.className = 'foundedcontent';
            // b.appendChild(f);
            //f.remove(b);

            var f1 = document.createElement('div');
            f1.className = "container content col-sm-12 col-md-12 products";
            f1.id = "foundedcontent";
            b.appendChild(f1);

            var r1 = document.createElement('div');
            r1.className = "row";
            r1.id="rowfoundcontent";
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
                d5.id = "iddetails";
                d5.setAttribute('onclick', 'openmodal(this)');
                d4.appendChild(d5);

                // var a = document.createElement('a');
                // a.href = "#"; // ссылка на детальную информацию
                // d4.appendChild(a);

                var img = document.createElement('img');
                img.src = poster;
                d5.appendChild(img);
                //a.appendChild(img);

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
            // More ...
            if (sumsearch > 10){
                var dm = document.createElement('div');
                dm.className = "col-sm-4 col-md-3";
                dm.id = "idmore";         
                r1.appendChild(dm);

                var dm1 = document.createElement('div');
                dm1.className = "product";
                dm1.style = "margin-top:50%;font-style:italic;";                
                p = p + 1;
                var pageurl = basicreqget;
                dm1.setAttribute('nextpage', pageurl);
                dm1.setAttribute('onclick', 'addpage(this, ' + p +')');
                dm.appendChild(dm1);

                var spana = document.createElement('span');
                spana.textContent = 'more ...';                       
                dm1.appendChild(spana);

                var dimg = document.createElement('div');
                dimg.className = "product-img";
                spana.appendChild(dimg);

                var img = document.createElement('img');
                img.src = "ajax-loader.gif";
                img.id = "loadImg";
                dimg.appendChild(img);
            }  
            
        }
    }
    xmlhttp.send(null)

    // Запрос, конец

}

function addpage(div, p){

    startLoadingAnimation();    

    basicreqget = div.getAttribute('nextpage');
    var xmlhttp = new XMLHttpRequest();
    reqget = basicreqget + "&page=" + p + "&r=xml";
    
    xmlhttp.open("GET", reqget, true);    
    // Запрос
    xmlhttp.onreadystatechange=function() {
        
        if (xmlhttp.readyState==4) { 

            root = xmlhttp.responseXML.querySelector("root");
            sumsearch = root.getAttribute("totalResults") * 1;
            console.log("sumsearch = ", sumsearch);

            var xmlAll = xmlhttp.responseXML.querySelectorAll("result");
            
            var formax = xmlAll.length <= 10?xmlAll.length:10; 
  
            var r1 = document.getElementById('rowfoundcontent');

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
            // останавливаем крутилку загрузки
            stopLoadingAnimation();
            // удаляем предыдущий More ...   
            var mid = document.getElementById('idmore');
            mid.remove(document);
            // созадем новый More ...
            if (sumsearch > 10){
                var dm = document.createElement('div');
                dm.className = "col-sm-4 col-md-3";
                dm.id = "idmore";       
                r1.appendChild(dm);

                var dm1 = document.createElement('div');
                dm1.className = "product";
                dm1.style = "margin-top:50%;font-style:italic;";         
                p = p + 1;
                var pageurl = basicreqget;
                dm1.setAttribute('nextpage', pageurl);
                dm1.setAttribute('onclick', 'addpage(this, ' + p +')'); 
                dm.appendChild(dm1);

                var spana = document.createElement('span');
                spana.textContent = 'more ...';                       
                dm1.appendChild(spana);

                var dimg = document.createElement('div');
                dimg.className = "product-img";
                spana.appendChild(dimg);

                var img = document.createElement('img');
                img.src = "ajax-loader.gif";
                img.id = "loadImg";
                dimg.appendChild(img);
            }  
            
        }
    }
    xmlhttp.send(null)
}

function startLoadingAnimation() // - функция запуска анимации
{    
    // найдем элемент с изображением загрузки и уберем невидимость:
    var imgObj = document.getElementById("loadImg");
    imgObj.textContent = "";
    imgObj.style = "position: relative; z-index: 1000; display: inline-block;";
    console.log("imgObj = ", imgObj);
}
 
function stopLoadingAnimation() // - функция останавливающая анимацию
{
  // найдем элемент с изображением загрузки и сделаем невидимость:
  var imgObj = document.getElementById("loadImg");
  imgObj.style = "position:absolute; z-index:1000; display:none;";
}

function openmodal(){
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
}
