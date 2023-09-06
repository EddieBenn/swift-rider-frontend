 export interface Coordinates {
   accuracy: number;
   altitude?: number;
   altitudeAccuracy?: number;
   heading?: number;
   latitude: number;
   longitude: number;
   speed?: number;
 }
 

 export interface Position {
   coords: Coordinates;
   timestamp: number;
 }
 