"use client"

import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

const chartData = [
  { month: "2025-01-01", desktop: 56531 },
  { month: "2025-01-13", desktop: 49605 },
  { month: "2025-01-18", desktop: 52023 },
  { month: "2025-02-02", desktop: 46521 },
  { month: "2025-02-10", desktop: 55050 },
  { month: "2023-02-23", desktop: 59202 },
]

export default function Component() {
  return (
    <div className="p-4 space-y-8 bg-neutral-900 min-h-screen">
      <h2 className="mb-8 sm:mb-16 text-center sm:text-5xl text-white">
        Your portfolio performance
      </h2>
      
      <div className="bg-neutral-800 p-4 rounded shadow flex justify-center">
        <AreaChart
          width={1000}
          height={300}
          data={chartData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="month" stroke="#fff" />
          <YAxis stroke="#fff" />
          <CartesianGrid strokeDasharray="3 3" stroke="#555" />
          <Tooltip
            contentStyle={{ backgroundColor: "#333", borderColor: "#555", color: "#fff" }}
          />
          <Area
            type="monotone"
            dataKey="desktop"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorUv)"
          />
        </AreaChart>
      </div>

      <div className="bg-neutral-800 p-4 rounded shadow overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] text-white">Type</TableHead>
              <TableHead className="text-white">Name</TableHead>
              <TableHead className="text-white">Date</TableHead>
              <TableHead className="text-right text-white">
                Current Value
              </TableHead>
              <TableHead className="text-right text-white">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium text-white">Currency</TableCell>
              <TableCell className="text-white">USD</TableCell>
              <TableCell className="text-white">2024-12-23</TableCell>
              <TableCell className="text-right text-white">
                Rs. 10,00,000
              </TableCell>
              <TableCell className="text-right text-white">
                Rs. 11,00,000
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium text-white">Stock</TableCell>
              <TableCell className="text-white">NTPC</TableCell>
              <TableCell className="text-white">2025-01-12</TableCell>
              <TableCell className="text-right text-white">
                Rs. 3,45,000
              </TableCell>
              <TableCell className="text-right text-white">
                Rs. 2,90,000
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}