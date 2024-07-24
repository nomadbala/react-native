export type MovieSummary = {
  name: string;
  slug: string;
  category: string;
  moviesCount?: number;
  cover?: {
    url: string;
    previewUrl: string;
  };
  id: number;
};

export type ApiResponse = {
  docs: MovieSummary[];
  total: number;
  limit: number;
  page: number;
  pages: number;
};

export type Genre = {
  name: string;
  slug: string;
};
