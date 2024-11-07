"use client";

import { createSprint } from "@/actions/sprints";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { addDays, format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarSearchIcon } from "lucide-react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import useFetch from "@/hooks/use-fetch";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { sprintSchema } from "@/app/lib/validators";

const SprintCreationForm = ({
  projectId,
  projectitle,
  projectkey,
  sprintkey,
}) => {
  const [showForm, setShowForm] = useState(false);
  const router = useRouter();
  const [daterange, setdaterange] = useState({
    from: new Date(),
    to: addDays(new Date(), 14),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: zodResolver(sprintSchema),
    defaultValues: {
      name: `${projectkey}-${sprintkey}`,
      startDate: daterange.from,
      endDate: daterange.to,
    },
  });

  const { loading: createsprintloading, fn: createsprintfn } =
    useFetch(createSprint);

  const onSubmit = async (data) => {
    try {
      const sprint = await createsprintfn(projectId, {
        ...data,
        startDate: daterange.from,
        endDate: daterange.to,
      });
      console.log(sprint);
      setShowForm(false);
      toast.success("Sprint Created");
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-5xl font-bold mb-8 gradient-title">
          {projectitle}
        </h1>
        <Button
          className="mt-2"
          onClick={() => setShowForm(!showForm)}
          variant={showForm ? "destructive" : "default"}
        >
          {showForm ? "Cancel" : "Create New Sprint"}
        </Button>
      </div>
      {showForm && (
        <Card className="pt-4 mb-4">
          <CardContent>
            <form
              className="flex gap-4 items-end"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex-1">
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="name"
                >
                  Sprint name
                </label>
                <Input
                  id="name"
                  readOnly
                  className="bg-slate-950"
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-red-500">{errors.name.message}</p>
                )}
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">
                  Sprint Duration
                </label>
                <Controller
                  control={control}
                  name="daterange"
                  render={({ field }) => (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          className={`w-full justify-start text-left font-normal bg-slate-950 ${
                            !daterange && "text-muted-foreground"
                          }`}
                          variant="outline"
                        >
                          <CalendarSearchIcon className="mr-2 h-4 w-4" />
                          {daterange && daterange.to ? (
                            format(daterange.from, "LLL dd, y") +
                            " - " +
                            format(daterange.to, "LLL dd, y")
                          ) : (
                            <span>Pick a Date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto bg-slate-900"
                        align="start"
                      >
                        <DayPicker
                          mode="range"
                          selected={daterange}
                          onSelect={(range) => {
                            if (range?.to && range?.from) {
                              setdaterange(range);
                              field.onChange(range);
                            }
                          }}
                          classNames={{
                            chevron: "fill-blue-500",
                            range_start: "bg-blue-700",
                            range_end: "bg-blue-700",
                            range_middle: "bg-blue-400",
                            day_button: "border-none",
                            today: "border-2 border-blue-700",
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  )}
                />
              </div>
              <Button type="submit" disabled={createsprintloading}>
                {createsprintloading ? "Creating..." : "Create Sprint"}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default SprintCreationForm;
