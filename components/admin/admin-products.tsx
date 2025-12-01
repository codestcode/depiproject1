"use client"

import { useState } from "react"
import { MOCK_PRODUCTS } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Edit2, Trash2, Plus, Search } from "lucide-react"

export default function AdminProducts() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showAddForm, setShowAddForm] = useState(false)
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category: "",
    inStock: true,
  })

  const filteredProducts = MOCK_PRODUCTS.filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const handleAddProduct = () => {
    // Handle add product logic
    setNewProduct({ name: "", price: "", category: "", inStock: true })
    setShowAddForm(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-foreground">Products Management</h2>
        <Button onClick={() => setShowAddForm(!showAddForm)} className="bg-primary hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>

      {showAddForm && (
        <Card className="p-6 border-border space-y-4">
          <h3 className="font-bold text-foreground">Add New Product</h3>
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Product name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              className="bg-card border-border"
            />
            <Input
              placeholder="Price"
              type="number"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              className="bg-card border-border"
            />
            <Input
              placeholder="Category"
              value={newProduct.category}
              onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
              className="bg-card border-border"
            />
            <select
              value={newProduct.inStock ? "in-stock" : "out-of-stock"}
              onChange={(e) => setNewProduct({ ...newProduct, inStock: e.target.value === "in-stock" })}
              className="px-3 py-2 rounded-lg border border-border bg-card"
            >
              <option value="in-stock">In Stock</option>
              <option value="out-of-stock">Out of Stock</option>
            </select>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleAddProduct} className="bg-primary hover:bg-primary/90">
              Add Product
            </Button>
            <Button onClick={() => setShowAddForm(false)} variant="outline" className="border-border">
              Cancel
            </Button>
          </div>
        </Card>
      )}

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-card border-border"
        />
      </div>

      {/* Products Table */}
      <Card className="p-6 border-border overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 font-semibold text-foreground">Name</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Category</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Price</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Stock</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id} className="border-b border-border hover:bg-muted/50">
                <td className="py-3 px-4 font-medium text-foreground">{product.name}</td>
                <td className="py-3 px-4 text-muted-foreground">{product.category}</td>
                <td className="py-3 px-4 font-medium text-foreground">${product.price.toFixed(2)}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      product.inStock ? "bg-secondary/20 text-secondary" : "bg-destructive/20 text-destructive"
                    }`}
                  >
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex gap-2">
                    <button className="p-2 rounded hover:bg-primary/10 text-primary transition-colors">
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button className="p-2 rounded hover:bg-destructive/10 text-destructive transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}
