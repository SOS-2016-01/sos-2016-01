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
    $('<div class="row"><div class="col s12 m7"><div class="card"><div class="card-image"><img src='+recived.items[0].snippet.thumbnails.medium.url+'></div><div class="card-content"><p>'+recived.items[0].snippet.title+'</p></div><div class="card-action"><a href=>Link</a></div></div></div></div>').appendTo(mycontainer);
//recived.items[0]
    for(i=0;i<recived.items.length;i++){
    }
    //$('#search-container').html('<pre>' + str + '</pre>');
  });
}
