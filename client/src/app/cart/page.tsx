"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { ArrowRightIcon } from "lucide-react";
const steps = [
  {
    id: 1,
    label: "Shopping Cart",
    href: "/cart",
  },
  {
    id: 2,
    label: "Shipping Address",
    href: "/cart/shipping",
  },
  {
    id: 3,
    label: "Payment Method",
    href: "/cart/payment",
  },
];
const cartItems = [
  {
    id: 1,
    name: "Bouquet 1",
    price: 100,
    image: "/images/product1.jpg",
    quantity: 1,
  },
  {
    id: 2,
    name: "Bouquet 2",
    price: 200,
    image: "/images/product2.jpg",
    quantity: 1,
  },
  {
    id: 3,
    name: "Bouquet 3",
    price: 300,
    image: "/images/product3.jpg",
    quantity: 1,
  },
];

const CartPage = () => {
  const searchParams = useSearchParams();
  const route = useRouter();
  const activeStep = parseInt(searchParams.get("step") || "1");
  return (
    <main
      className="min-h-[calc(100vh-20rem)]"
      style={{
        background: "linear-gradient(to right, #0D383B 39%, #142424 100%)",
      }}
    >
      <section className="w-full py-10 px-4 sm:px-6 lg:px-8 pt-24 pb-10 flex flex-col items-center justify-center ">
        <div className="max-w-7xl mx-auto mt-20 w-full">
          <div className="flex items-center justify-center flex-col gap-6 w-full">
            {/* Title */}
            <h1 className="text-4xl font-bold text-white text-center">
              Your Shopping Cart
            </h1>
            {/* Steps */}
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center justify-center">
              {steps.map((step) => (
            <div
              key={step.id}
              className={`flex flex-col lg:flex-row gap-8 lg:gap-16 items-center justify-center ${step.id < activeStep ? "cursor-pointer" : "cursor-not-allowed"}`}
              onClick={step.id < activeStep ? () => route.push(`/cart?step=${step.id}`, { scroll: false }) : undefined}
            >
                <div
                  key={step.id}
                  className={`flex items-center gap-2 pb-4 border-b-2 text-white ${activeStep === step.id ? "border-[#5DADAC] font-bold" : "border-gray-500"}`}
                >
                  <div
                    className={`w-6 h-6 rounded-full p-4 flex items-center justify-center  ${activeStep === step.id ? "bg-[#5DADAC] text-white" : "bg-gray-500 text-[#0D383B]"}`}
                  >
                    {step.id}
                  </div>
                  <p
                    className={`text-sm font-medium ${activeStep === step.id ? "text-white" : "text-gray-500"}`}
                  >
                    {step.label}
                  </p>
                </div>
            </div>
              ))}
            </div>
            {/* Steps and details */}
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center w-full justify-center">
              {/* Steps */}
              <div className="w-full lg:w-7/12 shadow-lg shadow-gray-500/10 border border-gray-200 rounded-lg p-8 flex flex-col gap-8 bg-white"></div>
              {/* Details */}
              <div className="w-full lg:w-5/12 shadow-lg shadow-gray-500/10 border border-gray-200 rounded-lg p-8 flex flex-col gap-8 bg-white">
                <h2 className="font-semibold text-[#0D383B]">Order Summary</h2>
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-500">Subtotal</p>
                    <p className="text-sm text-[#0D383B]">
                      £
                      {cartItems
                        .reduce(
                          (acc, item) => acc + item.price * item.quantity,
                          0
                        )
                        .toFixed(2)}
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-500">Discount (10%)</p>
                    <p className="text-sm text-[#0D383B]">
                      -£
                      {(
                        cartItems.reduce(
                          (acc, item) => acc + item.price * item.quantity,
                          0
                        ) * 0.1
                      ).toFixed(2)}
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-500">Shipping</p>
                    <p className="text-sm text-[#0D383B]">£10</p>
                  </div>
                  <hr className="border-gray-500/10" />
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-500">Total</p>
                    <p className="text-sm text-[#0D383B]">
                      £
                      {(
                        cartItems.reduce(
                          (acc, item) => acc + item.price * item.quantity,
                          0
                        ) -
                        cartItems.reduce(
                          (acc, item) => acc + item.price * item.quantity,
                          0
                        ) *
                          0.1 +
                        10
                      ).toFixed(2)}
                    </p>
                  </div>
                </div>
                {activeStep === 1 && (
                <button
                  onClick={() => route.push("/cart?step=2", { scroll: false })}
                  className="w-full bg-[#5DADAC] text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-[#0D383B] transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
                >
                  Continue
                  <ArrowRightIcon className="w-4 h-4" />
                </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CartPage;
