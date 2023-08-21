interface PlayerData {
   name: string;
   title?: string;
   patron?: boolean;
   id: string;
}

export interface Player {
   user: PlayerData;
   rating: number;
   ratingDiff?: number;
}
