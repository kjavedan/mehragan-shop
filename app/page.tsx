"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { SearchInput } from "@/components/search-input"
import { categoriesData } from "@/lib/data"

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredCategories = categoriesData.categories.filter(
    (category) =>
      category.name.includes(searchQuery) ||
      category.subcategories.some(
        (sub) => sub.name.includes(searchQuery) || sub.items.some((item) => item.includes(searchQuery)),
      ),
  )

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <SearchInput
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="جستجو در محصولات..."
        className="max-w-md mx-auto mb-8"
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {filteredCategories.map((category) => (
          <Link key={category.name} href={`/category/${encodeURIComponent(category.name)}`}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardContent className="p-6 text-center">
                <div className="mx-auto mb-3 w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xl font-bold">{category.name.charAt(0)}</span>
                </div>
                <h2 className="text-lg font-semibold text-gray-900">{category.name}</h2>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {filteredCategories.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">هیچ محصولی یافت نشد</p>
        </div>
      )}
    </div>
  )
}
