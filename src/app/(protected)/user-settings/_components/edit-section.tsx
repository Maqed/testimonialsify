"use client";
import type { z } from "zod";
import { useSession } from "next-auth/react";
import { userSettingsSchema } from "@/zod/user-settings";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { TransitionStartFunction } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
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
import { toast } from "sonner";
import { updateUserAction } from "@/actions/users";

type Props = {
  isPending: boolean;
  startTransition: TransitionStartFunction;
};

function EditAccountSection({ isPending, startTransition }: Props) {
  const { data: session, update, status } = useSession();
  const form = useForm<z.infer<typeof userSettingsSchema>>({
    resolver: zodResolver(userSettingsSchema),
    defaultValues: {
      name: session?.user.name,
      username: session?.user.username,
    },
    values: session?.user,
  });
  async function onSubmit(values: z.infer<typeof userSettingsSchema>) {
    startTransition(async () => {
      const response = await updateUserAction(values);
      await update();
      if (response.message) {
        toast.success(response.message);
      } else if (response.error) {
        toast.error(response.error);
      }
    });
  }
  return (
    <section className="mb-3">
      <h1 className="text-3xl font-bold">User Settings</h1>
      <hr className="my-2" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  {status === "loading" ? (
                    <Skeleton className="h-10 w-full" />
                  ) : (
                    <Input
                      disabled={isPending}
                      placeholder="John Doe"
                      {...field}
                    />
                  )}
                </FormControl>
                <FormDescription>
                  Your name is shown to the public
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  {status === "loading" ? (
                    <Skeleton className="h-10 w-full" />
                  ) : (
                    <Input
                      disabled={isPending}
                      placeholder="Unique Username"
                      {...field}
                      onBlur={async () => {
                        try {
                          const userInput =
                            userSettingsSchema.shape.username.parse(
                              field.value,
                            );
                          if (
                            userInput &&
                            userInput !== session?.user.username
                          ) {
                            const response = await fetch(
                              `/api/user/isUserUnique?username=${field.value}`,
                            );
                            const data = await response.json();
                            if (!data.isUnique) {
                              toast.error(
                                "Username is not unique, try something else.",
                              );
                            }
                          }
                        } catch (error) {}
                      }}
                    />
                  )}
                </FormControl>
                <FormDescription>
                  Username will be displayed in the testimonial share link
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isPending} type="submit">
            Update Profile
          </Button>
        </form>
      </Form>
    </section>
  );
}

export default EditAccountSection;
