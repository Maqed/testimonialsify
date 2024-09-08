"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { absoluteURL } from "@/lib/utils";
import { createProjectsSchema } from "@/zod/projects";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type Props = {
  onSubmitSuccess?: () => void;
};

function CreateProjectCard({ onSubmitSuccess }: Props) {
  const form = useForm<z.infer<typeof createProjectsSchema>>({
    resolver: zodResolver(createProjectsSchema),
    defaultValues: {
      name: "",
    },
  });
  async function onSubmit(values: z.infer<typeof createProjectsSchema>) {
    const createProjectPromise = fetch(absoluteURL("/api/create/project"), {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    toast.promise(createProjectPromise, {
      loading: "Creating Project....",
      success: () => {
        if (onSubmitSuccess) {
          onSubmitSuccess();
        }
        return "Project has been created successfully!";
      },
      error: "An error has occured",
    });
  }
  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>Create a new Project</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="My multi billion dollar project"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Create project</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default CreateProjectCard;
