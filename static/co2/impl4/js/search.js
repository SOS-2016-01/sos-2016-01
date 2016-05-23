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
    var str = JSON.stringify(response.result);
    console.log(response.result);

    mycontainer = $('#search-container');
    $('<div class="row"><div class="col s12 m7"><div class="card"><div class="card-image"><img src='+reponse.result.items.snippet.thumbnails.medium.url+'></div><div class="card-content"><p>'+reponse.result.items.snippet.title+'</p></div><div class="card-action"><a href='+reponse.result.items+'>Link</a></div></div></div></div>')
    for(i=0;i<reponse.result.items.length;i++){
    }
    //$('#search-container').html('<pre>' + str + '</pre>');
  });
}
