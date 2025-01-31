export type TopologyWolrd = {
   type: 'Topology';
   objects: {
      countries: GeometryCollection;
      land: GeometryCollection;
   };
   arcs: number[][][];
};

type GeometryCollection = {
   type: 'GeometryCollection';
   geometries: Geometry[];
};

type Geometry = {
   type: 'Polygon' | 'MultiPolygon';
   arcs: number[][][];
   id?: string;
   properties?: {
      name: string;
   };
};
