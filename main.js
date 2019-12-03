
function get_params_form(form){
    // Чистим поле для найденных фильмов от данных предыдущего запроса
    var fid = document.getElementById('foundedcontent');
    if (fid) fid.remove(document);

    // Получаем данные из формы
    var s = form.elements["t"].value;
    var y = form.elements["y"].value;
    var tp = form.elements["type"].value;
    var p = 1;
        
    var basicreqget = "http://www.omdbapi.com/?apikey=365d77a0&s=" + s + "&y=" + y + "&type=" + tp;
    var reqget = basicreqget + "&page=" + p + "&r=xml";     
    console.log('url = ', reqget);

    // добавляем очередную страницу найденных фильмов
    addpage(basicreqget, p)

}

function addpage(pageurl, p){

    if (p>1) startLoadingAnimation();    

    basicreqget = pageurl;
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

            var b = document.getElementById('body');
           
            var r1 = document.getElementById('rowfoundcontent');

            if (!r1){
                var f1 = document.createElement('div');
                f1.className = "container content col-sm-12 col-md-12 products";
                f1.id = "foundedcontent";
                b.appendChild(f1);

                var r1 = document.createElement('div');
                r1.className = "row";
                r1.id="rowfoundcontent";
                f1.appendChild(r1);     
            }

            for (let i=0; i<formax; i++){
                let x = xmlAll[i];
                console.log("x", x);
                let id = x.getAttribute('imdbID');
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
                d5.id = id;
                d5.setAttribute('onclick', 'openmodal(this)');
                d4.appendChild(d5);

                var img = document.createElement('img');
                img.src = poster;
                d5.appendChild(img);

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
            if (p>1) stopLoadingAnimation();
            // удаляем предыдущий More ...   
            var mid = document.getElementById('idmore');
            if (mid) mid.remove(document);            
            
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
                dm1.setAttribute('onclick', 'addpage("' + pageurl +'", ' + p + ')'); 
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
}
 
function stopLoadingAnimation() // - функция останавливающая анимацию
{
  // найдем элемент с изображением загрузки и сделаем невидимость:
  var imgObj = document.getElementById("loadImg");
  imgObj.style = "position:absolute; z-index:1000; display:none;";
}

function openmodal(div){
    var modal = document.getElementById("myModal");
    modal.style.display = "block";

    // получаем данные о фильме в формате JSON
    var urlID = "http://www.omdbapi.com/?apikey=365d77a0&r=json&plot=full&i=" + div.id;
    console.log("urlID = ", urlID);

    var jasonhttp = new XMLHttpRequest(); 
    jasonhttp.open("GET", urlID, true);    
    // Запрос
    jasonhttp.onreadystatechange=function() {
        
        if (jasonhttp.readyState==4) { 
            var resp = JSON.parse(jasonhttp.response);     

            var posterimg = document.getElementById('idposter');
            posterimg.src = resp.Poster;
            posterimg.alt = resp.Title;
            var titlemovie = document.getElementById('idtitlecontent');
            titlemovie.innerHTML = resp.Title;
            var titlemoviemodal = document.getElementById('idtitlemodal');
            titlemoviemodal.innerHTML = resp.Title;
            var summarymovie = document.getElementById('idsummary');
            summarymovie.innerHTML = resp.Plot;
            var actors = document.getElementById('idActors');
            actors.innerHTML = "<b>Actors:</b> " + resp.Actors;
            var awards = document.getElementById("idAwards");
            awards.innerHTML = "<b>Awards:</b> " + resp.Awards;
            var BoxOffice = document.getElementById("idBoxOffice");
            BoxOffice.innerHTML = "<b>BoxOffice:</b> " + resp.BoxOffice;
            var country = document.getElementById("idCountry");
            country.innerHTML = "<b>Country:</b> " + resp.Country;
            var DVD = document.getElementById("idDVD");
            DVD.innerHTML = "<b>DVD:</b> " + resp.DVD;
            var director = document.getElementById("idDirector");
            director.innerHTML = "<b>Director:</b> " + resp.Director;
            var genre = document.getElementById("idGenre");
            genre.innerHTML = "<b>Genre:</b> " + resp.Genre;
            var language = document.getElementById("idLanguage");
            language.innerHTML = "<b>Language:</b> " + resp.Language;
            var production = document.getElementById("idProduction");
            production.innerHTML = "<b>Production:</b> " + resp.Production;
            var rated = document.getElementById("idRated");
            rated.innerHTML = "<b>Rated:</b> " + resp.Rated;
            var ratings = document.getElementById("idRatings");
            ratings.innerHTML = "<b>Rating:</b> " + resp.Ratings;
            var released = document.getElementById("idReleased");
            released.innerHTML = "<b>Released:</b> " + resp.Released;
            var runtime = document.getElementById("idRuntime");
            runtime.innerHTML = "<b>Runtime:</b> " + resp.Runtime;
            var type = document.getElementById("idType");
            type.innerHTML = "<b>Type:</b> " + resp.Type;
            var website = document.getElementById("idWebsite");
            website.innerHTML = "<b>Website:</b> " + resp.Website;
            var writer = document.getElementById("idWriter");
            writer.innerHTML = "<b>Writer:</b> " + resp.Writer;
            var year = document.getElementById("idYear");
            year.innerHTML = "<b>Year:</b> " + resp.Year;
            var imdbID = document.getElementById("idImdbID");
            imdbID.innerHTML = "<b>imdbID:</b> " + resp.imdbID;
            var imdbRating = document.getElementById("idImdbRating");
            imdbRating.innerHTML = "<b>imdbRating:</b> " + resp.imdbRating;
            var imdbVotes = document.getElementById("idImdbVotes");
            imdbVotes.innerHTML = "<b>imdbVotes:</b> " + resp.imdbVotes; 

        }
    }
    jasonhttp.send(null)

}

function closemodal(){
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
}
