type PlayerData = {
   name: string;
   title?: string;
   patron?: boolean;
   id: string;
};

export type Player = {
   user: PlayerData;
   rating: number;
   ratingDiff?: number;
};
