"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CONTACT_METHOD_OPTIONS,
  INTERESTED_IN_OPTIONS,
  enquirySchema,
  type EnquiryFormValues,
} from "./enquiry-schema";

export function EnquiryForm() {
  const form = useForm<EnquiryFormValues>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      interestedIn: "",
      contactMethod: "",
      message: "",
    },
  });

  const onSubmit = async (values: EnquiryFormValues) => {
    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = (await res.json().catch(() => null)) as {
        success?: boolean;
        error?: string;
      } | null;

      if (!res.ok || !data?.success) {
        const message = data?.error ?? "Something went wrong. Please try again.";
        toast.error(message);
        return;
      }

      toast.success(
        "Thank you! Your enquiry has been received. Our team will get back to you shortly."
      );
      form.reset();
    } catch {
      toast.error(
        "Network error. Please check your connection and try again."
      );
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
        <div className="grid gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="grid gap-2">
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your full name"
                    autoComplete="name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="grid gap-2">
                <FormLabel>Mobile</FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    placeholder="10-digit mobile number"
                    autoComplete="tel"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="grid gap-2">
                <FormLabel>Email (Optional)</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="interestedIn"
            render={({ field }) => (
              <FormItem className="grid gap-2">
                <FormLabel>Interested In</FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {INTERESTED_IN_OPTIONS.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contactMethod"
            render={({ field }) => (
              <FormItem className="grid gap-2">
                <FormLabel>Preferred Contact Method</FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a contact method" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {CONTACT_METHOD_OPTIONS.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="grid gap-2">
                <FormLabel>Message (Optional)</FormLabel>
                <FormControl>
                  <Textarea
                    rows={4}
                    placeholder="Tell us briefly about the space you're looking for"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            size="lg"
            disabled={form.formState.isSubmitting}
            className="bg-gold text-gold-foreground hover:bg-gold/90 w-full"
          >
            {form.formState.isSubmitting ? "Submitting…" : "Submit Enquiry"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
