interface ITracks {
  id: number;
  number: number;
  title: string;
  duration: number
}

export interface IAlbum {
  id: number;
  name: string;
  tracks: ITracks[];
  year: number;
}

export interface IFooter {
  link: '/' | '/Album';
  icon: 'PlusCircle' | 'ArrowArcLeft';
  title: string
}

export interface ISearch {
  onSearch: () => void;
  search: string;
}
