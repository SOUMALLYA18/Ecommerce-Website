import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Titte from "../components/Tittle";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [sortOption, setSortOption] = useState("relevance");
  const [showFilter, setShowFilter] = useState(false);

  // Show all products initially
  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  // Apply all filters, including search, category, subcategory, and sort
  useEffect(() => {
    let filtered = [...products];

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(
        (item) =>
          item.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Filter by subcategories
    if (selectedSubcategories.length > 0) {
      filtered = filtered.filter((item) =>
        selectedSubcategories.includes(item.subcategory?.toLowerCase())
      );
    }

    // Search filter
    if (showSearch && search.trim() !== "") {
      const lowerSearch = search.toLowerCase();
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(lowerSearch)
      );
    }

    // Sorting
    if (sortOption === "low-high") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === "high-low") {
      filtered.sort((a, b) => b.price - a.price);
    }

    // If nothing matches, show all products
    if (filtered.length === 0) {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(filtered);
    }
  }, [
    products,
    selectedCategory,
    selectedSubcategories,
    sortOption,
    search,
    showSearch,
  ]);

  const handleCategoryChange = (category) => {
    if (selectedCategory === category) {
      setSelectedCategory("");
    } else {
      setSelectedCategory(category);
    }
  };

  const handleSubcategoryChange = (subcategory) => {
    const lowerSub = subcategory.toLowerCase();
    if (selectedSubcategories.includes(lowerSub)) {
      setSelectedSubcategories(
        selectedSubcategories.filter((sub) => sub !== lowerSub)
      );
    } else {
      setSelectedSubcategories([...selectedSubcategories, lowerSub]);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t border-gray-200">
      {/* Filter Sidebar */}
      <div className="min-w-60">
        <p
          className="my-2 text-xl flex items-center cursor-pointer gap-2 sm:hidden"
          onClick={() => setShowFilter((prev) => !prev)}
        >
          Filters <span>{showFilter ? "▲" : "▼"}</span>
        </p>

        <div
          className={`border border-gray-200 rounded-lg pl-5 py-3 mt-6 ${
            showFilter ? "block" : "hidden"
          } sm:block`}
        >
          {/* Category Filter */}
          <p className="text-gray-600 mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700 mb-5">
            {["Men", "Women", "Kids"].map((cat) => (
              <label key={cat} className="flex gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedCategory === cat}
                  onChange={() => handleCategoryChange(cat)}
                  className="w-3"
                />
                {cat}
              </label>
            ))}
          </div>

          {/* Subcategory Filter */}
          <p className="text-gray-600 mb-3 text-sm font-medium">
            SUBCATEGORIES
          </p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {["topwear", "bottomwear", "winterwear"].map((sub) => (
              <label key={sub} className="flex gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedSubcategories.includes(sub)}
                  onChange={() => handleSubcategoryChange(sub)}
                  className="w-3"
                />
                {sub.charAt(0).toUpperCase() + sub.slice(1)}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Product Display */}
      <div className="flex-1">
        <div className="text-3xl font-semibold text-gray-800 flex justify-between sm:text-2xl mb-4">
          <Titte text1={"All"} text2={"Collections"} />
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border-2 border-gray-300 rounded-lg px-3 py-1 text-sm font-light text-gray-700"
          >
            <option value="relevance">Sort by relevance</option>
            <option value="low-high">Sort by Low to High</option>
            <option value="high-low">Sort by High to Low</option>
          </select>
        </div>

        {showSearch && search && (
          <p className="text-sm text-gray-500 mb-4">
            Showing results for: <strong>{search}</strong>
          </p>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {(filteredProducts.length > 0 ? filteredProducts : products).map(
            (item) => (
              <ProductItem
                key={item._id}
                id={item._id}
                name={item.name}
                image={item.image}
                price={item.price}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Collection;
