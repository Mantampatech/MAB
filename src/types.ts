export interface EBook {
  id: string;
  title: string;
  price: number;
  image: string;
  rating: number;
  category: string;
  description?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  image: string;
  date: string;
}

export type Page = 'home' | 'blog' | 'store' | 'contact';
