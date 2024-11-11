export interface Tent {
  key: string;
  min?: string;
  max: string;
}

export interface TentsList {
  tents: {
    list: Tent[];
  };
}
