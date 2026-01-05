"use client";

import { useState } from "react";

import {
  addBusiness,
  updateBusiness,
} from "@/app/businesses/_actions/business";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Business } from "../_types/business";

type BusinessFormProps = {
  business?: Business;
};

export default function BusinessForm({ business }: BusinessFormProps) {
  const [newBusiness, setNewBusiness] = useState({
    name: business ? business.name : "",
    description: business ? business.description : "",
    category: business ? business.category : "",
    email: business ? business.email : "",
  });
  const variant = business ? "Update" : "Add";

  return (
    <form
      onSubmit={() => {
        if (business?.id) {
          updateBusiness(business.id, newBusiness);
        } else {
          addBusiness(newBusiness);
        }
      }}
    >
      <h2 className="heading-headline mb-6">{variant} Business Profile</h2>
      <div className="mb-4">
        <Label>
          Full Name
          <Input
            type="text"
            name="full-name"
            className="w-full"
            required
            minLength={1}
            value={newBusiness.name}
            onChange={(e) => {
              setNewBusiness({ ...newBusiness, name: e.target.value });
            }}
          />
        </Label>
        <Label>
          Description
          <textarea
            rows={7}
            name="description"
            className="w-full border border-secondary rounded-md p-2"
            required
            value={newBusiness.description!}
            onChange={(e) => {
              setNewBusiness({ ...newBusiness, description: e.target.value });
            }}
          />
        </Label>
        <Label>
          Category
          <select
            name="category"
            className="w-fit border border-secondary rounded-md p-2 block"
            required
            onChange={(e) => {
              setNewBusiness({ ...newBusiness, category: e.target.value });
            }}
          >
            <option
              className="capitalize"
              value={newBusiness.category ? newBusiness.category : ""}
            >
              {newBusiness.category
                ? newBusiness.category
                : "Select a category"}
            </option>
            <option value="design">Design</option>
            <option value="fashion">Fashion</option>
            <option value="beauty">Beauty</option>
            <option value="retail">Retail</option>
          </select>
        </Label>
      </div>

      <Button type="submit">{variant} Business</Button>
    </form>
  );
}
