"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { aquacultureData } from "@/data/aquaculture"

export function AquacultureDashboard({ regionName, stats = "MA_00" }: { regionName: string | null; stats: string }) {

  const [selectedType, setSelectedType] = useState<string | "all">("all")

  const statCategories = [
    { key: "superficieLibre", label: "Superficie libre", unit: "Ha" },
    { key: "nombreParcelles", label: "Nombre de parcelles" },
    { key: "projetsAutorises", label: "Projets autorisés" },
    { key: "projetsInstalles", label: "Projets installés" },
    { key: "productionEstimee", label: "Production estimée" },
    { key: "investissementEstime", label: "Investissement estimé" },
    { key: "emploiEstime", label: "Emploi estimé" },
  ]

  const filteredCategories =
    selectedType === "all"
      ? aquacultureData.categories
      : aquacultureData.categories.filter((cat) => cat.id === selectedType)

  return (
    <Card className="absolute top-0 right-0 text-white p-6 bg-black/30 h-screen rounded-none overflow-y-auto w-1/5">
      <div className="space-y-6 h-full">
        <div>
          <h2 className="text-2xl mb-4 p-5 text-center bg-[#1e3f44]  font-bold text-[#46bfdd]">{regionName || "MOROCO"}</h2>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full bg-[#2d3f46] text-white font-bold p-2 rounded-md border border-[#4fd1c5]/20"
          >
            <option value="all">Filtrer par type d&apos;élevage</option>
            {aquacultureData.categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        {statCategories.map((stat) => (
          <div key={stat.key}>
            <h3 className="font-bold text-[14px] leading-[20px] text-[#46BFDE]  mb-1">{stat.label}</h3>
            <div className={`grid grid-cols-1 gap-2 ${filteredCategories.length > 1 ? "grid-cols-3" : ""}`}>
              {filteredCategories.map((category) => (
                <div key={category.id} className={`flex flex-col justify-between ${filteredCategories.length > 1 ? " items-center" : " items-left"} border-b border-[#4fd1c5]/20 pb-2`}>
                  <span className="font-light text-[12px] leading-[14px]  ">{category.name}</span>
                  <span className="text-white font-bold text-[17px] leading-[14px] mt-2">
                    {(aquacultureData[stats as keyof typeof aquacultureData] as { [key: string]: { [key: string]: number } })?.[category.id]?.[stat.key] ?? "N/A"}
                    {stat.unit && <span className="ml-1">{stat.unit}</span>}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

