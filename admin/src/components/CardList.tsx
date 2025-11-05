import Image from "next/image";
import { Card, CardContent, CardFooter, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";

const popularProducts = [
  {
    id: 1,
    name: "Bouquet 1",
    price: 100,
    image: "/category1.jpg",
    categories: ["Bouquet", "Flowers", "Plants"],
    flowerTypes: ["Rose", "Lily", "Tulip"],
    description: "This is a bouquet of flowers",
    stock: 10,
    isFeatured: true,
    isNew: true,
    isBestSeller: true,
    isSale: true,
    isTrending: true,
    isPopular: true,
    isRecommended: true,
},
{
    id: 2,
    name: "Bouquet 2",
    price: 200,
    image: "/category2.jpg",
    categories: ["Bouquet", "Flowers", "Plants"],
    flowerTypes: ["Rose", "Lily", "Tulip"],
    description: "This is a bouquet of flowers",
    stock: 10,
    isFeatured: true,
    isNew: true,
    isBestSeller: true,
    isSale: true,
    isTrending: true,
    isPopular: true,
    isRecommended: true,
},
{
    id: 3,
    name: "Bouquet 3",
    price: 300,
    image: "/category3.jpg",
    categories: ["Bouquet", "Flowers", "Plants"],
    flowerTypes: ["Rose", "Lily", "Tulip"],
    description: "This is a bouquet of flowers",
    stock: 10,
    isFeatured: true,
    isNew: true,
    isBestSeller: true,
    isSale: true,
    isTrending: true,
    isPopular: true,
    isRecommended: true,
},
{
    id: 4,
    name: "Bouquet 4",
    price: 400,
    image: "/category1.jpg",
    categories: ["Bouquet", "Flowers", "Plants"],
    flowerTypes: ["Rose", "Lily", "Tulip"],
    description: "This is a bouquet of flowers",
    stock: 10,
    isFeatured: true,
    isNew: true,
    isBestSeller: true,
    isSale: true,
    isTrending: true,
    isPopular: true,
    isRecommended: true,
},
{
    id: 5,
    name: "Bouquet 5",
    price: 500,
    image: "/category2.jpg",
    categories: ["Bouquet", "Flowers", "Plants"],
    flowerTypes: ["Rose", "Lily", "Tulip"],
    description: "This is a bouquet of flowers",
    stock: 10,
    isFeatured: true,
    isNew: true,
    isBestSeller: true,
    isSale: true,
    isTrending: true,
    isPopular: true,
    isRecommended: true,
},
]

const latestTransactions = [
  {
    id: 1,
    title: "Order Payment",
    badge: "John Doe",
    image:
      "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=800",
    count: 1400,
  },
  {
    id: 2,
    title: "Order Payment",
    badge: "Jane Smith",
    image:
      "https://images.pexels.com/photos/4969918/pexels-photo-4969918.jpeg?auto=compress&cs=tinysrgb&w=800",
    count: 2100,
  },
  {
    id: 3,
    title: "Order Payment",
    badge: "Michael Johnson",
    image:
      "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=800",
    count: 1300,
  },
  {
    id: 4,
    title: "Order Payment",
    badge: "Lily Adams",
    image:
      "https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=800",
    count: 2500,
  },
  {
    id: 5,
    title: "Order Payment",
    badge: "Sam Brown",
    image:
      "https://images.pexels.com/photos/1680175/pexels-photo-1680175.jpeg?auto=compress&cs=tinysrgb&w=800",
    count: 1400,
  },
];

const CardList = ({ title }: { title: string }) => {
  return (
    <div className="">
      <h1 className="text-lg font-medium mb-6">{title}</h1>
      <div className="flex flex-col gap-2">
        {title === "Popular Products"
          ? popularProducts.map((item) => (
              <Card key={item.id} className="flex-row items-center justify-between gap-4 p-4">
                <div className="w-12 h-12 rounded-sm relative overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="flex-1 p-0">
                  <CardTitle className="text-sm font-medium">{item.name}</CardTitle>
                  <Badge variant="secondary">{item.categories.join(", ")}</Badge>
                </CardContent>
                <CardFooter className="p-0">{item.price / 1000}K</CardFooter>
              </Card>
            ))
          : title === "Latest Transactions"
            ? latestTransactions.map((item) => (
                <Card key={item.id} className="flex-row items-center justify-between gap-4 p-4">
                  <div className="w-12 h-12 rounded-sm relative overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="flex-1 p-0">
                    <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
                    <Badge variant="secondary">{item.badge}</Badge>
                  </CardContent>
                  <CardFooter className="p-0">${item.count}</CardFooter>
                </Card>
              ))
            : null}
      </div>
    </div>
  );
};

export default CardList;
