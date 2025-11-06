import { Product, columns } from "./columns";
import { DataTable } from "./data-table";

const getData = async (): Promise<Product[]> => {
  return [
    {
      id: "prod_001",
      name: "Rose Bouquet",
      price: 49.99,
      images: [
        "https://images.unsplash.com/photo-1518895949257-7621c3c786d7",
        "https://images.unsplash.com/photo-1520763185298-1b434c9190e4",
      ],
      categories: ["Bouquets", "Roses"],
      flowerTypes: ["Roses"],
      description: "Beautiful red rose bouquet",
      stock: 25,
    },
    {
      id: "prod_002",
      name: "Tulip Arrangement",
      price: 39.99,
      images: [
        "https://images.unsplash.com/photo-1520763185298-1b434c9190e4",
      ],
      categories: ["Arrangements", "Tulips"],
      flowerTypes: ["Tulips"],
      description: "Colorful tulip arrangement",
      stock: 18,
    },
    {
      id: "prod_003",
      name: "Sunflower Bundle",
      price: 34.99,
      images: [
        "https://images.unsplash.com/photo-1597848212624-e59356450a44",
        "https://images.unsplash.com/photo-1606041008023-472dfb5e530f",
        "https://images.unsplash.com/photo-1563241527-3004b7be0ffd",
      ],
      categories: ["Bundles", "Sunflowers"],
      flowerTypes: ["Sunflowers"],
      description: "Bright sunflower bundle",
      stock: 30,
    },
    {
      id: "prod_004",
      name: "Lily Centerpiece",
      price: 59.99,
      images: [
        "https://images.unsplash.com/photo-1606041008023-472dfb5e530f",
      ],
      categories: ["Centerpieces", "Lilies"],
      flowerTypes: ["Lilies"],
      description: "Elegant lily centerpiece",
      stock: 12,
    },
    {
      id: "prod_005",
      name: "Mixed Spring Bouquet",
      price: 44.99,
      images: [
        "https://images.unsplash.com/photo-1563241527-3004b7be0ffd",
        "https://images.unsplash.com/photo-1518621012428-4ae636b5c8da",
      ],
      categories: ["Bouquets", "Mixed"],
      flowerTypes: ["Roses", "Tulips", "Daisies"],
      description: "Fresh mixed spring flowers",
      stock: 22,
    },
    {
      id: "prod_006",
      name: "Orchid Plant",
      price: 69.99,
      images: [
        "https://images.unsplash.com/photo-1518621012428-4ae636b5c8da",
      ],
      categories: ["Plants", "Orchids"],
      flowerTypes: ["Orchids"],
      description: "Exotic orchid plant",
      stock: 8,
    },
    {
      id: "prod_007",
      name: "Carnation Wreath",
      price: 54.99,
      images: [
        "https://images.unsplash.com/photo-1606041008023-472dfb5e530f",
        "https://images.unsplash.com/photo-1520763185298-1b434c9190e4",
      ],
      categories: ["Wreaths", "Carnations"],
      flowerTypes: ["Carnations"],
      description: "Colorful carnation wreath",
      stock: 15,
    },
    {
      id: "prod_008",
      name: "Peony Bouquet",
      price: 64.99,
      images: [
        "https://images.unsplash.com/photo-1520763185298-1b434c9190e4",
        "https://images.unsplash.com/photo-1518895949257-7621c3c786d7",
        "https://images.unsplash.com/photo-1597848212624-e59356450a44",
      ],
      categories: ["Bouquets", "Peonies"],
      flowerTypes: ["Peonies"],
      description: "Luxurious peony bouquet",
      stock: 10,
    },
  ];
};

const ProductsPage = async () => {
  const data = await getData();
  return (
    <div className="">
      <div className="mb-8 px-4 py-2 bg-secondary rounded-md">
        <h1 className="font-semibold">All Products</h1>
      </div>
      <DataTable columns={columns} data={data}/>
    </div>
  );
};

export default ProductsPage;
