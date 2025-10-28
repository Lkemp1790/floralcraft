"use client";
import React, { useMemo } from "react";
import { productDummyData } from "@/lib/utils";
import ProductCard from "@/components/ui/productCard";
import { useQueryState, parseAsArrayOf, parseAsStringEnum, parseAsString } from "nuqs";

type PriceRange = "any" | "under-30" | "30-60" | "60-plus";

const ALL_COLLECTIONS = [
  "Aqua Bouquet",
  "Arrangements",
  "Baskets",
  "Hand-tied Bouquets",
];

const ALL_TYPES = ["Bouquet", "Flowers", "Plants"] as const;
const ALL_FLOWERS = ["Rose", "Lily", "Tulip", "Peony", "Sunflower"] as const;

type SortKey = "relevance" | "price-asc" | "price-desc" | "newest";

export default function ProductsPage() {
  const [category, setCategory] = useQueryState(
    "category",
    parseAsString.withDefault("")
  );
  const [collections, setCollections] = useQueryState(
    "collections",
    parseAsArrayOf(parseAsString).withDefault([])
  );
  const [types, setTypes] = useQueryState(
    "types",
    parseAsArrayOf(parseAsString).withDefault([])
  );
  const [flowers, setFlowers] = useQueryState(
    "flowers",
    parseAsArrayOf(parseAsString).withDefault([])
  );
  const [price, setPrice] = useQueryState(
    "price",
    parseAsStringEnum(["any", "under-30", "30-60", "60-plus"] as const).withDefault("any")
  );
  const [sort, setSort] = useQueryState(
    "sort",
    parseAsStringEnum(["relevance", "price-asc", "price-desc", "newest"] as const).withDefault("relevance")
  );

  const filtered = useMemo(() => {
    return productDummyData.filter((p) => {
      const byType = types.length === 0 || types.some((t: string) => p.categories.includes(t));
      const byFlower = flowers.length === 0 || flowers.some((f: string) => p.flowerTypes.includes(f));
      const byPrice =
        price === "any" ||
        (price === "under-30" && p.price < 30) ||
        (price === "30-60" && p.price >= 30 && p.price <= 60) ||
        (price === "60-plus" && p.price > 60);
      // Filter by category if present - map id to collection name
      const byCategory = !category || collections.includes(category);
      // collections placeholder; attach via future data. For now, ignore or match any
      const byCollection = collections.length === 0 || true;
      return byType && byFlower && byPrice && byCollection && byCategory;
    }).sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      // newest/relevance not meaningful for dummy data – keep original order
      return 0;
    });
  }, [collections, types, flowers, price, sort, category]);

  const toggleIn = (arr: string[], value: string, setter: (v: string[]) => void) => {
    setter(arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value]);
  };

  return (
    <main>
      {/* Top gradient banner for visual identity */}
      <section className="relative w-full pt-24 pb-10">
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#0D383B] via-[#0D383B] to-[#142424]"
          style={{ background: 'linear-gradient(to right, #0D383B 39%, #142424 100%)' }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-serif font-semibold text-white">Our full collection</h1>
          <p className="mt-2 text-teal-100">Browse by collection, price, type, or flowers.</p>
        </div>
      </section>

      {/* Content */}
      <section className="w-full py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Mobile controls */}
          <div className="lg:hidden mb-6 flex items-center justify-between gap-3">
            <button
              onClick={() => document.getElementById('filters-drawer')?.classList.remove('translate-y-full')}
              className="flex-1 px-4 py-2 rounded-lg border border-[#0D383B]/20 text-[#0D383B] bg-white shadow-sm"
            >
              Filters
            </button>
            <button
              onClick={() => document.getElementById('sort-drawer')?.classList.remove('translate-y-full')}
              className="flex-1 px-4 py-2 rounded-lg border border-[#0D383B]/20 text-[#0D383B] bg-white shadow-sm"
            >
              Sort
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-8 hidden lg:block">
            <div className="rounded-xl border border-[#0D383B]/10 bg-white shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-[#0D383B]/10">
                <h2 className="text-xl font-serif text-[#0D383B]">Collections</h2>
              </div>
              <div className="p-5 grid gap-3">
                {ALL_COLLECTIONS.map((c) => (
                  <label key={c} className="flex items-center gap-3 text-sm text-[#0D383B]">
                    <input
                      type="checkbox"
                      checked={collections.includes(c)}
                      onChange={() => toggleIn(collections, c, setCollections)}
                      className="h-4 w-4 rounded border-[#0D383B]/30 text-[#0D383B] focus:ring-[#5DADAC]"
                    />
                    {c}
                  </label>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-[#0D383B]/10 bg-white shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-[#0D383B]/10">
                <h2 className="text-xl font-serif text-[#0D383B]">Price</h2>
              </div>
              <div className="p-5 grid gap-3 text-sm text-[#0D383B]">
                {([
                  { id: "any", label: "Any" },
                  { id: "under-30", label: "Under £30" },
                  { id: "30-60", label: "£30–£60" },
                  { id: "60-plus", label: "Over £60" },
                ] as { id: PriceRange; label: string }[]).map((opt) => (
                  <label key={opt.id} className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="price"
                      checked={price === opt.id}
                      onChange={() => setPrice(opt.id)}
                      className="h-4 w-4 border-[#0D383B]/30 text-[#0D383B] focus:ring-[#5DADAC]"
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-[#0D383B]/10 bg-white shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-[#0D383B]/10">
                <h2 className="text-xl font-serif text-[#0D383B]">Type</h2>
              </div>
              <div className="p-5 grid gap-3">
                {ALL_TYPES.map((t) => (
                  <label key={t} className="flex items-center gap-3 text-sm text-[#0D383B]">
                    <input
                      type="checkbox"
                      checked={types.includes(t)}
                      onChange={() => toggleIn(types, t, setTypes)}
                      className="h-4 w-4 rounded border-[#0D383B]/30 text-[#0D383B] focus:ring-[#5DADAC]"
                    />
                    {t}
                  </label>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-[#0D383B]/10 bg-white shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-[#0D383B]/10">
                <h2 className="text-xl font-serif text-[#0D383B]">Flowers</h2>
              </div>
              <div className="p-5 grid gap-3">
                {ALL_FLOWERS.map((f) => (
                  <label key={f} className="flex items-center gap-3 text-sm text-[#0D383B]">
                    <input
                      type="checkbox"
                      checked={flowers.includes(f)}
                      onChange={() => toggleIn(flowers, f, setFlowers)}
                      className="h-4 w-4 rounded border-[#0D383B]/30 text-[#0D383B] focus:ring-[#5DADAC]"
                    />
                    {f}
                  </label>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                setCollections([]); setTypes([]); setFlowers([]); setPrice("any");
              }}
              className="w-full px-4 py-2 rounded-lg border border-[#0D383B]/20 text-[#0D383B] hover:bg-[#0D383B]/5 transition-colors"
            >
              Reset filters
            </button>
          </aside>

          {/* Results */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <div className="hidden sm:block" />
              <div className="flex items-center gap-2 hidden lg:flex">
                <label className="text-sm text-[#0D383B]/70">Sort by</label>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortKey)}
                  className="rounded-md border border-[#0D383B]/20 text-[#0D383B] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#5DADAC] bg-white"
                >
                  <option value="relevance">Relevance</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="newest">Newest</option>
                </select>
                <p className="text-sm text-[#0D383B]/70">{filtered.length} items</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
          </div>

          {/* Mobile drawers */}
          <div id="filters-drawer" className="lg:hidden fixed inset-x-0 bottom-0 z-50 translate-y-full transition-transform duration-300">
            <div className="bg-white rounded-t-2xl shadow-2xl border border-[#0D383B]/10 max-h-[80vh] overflow-y-auto">
              <div className="p-4 border-b border-[#0D383B]/10 flex items-center justify-between">
                <h3 className="text-lg font-serif text-[#0D383B]">Filters</h3>
                <button
                  onClick={() => document.getElementById('filters-drawer')?.classList.add('translate-y-full')}
                  className="px-3 py-1.5 rounded-md border border-[#0D383B]/20 text-[#0D383B]"
                >Close</button>
              </div>
              <div className="p-4 space-y-6">
                {/* Collections */}
                <div className="rounded-xl border border-[#0D383B]/10 bg-white overflow-hidden">
                  <div className="px-4 py-3 border-b border-[#0D383B]/10"><h4 className="font-serif text-[#0D383B]">Collections</h4></div>
                  <div className="p-4 grid gap-3">
                    {ALL_COLLECTIONS.map((c) => (
                      <label key={c} className="flex items-center gap-3 text-sm text-[#0D383B]">
                        <input type="checkbox" checked={collections.includes(c)} onChange={() => toggleIn(collections, c, setCollections)} className="h-4 w-4 rounded border-[#0D383B]/30 text-[#0D383B] focus:ring-[#5DADAC]" />
                        {c}
                      </label>
                    ))}
                  </div>
                </div>
                {/* Price */}
                <div className="rounded-xl border border-[#0D383B]/10 bg-white overflow-hidden">
                  <div className="px-4 py-3 border-b border-[#0D383B]/10"><h4 className="font-serif text-[#0D383B]">Price</h4></div>
                  <div className="p-4 grid gap-3 text-sm text-[#0D383B]">
                    {([
                      { id: "any", label: "Any" },
                      { id: "under-30", label: "Under £30" },
                      { id: "30-60", label: "£30–£60" },
                      { id: "60-plus", label: "Over £60" },
                    ] as { id: PriceRange; label: string }[]).map((opt) => (
                      <label key={opt.id} className="flex items-center gap-3">
                        <input type="radio" name="m-price" checked={price === opt.id} onChange={() => setPrice(opt.id)} className="h-4 w-4 border-[#0D383B]/30 text-[#0D383B] focus:ring-[#5DADAC]" />
                        {opt.label}
                      </label>
                    ))}
                  </div>
                </div>
                {/* Type */}
                <div className="rounded-xl border border-[#0D383B]/10 bg-white overflow-hidden">
                  <div className="px-4 py-3 border-b border-[#0D383B]/10"><h4 className="font-serif text-[#0D383B]">Type</h4></div>
                  <div className="p-4 grid gap-3">
                    {ALL_TYPES.map((t) => (
                      <label key={t} className="flex items-center gap-3 text-sm text-[#0D383B]">
                        <input type="checkbox" checked={types.includes(t)} onChange={() => toggleIn(types, t, setTypes)} className="h-4 w-4 rounded border-[#0D383B]/30 text-[#0D383B] focus:ring-[#5DADAC]" />
                        {t}
                      </label>
                    ))}
                  </div>
                </div>
                {/* Flowers */}
                <div className="rounded-xl border border-[#0D383B]/10 bg-white overflow-hidden">
                  <div className="px-4 py-3 border-b border-[#0D383B]/10"><h4 className="font-serif text-[#0D383B]">Flowers</h4></div>
                  <div className="p-4 grid gap-3">
                    {ALL_FLOWERS.map((f) => (
                      <label key={f} className="flex items-center gap-3 text-sm text-[#0D383B]">
                        <input type="checkbox" checked={flowers.includes(f)} onChange={() => toggleIn(flowers, f, setFlowers)} className="h-4 w-4 rounded border-[#0D383B]/30 text-[#0D383B] focus:ring-[#5DADAC]" />
                        {f}
                      </label>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => { setCollections([]); setTypes([]); setFlowers([]); setPrice("any"); }}
                  className="w-full px-4 py-2 rounded-lg border border-[#0D383B]/20 text-[#0D383B] hover:bg-[#0D383B]/5"
                >Reset filters</button>
              </div>
            </div>
          </div>

          <div id="sort-drawer" className="lg:hidden fixed inset-x-0 bottom-0 z-50 translate-y-full transition-transform duration-300">
            <div className="bg-white rounded-t-2xl shadow-2xl border border-[#0D383B]/10">
              <div className="p-4 border-b border-[#0D383B]/10 flex items-center justify-between">
                <h3 className="text-lg font-serif text-[#0D383B]">Sort</h3>
                <button onClick={() => document.getElementById('sort-drawer')?.classList.add('translate-y-full')} className="px-3 py-1.5 rounded-md border border-[#0D383B]/20 text-[#0D383B]">Close</button>
              </div>
              <div className="p-4 grid gap-3 text-sm text-[#0D383B]">
                {([
                  { id: "relevance", label: "Relevance" },
                  { id: "price-asc", label: "Price: Low to High" },
                  { id: "price-desc", label: "Price: High to Low" },
                  { id: "newest", label: "Newest" },
                ] as { id: SortKey; label: string }[]).map((opt) => (
                  <label key={opt.id} className="flex items-center gap-3">
                    <input type="radio" name="m-sort" checked={sort === opt.id} onChange={() => setSort(opt.id)} className="h-4 w-4 border-[#0D383B]/30 text-[#0D383B] focus:ring-[#5DADAC]" />
                    {opt.label}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}


