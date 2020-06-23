require('dotenv').config()

var ACCESS_TOKEN = ""
$.ajax({
    url: "https://accounts.spotify.com/api/token",
    beforeSend: function(xhr) { 
      xhr.setRequestHeader("Authorization", `Basic ${process.env.CLIENT_ID_AND_SECRET}`); 
    },
    method: 'POST',
    dataType: 'json',
    data: {
        grant_type: "refresh_token",
        refresh_token: process.env.REFRESH_TOKEN
    },
    success: function (data) {
    console.log(data)
      const obj = JSON.parse(JSON.stringify(data)); 
      ACCESS_TOKEN = obj["access_token"]
    },
    error: function(){
    }, 
    complete: function() {
        console.log(ACCESS_TOKEN)
    }
});

/*
$.ajax({
    url: 'https://api.spotify.com/v1/me/player/recently-played',
    beforeSend: function(xhr) {
        xhr.setRequestHeader("Authorization", `Bearer ${ACCESS_TOKEN}`)
    },
    dataType:'json',
    method:'GET', 
    contentType: 'application/json', 
    accepts: 'application/json', 
    success: function(data){
        const obj = JSON.parse(JSON.stringify(data)); 
        console.log(obj["items"][0])
        const song = obj["items"][0]["track"]["name"]
        const artist = obj["items"][0]["track"]["artists"][0]["name"]
        const date = new Date(obj["items"][0]["played_at"]).toLocaleDateString('en-US')
        const time = new Date(obj["items"][0]["played_at"]).toLocaleTimeString('en-US')
        document.getElementById("spotify-activity").innerHTML = `I was just listening to <i>${song}</i> by ${artist} on Spotify! (${date} at ${time})`
    }, 
    error: function(){
    },
})*/