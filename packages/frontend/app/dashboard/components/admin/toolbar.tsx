import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Snippet } from "@nextui-org/react";
import { CheckIcon, Loader, KeyRound, UserPlus } from "lucide-react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AppDispatch, RootState } from "@/lib/stores/app-store";
import { dashboardToolbarSlice } from "@/lib/stores/dashboard/toolbar";
import { generateTokenThunk } from "@/lib/stores/thunks/generate-token";
import {
  GenerateTokenFormData,
  generateTokenFormSchema,
} from "@/lib/types/dashboard";

const { clearGenerateTokenState } = dashboardToolbarSlice.actions;

export function DashboardToolbar() {
  return (
    <div className="flex gap-x-4 justify-end w-full">
      <GenerateTokenForm />
    </div>
  );
}

function GenerateTokenForm() {
  const state = useSelector((state: RootState) => state.dashboardToolbar);
  const dispatch: AppDispatch = useDispatch();
  const form = useForm<GenerateTokenFormData>({
    resolver: zodResolver(generateTokenFormSchema),
  });
  const currentUserId = useSelector(
    (state: RootState) => state.dashboard.currentUser?.id,
  );
  const [alertOpen, setAlertOpen] = React.useState(false);

  React.useEffect(() => {
    form.reset();
    dispatch(clearGenerateTokenState());
  }, [dispatch, alertOpen, form]);

  const isTokenGenerationSuccessful =
    state.generateToken.receivedToken !== undefined;

  const onSubmit = async () => {
    if (!currentUserId) {
      return;
    }

    await dispatch(
      generateTokenThunk({
        ...form.getValues(),
        createdByUserId: currentUserId,
      }),
    );
  };

  const renderGenerateTokenForm = () => {
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-8">
          <FormField
            control={form.control}
            name="userEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Invitee Email</FormLabel>
                <FormDescription>The invitee&apos;s email</FormDescription>
                <FormControl>
                  <Input placeholder="Invitee email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {state.generateToken.receivedToken && (
            <Snippet symbol="Invitee's token:" variant="bordered">
              <span className="bg-red">
                {state.generateToken.receivedToken.value}
              </span>
            </Snippet>
          )}

          <Button
            size="sm"
            type="submit"
            className="flex ml-auto gap-x-2"
            disabled={isTokenGenerationSuccessful}
          >
            {isTokenGenerationSuccessful && (
              <>
                Success
                <CheckIcon className="text-green-500" />
              </>
            )}
            {!isTokenGenerationSuccessful && (
              <>
                Generate Token
                {state.generateToken.isLoading ? (
                  <Loader className="animate-spin" />
                ) : (
                  <KeyRound />
                )}
              </>
            )}
          </Button>
        </form>
      </Form>
    );
  };

  const renderAlertContent = () => {
    return (
      <Card className="flex flex-col items-center w-full border-none p-1">
        <CardHeader className="p-1 w-full">
          <CardTitle>Generate a Token</CardTitle>
          <CardDescription>
            Generate a token and send it to your invitee.
          </CardDescription>
        </CardHeader>
        <CardContent className="w-full p-1">
          {renderGenerateTokenForm()}
        </CardContent>
      </Card>
    );
  };

  return (
    <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
      <AlertDialogTrigger asChild>
        <Button size="sm" className="gap-x-2">
          <UserPlus />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-full">
        {renderAlertContent()}

        <AlertDialogCancel color="secondary" className="flex gap-x-2 mr-auto">
          Close
        </AlertDialogCancel>
      </AlertDialogContent>
    </AlertDialog>
  );
}
