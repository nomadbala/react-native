export type Movie = {
  id: number;
  name: string | null;
  alternativeName: string;
  type: string;
  year: number;
  description: string | null;
  poster?: {
    url: string;
    previewUrl: string;
  };
  rating: {
    kp: number;
    imdb: number;
  };
  genres: { name: string }[];
  countries: { name: string }[];
};
