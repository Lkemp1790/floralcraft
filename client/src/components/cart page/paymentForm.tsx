"use client";
import React, { useEffect, useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { paymentFormSchema, type PaymentFormInputs } from "@/lib/types";
import { useRouter } from "next/navigation";
import { CreditCard } from "lucide-react";
import Image from "next/image";
// (removed legacy web component types)

const PaymentForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PaymentFormInputs>({
    resolver: zodResolver(paymentFormSchema),
  });

  // Address autocomplete state and services
  const route = useRouter();

  const handlePaymentFormSubmit: SubmitHandler<PaymentFormInputs> = (
    data: PaymentFormInputs
  ) => {
    console.log("test");
  };

  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-lg font-semibold text-[#0D383B]">Shipping Form</h2>
      <form
        onSubmit={handleSubmit(handlePaymentFormSubmit)}
        className="flex flex-col gap-4"
      >
        <div className="flex flex-col gap-2">
          <label
            className="text-sm font-medium text-[#0D383B]"
            htmlFor="cardHolderName"
          >
            Card Holder Name
          </label>
          <input
            className="w-full rounded-lg border px-4 py-2.5 outline-none transition-all duration-200 focus:ring-2 focus:ring-[#5DADAC] border-[#0D383B]/10"
            type="text"
            id="cardHolderName"
            {...register("cardHolderName")}
            placeholder="John Doe"
          />
          {errors.cardHolderName && (
            <p className="text-red-500">{errors.cardHolderName.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label
            className="text-sm font-medium text-[#0D383B]"
            htmlFor="cardNumber"
          >
            Card Number
          </label>
          <input
            className="w-full rounded-lg border px-4 py-2.5 outline-none transition-all duration-200 focus:ring-2 focus:ring-[#5DADAC] border-[#0D383B]/10"
            type="email"
            id="cardNumber"
            {...register("cardNumber")}
            placeholder="1234 5678 9012 3456"
          />
          {errors.cardNumber && (
            <p className="text-red-500">{errors.cardNumber.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label
            className="text-sm font-medium text-[#0D383B]"
            htmlFor="cardExpiry"
          >
            Card Expiry
          </label>
          <input
            className="w-full rounded-lg border px-4 py-2.5 outline-none transition-all duration-200 focus:ring-2 focus:ring-[#5DADAC] border-[#0D383B]/10"
            type="tel"
            id="cardExpiry"
            {...register("cardExpiry")}
            placeholder="MM/YY"
          />
          {errors.cardExpiry && (
            <p className="text-red-500">{errors.cardExpiry.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label
            className="text-sm font-medium text-[#0D383B]"
            htmlFor="cardCvv"
          >
            Card CVV
          </label>
          <input
            className="w-full rounded-lg border px-4 py-2.5 outline-none transition-all duration-200 focus:ring-2 focus:ring-[#5DADAC] border-[#0D383B]/10"
            type="text"
            id="cardCvv"
            {...register("cardCvv")}
            placeholder="123"
          />
          {errors.cardCvv && (
            <p className="text-red-500">{errors.cardCvv.message}</p>
          )}
        </div>
        <div className="flex gap-4 mt-4">
          
          <div className="flex justify-center">
            <a
              href="/digital-wallet/ways-to-pay/add-payment-method"
              title="How PayPal Works"
              onClick={(e) => {
                e.preventDefault();
                window.open(
                  "/digital-wallet/ways-to-pay/add-payment-method",
                  "WIPaypal",
                  "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=1060, height=700"
                );
                return false;
              }}
              className="inline-block"
            >
              <img
                src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_37x23.jpg"
                alt="PayPal Logo"
                className="border-0"
              />
            </a>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-[#5DADAC] text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-[#0D383B] transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
        >
          Checkout
          <CreditCard className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
