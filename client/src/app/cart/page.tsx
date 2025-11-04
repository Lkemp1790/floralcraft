"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { ArrowRightIcon, Trash2, ShoppingCart } from "lucide-react";
import ShippingForm from "@/components/cart page/shippingForm";
import PaymentForm from "@/components/cart page/paymentForm";
import Image from "next/image";
import { CartItemType, ShippingFormInputs } from "@/lib/types";
import useCartStore from "@/stores/cartStore";
import { toast } from "react-toastify";
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


const CartPage = () => {
  const searchParams = useSearchParams()
  const route = useRouter();
  const activeStep = parseInt(searchParams.get("step") || "1");
  const [shippingForm, setShippingForm] = useState<ShippingFormInputs>();
  const { cart, addToCart, removeFromCart, clearCart } = useCartStore();
  const handleRemoveFromCart = (item: CartItemType) => {
    removeFromCart(item);
    toast.success("Item removed from cart");
  };

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
            <h1 className="text-4xl font-bold text-white text-center font-serif">
              Your Shopping Cart
            </h1>
            {/* Steps */}
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center justify-center">
              {steps.map((step) => (
                <div
                  key={step.id}
                  className={`flex flex-col lg:flex-row gap-8 lg:gap-16 items-center justify-center ${step.id < activeStep ? "cursor-pointer" : "cursor-not-allowed"}`}
                  onClick={
                    step.id < activeStep
                      ? () =>
                          route.push(`/cart?step=${step.id}`, { scroll: false })
                      : undefined
                  }
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
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center lg:items-stretch w-full justify-center">
              {/* Steps */}
              <div className="w-full lg:w-7/12 shadow-lg shadow-gray-500/10 border border-gray-200 rounded-lg p-8 flex flex-col gap-8 bg-white flex-grow min-h-full">
                {activeStep === 1 ? (
                  <>
                  <h2 className="text-lg font-semibold text-[#0D383B]">Cart Items</h2>
                  {cart.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 gap-4">
                      <ShoppingCart className="w-16 h-16 text-gray-300" />
                      <p className="text-gray-500 text-center">Your cart is empty</p>
                      <Link
                        href="/"
                        className="text-[#5DADAC] hover:text-[#0D383B] transition-colors duration-200"
                      >
                        Continue Shopping
                      </Link>
                    </div>
                  ) : (
                    cart.map((item) => (
                      <div
                        key={item.product.id}
                        className="flex items-center gap-4 justify-between"
                      >
                        {/* Image and details */}
                        <div className="flex items-center gap-4 overflow-hidden">
                          <Image
                            src={item.product.image}
                            alt={item.product.name}
                            width={100}
                            height={100}
                            className="w-24 h-24 object-cover rounded-lg"
                          />
                          <div className="flex flex-col gap-2 h-full">
                            <h3>{item.product.name}</h3>
                            <p className="text-sm text-gray-500">
                              Quantity: {item.quantity}
                            </p>
                            <p className="text-sm text-[#0D383B] font-semibold mt-auto">
                              £{item.product.price * item.quantity}
                            </p>
                          </div>
                        </div>
                        <button className="text-red-500 hover:text-red-700 transition-all duration-300 cursor-pointer" onClick={() => handleRemoveFromCart(item)}>
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))
                  )}
                  </>
                ) : activeStep === 2 ? (
                  <ShippingForm setShippingForm={setShippingForm} />
                ) : activeStep === 3 && shippingForm ? (
                  <PaymentForm />
                ) : (
                  <p className="text-gray-500">
                    Please fill in the shipping form to continue
                  </p>
                )}
              </div>
              {/* Details */}
              <div className="w-full lg:w-5/12 shadow-lg shadow-gray-500/10 border border-gray-200 rounded-lg p-8 flex flex-col gap-8 bg-white h-max">
                <h2 className="font-semibold text-[#0D383B]">Order Summary</h2>
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-8 gap-3">
                    <ShoppingCart className="w-12 h-12 text-gray-300" />
                    <p className="text-gray-500 text-center text-sm">No items in cart</p>
                  </div>
                ) : (
                  <>
                    <div className="flex flex-col gap-4">
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-500">Subtotal</p>
                        <p className="text-sm text-[#0D383B]">
                          £
                          {cart
                            .reduce(
                              (acc, item) => acc + item.product.price * item.quantity,
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
                            cart.reduce(
                              (acc, item) => acc + item.product.price * item.quantity,
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
                            cart.reduce(
                              (acc, item) => acc + item.product.price * item.quantity,
                              0
                            ) -
                            cart.reduce(
                              (acc, item) => acc + item.product.price * item.quantity,
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
                        onClick={() =>
                          route.push("/cart?step=2", { scroll: false })
                        }
                        className="w-full bg-[#5DADAC] text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-[#0D383B] transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
                      >
                        Continue
                        <ArrowRightIcon className="w-4 h-4" />
                      </button>
                    )}
                  </>
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
