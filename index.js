'use strict';

let searchUser = "";

function getUser() {
    let url = "https://api.github.com/users/" + searchUser + "/repos";
    console.log(url);

    fetch(url)
        .then(response => response.json())
        .then(responseJson => displayResults(responseJson))
        .catch(error => alert('Something went wrong. Try again later.'));
}

function displayResults(responseJson) {
    let final = $('<ul id="results-list"></ul>');

    for(let i = 0; i < responseJson.length; i++) {
      final.append(`<li>${responseJson[i].name} - <a href="${responseJson[i].html_url}">${responseJson[i].html_url}</a></li>`);
    }

    $('#results').replaceWith(final);
  }

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    searchUser = $('#js-search-user').val();
    console.log(searchUser);
    getUser();
  });
}

$(watchForm);