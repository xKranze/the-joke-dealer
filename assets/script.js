// alert("Some jokes can be innapropriate and offensive, Click  if you are 18+ of age and aware of content!");
const notification = document.getElementById('notification');
var jokes;
// we need to establish a getitem first because when you do getitem youll recieve an error if getitem does not exsist in local storage
var favoriteJokes = localStorage.getItem("favoriteJokes");

// localStorage returns an object by default if it cannot get your item
if (typeof favoriteJokes == "object") {
    favoriteJokes = ""; // string baseline to add string to later.  so were not stuck with object cause its object by default.

    // localstorage returns a string. presumably the list of jokes as string
} else {
    var faves = favoriteJokes.split("|");
    for (var i = 0; i < faves.length - 1; i++) {
        document.getElementById("fav-box").innerHTML += "<button onclick='displayFavorite(" + i + ")'>" + faves[i] + "</button><br><br>";
    }
}

notification.addEventListener('click', () => {
    notification.remove();
});

document.getElementById("searchBtn").addEventListener('click', (e) => {
    e.preventDefault();
    var categories = document.getElementById("selectCat").value;
    var search = document.getElementById("searchString").value;
    var jokeType = document.getElementById("jokeType").value;
    if (jokeType != "") {
        jokeType += "&";
    }

    //NSFW
    // var urlAPI = "https://v2.jokeapi.dev/joke/" + categories + "?" + jokeType + "contains=" + search + "&amount=10";
    //turns on safe mode.
    var urlAPI = "https://v2.jokeapi.dev/joke/" + categories + "?safe-mode&" + jokeType + "contains=" + search + "&amount=10";

    fetch(urlAPI)
        .then((response) => response.json())
        .then(function (data) {
            console.log(data);
            if (data) {
                jokes = data.jokes;
                document.getElementById("jokesDisplay").innerHTML = "";
                for (i = 0; i < data.jokes.length; i++) {
                    if (data.jokes[i].type == "single")
                        document.getElementById("jokesDisplay").innerHTML +=
                            "<div class='card m-3 has-background-link-light' style='padding:12px;'>" +
                            data.jokes[i].joke +
                            "<br><br><button onclick='addFavorite(" + i + ");'>Add to Favorites</button>" +
                            "</div><hr>";
                    else {
                        document.getElementById("jokesDisplay").innerHTML +=
                            "<div class='card m-3 has-background-link-light' style='padding:12px;'>" +
                            data.jokes[i].setup + "<br>" +
                            data.jokes[i].delivery +
                            "<br><br><button onclick='addFavorite(" + i + ");'>Add to Favorites</button>" +
                            "</div><hr>";
                    }
                }
            }

        })
});

// jokeNumber is recieved/results from line 30 and 37 +i+" [i] is part of the array which we get from the web api side.
function addFavorite(jokeNumber) {
    if (jokes[jokeNumber].type == "single") {
        // Add | to later split it with when getting from the local storage.  the bar is used to seperate end of one joke and start of another.  Used the bar becuased its not a common symbol used in jokes.
        favoriteJokes += jokes[jokeNumber].joke + "|"; // Spliting strings leaves a null at the end after the last joke since there is a bar at the end of each joke after the last is "null"
    } else {
        favoriteJokes += jokes[jokeNumber].setup + " " + jokes[jokeNumber].delivery + "|";
    }
    localStorage.setItem("favoriteJokes", favoriteJokes);
    var faves = favoriteJokes.split("|");
    document.getElementById("fav-box").innerHTML = "";
    for (var i = 0; i < faves.length - 1; i++) {
        document.getElementById("fav-box").innerHTML += "<button onclick='displayFavorite(" + i + ")'>" + faves[i] + "</button><br><br>";
    }
}

function displayFavorite(jokeNumber) {
    document.getElementById("jokesDisplay").innerHTML =
        "<div class='card m-3 has-background-link-light' style='padding:12px;'>" +
        favoriteJokes.split("|")[jokeNumber] +
        "</div><hr>";
}

document.getElementById("clearJokesBtn").addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById("jokesDisplay").innerHTML = "";
});

document.getElementById("clearFavBtn").addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById("fav-box").innerHTML = "";
});
