export interface PlayerData {
   name: string;
   title?: string;
   patron?: boolean;
   id: string;
}

export interface Player {
   user: PlayerData | "Anonymous";
   rating?: number;
   ratingDiff?: number;
}
