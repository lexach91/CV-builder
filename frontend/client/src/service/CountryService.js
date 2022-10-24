export class CountryService {

  getCountries() {
    const url = "http://127.0.0.1:8080/services/countries";
    return fetch(url)
      .then((res) => {
        console.log(res);
        return res.json()})
      .then((d) => d);
  }
}