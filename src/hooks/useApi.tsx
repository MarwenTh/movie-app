export enum SearchType {
  all = "",
  movie = "movie",
  series = "series",
  episode = "episode",
}

export interface SearchResult {
  Title: string;
  Year: string;
  Poster: string;
  imdbID: string;
  Type: string;
}

export interface SearchError {
  Response: string;
  Error: string;
  Type: SearchType;
}

export interface DetailsResult {
  Genre: string;
  Title: string;
  Year: string;
  Poster: string;
  Plot: string;
  imdbRating: string;
  Director: string;
  Actors: string;
  Website: string;
  Awards: string;
}

export const useApi = () => {
  let url = "https://www.omdbapi.com/";
  let apiKey = "fed773a6";

  const searchData = async (
    title: string,
    type: SearchType
  ): Promise<SearchResult[] | SearchError> => {
    const response = await fetch(
      `${url}?s=${encodeURI(title)}&type=${type}&apikey=${apiKey}`
    );
    const result = await response.json();
    if (result.Response === "False") {
      return { Response: "False", Error: `${type} not found`, Type: type };
    } else {
      return result;
    }
  };

  const getDetails = async (id: string): Promise<DetailsResult> => {
    const result = await fetch(`${url}?i=${id}&plot=full&apikey=${apiKey}`);
    return result.json();
  };

  return {
    searchData,
    getDetails,
  };
};
