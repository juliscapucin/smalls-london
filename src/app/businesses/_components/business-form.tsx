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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectValue,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { TypographyHeading } from "@/components/ui/typography-heading";

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
  const action = business ? "Update" : "Add";

  return (
    <form
      className="max-w-content"
      onSubmit={(e) => {
        e.preventDefault();
        if (business?.id) {
          updateBusiness(business.id, newBusiness);
        } else {
          addBusiness(newBusiness);
          setNewBusiness({
            name: "",
            description: "",
            category: "",
            email: "",
          });
        }
      }}
    >
      <TypographyHeading tag="h2" variant="title" className="mb-6">
        {action} Profile
      </TypographyHeading>
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
          <Textarea
            rows={7}
            name="description"
            required
            value={newBusiness.description!}
            onChange={(e) => {
              setNewBusiness({ ...newBusiness, description: e.target.value });
            }}
          />
        </Label>
        <Label>
          Category
          <Select
            value={newBusiness.category ?? ""}
            onValueChange={(value) => {
              setNewBusiness({ ...newBusiness, category: value });
            }}
          >
            <SelectTrigger className="w-fit capitalize">
              <SelectValue placeholder="Select a category">
                {newBusiness.category}
              </SelectValue>
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectGroup>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="fashion">Fashion</SelectItem>
                <SelectItem value="beauty">Beauty</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </Label>
      </div>

      <Button type="submit">{action} Business</Button>
    </form>
  );
}
