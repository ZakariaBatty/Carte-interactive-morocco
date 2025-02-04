export const statCategories = [
   { key: 'superficieLibre', label: 'Superficie libre', unit: 'Ha' },
   { key: 'nombreParcelles', label: 'Nombre de parcelles' },
   { key: 'projetsAutorises', label: 'Projets autorisés' },
   { key: 'projetsInstalles', label: 'Projets installés' },
   { key: 'productionEstimee', label: 'Production estimée' },
   { key: 'investissementEstime', label: 'Investissement estimé' },
   { key: 'emploiEstime', label: 'Emploi estimé' },
];

export function formatNumber(num: number): string {
   return num.toLocaleString('de-DE', { maximumFractionDigits: 0 });
}

export function calculateTotal(
   data: { [key: string]: { [key: string]: number } } | undefined,
   statKey: string
): string {
   if (!data) return '0';
   const total = Object.values(data).reduce(
      (total, category) => total + (category[statKey] || 0),
      0
   );
   return formatNumber(Math.round(total));
}
