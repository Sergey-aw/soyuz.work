"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState } from "react"

const formSchema = z.object({
  email: z.string().email( {
    message: "Username must be at least 2 characters.",
  }),
})

export function WaitList() {
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          email: "",
        },
      })
     
      // 2. Define a submit handler.
      async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        try {
            setIsLoading(true);
          const response = await fetch('http://localhost:3000/api/contacts/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            // Assuming your API expects a direct payload. Adjust according to your API's expected structure.
            body: JSON.stringify(values),
          });
      
          if (!response.ok) { // Check if the HTTP request was successful.
            throw new Error('Network response was not ok: ' + response.statusText);
          }
      
          const responseData = await response.json(); // Assuming the response is JSON.
          // Handle your response here. For example:
          console.log('Response data:', responseData);
          setIsSuccess(true);
        } catch (error) {
          // Handle any errors here
          console.error('Error during fetch operation:', error);
        }
        finally {
            setIsLoading(false);
          }
      }

  return (

    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              
              <FormControl>
                <Input placeholder="email" className="bg-white/100" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
         
        <Button type="submit" disabled={isLoading} className="w-full font-forma" size="lg" variant={isSuccess ? 'green' : 'default'}><Mail/>{isLoading ? 'Добавляем вас...' : isSuccess ? 'Спасибо! Будем на связи.' : 'Напишите, когда откроетесь'}</Button>
      </form>
    </Form>
    
  )
}
