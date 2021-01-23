var ACCESS_TOKEN = ""
$.ajax({
    url: "https://accounts.spotify.com/api/token",
    beforeSend: function(xhr) { 
      xhr.setRequestHeader("Authorization", `Basic NTMzZGU3ZjA4YzlmNGEyZTliYmM0NWMyNGE0MjFmNWU6ZmFmODAwYmYwMjM5NGZmYmIzYjY2ZGFiNWQ3N2EyMWQ=`); 
    },
    method: 'POST',
    dataType: 'json',
    data: {
        grant_type: "refresh_token",
        refresh_token: "AQBVUV1btP0lyz9wba4ojdMZBdj4C2u8rjA6CRz3Hft_h41qlCH9znIDSoK3ml31lvhymzhE8wrXYCzblUsbKpmmi6wpizOseWJDHSyuyTVSweEV0Mj7faKLiQWxbN6aZw4"
    },
    success: function (data) {
      console.log("NHUUU:)))");
      const obj = JSON.parse(JSON.stringify(data)); 
      ACCESS_TOKEN = obj["access_token"]
      console.log(ACCESS_TOKEN)
    },
    error: function(){
      console.log("NHUUU!!");
    }, 
    complete: function() {
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
                const song = obj["items"][0]["track"]["name"]
                const artist = obj["items"][0]["track"]["artists"][0]["name"]
                const date = new Date(obj["items"][0]["played_at"]).toLocaleDateString('en-US')
                const time = new Date(obj["items"][0]["played_at"]).toLocaleTimeString('en-US')
                document.getElementById("spotify-activity").innerHTML = `I was just listening to <i>${song}</i> by ${artist} on Spotify! (${date} at ${time})`
            }, 
            error: function(){
            },
        })
    }
});

