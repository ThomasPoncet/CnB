/**
 * Created by thomas on 24/06/15.
 */

var searchRequestLimit = 10;
var currentKeyWord = "";
var currentSearchResults = [];
var currentSearchResultsIndex = 0;

//$.ready(function(){
//    $('#search-submit').click(search());
//});

function search(){
    currentKeyWord = $('#search-key-word').val();
    currentSearchResults = [];
    currentSearchResultsIndex = 0;
    $.ajax({
        url: '/proxy',
        method: 'POST',
        data: {
            url: 'http://api.deezer.com/search?q=' + currentKeyWord +
            '&index=' + currentSearchResultsIndex + '&limit=' + searchRequestLimit + '&output=json'
        },
        dataType: 'text'
    }).done(function(body){
        var data = JSON.parse(body).data;
        for (var i = 0; i < data.length; i++){
            currentSearchResults.push({
                title: data[i].title,
                artist: data[i].artist.name,
                album: data[i].album.title,
                year: data[i].album.release_date,
                link: data[i].id
            });
        }
        updateSearchResultsTab();
    });
}

function updateSearchResultsTab(){
    console.log(currentSearchResults);
    $('#search-results-table').empty();
    $('#search-results-table').append(
        '<tr>'+
        '   <th>Titre</th>'+
        '   <th>Artiste</th>'+
        '   <th>Album</th>'+
        '   <th>Année</th>'+
        '   <th>Proposer</th>'+
        '</tr>'
    );
    for (var i = 0; i < currentSearchResults.length; i++){
        console.log(i);
        $('#search-results-table').append(
            '<tr>'+
            '	<td>'+currentSearchResults[i].title+'</td>'+
            '	<td>'+currentSearchResults[i].artist+'</td>'+
            '	<td>'+currentSearchResults[i].album+'</td>'+
            '	<td>'+currentSearchResults[i].year+'</td>'+
            '</tr>'
        );
    }
}