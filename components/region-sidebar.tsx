import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import type { CategoryStats } from "@/types/region"

interface StatCardProps {
  title: string
  data: CategoryStats
  unit?: string
}

function StatCard({ title, data, unit = "" }: StatCardProps) {
  return (
    <Card className="bg-[#2A3B37]">
      <CardContent className="p-4">
        <h3 className="text-sm font-medium text-[#4FD1C5] mb-4">{title}</h3>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <div className="text-xl font-bold text-white">{data.aquaculture}</div>
            <div className="text-xs text-[#4FD1C5]">
              Aquaculture {unit && <span className="text-[#4FD1C5]">{unit}</span>}
            </div>
          </div>
          <div>
            <div className="text-xl font-bold text-white">{data.conchyliculture}</div>
            <div className="text-xs text-[#4FD1C5]">
              Conchyliculture {unit && <span className="text-[#4FD1C5]">{unit}</span>}
            </div>
          </div>
          <div>
            <div className="text-xl font-bold text-white">{data.pisciculture}</div>
            <div className="text-xs text-[#4FD1C5]">
              Pisciculture {unit && <span className="text-[#4FD1C5]">{unit}</span>}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function RegionSidebar({ regionName }: { regionName: string | null }) {

  return (
    <div className="w-[320px] bg-[#1A2421] text-white p-6 h-screen overflow-y-auto">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-6">{regionName}</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-[#4FD1C5]">Type délevage</label>
              <Select>
                <SelectTrigger className="w-full mt-2 bg-[#2A3B37] border-0">
                  <SelectValue placeholder="Filtrer par type d'élevage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les types</SelectItem>
                  <SelectItem value="aquaculture">Aquaculture</SelectItem>
                  <SelectItem value="conchyliculture">Conchyliculture</SelectItem>
                  <SelectItem value="pisciculture">Pisciculture</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <StatCard
          title="Superficie libre"
          data={{
            aquaculture: 1000,
            conchyliculture: 2000,
            pisciculture: 8000,
          }}
          unit="Ha"
        />

        <StatCard
          title="Nombre de parcelles"
          data={{
            aquaculture: 100,
            conchyliculture: 350,
            pisciculture: 456,
          }}
        />

        <StatCard
          title="Projets autorisés"
          data={{
            aquaculture: 150,
            conchyliculture: 200,
            pisciculture: 150,
          }}
        />

        <StatCard
          title="Projets installés"
          data={{
            aquaculture: 88,
            conchyliculture: 96,
            pisciculture: 56,
          }}
        />

        <StatCard
          title="Production estimée"
          data={{
            aquaculture: 88,
            conchyliculture: 96,
            pisciculture: 56,
          }}
        />

        <StatCard
          title="Investissement estimé"
          data={{
            aquaculture: 88,
            conchyliculture: 96,
            pisciculture: 56,
          }}
        />

        <StatCard
          title="Emploi estimé"
          data={{
            aquaculture: 88,
            conchyliculture: 96,
            pisciculture: 56,
          }}
        />
      </div>
    </div>
  )
}

