export interface ITechCrunchBug {
  title: {
    rendered: string;
  },
  content: {
    rendered: string;
  },
  _embedded: {
    author: Array<
      {
        name: string;
      }>
  },
  subtitle: string;
  jetpack_featured_media_url: string;
  date: string;
  excerpt: {
    rendered: string;
  }
}
