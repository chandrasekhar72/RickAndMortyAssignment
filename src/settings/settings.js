const env = process.env.REACT_APP_BASE_URL;
export const API_SETTINGS = {
    GET_ALL_CHARACTERS: env + "api/character",
    GET_ALL_EPISODE: env + "api/episode",
};