
export interface Track {
  id: string;
  name: string;
  country: string;
  countryCode: string;
  date: string;
  svgPath: string;
  // Optional start/finish line position
  startPosition?: {
    x: number;
    y: number;
    rotation: number;
  };
}
