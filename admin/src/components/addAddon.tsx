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
import { Textarea } from "./ui/textarea";
import Image from "next/image";

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters!" })
    .max(50),
  images: z.array(z.string()).min(1, { message: "Images must be at least 1!" }),
  price: z.number().min(1, { message: "Price must be at least 1!" }),
  description: z.string().min(2, { message: "Description must be at least 2 characters!" }),


});

const AddAddon = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),

  });
  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle className="mb-4">Add Addon</SheetTitle>
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
                      <Input
                        type="file"
                        multiple
                        onChange={(e) => {
                          const files = e.target.files;
                          if (files) {
                            const fileArray = Array.from(files);
                            const urls = fileArray.map(file => URL.createObjectURL(file));
                            field.onChange([...field.value, ...urls]);
                          }
                        }}
                      />
                    </FormControl>
                    {field.value && field.value.length > 0 && (
                      <div className="flex gap-2 mt-2">
                        {field.value.map((image, index) => (
                          <div key={index} className="relative">
                            <Image src={image} alt={`Image ${index + 1}`} width={100} height={100} className="object-cover rounded-md" />
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              className="absolute top-0 right-0"
                              onClick={() => {
                                const newImages = field.value.filter((_, i) => i !== index);
                                field.onChange(newImages);
                              }}
                            >
                              Remove
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                    <FormDescription>
                      This is the images of the product.
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
                      <Textarea {...field} />
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

              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </SheetDescription>
      </SheetHeader>
    </SheetContent>
  );
};

export default AddAddon;
