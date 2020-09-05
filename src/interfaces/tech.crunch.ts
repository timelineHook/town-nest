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

export interface ITechCrunch {
  _id: string;
  title: string;
  content: string;
  name: string;
  subtitle: string;
  imageSrc: string;
  date: string;
  text: string;
}