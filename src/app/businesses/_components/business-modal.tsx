"use client";

import { useEffect } from "react";

import { Business } from "../_types/business";

import BusinessForm from "./business-form";

type BusinessModalProps = {
  business: Business | null;
  onClose: () => void;
};

export default function BusinessModal({
  business,
  onClose,
}: BusinessModalProps) {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  if (!business) {
    return null;
  }
  return (
    <div className="fixed inset-0 bg-background/90">
      <div className="p-8 w-1/2 max-w-modal mx-auto h-[80vh] mt-[10vh] bg-background border border-secondary rounded-lg">
        <BusinessForm business={business} />
      </div>
    </div>
  );
}
