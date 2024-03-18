"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import ItemCards from "../item-cards";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogHeader,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { PlaceholderDashboardData } from "@/lib/types/placeholder-dashboard-data";

const formSchema = z.object({
  // We can discuss what other things it could or could not be
  type: z.enum(["Announcement", "Information", "Event", ""]),
  summary: z.optional(z.string()),
  file: z.optional(z.instanceof(File)),
});

const InformationCard = ({ data }: { data: PlaceholderDashboardData[] }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "",
      summary: undefined,
      file: undefined,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Information Board: </CardTitle>
            <CardDescription>
              Here are any recent congregation announcements.
            </CardDescription>
          </div>

          <Dialog>
            <DialogTrigger>
              <Button size="sm">
                <Plus />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add a congregation announcement</DialogTitle>
                <DialogDescription>
                  Add a new announcement to the information board for your
                  congregation
                </DialogDescription>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                  >
                    <FormField
                      control={form.control}
                      name="type"
                      render={(field) => (
                        <FormItem>
                          <FormLabel>Type:</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Announcement"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="summary"
                      render={(field) => (
                        <FormItem>
                          <FormLabel>Summary:</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="A new brother has joined our congregation..."
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="file"
                      render={(field) => (
                        <FormItem>
                          <FormLabel>File:</FormLabel>
                          <FormControl>
                            <Input type="file" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </form>
                </Form>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      {/* Probably put some links to docs here...? */}
      <CardContent>
        <ScrollArea className="h-72">
          <ItemCards data={data} />
          <ScrollBar />
        </ScrollArea>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};

export default InformationCard;
