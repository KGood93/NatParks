'use strict';

let searchParks;
let maxResults;
const apiKey = '2YXWmohbDjS9FjhU6XQjt3TbqZS33VdyX4haBh2s';
const searchURL = 'https://developer.nps.gov/api/v1/parks';

function formatQueryParams(params) {
    const queryItems = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}

function getParks(searchParks, maxResults) {

    const params = {
        stateCode: searchParks,
        limit: maxResults,
        start: 0,
        api_key: apiKey
    };

    let queryString = formatQueryParams(params)
    const url = searchURL + '?' + queryString;
    console.log(url);

    fetch(url)
      .then(response => response.json())
      .then(responseJson => displayResults(responseJson))
      .catch(error => console.log('Something went wrong. Try again later.'));
}

function displayResults(responseJson) {
    console.log(responseJson);
    console.log(responseJson.data.length);
    let parks = $('<ul id="results-list"></ul>');

    for (let i=0; i <= responseJson.data.length - 1; i++) {
      parks.append(`<li><h3>${responseJson.data[i].fullName}</h3><p>${responseJson.data[i].description}</p><a href="${responseJson.data[i].url}">${responseJson.data[i].url}</a></li>`);
      console.log(responseJson.data[i].name);
    }
    //display the results section
    console.log(parks);
    $('#results-list').replaceWith(parks);
   
    $('#results').removeClass('hidden');
  
  }
  

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    searchParks = $('#js-search-parks').val();
    maxResults = $('#js-max-results').val();
    console.log(searchParks);
    getParks(searchParks, maxResults);
  });
}

$(watchForm);