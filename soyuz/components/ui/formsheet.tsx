// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

"use client";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { boolean, z } from "zod";
import { MailCheckIcon, Check, Send} from "lucide-react";
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
import { Textarea } from "./textarea";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// CustomFormLabel.tsx
import { FormLabel as ShadcnFormLabel } from "@/components/ui/form";



export function FormLabel(props) {
  return <ShadcnFormLabel className="text-lg font-formamedium" {...props} />;
}

// Updating the form schema to include an email field and features array
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Имя должно содержать хотя бы 2 буквы",
  }),
  email: z.string().email({
    message: "Кажется это неверный email",
  }),
  city: z.string().min(2, {
    message: "Выберите один из вариантов",
  }),
  occupacy: z.string().min(3, {
    message: "Слишком короткое название для профессии",
  }),
  typeofplace: z.array(z.string()).nonempty({
    message: "Выберите хотя бы один вариант",
  }),
  features: z.array(z.string()).nonempty({
    message: "Укажите хотя бы одну полезную для вас опцию",
  }),
  workfrom: z.array(z.string()).nonempty({
    message: "Откуда предпочитаете работать?",
  }),
  goals: z.string().nonempty({
    message: "Выберите один из вариантов",
  }),
  comment: z.string().optional(), // Comment field remains optional
  optInNewsletter: z.boolean().optional(),
  work_other: z.string().optional(),
  other_goal: z.string().optional(),
}).superRefine((data, ctx) => {
  // Check if "другое" (Other) is selected in `workfrom`
  if (data.workfrom.includes("другое") && (!data.work_other || data.work_other.trim() === "")) {
    ctx.addIssue({
      path: ["work_other"],
      message: "Кажется не указали свой вариант",
      code: z.ZodIssueCode.custom,
    });};
    if (data.goals.includes("Другое") && (!data.other_goal || data.other_goal.trim() === "")) {
      ctx.addIssue({
        path: ["other_goal"],
        message: "Кажется не указали свой вариант",
        code: z.ZodIssueCode.custom,
      });}
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
      occupacy: "",
      features: [],
      typeofplace: [],
      workfrom: [],
      comment:"",
      optInNewsletter: false,
      work_other:"",
      goals:"",
      other_goal:"",
    },
  });

  const [showOtherInput, setShowOtherInput] = useState(false); // State to track "Other" checkbox for type of workplace and show additional text input
  const handleCheckboxChange = (value: string, checked: boolean) => {
    if (value === "другое") {
      setShowOtherInput(checked);
    }
  };


  const [showOtherGoal, setShowOtherGoal] = useState(false); // State to track "Other" checkbox for type of workplace and show additional text input
  const handleListGoals = (value: string) => {
    if (value === "Другое") {
      setShowOtherGoal(true);
    } else setShowOtherGoal(false);
  };


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
{ !isSuccess && (
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
      {["дома", "в кофейне", "в офисе", "другое"].map((option) => (
        <label key={option} className="flex items-center space-x-2">
          <Checkbox
            key={option}
            checked={field.value.includes(option)}
            onCheckedChange={(isChecked) => {
              const newValue = isChecked
                ? [...field.value, option]
                : field.value.filter((v) => v !== option);
              field.onChange(newValue);
              handleCheckboxChange(option, isChecked);
             
            }}
          />
          <span>{option}</span></label>
        
      ))}
      <FormMessage />
    </FormItem>
  )}
/>

   {/* Work Other Input (Conditional) */}
   {showOtherInput && (
          <FormField
            control={form.control}
            name="work_other"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-formamedium">Свой вариант</FormLabel>
                <FormControl>
                  <Input placeholder="в другом коворкинге? на островах?)" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
   )}


          <FormField
            control={form.control}
            name="occupacy"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Чем вы занимаетесь?</FormLabel>
                <FormControl>
                  <Input placeholder="Архитектор, проектирую дома" {...field} />
                </FormControl>
                <FormDescription>
                  Нам интересно узнать направление работы или профессию.

                </FormDescription>
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
                  <SelectItem value="От случая к случаю">От случая к случаю</SelectItem>
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
                <FormLabel>Какие форматы вам будут интересны</FormLabel>
                  {[
                  "Плавающее место",
                  "Закреплённое место",
                  "Переговорка для встреч",
                  "Мини-кабинет на одного",
                  "Кабинет для 2-х человек",
                  "Кабинет для команды до 4-х человек",
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
                
                <FormDescription>
                  Плавающее место &mdash; каждый день вы можете выбирать новое место из доступных.<br/>
                  Закреплённое место &mdash; только ваше место, где вы можете оставлять свои вещи.<br/>
                  Переговорка — отдельная комната для встреч до 6-ти человек, оборудованная ТВ, почасовая оплата.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />


        {/* Goals Field */}
        <FormField
          control={form.control}
          name="goals"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Что вас привлекает больше всего в работе из коворкинга?</FormLabel>
              <FormControl>
                <Select onValueChange={(value) => {
                  field.onChange(value); // Update form state using React Hook Form
                  handleListGoals(value); // Call your custom function to handle additional behavior
                }}
                  defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите главное" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Повышение производительности">Повышение производительности</SelectItem>
                    <SelectItem value="Повышение кофморта рабочего места">Повышение кофморта рабочего места</SelectItem>
                    <SelectItem value="Нетворкинг">Нетворкинг</SelectItem>
                    <SelectItem value="Доступ к оборудованию">Доступ к оборудованию</SelectItem>
                    <SelectItem value="Переговорная">Переговорная</SelectItem>
                    <SelectItem value="Другое">Другое</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        
   {/* Work Other Goal (Conditional) */}
   {showOtherGoal && (
          <FormField
            control={form.control}
            name="other_goal"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-formamedium">Свой вариант</FormLabel>
                <FormControl>
                  <Input placeholder="смена обстановки" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
   )}  
          <FormField
            control={form.control}
            name="features"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Какие удобства/сервисы важны для вас</FormLabel>
                <FormDescription>
                 Выберите несколько опций из списка.
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
                  "Фильтр-кофе, чай, кулер с водой",
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
                <FormLabel>Предложения или идеи</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Предложения или идеи"
                    rows={3}
                    className="w-full border rounded-md p-2 text-[16px] md:text-base "
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
                    <span className="text-base">Напишите мне, когда можно будет забронировать место.</span>
                  </label>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
     
          <Button
            className="w-full font-formamedium items-center"
            size="lg"
            type="submit"
            disabled={isLoading, isSuccess}
            variant={isSuccess ? "green" : "default"}
            
          >
            <Send/>{isLoading ? "Анкета отправляется..." : isSuccess ? "Успешно!" : "Отправить"}
          </Button>
        
        </form>
      </Form>

          )}

<Alert hidden={!isSuccess} className=" border-green-500/50">
        <MailCheckIcon className="h-4 w-4" />
        
        <AlertDescription>
          Спасибо, что уделили пару минут и заполнили анкету. Так мы лучше сможем понять потребности и учесть их при проектировании коворкинга.
        </AlertDescription>
      </Alert>
    </>


  );
}