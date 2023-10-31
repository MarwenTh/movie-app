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

interface Rating {
  Source: string;
  Value: string;
}

export interface DetailsResult {
  Actors: string;
  Awards: string;
  Country: string;
  Director: string;
  Genre: string;
  Language: string;
  Metascore: string;
  Plot: string;
  Poster: string;
  Rated: string;
  Ratings: Rating[];
  Released: string;
  Response: string;
  Runtime: string;
  Title: string;
  Type: string;
  Writer: string;
  Year: string;
  imdbID: string;
  imdbRating: string;
  imdbVotes: string;
  totalSeasons: string;
  BoxOffice: string;
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
