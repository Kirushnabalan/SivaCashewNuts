import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Search, SlidersHorizontal } from "lucide-react"
import ProductCard from "@components/product/ProductCard"
import LoadingSpinner from "@components/ui/LoadingSpinner"
import { useDebounce } from "@hooks/useDebounce"
import { PRODUCTS } from "@constants"
import "./ShopPage.css"

const ShopPage = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortOption, setSortOption] = useState("default")
  const [filterVisible, setFilterVisible] = useState(false)

  const debouncedSearchTerm = useDebounce(searchTerm, 300)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        setProducts(PRODUCTS)
        setError(null)
      } catch (error) {
        setError("Failed to load products. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()),
  )

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "name-asc":
        return a.name.localeCompare(b.name)
      case "name-desc":
        return b.name.localeCompare(a.name)
      default:
        return 0
    }
  })

  return (
    <motion.div
      className="shop-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container">
        <motion.div
          className="shop-header"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="page-title">Our Premium Cashews</h1>
          <p className="page-subtitle">
            Discover our handpicked selection of premium cashews, carefully sourced and processed
            to bring you the finest quality and taste.
          </p>
        </motion.div>

        <motion.div
          className="shop-filters"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="search-container">
            <div className="search-input-wrapper">
              <Search className="search-icon" size={20} />
              <input
                type="text"
                className="search-input"
                placeholder="Search our products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="filters-section">
            <button
              className="filter-toggle"
              onClick={() => setFilterVisible(!filterVisible)}
            >
              <SlidersHorizontal size={20} />
              <span>Filters</span>
            </button>

            <select
              className="sort-select"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="default">Default Sorting</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
            </select>
          </div>
        </motion.div>

        <div className="shop-content">
          {loading ? (
            <div className="loading-container">
              <LoadingSpinner size="lg" />
            </div>
          ) : error ? (
            <motion.div
              className="error-message"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <p>{error}</p>
            </motion.div>
          ) : (
            <>
              <motion.div
                className="products-count"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <p>Showing {sortedProducts.length} products</p>
              </motion.div>

              <motion.div
                className="products-grid"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {sortedProducts.length > 0 ? (
                  sortedProducts.map((product, index) => (
                    <motion.div
                      key={product._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))
                ) : (
                  <div className="no-products">
                    <p>No products found matching your search.</p>
                  </div>
                )}
              </motion.div>
            </>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default ShopPage
