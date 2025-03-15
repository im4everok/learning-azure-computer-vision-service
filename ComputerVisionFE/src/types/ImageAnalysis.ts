export interface DetectedObject {
  rectangle: {
    x: number;
    y: number;
    w: number;
    h: number;
  };
  objectProperty: string;
  confidence: number;
  parent?: DetectedObject;
}

export interface ImageAnalysis {
  // ...existing C# properties mirrored here...
  requestId: string;
  modelVersion: string;
  objects?: DetectedObject[];
  // ...add others as needed, e.g.:
  // categories?: { name: string; score: number }[];
  // adult?: { isAdultContent: boolean; isRacyContent: boolean };
  // ...
}
