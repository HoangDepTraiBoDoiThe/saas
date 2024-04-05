"use client";
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { Input } from "../ui/input";
import { userSchema } from "@/lib/types";
import { Loader, Loader2 } from "lucide-react";

type Props = {
  user: any;
  onUpdate: (userName: string) => Promise<void>;
};

const ProfileForm = (props: Props) => {
  const { user, onUpdate } = props;
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof userSchema>>({
    mode: "onChange",
    resolver: zodResolver(userSchema),
    defaultValues: {
      userName: user.name,
      email: user.email,
    },
  });

  const onSubmit = async (values: z.infer<typeof userSchema>) => {
    setIsLoading(true);
    await onUpdate(values.userName);
    setIsLoading(false);
    console.log(values);
  };

  useEffect(() => {
    form.reset({ userName: user.name, email: user.email });
  }, [user]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <FormField
          control={form.control}
          name="userName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          disabled={true}
          name="userName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" type="email" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="self-start text-black bg-white hover:bg-[#2F006B] hover:text-white "
          type="submit"
        >
          {isLoading ? (
            <>
              <Loader className="animate-spin" />
              Saving
            </>
          ) : (
            "Save user settings"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default ProfileForm;
