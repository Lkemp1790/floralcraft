"use client";

import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Select, SelectValue, SelectItem, SelectTrigger, SelectContent } from "./ui/select";

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters!" })
    .max(50),
  images: z.array(z.string()).min(1, { message: "Images must be at least 1!" }),
  price: z.number().min(1, { message: "Price must be at least 1!" }),
  description: z.string().min(2, { message: "Description must be at least 2 characters!" }),
  stock: z.number().min(1, { message: "Stock must be at least 1!" }),
  categories: z.array(z.string()).min(1, { message: "Categories must be at least 1!" }),
  flowerTypes: z.array(z.string()).min(1, { message: "Flower types must be at least 1!" }),
  isFeatured: z.boolean().optional(),

});

const AddProduct = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),

  });
  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle className="mb-4">Add Product</SheetTitle>
        <SheetDescription asChild>
          <Form {...form}>
            <form className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      This is the name of the category.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="images"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Images</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      This is the image of the category.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      This is the description of the category.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      This is the price of the product.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stock</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      This is the stock of the product.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="categories"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categories</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value?.[0] || ""}
                        onValueChange={(value) => field.onChange([value])}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="red">Red</SelectItem>
                          <SelectItem value="blue">Blue</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormDescription>
                      This is the categories of the product.
                    </FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="flowerTypes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Flower Types</FormLabel>
                    <FormControl>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a flower type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="red">Red</SelectItem>
                          <SelectItem value="blue">Blue</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormDescription>
                      This is the flower types of the product.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isFeatured"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Is Featured</FormLabel>
                    <FormControl>
                      <Checkbox
                        checked={field.value || false}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormDescription>
                      This is the featured status of the product.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </SheetDescription>
      </SheetHeader>
    </SheetContent>
  );
};

export default AddProduct;
