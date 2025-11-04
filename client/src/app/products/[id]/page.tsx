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
      <section className="w-full max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8 pt-32 lg:pt-40 pb-16 lg:pb-20 flex flex-col lg:flex-row items-center lg:items-stretch justify-center gap-8 lg:gap-12">
        {/* IMAGE */}
        <div className="w-full lg:w-5/12 aspect-[3/4] bg-gray-200 rounded-2xl overflow-hidden relative shadow-2xl">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
        {/* DETAILS */}
        <div className="w-full lg:w-7/12 flex flex-col gap-6 bg-white rounded-2xl p-6 lg:p-8 shadow-2xl">
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl lg:text-4xl font-bold text-[#0D383B]">
              {product.name}
            </h1>
            <p className="text-gray-600 text-base lg:text-lg leading-relaxed">
              {product.description}
            </p>
          </div>
          <div className="flex items-center gap-3 pt-2 border-t border-gray-200">
            <span className="text-[#0D383B] text-3xl lg:text-4xl font-bold">
              £{product.price.toFixed(2)}
            </span>
           
          </div>
          <div className="mt-auto pt-4 border-t border-gray-200">
            <ProductInteraction product={product} />
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProductPage;
