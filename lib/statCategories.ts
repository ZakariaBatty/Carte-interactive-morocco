export const statCategories = [
   { key: 'superficieLibre', label: 'Superficie libre', unit: 'Ha' },
   { key: 'nombreParcelles', label: 'Nombre de parcelles' },
   { key: 'projetsAutorises', label: 'Projets autorisés' },
   { key: 'projetsInstalles', label: 'Projets installés' },
   { key: 'productionEstimee', label: 'Production Potentielle' },
   { key: 'investissementEstime', label: 'Investissement Potentiel' },
   { key: 'emploiEstime', label: 'Emplois Prévus' },
];

export function formatNumber(num: number): string {
   const parts = num.toString().split('.');
   parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ').trim();
   return parts.join('.');
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
