export interface PortfolioItem {
  _id: string;
  title: string;
  image: string;
  category: string;
  healing: 'fresh' | 'healed';
  tags: string[];
}
