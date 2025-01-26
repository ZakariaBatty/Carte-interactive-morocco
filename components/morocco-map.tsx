/* eslint-disable @next/next/no-img-element */
"use client"

import { useEffect, useRef, useState } from "react"
import * as d3 from "d3"
import * as topojson from "topojson-client"
import { RegionStats } from "./region-stats"
import regionsData from "../data/regions-data.json"
import { type Region } from "@/types/region"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet"
import { RegionSidebar } from "./region-sidebar"

export function MoroccoMap() {
  const svgRef = useRef<SVGSVGElement>(null)
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (!svgRef.current) return

    const width = 800
    const height = 800

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto;")

    svg.selectAll("*").remove()

    const loadMap = async () => {
      const [worldData, moroccoData] = await Promise.all([
        d3.json<any>("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"),
        d3.json<any>("https://cdn.jsdelivr.net/npm/morocco-map/data/regions.json"),
      ])

      if (!worldData || !moroccoData) return

      const world = topojson.feature(worldData, worldData.objects.countries) as any
      const morocco = topojson.feature(moroccoData, moroccoData.objects.regions) as any

      const projection = d3.geoMercator().fitSize([width, height], morocco) as any

      const pathGenerator = d3.geoPath().projection(projection) as any

      const mapGroup = svg.append("g")

      mapGroup.append("rect").attr("width", width).attr("height", height).attr("fill", "#0c4a6e")

      mapGroup
        .append("g")
        .selectAll("path")
        .data(world.features)
        .enter()
        .append("path")
        .attr("d", pathGenerator)
        .attr("fill", (d: any) => {
          if (d.properties.continent === "Africa") {
            return "#d4b483"
          }
          return "#d4b483"
        })
        .attr("stroke", "white")
        .attr("stroke-width", 0.5)

      mapGroup
        .append("g")
        .selectAll("path")
        .data(morocco.features)
        .enter()
        .append("path")
        .attr("d", pathGenerator)
        .attr("fill", "#d4b483")
        .attr("stroke", "white")
        .attr("stroke-width", 0.5)
        .attr("class", "region transition-colors duration-200")
        .style("cursor", "pointer")
        .on("mouseover", function () {
          d3.select(this).attr("fill", "#c19d6f")
        })
        .on("mouseout", function () {
          d3.select(this).attr("fill", "#d4b483")
        })
        .on("click", (event, d) => {
          setSelectedRegion(d as Region)
          setIsOpen(true)

          if ((d as Region).properties.id === "souss-massa") {
            const center = pathGenerator.centroid(d)
            const radius = 100

            svg.selectAll(".radial-viz").remove()

            const radialGroup = svg
              .append("g")
              .attr("class", "radial-viz")
              .attr("transform", `translate(${center[0]}, ${center[1]})`)

            const zones = [
              { radius: radius * 0.4, color: "#38bdf8" },
              { radius: radius * 0.6, color: "#7dd3fc" },
              { radius: radius * 0.8, color: "#bae6fd" },
              { radius: radius, color: "#e0f2fe" },
            ]

            zones.forEach((zone, i) => {
              radialGroup
                .append("circle")
                .attr("r", zone.radius)
                .attr("fill", "none")
                .attr("stroke", zone.color)
                .attr("stroke-width", 2)
                .attr("opacity", 0.7)
            })
          }
        })
    }

    loadMap()
  }, [])

  const regionData = selectedRegion
    ? regionsData.regions[selectedRegion.properties.id as keyof typeof regionsData.regions]
    : null
  console.log("ziko", regionData)
  return (
    <>
      <main className="flex-1">
        <div className="mx-auto">
          <div className="relative w-full mx-auto">
            <svg ref={svgRef} className="w-full max-h-screen"></svg>
          </div>
        </div>
      </main>
      <RegionSidebar />
    </>
  )
}

