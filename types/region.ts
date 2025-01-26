export interface RegionData {
   name: string;
   projects: number;
   stats: {
      superficie_libre: CategoryStats;
      nombre_parcelles: CategoryStats;
      projets_autorises: CategoryStats;
      projets_installes: CategoryStats;
      production_estimee: CategoryStats;
      investissement_estime: CategoryStats;
      emploi_estime: CategoryStats;
   };
   videoUrl: string;
}

export interface CategoryStats {
   aquaculture: number;
   conchyliculture: number;
   pisciculture: number;
}

export interface Region {
   properties: {
      'name:ar': string;
      'name:fr': string;
      'name:en': string;
      id: string;
   };
}
