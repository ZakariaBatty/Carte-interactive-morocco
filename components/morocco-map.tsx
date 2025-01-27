"use client"

import { useEffect, useRef, useState } from "react"
import * as d3 from "d3"
import * as topojson from "topojson-client"
import type { Region } from "@/types/region"
import { RegionSidebar } from "./region-sidebar"
import { AquacultureDashboard } from "./aquaculture-dashboard"
import ProjectStatisticCard from "./shart-map"
import { motion } from "framer-motion"

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
        .attr("fill", "#d4b483")
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
          const region = d as any
          setSelectedRegion(region)
          setIsOpen(true)

          // Add this line to show an alert with the region name
          // alert(`Clicked region: ${region.properties.name}`)

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

          zones.forEach((zone) => {
            radialGroup
              .append("circle")
              .attr("r", zone.radius)
              .attr("fill", "none")
              .attr("stroke", zone.color)
              .attr("stroke-width", 2)
              .attr("opacity", 0.7)
          })

          // Add text labels
          radialGroup
            .append("text")
            .attr("y", -10)
            .attr("text-anchor", "middle")
            .attr("fill", "black")
            .text("20")
            .style("font-size", "24px")
            .style("font-weight", "bold")

          radialGroup
            .append("text")
            .attr("y", 15)
            .attr("text-anchor", "middle")
            .attr("fill", "black")
            .text("Projets Aquacole")
            .style("font-size", "14px")
            .style("font-weight", "bold")

          radialGroup
            .append("text")
            .attr("y", 35)
            .attr("text-anchor", "middle")
            .attr("fill", "black")
            .text(`${region.properties['name:en']}`)
            .style("font-size", "14px")
            .style("font-weight", "bold")
        })
    }

    loadMap()
  }, [])

  const regionStats = selectedRegion ? selectedRegion.properties['name:en'] : null

  console.log("regionStats", regionStats)
  return (
    <>
      {/* <main className="flex-1 h-full overflow-hidden">
        <div className="mx-auto">
          <div className="relative w-full mx-auto">
            <svg ref={svgRef} className="w-full max-h-screen"></svg>
          </div>
        </div>

      </main>
      */}

      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-[#0c4a6e]"
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          transition={{ duration: 1, delay: 2.5 }}
        />
        <motion.div
          className="absolute inset-0"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          transition={{ duration: 1, delay: 2.5 }}
        >
          <svg ref={svgRef} className="w-full max-h-screen"></svg>
        </motion.div>
      </div>
      <div className="h-full">
        <motion.div
          className="absolute inset-0"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          transition={{ duration: 1, delay: 2.8 }}
        >
          <AquacultureDashboard regionName={regionStats} />
        </motion.div>
      </div>
    </>
  )
}

