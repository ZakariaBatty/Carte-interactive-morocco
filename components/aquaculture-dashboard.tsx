"use client"

import { useState, useMemo } from "react"
import { Card } from "@/components/ui/card"
import { aquacultureData } from "@/public/data/aquaculture"
import { statCategories, calculateTotal } from "@/lib/statCategories"

export function AquacultureDashboard({ regionName, stats = "MA_00" }: { regionName: string | null; stats: string }) {
  const [selectedType, setSelectedType] = useState<string | "all">("all")

  const filteredCategories = useMemo(
    () =>
      selectedType === "all"
        ? aquacultureData.categories
        : aquacultureData.categories.filter((cat) => cat.id === selectedType),
    [selectedType],
  )

  const regionData = aquacultureData[stats as keyof typeof aquacultureData] as
    | { [key: string]: { [key: string]: number } }
    | undefined

  return (
    <Card className="absolute top-0 right-0 text-white p-6 bg-black/30 h-screen max-h-screen rounded-none overflow-y-auto w-full sm:w-1/3 lg:w-1/5">
      <div className="space-y-6 h-full">
        <div>
          <h2 className="text-lg sm:text-xl lg:text-2xl mb-4 p-5 text-center bg-[#1e3f44] font-bold text-[#46bfdd]">
            {regionName || "MOROCCO"}
          </h2>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full bg-[#2d3f46] text-white font-bold p-2 rounded-md border border-[#4fd1c5]/20 text-sm sm:text-base"
          >
            <option value="all">Filtrer par type d&apos;élevage</option>
            {aquacultureData.categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-4">
          {statCategories.map((stat) => (
            <StatCategory
              key={stat.key}
              stat={stat}
              filteredCategories={filteredCategories}
              regionData={regionData}
              selectedType={selectedType}
            />
          ))}
        </div>
      </div>
    </Card>
  )
}

type StatCategoryProps = {
  stat: (typeof statCategories)[number]
  filteredCategories: typeof aquacultureData.categories
  regionData: { [key: string]: { [key: string]: number } } | undefined
  selectedType: string | "all"
}

function StatCategory({ stat, filteredCategories, regionData }: StatCategoryProps) {
  const total = calculateTotal(regionData, stat.key)

  const formatValue = (value: number | string): string => {
    const numValue = typeof value === "string" ? Number.parseFloat(value) : value
    return numValue.toFixed(2)
  }

  return (
    <div className="rounded-md overflow-hidden">
      <div className="p-4 text-white">
        <div className="text-2xl text-[#46bfdd] font-semibold mb-4 border-b-2 border-white pb-2">
          {stat.label} {total}
          {stat.unit && <span className="ml-1">{stat.unit}</span>}
        </div>
        <div className="grid grid-cols-3 gap-4">
          {filteredCategories
            .filter((category) => {
              const value = regionData?.[category.id]?.[stat.key]
              return category.name !== "Creveticulture" || value !== 0
            })
            .map((category) => (
              <div key={category.id} className="text-center">
                <div className="text-sm text-gray-300 mb-1">{category.name}</div>
                <div className="text-xl font-bold">
                  {formatValue(regionData?.[category.id]?.[stat.key] ?? "0")}
                  {stat.unit && <span className="ml-1">{stat.unit}</span>}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

