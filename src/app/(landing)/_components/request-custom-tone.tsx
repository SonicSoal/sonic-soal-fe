'use client';

import type React from 'react';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MusicIcon, Wand2Icon, Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { toast } from 'sonner';

const formSchema = z.object({
  name: z.string().optional(),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  purpose: z.enum(['meditation', 'focus', 'healing', 'sleep', 'other'], {
    required_error: 'Please select a purpose for your custom tone.',
  }),
  description: z
    .string()
    .min(5, { message: 'Please provide more details about your request.' }),
});

export function RequestCustomTone() {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      purpose: 'other',
      description: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true);

      // Add timestamp to the data
      const requestData = {
        ...values,
        createdAt: serverTimestamp(),
        status: 'pending',
      };

      // Add document to Firestore
      const docRef = await addDoc(
        collection(db, 'custom-requested-tone'),
        requestData
      );

      console.log('Document written with ID: ', docRef.id);

      toast.success('Request Submitted Successfully', {
        description:
          "We've received your custom tone request and will contact you soon.",
      });

      setOpen(false);
      form.reset();
    } catch (error) {
      console.error('Error adding document: ', error);
      toast.error('Submission Failed', {
        description:
          'There was an error submitting your request. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  // Helper component for required field labels
  const RequiredLabel = ({ children }: { children: React.ReactNode }) => (
    <span className="flex items-center">
      {children}
      <span className="text-red-500 ml-1">*</span>
    </span>
  );

  return (
    <section className="py-20 px-4 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/95 to-background z-0"></div>

      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="bg-gradient-to-br from-primary/10 to-secondary/10 backdrop-blur-lg rounded-2xl p-8 md:p-12 border border-primary/20 relative overflow-hidden shadow-lg">
          {/* Background Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tl from-primary/10 to-secondary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

          <div className="relative z-10 text-center">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary blur-lg opacity-30 rounded-full"></div>
                <MusicIcon size={48} className="text-primary relative z-10" />
              </div>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Request Your <span className="text-secondary">Custom Tone</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Need a specific frequency for your unique needs? Our sound experts
              can create personalized tones tailored to your exact requirements
              and spiritual journey.
            </p>

            <div className="flex justify-center">
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 transition-all duration-300 text-base shadow-md hover:shadow-lg relative overflow-hidden group"
                  >
                    <span className="absolute inset-0 w-0 bg-white/10 transition-all duration-300 ease-out group-hover:w-full"></span>
                    <span className="relative flex items-center">
                      Request Custom Tone
                      <span className="ml-2 relative">
                        <span className="absolute -inset-1 rounded-full bg-white/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                        <span className="relative">→</span>
                      </span>
                    </span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="border border-primary/20 shadow-lg shadow-primary/10">
                  <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden rounded-lg">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 blur-3xl opacity-60"></div>
                    <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] rounded-full bg-primary/10 blur-3xl opacity-60 animate-pulse-slow"></div>
                  </div>

                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <Wand2Icon className="h-5 w-5 text-primary" />
                      <span>Custom Tone Request</span>
                    </DialogTitle>
                    <DialogDescription>
                      Fill out the form below to request a custom tone tailored
                      to your specific needs.
                    </DialogDescription>
                  </DialogHeader>

                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-6"
                    >
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Name{' '}
                              <span className="text-xs text-muted-foreground">
                                (optional)
                              </span>
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="Your name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              <RequiredLabel>Email</RequiredLabel>
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="your.email@example.com"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="purpose"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              <RequiredLabel>Purpose</RequiredLabel>
                            </FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-col space-y-1"
                              >
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="meditation" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    Meditation
                                  </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="focus" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    Focus & Concentration
                                  </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="healing" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    Healing & Wellness
                                  </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="sleep" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    Sleep & Relaxation
                                  </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="other" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    Other
                                  </FormLabel>
                                </FormItem>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              <RequiredLabel>Additional Details</RequiredLabel>
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Please describe your specific needs, desired effects, or any other details that would help us create your perfect custom tone."
                                className="min-h-[100px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        className="w-full bg-primary hover:bg-primary/90 transition-all duration-300 text-base shadow-md hover:shadow-lg relative overflow-hidden group"
                        disabled={isSubmitting}
                      >
                        <span className="absolute inset-0 w-0 bg-white/10 transition-all duration-300 ease-out group-hover:w-full"></span>
                        <span className="relative flex items-center justify-center">
                          {isSubmitting ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Submitting...
                            </>
                          ) : (
                            <>
                              Submit Request
                              <span className="ml-2 relative">
                                <span className="absolute -inset-1 rounded-full bg-white/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                                <span className="relative">→</span>
                              </span>
                            </>
                          )}
                        </span>
                      </Button>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
