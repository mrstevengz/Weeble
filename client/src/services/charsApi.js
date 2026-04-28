import axios from "axios";

class CharactersApi {
  constructor() {
    this._apiUrl = "/api/characters";
  }

  async getCharacters() {
    const res = await axios.get(this._apiUrl);
    if (!res.data.success) {
      throw new Error("Failed to fetch characters");
    }
    return res.data.data;
  }
}

export default new CharactersApi();
