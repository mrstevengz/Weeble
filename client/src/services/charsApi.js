import axios from "axios";

class CharactersApi {
  constructor() {
    this._apiUrl = "api/characters";
  }

  getCharacters() {
    return axios.get(this._apiUrl);
  }
}

export default new CharactersApi();
