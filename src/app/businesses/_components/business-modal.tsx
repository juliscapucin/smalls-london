"use client";

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

import { Business } from "../_types/business";

import BusinessForm from "./business-form";

type BusinessModalProps = {
  business: Business | null;
};

export default function BusinessModal({ business }: BusinessModalProps) {
  if (!business) {
    return null;
  }
  return (
    <DialogContent className="max-w-content">
      <BusinessForm business={business} />
    </DialogContent>
  );
}
