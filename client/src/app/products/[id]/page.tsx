import React from "react";
import { productDummyData } from "@/lib/utils";
import Image from "next/image";
import ProductInteraction from "@/components/ui/productInteraction";

const ProductPage = async ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { id } = await params;
  const product = productDummyData.find(
    (product) => product.id === parseInt(id)
  );
  if (!product) {
    return <div>Product not found</div>;
  }
  return (
    <main
      className="min-h-[calc(100vh-20rem)] px-4 sm:px-6 lg:px-8"
      style={{
        background: "linear-gradient(to right, #0D383B 39%, #142424 100%)",
      }}
    >
      <section className="w-full py-10 px-4 sm:px-6 lg:px-8 pt-24 pb-10 flex flex-col lg:flex-row items-center lg:items-stretch justify-center gap-10">
        {/* IMAGE */}
        <div className="w-full lg:w-5/12 aspect-[3/4] bg-gray-200 rounded-xl overflow-hidden relative">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
        {/* DETAILS */}
        <div className="w-full lg:w-7/12 flex flex-col gap-4 bg-white rounded-xl p-4">
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="text-gray-500">{product.description}</p>
          <div className="flex items-center gap-2">
            <span className="text-gray-500 text-2xl font-bold">
              £{product.price.toFixed(2)}
            </span>
          </div>
          <div className="mt-auto flex flex-col gap-2">
           <ProductInteraction />
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProductPage;
