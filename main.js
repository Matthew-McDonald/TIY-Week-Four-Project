
//Create a favorites list to add favorite songs
// create lightbox effect, so you you can click on the search result and get more information



let searchBar = document.getElementById('searchBar');
let searchButton = document.getElementById('searchButton');

let audio = document.getElementById("audio-player");
let topContainer = document.getElementById('topContainer');

let favoritesList = document.getElementById('favoritesList');

searchBar.focus();
//starts the cursor in the text field automatically

document.addEventListener("keypress", function(e){
  let key = e.which || e.keyCode;
  if (key === 13) {
    search();
  }
});

// searchButton.onclick = search;
//link search button to search function when clicked

function search() {
  searchTracks();
  searchBand();
  audio.style = "display: inline-block";
  topContainer.style = "margin-top: 10vh";
  topContainer.style.transition = "2s";
  searchBar.style = "font-size: 20pt";
  searchBar.style.transition = "2s";

}
//search function triggers both a track search and band search


//SEARCH TRACKS FUNCTION
function searchTracks() {
  let string = searchBar.value;
  fetch('https://api.soundcloud.com/tracks/?client_id=095fe1dcd09eb3d0e1d3d89c76f5618f&q=' + string) //Add q = the variable that is the value of the searchbar

  .then(
    function(response) {
      if(response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' + response.status);
        return
      }
      response.json().then(function(data) {
      // console.log(data[0].title);

      let title = data;
      document.getElementById('tracks-section').innerHTML = "";
      //Clears the innerhtml before a new search

      for (i=0; i < title.length; i++) {

        let markup = `
        <div class="grid-child">
          <div class="grid-child-one">
            <img class="artist-image" src="${title[i].user.avatar_url}">
          </div>
          <div class="grid-child-two">
            <p>${title[i].title}</p>
            <p>By: ${title[i].user.username}</p>
            <button id="play" value= "${title[i].stream_url}">Play</button>
            <button id="favorite" value= "${title[i].title}">Favorite</button>
          </div>
        </div>
        `
        //Button added each time through for loop and targets the stream_url of the i

        document.getElementById("tracks-section").innerHTML += markup;
        //Adds markup html to page
      }
      document.getElementById('tracks-header').innerHTML = "";
      //Clears the track header before a new search

      let markupTrackHeader = `
        <h2>Tracks</h2>
        <hr>
      `
      //Adds the Tracks title only once the search starts
      document.getElementById('tracks-header').innerHTML += markupTrackHeader;

      //AUDIO EVENT LISTENER
      document.getElementById('tracks-section').addEventListener("click", function(e) {
        if(e.target && e.target.id == "play") {
          //add click event listener to the play button
          let url = e.target.value;
          //sets the url to the value of the button id in the tracks-section
          url += "?client_id=095fe1dcd09eb3d0e1d3d89c76f5618f";
          //ads the client id to the url
          audio.removeAttribute('src');
          //removes the current src audio
          audio.setAttribute('src', url);
          //adds the new url as the audio src
          audio.setAttribute('autoplay', true);
          //tell audio player to auto play when clicked
          audio.classList.add("reveal");
          //adds the class reveal which reveals the music player
        }
      })



      }
    )
    }
  )
}

//SEARCH BAND FUNCTION

function searchBand() {
  let string = searchBar.value;
  fetch('https://api.soundcloud.com/users/?client_id=095fe1dcd09eb3d0e1d3d89c76f5618f&q=' + string) //Add q = the variable that is the value of the searchbar

  .then(
    function(response) {
      if(response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' + response.status);
        return
      }
      response.json().then(function(data) {
      // console.log(data[0].username);

      let bands = data;
      document.getElementById('bands-section').innerHTML = "";
      //Clears the innerhtml before a new search

      for (i=0; i < bands.length; i++) {

        let markup = `

        <div class="band-grid-child">
            <img class="artist-image-band" src="${bands[i].avatar_url}"/>
            <a href="${bands[i].permalink_url}">${bands[i].username}</a>
        </div>
        `
        document.getElementById('bands-section').innerHTML += markup;
        //Adds markup html to page
      }

      document.getElementById('artist-header').innerHTML = "";
      //Clears the artist header before a new search

        let markupBandHeader = `
          <h2>Artists</h2>
          <hr>
        `
        document.getElementById('artist-header').innerHTML += markupBandHeader;
        //Adds the Artists title only once the search starts
      }
    )
    }
  )
}
// search();

// fetch('https://api.soundcloud.com/tracks?client_id=8538a1744a7fdaa59981232897501e04')
//
//&qbandname for each url
// .then(
//   function(response) {
//     if (response.status !== 200) {
//       console.log('Looks like there was a problem. Status Code: ' + response.status);
//       return;
//     }
//     response.json().then(function(data) {
//
//       let title = data[0].title;
//       let band = data[0].user.username;
//       let searchBar = document.getElementById('searchBar');
//       // console.log(band);
//       function search() {
// //
// //
// //
// //
// //
// // }
// //
// //         // SC.initialize({
// //         //   client_id: '8538a1744a7fdaa59981232897501e04'
// //         // });
// //         //
// //         // SC.get('/tracks', {
// //         //   q: 'buskers', license: 'cc-by-sa'
// //         // }).then(function(tracks) {
// //         //   console.log(tracks);
// //         // });
// //
// //         // fetch('https://api.soundcloud.com/tracks?client_id=8538a1744a7fdaa59981232897501e04')
        // for (i = 0; i < data.title; i++) {
        //   //make the input value equal the pulled api data
        //   searchBar.value = title;
        //   title = searchBar.value;
        //   console.log(title);
// //
// //
// //       }//search function closing bracket
// //
// //       let markup = `
          // <div>
          //   <ul>
          //     <li>${data[0].title}</li>
          //     <!-- make search function above output value onto list below -->
          //     <li>searchBar.value</li>
          //
          //   </ul>
          // </div>
// //       `
// //       document.body.innerHTML += markup;
// //
// //     }
// //     )
// //   }
// // )
//
//
//
// //One functino for tracks with specific url, and fetch within, that prints the markup/innnerhtml from a for loop.
//
// //Another seperate function doing the same thing but for bands.
