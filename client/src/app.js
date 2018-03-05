const CountriesSelectView = require('./views/countries_select_view');
const CountryList = require('./models/country_list');
const phraseList = require('./models/phrase_list');


const app = function(){
  const countriesSelectView = new CountriesSelectView(document.querySelector('#countries'));
  const world = new CountryList('https://restcountries.eu/rest/v2/all?fields=name;languages');

  world.onUpdate = function(countries) {
    countriesSelectView.render(countries);
  };

  world.populate();

  countriesSelectView.onChange = function(country){

    const phraseToTranslate = phraseList[0];
    const languageToTranslateTo = country.languages[0].iso639_1;

    const requestBody = {phrase: phraseToTranslate, language: languageToTranslateTo}

    const request = new XMLHttpRequest();

    request.open('POST', '/translate_api/');

    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    request.onload = requestComplete;

    request.send(JSON.stringify(requestBody))

  }
}

const requestComplete = function(){
  if(this.status !== 200) return;
  const jsonString = this.responseText;
  const translatedPhrase = JSON.parse(jsonString);
  console.log('output of requestComplete', translatedPhrase);

}

document.addEventListener("DOMContentLoaded", app)
