/* eslint-disable @typescript-eslint/no-explicit-any */
import type { CategoryStats } from "@/types/region"

interface StatRowProps {
  label: string
  data: CategoryStats
  unit?: string
}

function StatRow({ label, data, unit = "" }: StatRowProps) {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-[#4FD1C5]">{label}</h3>
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-xl font-bold text-white">{data.aquaculture}</div>
          <div className="text-xs text-[#4FD1C5]">Aquaculture {unit}</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-white">{data.conchyliculture}</div>
          <div className="text-xs text-[#4FD1C5]">Conchyliculture {unit}</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-white">{data.pisciculture}</div>
          <div className="text-xs text-[#4FD1C5]">Pisciculture {unit}</div>
        </div>
      </div>
    </div>
  )
}

export function RegionStats({ stats }: { stats: any }) {
  console.log(stats)
  return (
    <div className="space-y-6">
      <StatRow label="Superficie libre" data={stats.superficie_libre} unit="Ha" />
      <StatRow label="Nombre de parcelles" data={stats.nombre_parcelles} />
      <StatRow label="Projets autorisés" data={stats.projets_autorises} />
      <StatRow label="Projets installés" data={stats.projets_installes} />
      <StatRow label="Production estimée" data={stats.production_estimee} />
      <StatRow label="Investissement estimé" data={stats.investissement_estime} />
      <StatRow label="Emploi estimé" data={stats.emploi_estime} />
    </div>
  )
}

