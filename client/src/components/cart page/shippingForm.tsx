"use client";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// Using Places API (New) REST endpoints — no JS Maps loader needed
import { shippingFormSchema, type ShippingFormInputs } from "@/lib/types";

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;

// (removed legacy web component types)

interface AutocompleteSuggestion {
  placeId: string;
  description: string;
}

interface AddressComponentNew {
  longText: string;
  shortText?: string;
  types: string[];
}

const ShippingForm = () => {

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ShippingFormInputs>({
    resolver: zodResolver(shippingFormSchema),
  });

  // Address autocomplete state and services
  const [query, setQuery] = useState("");
  const [predictions, setPredictions] = useState<AutocompleteSuggestion[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const sessionTokenRef = useRef<string | null>(null);
  const debounceRef = useRef<number | null>(null);

  useEffect(() => {
    if (!GOOGLE_MAPS_API_KEY) {
      console.warn("Missing NEXT_PUBLIC_GOOGLE_MAPS_API_KEY");
      return;
    }
    // Initialize a session token for Places API (New) REST
    sessionTokenRef.current = crypto.randomUUID();
  }, []);

  const fetchSuggestions = async (input: string): Promise<AutocompleteSuggestion[]> => {
    if (!GOOGLE_MAPS_API_KEY) return [];
    try {
      const resp = await fetch("https://places.googleapis.com/v1/places:autocomplete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": GOOGLE_MAPS_API_KEY,
          "X-Goog-FieldMask": "suggestions.placePrediction.placeId,suggestions.placePrediction.text" ,
        },
        body: JSON.stringify({
          input,
          regionCode: "GB",
          languageCode: "en",
          sessionToken: sessionTokenRef.current || undefined,
          // Bias to address results
          includedPrimaryTypes: ["street_address", "premise", "route", "postal_code"],
        }),
      });
      const data = await resp.json();
      const suggestions: AutocompleteSuggestion[] = (data?.suggestions || [])
        .map((s: any) => ({
          placeId: s?.placePrediction?.placeId,
          description: s?.placePrediction?.text?.text,
        }))
        .filter((s: AutocompleteSuggestion) => s.placeId && s.description);
      return suggestions;
    } catch {
      return [];
    }
  };

  const handleAddressInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value;
    setQuery(value);
    setValue("address", value, { shouldValidate: false });

    if (!value.trim()) {
      setPredictions([]);
      setIsOpen(false);
      return;
    }

    if (debounceRef.current) window.clearTimeout(debounceRef.current);
    debounceRef.current = window.setTimeout(async () => {
      const results = await fetchSuggestions(value);
      setPredictions(results);
      setIsOpen(results.length > 0);
      setActiveIndex(-1);
    }, 150);
  };

  const selectPrediction = async (prediction: AutocompleteSuggestion) => {
    setQuery(prediction.description);
    setValue("address", prediction.description, { shouldValidate: true });
    setIsOpen(false);

    if (!GOOGLE_MAPS_API_KEY || !prediction.placeId) return;
    try {
      const url = `https://places.googleapis.com/v1/places/${encodeURIComponent(prediction.placeId)}?fields=formattedAddress,addressComponents&languageCode=en`;
      const resp = await fetch(url, {
        headers: {
          "X-Goog-Api-Key": GOOGLE_MAPS_API_KEY,
        },
      });
      const place = await resp.json();
      const comps: AddressComponentNew[] = place?.addressComponents || [];

      let streetNumber = "";
      let route = "";
      let city = "";
      let postcode = "";

      for (const c of comps) {
        const types = c.types || [];
        if (types.includes("street_number")) streetNumber = c.longText;
        else if (types.includes("route")) route = c.longText;
        else if (types.includes("locality") || types.includes("postal_town")) city = c.longText;
        else if (types.includes("postal_code")) postcode = c.longText;
      }

      if (streetNumber && route) setValue("address", `${streetNumber} ${route}`, { shouldValidate: true });
      if (!streetNumber && route) setValue("address", route, { shouldValidate: true });
      if (city) setValue("city", city, { shouldValidate: true });
      if (postcode) setValue("postcode", postcode, { shouldValidate: true });

      // New session after selection
      sessionTokenRef.current = crypto.randomUUID();
    } catch {
      // swallow
    }
  };

  const onSubmit = (data: ShippingFormInputs) => {
    console.log(data);
  };

  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-lg font-semibold text-[#0D383B]">Shipping Form</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-[#0D383B]" htmlFor="name">
            Name
          </label>
          <input
            className="w-full rounded-lg border px-4 py-2.5 outline-none transition-all duration-200 focus:ring-2 focus:ring-[#5DADAC] border-[#0D383B]/10"
            type="text"
            id="name"
            {...register("name")}
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-[#0D383B]" htmlFor="email">
            Email
          </label>
          <input
            className="w-full rounded-lg border px-4 py-2.5 outline-none transition-all duration-200 focus:ring-2 focus:ring-[#5DADAC] border-[#0D383B]/10"
            type="email"
            id="email"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-[#0D383B]" htmlFor="phone">
            Phone
          </label>
          <input
            className="w-full rounded-lg border px-4 py-2.5 outline-none transition-all duration-200 focus:ring-2 focus:ring-[#5DADAC] border-[#0D383B]/10"
            type="tel"
            id="phone"
            {...register("phone")}
          />
          {errors.phone && (
            <p className="text-red-500">{errors.phone.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label
            className="text-sm font-medium text-[#0D383B]"
            htmlFor="address"
          >
            Address Search
          </label>
          <div className="relative">
            <input
              id="address"
              type="text"
              value={query}
              onChange={handleAddressInputChange}
              onFocus={() => predictions.length > 0 && setIsOpen(true)}
              onKeyDown={(e) => {
                if (!isOpen || predictions.length === 0) return;
                if (e.key === "ArrowDown") {
                  e.preventDefault();
                  setActiveIndex((prev) => (prev + 1) % predictions.length);
                } else if (e.key === "ArrowUp") {
                  e.preventDefault();
                  setActiveIndex((prev) => (prev - 1 + predictions.length) % predictions.length);
                } else if (e.key === "Enter" && activeIndex >= 0) {
                  e.preventDefault();
                  selectPrediction(predictions[activeIndex]);
                } else if (e.key === "Escape") {
                  setIsOpen(false);
                }
              }}
              placeholder="Start typing your address..."
              className="w-full rounded-lg border px-4 py-2.5 outline-none transition-all duration-200 focus:ring-2 focus:ring-[#5DADAC] border-[#0D383B]/10 text-[#0D383B] bg-white"
              autoComplete="off"
            />
            {isOpen && predictions.length > 0 && (
              <ul className="absolute z-20 mt-2 w-full rounded-lg border border-[#0D383B]/10 bg-white shadow-lg overflow-hidden">
                {predictions.map((p, idx) => (
                  <li
                    key={p.placeId}
                    className={`px-4 py-2 cursor-pointer text-sm text-[#0D383B] ${idx === activeIndex ? "bg-gray-100" : "hover:bg-gray-50"}`}
                    onMouseEnter={() => setActiveIndex(idx)}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      selectPrediction(p);
                    }}
                  >
                    {p.description}
                  </li>
                ))}
              </ul>
            )}
          </div>
          {errors.address && (
            <p className="text-red-500">{errors.address.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-[#0D383B]" htmlFor="city">
            City
          </label>
          <input
            className="w-full rounded-lg border px-4 py-2.5 outline-none transition-all duration-200 focus:ring-2 focus:ring-[#5DADAC] border-[#0D383B]/10"
            type="text"
            id="city"
            {...register("city")}
          />
          {errors.city && <p className="text-red-500">{errors.city.message}</p>}
        </div>
        <div className="flex flex-col gap-2">
          <label
            className="text-sm font-medium text-[#0D383B]"
            htmlFor="postcode"
          >
            Postcode
          </label>
          <input
            className="w-full rounded-lg border px-4 py-2.5 outline-none transition-all duration-200 focus:ring-2 focus:ring-[#5DADAC] border-[#0D383B]/10"
            type="text"
            id="postcode"
            {...register("postcode")}
          />
          {errors.postcode && (
            <p className="text-red-500">{errors.postcode.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full rounded-lg bg-[#0D383B] text-white px-4 py-2.5 outline-none transition-all duration-200 focus:ring-2 focus:ring-[#5DADAC] border-[#0D383B]/10 hover:bg-[#0D383B]/90"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ShippingForm;
