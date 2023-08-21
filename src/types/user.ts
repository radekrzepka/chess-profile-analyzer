export type User = {
   id: string;
   username: string;
   perfs?: Perfs;
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
};

type Perfs = {
   chess960?: Perf;
   atomic?: Perf;
   racingKings?: Perf;
   ultraBullet?: Perf;
   blitz?: Perf;
   kingOfTheHill?: Perf;
   bullet?: Perf;
   correspondence?: Perf;
   horde?: Perf;
   puzzle?: Perf;
   classical?: Perf;
   rapid?: Perf;
   storm?: Perf;
   racer?: Perf;
   streak?: Perf;
};

type Perf = {
   games: number;
   rating: number;
   rd?: number;
   prog?: number;
   prov?: boolean;
};

type UserProfile = {
   country?: string;
   location?: string;
   bio?: string;
   firstName?: string;
   lastName?: string;
   fideRating?: number;
   uscfRating?: number;
   ecfRating?: number;
   links?: string;
};

type PlayTime = {
   total: number;
   tv: number;
};

type Count = {
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
};
