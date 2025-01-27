export type Topology = {
   type: 'Topology';
   objects: {
      regions: GeometryCollection;
   };
   arcs: number[][][];
   transform: Transform;
};

export type GeometryCollection = {
   type: 'GeometryCollection';
   name: string;
   crs: CRS;
   geometries: Geometry[];
};

type CRS = {
   type: 'name';
   properties: {
      name: string;
   };
};

type Geometry = MultiPolygon | Polygon;

export type MultiPolygon = {
   type: 'MultiPolygon';
   id: string;
   properties: RegionProperties;
   arcs: number[][][];
};

type Polygon = {
   type: 'Polygon';
   id: string;
   properties: RegionProperties;
   arcs: number[][];
};

type RegionProperties = {
   'name:en': string;
   'name:ar': string;
   name: string;
};

type Transform = {
   scale: [number, number];
   translate: [number, number];
};
