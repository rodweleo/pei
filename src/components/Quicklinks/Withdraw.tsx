"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";

const WithdrawSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export default function WithdrawQuickLink() {
  const WithdrawForm = useForm<z.infer<typeof WithdrawSchema>>({
    resolver: zodResolver(WithdrawSchema),
    defaultValues: {
      username: "",
    },
  });

  function onSubmit(values: z.infer<typeof WithdrawSchema>) {
    console.log(values);
  }
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">WITHDRAW</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="*:text-left">
          <DrawerTitle>Transaction Details</DrawerTitle>
        </DrawerHeader>
        <div className="p-4">
          <Form {...WithdrawForm}>
            <form
              onSubmit={WithdrawForm.handleSubmit(onSubmit)}
              className="space-y-4"
            >
              <FormField
                control={WithdrawForm.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Recipient M-Pesa Number</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 0712345678" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={WithdrawForm.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount (KES)</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter amount" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <TransferSummary />
            </form>
          </Form>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export function TransferSummary() {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button className="w-full text-xs">CONTINUE</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader className="text-left">
            <DialogTitle>Withdraw Summary</DialogTitle>
          </DialogHeader>
          <Card>
            <CardContent>
              <table className="w-full *:py-2">
                <tr className="flex justify-between">
                  <td>Withdraw Amount:</td>
                  <th>KES 1000</th>
                </tr>
                <tr className="flex justify-between">
                  <td>Exchange Rate:</td>
                  <th>1 HBAR = KES</th>
                </tr>
                <tr className="flex justify-between">
                  <td>HBAR Required:</td>
                  <th>6 HBAR</th>
                </tr>
                <tr className="flex justify-between">
                  <td>Transfer Fee (6%):</td>
                  <th>0.4 HBAR</th>
                </tr>
                <tr className="border"></tr>
                <tr className="flex justify-between">
                  <th>Total Cost:</th>
                  <th>0.4 HBAR</th>
                </tr>
              </table>
              <p className="text-center">- - - - - - - - - - - -</p>
              <p className="w-full text-center text-lg">
                <span>
                  Receipient will receive <strong>KES 1000</strong>
                </span>
              </p>
            </CardContent>
          </Card>
          <DialogFooter>
            <Button type="submit" className="w-full text-xs">
              WITHDRAW
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
