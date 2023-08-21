export interface User {
   id: string;
   username: string;
   perfs: Perfs;
   createdAt: number;
   disabled: boolean;
   tosViolation: boolean;
   profile: UserProfile;
   seenAt: number;
   patron: boolean;
   verified: boolean;
   playTime: PlayTime;
   title: string;
   url: string;
   playing?: string;
   count: Count;
   streaming: boolean;
   followable: boolean;
   following: boolean;
   blocking: boolean;
   followsYou: boolean;
}

export interface Perfs {
   ultraBullet?: Perf;
   bullet?: Perf;
   blitz?: Perf;
   rapid?: Perf;
   classical?: Perf;
   puzzle?: Perf;
}

export interface Perf {
   games: number;
   rating: number;
   rd?: number;
   prog: number;
   prov?: boolean;
}

interface UserProfile {
   country?: string;
   location?: string;
   bio?: string;
   firstName?: string;
   lastName?: string;
   fideRating?: number;
   uscfRating?: number;
   ecfRating?: number;
   links?: string;
}

interface PlayTime {
   total: number;
   tv: number;
}

interface Count {
   all: number;
   rated: number;
   ai: number;
   draw: number;
   drawH: number;
   loss: number;
   lossH: number;
   win: number;
   winH: number;
   bookmark: number;
   playing: number;
   import: number;
   me: number;
}
