
export interface Track {
  id: string;
  name: string;
  country: string;
  countryCode: string;
  date: string;
  svgPath: string;
}

export interface Lap {
  number: number;
  time: string;
}

export interface PointOnPath {
  x: number;
  y: number;
  angle: number;
}
