// After the API loads, call a function to enable the search box.
function handleAPILoaded() {
  $('#search-button').attr('disabled', false);
  $('#search-button').attr('class', "waves-effect waves-light btn");
}

// Search for a specified string.
function search() {
  var q = $('#query').val();
  var request = gapi.client.youtube.search.list({
    q: q,
    part: 'snippet'
  });

  request.execute(function(response) {
    recived= response.result;
    var str = JSON.stringify(recived);
    console.log(recived);
    mycontainer = $('#search-container');
    //recived.items[0]
    for(i=0;i<recived.items.length;i++){
    }
    $('<div class="row"><div class="col s12 m7"><div class="card"><div class="card-image"><img src='+recived.items[i].snippet.thumbnails.medium.url+'></div><div class="card-content"><p>'+recived.items[i].snippet.title+'</p></div><div class="card-action"><a href="https://www.youtube.com/watch?v="'+recived.items[i].id.videoId+'>Link</a></div></div></div></div>').appendTo(mycontainer);
    //$('#search-container').html('<pre>' + str + '</pre>');
  });
}
