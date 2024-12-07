// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

"use client";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { boolean, z } from "zod";
import { MailCheckIcon, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import ClickTip from "./clicktip";
import Link from "next/link";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// CustomFormLabel.tsx
import { FormLabel as ShadcnFormLabel } from "@/components/ui/form";

export function FormLabel(props) {
  return <ShadcnFormLabel className="text-base font-formamedium" {...props} />;
}

// Updating the form schema to include an email field and features array
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Кажется это неверный email",
  }),
  city: z.string().min(2, {
    message: "City must be at least 2 characters.",
  }),
  typeofplace: z.string().nonempty({
    message: "Please select the type of your workplace.",
  }),
  features: z.array(z.string()).nonempty({
    message: "Please select at least one feature.",
  }),
  workfrom: z.array(z.string()).nonempty({
    message: "Please select at least one work-from option.",
  }),
  comment: z.string().optional(), // Comment field remains optional
  optInNewsletter: z.boolean().optional(),
});



export function SendForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      city: "",
      features: [],
      typeofplace: "",
      workfrom: [],
      comment:"",
      optInNewsletter: true,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    try {
      setIsLoading(true);
      const response = await fetch("/api/sheet/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok: " + response.statusText);
      }

      const responseData = await response.json();
      console.log("Response data:", responseData);
      setIsSuccess(true);
    } catch (error) {
      console.error("Error during fetch operation:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Как вас зовут</FormLabel>
                <FormControl>
                  <Input placeholder="Иннокентий" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="ilovework@soyuz.work" {...field} />
                </FormControl>
                <FormDescription>
                  Никому не расскажем, напишем только если вы захотите стать резидентом в первых рядах и поставите <Check className="inline" size={16}/> в конце анкеты. 

                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
                  <FormField
  control={form.control}
  name="workfrom"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Где вы работаете сейчас?</FormLabel>
      {["из дома", "в кофейне", "в офисе", "другое"].map((option) => (
        <label key={option} className="flex items-center space-x-2">
          <Checkbox
            checked={field.value.includes(option)}
            onCheckedChange={(isChecked) => {
              const newValue = isChecked
                ? [...field.value, option]
                : field.value.filter((v) => v !== option);
              field.onChange(newValue);
            }}
          />
          <span>{option}</span></label>
        
      ))}
      <FormMessage />
    </FormItem>
  )}
/>
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Когда вы бы хотели работать из коворкинга</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите наиболее подходящий ответ" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Несколько дней в месяц">Несколько дней в месяц</SelectItem>
                    <SelectItem value="1-2 неделю в месяц">1-2 неделю в месяц</SelectItem>
                    <SelectItem value="Постоянно, вместо офиса">Постоянно, вместо офиса</SelectItem>
                    <SelectItem value="Мне нужна только переговорка">Мне нужна только переговорка</SelectItem>
                  </SelectContent>
                </Select>
               
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="typeofplace"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Тип рабочего места</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите вариант" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Плавающее место">Плавающее место</SelectItem>
                    <SelectItem value="Закреплённое место">Закреплённое место</SelectItem>
                    <SelectItem value="Переговорка для встреч">Переговорка для встреч</SelectItem>
                  </SelectContent>
                </Select>
                

                <FormDescription>
                  Плавающее место &mdash; каждый день вы можете выбирать новое место из доступных.<br/>
                  Закреплённое место &mdash; только ваше место, где вы можете оставлять свои вещи.<br/>
                  Переговорка — отдельная комната для встреч до 6-ти человек, оборудованная ТВ, почасовая оплата.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="features"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Наличие каких опций важно для вас</FormLabel>
                <FormDescription>
                 Выберите несколько важных для вас опций из списка.
                </FormDescription>
                {[
                  "Доступ 24/7",
                  "Парковка",
                  "Переговорная с ТВ",
                  "Лекторий для мероприятий",
                  "Запись видео и подкастов",
                  "Доступ к принтеру",
                  "Место для зум-звонков",
                  "Разные варианты посадки",
                  "Спец. события для резидентов",
                  "Наличие зоны с мягкой посадкой",
                  "Тихая зона",
                  "Шкафчик для личных вещей"
                ].map((feature) => (
                  <label key={feature} className="flex items-center space-x-2">
                    <Checkbox
            checked={field.value.includes(feature)}
            onCheckedChange={(isChecked) => {
              const newValue = isChecked
                ? [...field.value, feature]
                : field.value.filter((v) => v !== feature);
              field.onChange(newValue);
            }}
          />
                    <span>{feature}</span></label>
                  
                ))}
               
                <FormMessage />
              </FormItem>
            )}
          />
  
   
                {/* New Comment Field */}
          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Комментарий</FormLabel>
                <FormControl>
                  <textarea
                    {...field}
                    placeholder="Предложения или идеи"
                    rows={3}
                    className="w-full border rounded-md p-2 text-sm md:text-base text-[16px]"
                  />
                </FormControl>
                
                <FormMessage />
              </FormItem>
            )}
          />
     {/* Opt-in Newsletter Field */}
  
   <FormField
            control={form.control}
            name="optInNewsletter"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <label className="flex items-center space-x-3">
                    <Checkbox 
                       checked={field.value} // Set initial checked state based on `defaultValues`
                       onCheckedChange={(checked) => field.onChange(checked)}
                       />
                    <span className="text-sm text-gray-700">Напишите мне, когда можно будет забронировать место.</span>
                  </label>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

      <Alert hidden={!isSuccess}>
        <MailCheckIcon className="h-4 w-4" />
        <AlertTitle>Юхуу!</AlertTitle>
        <AlertDescription>
          Спасибо, что уделили пару минут и заполнили анкету. Так мы лучше сможем понять потребности и учесть их при проектировании коворкинга.
        </AlertDescription>
      </Alert>
          <Button
            className="w-full font-formamedium"
            size="lg"
            type="submit"
            disabled={isLoading}
            variant={isSuccess ? "green" : "default"}
          >
            {isLoading ? "Анкета отправляется..." : isSuccess ? "Успешно!" : "Отправить"}
          </Button>
        
        </form>
      </Form>

     
    </>
  );
}