// src/pages/admin/AdminProducts.jsx
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useSelector, useDispatch } from "react-redux"
import {
  setProducts,
  setLoading,
  setError,
} from "../../../lib/redux/slices/productsSlice"
import { MOCK_PRODUCTS } from "../../../lib/mock-data"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Card } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { toast } from "sonner"
import {
  Plus,
  Search,
  Package,
  DollarSign,
  Tag,
  Trash2,
  Edit2,
} from "lucide-react"

export default function AdminProducts() {
  const dispatch = useDispatch()

  // Get products from Redux (will include MOCK_PRODUCTS + any added)
  const products = useSelector((state) => state.products?.items || [])
  const loading = useSelector((state) => state.products?.loading)

  const [searchQuery, setSearchQuery] = useState("")
  const [showAddForm, setShowAddForm] = useState(false)
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category: "",
    brand: "",
    description: "",
    inStock: true,
  })

  // Load MOCK_PRODUCTS into Redux on first mount
  useEffect(() => {
    if (products.length === 0) {
      dispatch(setProducts(MOCK_PRODUCTS))
    }
  }, [products.length, dispatch])

  const filteredProducts = products.filter((p) =>
    p.name?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const generateId = () => "prod_" + Date.now() + Math.floor(Math.random() * 1000)

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price) {
      toast.error("Name and price are required")
      return
    }

    const product = {
      id: generateId(),
      name: newProduct.name.trim(),
      description: newProduct.description || "No description",
      price: parseFloat(newProduct.price),
      image: newProduct.image || "/images/products/placeholder.jpg",
      category: newProduct.category || "General",
      brand: newProduct.brand || "Pharmtish",
      inStock: newProduct.inStock,
      rating: 4.5,
      reviews: 0,
      activeIngredients: "",
      instructions: "",
      sideEffects: "",
      dosage: "",
    }

    // Add to Redux
    dispatch(setProducts([...products, product]))
    toast.success("Product added!")

    setNewProduct({
      name: "",
      price: "",
      category: "",
      brand: "",
      description: "",
      inStock: true,
    })
    setShowAddForm(false)
  }

  const handleDelete = (id) => {
    if (!confirm("Delete this product?")) return
    dispatch(setProducts(products.filter((p) => p.id !== id)))
    toast.success("Product deleted")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-foreground mb-2">
              Products Management
            </h1>
            <p className="text-lg text-muted-foreground">
              {products.length} product{products.length !== 1 ? "s" : ""} in your store
            </p>
          </div>

          <Button
            onClick={() => setShowAddForm(!showAddForm)}
            size="lg"
            className="bg-primary hover:bg-primary/90 shadow-xl"
          >
            {showAddForm ? "Cancel" : (
              <>
                <Plus className="mr-3 h-6 w-6" />
                Add Product
              </>
            )}
          </Button>
        </div>

        {/* Add Form */}
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-10"
          >
            <Card className="p-8 border-border shadow-2xl bg-card/95 backdrop-blur">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Package className="h-8 w-8 text-primary" />
                Add New Product
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                <Input
                  placeholder="Product Name"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="h-14 text-lg"
                />
                <Input
                  type="number"
                  placeholder="Price (L.E)"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  className="h-14 text-lg"
                />
                <Input
                  placeholder="Category"
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                  className="h-14 text-lg"
                />
                <Input
                  placeholder="Brand"
                  value={newProduct.brand}
                  onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })}
                  className="h-14 text-lg"
                />
                <Input
                  placeholder="Short description (optional)"
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  className="h-14 text-lg md:col-span-2"
                />
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={newProduct.inStock}
                    onChange={(e) => setNewProduct({ ...newProduct, inStock: e.target.checked })}
                    className="w-6 h-6 text-primary rounded"
                  />
                  <label className="text-lg font-medium">In Stock</label>
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <Button
                  onClick={handleAddProduct}
                  size="lg"
                  className="flex-1 bg-primary hover:bg-primary/90 shadow-xl"
                >
                  Add Product
                </Button>
                <Button
                  onClick={() => setShowAddForm(false)}
                  variant="outline"
                  size="lg"
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Search */}
        <div className="relative mb-8">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-16 h-16 text-lg bg-card/80 backdrop-blur border-border shadow-xl"
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
                  <td className="py-3 px-4 font-medium text-foreground">
                    {product.price.toFixed(2)} L.E
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        product.inStock
                          ? "bg-green-500/10 text-green-700 border-green-500/30"
                          : "bg-red-500/10 text-red-700 border-red-500/30"
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
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="p-2 rounded hover:bg-destructive/10 text-destructive transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <Package className="w-20 h-20 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-xl text-muted-foreground">No products found</p>
            </div>
          )}
        </Card>
      </motion.div>
    </div>
  )
}