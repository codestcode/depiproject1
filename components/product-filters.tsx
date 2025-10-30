"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { X, Filter } from "lucide-react"
import { categories, brands } from "@/lib/products"

interface ProductFiltersProps {
  selectedCategory: string
  selectedBrands: string[]
  priceRange: [number, number]
  inStockOnly: boolean
  onCategoryChange: (category: string) => void
  onBrandChange: (brands: string[]) => void
  onPriceRangeChange: (range: [number, number]) => void
  onInStockChange: (inStock: boolean) => void
  onClearFilters: () => void
}

export function ProductFilters({
  selectedCategory,
  selectedBrands,
  priceRange,
  inStockOnly,
  onCategoryChange,
  onBrandChange,
  onPriceRangeChange,
  onInStockChange,
  onClearFilters,
}: ProductFiltersProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleBrandToggle = (brand: string) => {
    if (selectedBrands.includes(brand)) {
      onBrandChange(selectedBrands.filter((b) => b !== brand))
    } else {
      onBrandChange([...selectedBrands, brand])
    }
  }

  const activeFiltersCount =
    (selectedCategory !== "all" ? 1 : 0) +
    selectedBrands.length +
    (inStockOnly ? 1 : 0) +
    (priceRange[0] > 0 || priceRange[1] < 100 ? 1 : 0)

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
        <Button variant="outline" onClick={() => setIsOpen(!isOpen)} className="w-full justify-between">
          <div className="flex items-center">
            <Filter className="h-4 w-4 mr-2" />
            Filters
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {activeFiltersCount}
              </Badge>
            )}
          </div>
        </Button>
      </div>

      {/* Filters Panel */}
      <div className={`space-y-6 ${isOpen ? "block" : "hidden lg:block"}`}>
        {/* Active Filters */}
        {activeFiltersCount > 0 && (
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm">Active Filters</CardTitle>
                <Button variant="ghost" size="sm" onClick={onClearFilters} className="text-xs">
                  Clear All
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex flex-wrap gap-2">
                {selectedCategory !== "all" && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    {categories.find((c) => c.id === selectedCategory)?.name}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => onCategoryChange("all")} />
                  </Badge>
                )}
                {selectedBrands.map((brand) => (
                  <Badge key={brand} variant="secondary" className="flex items-center gap-1">
                    {brand}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => handleBrandToggle(brand)} />
                  </Badge>
                ))}
                {inStockOnly && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    In Stock Only
                    <X className="h-3 w-3 cursor-pointer" onClick={() => onInStockChange(false)} />
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Categories */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={category.id}
                    checked={selectedCategory === category.id}
                    onCheckedChange={() => onCategoryChange(category.id)}
                  />
                  <Label htmlFor={category.id} className="flex-1 cursor-pointer flex items-center justify-between">
                    <span>{category.name}</span>
                    <span className="text-xs text-muted-foreground">({category.count})</span>
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Brands */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Brands</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {brands.map((brand) => (
                <div key={brand} className="flex items-center space-x-2">
                  <Checkbox
                    id={brand}
                    checked={selectedBrands.includes(brand)}
                    onCheckedChange={() => handleBrandToggle(brand)}
                  />
                  <Label htmlFor={brand} className="cursor-pointer">
                    {brand}
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Price Range */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Price Range</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Slider
                value={priceRange}
                onValueChange={(value) => onPriceRangeChange(value as [number, number])}
                max={100}
                min={0}
                step={1}
                className="w-full"
              />
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stock Status */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Availability</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Checkbox id="in-stock" checked={inStockOnly} onCheckedChange={onInStockChange} />
              <Label htmlFor="in-stock" className="cursor-pointer">
                In Stock Only
              </Label>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
