// alert("Some jokes can be innapropriate, Click OK if you are 18+ of age!");

const notification = document.getElementById('notification');
var jokes;
notification.addEventListener('click', () => {
    notification.remove();
});

document.getElementById("searchBtn").addEventListener('click', (e) => {
    e.preventDefault();
    var categories = document.getElementById("selectCat").value;
    var search = document.getElementById("searchString").value;
    var jokeType = document.getElementById("jokeType").value;
    if (jokeType !=""){
        jokeType += "&";
    }
    var urlAPI = "https://v2.jokeapi.dev/joke/" + categories + "?"+ jokeType+"contains=" + search + "&amount=10";

    fetch(urlAPI)
    .then((response) => response.json())
    .then(function(data){
        console.log(data);
        if(data){
            jokes = data.jokes;
            for (i=0; i<data.jokes.length; i++){
                if(data.jokes[i].type=="single")
                    document.getElementById("jokesDisplay").innerHTML +=
                    "<div class='card m-3 has-background-link-light' style='padding:12px;'>" + 
                    data.jokes[i].joke + 
                    "<br><br><button onclick='addFavorite("+i+");'>Add to Favorites</button>" + 
                    "</div><hr>";
                else{
                    document.getElementById("jokesDisplay").innerHTML += 
                    "<div class='card m-3 has-background-link-light' style='padding:12px;'>" + 
                    data.jokes[i].setup + "<br>" + 
                    data.jokes[i].delivery + 
                    "<br><br><button onclick='addFavorite("+i+");'>Add to Favorites</button>" + 
                    "</div><hr>";
                }
            }
            if(data.jokes.length>0){

            }
        }
    
    })
});
// jokeNumber is recieved/results from line 30 and 37 +i+" [i] is part of the array which we get from the web api side.
function addFavorite(jokeNumber){
    console.log(jokes[jokeNumber]);
    if(jokes[jokeNumber].type=="single"){
        localStorage.setItem()
        // joke
    }else{
        // setup, delivery
    }
}

document.getElementById("jokesDisplay").innerHTML = joke +  document.getElementById("jokesDisplay").innerHTML

document.getElementById("clearJokesBtn").addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById("jokesDisplay").innerHTML = "";
});

document.getElementById("clearFavBtn").addEventListener('click', (e) => {
    e.preventDefault();
    //document.getElementById("jokesDisplay").innerHTML = "";
});

