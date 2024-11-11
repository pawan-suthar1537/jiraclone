"use client";

import { createIssue } from "@/actions/issues";
import { getOrganizationusers } from "@/actions/organizations";
import { IssueSchema } from "@/app/lib/validators";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useFetch from "@/hooks/use-fetch";
import { zodResolver } from "@hookform/resolvers/zod";
import MDEditor from "@uiw/react-md-editor";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { BarLoader } from "react-spinners";
import { toast } from "sonner";

const IssueCreateDrawer = ({
  isopen,
  onclose,
  sprintId,
  status,
  projectId,
  onIssueCreated,
  orgId,
}) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(IssueSchema),
    defaultValues: {
      description: "",
      assigneeId: "",
      priority: "MEDIUM",
    },
  });

  const {
    loading: createissueloading,
    fn: createissuefn,
    error,
    data: newIssue,
  } = useFetch(createIssue);

  useEffect(() => {
    if (newIssue) {
      reset();
      onclose();
      onIssueCreated();
      toast.success("Issue created successfully");
    }
  }, [newIssue, createissueloading]);

  const {
    loading: userloading,
    fn: fetchusers,

    data: users,
  } = useFetch(getOrganizationusers);

  useEffect(() => {
    if (isopen && orgId) {
      fetchusers(orgId);
    }
  }, [orgId, isopen]);

  const onSubmit = async (formData) => {
    try {
      const issueData = {
        ...formData,
        status: status,
        sprintId: sprintId,
      };

      // Call createIssue with projectId first, then the issue data
      await createissuefn(projectId, issueData);
    } catch (err) {
      console.error("Error creating issue:", err);
      toast.error(err.message || "Failed to create issue");
    }
  };

  return (
    <Drawer open={isopen} onClose={onclose}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Create New Issue</DrawerTitle>
        </DrawerHeader>
        {userloading && <BarLoader width={"100%"} color="#36d7b7" />}
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-1">
              Title
            </label>
            <Input id="title" {...register("title")} />
          </div>
          <div>
            <label
              htmlFor="assignId"
              className="block text-sm font-medium mb-1"
            >
              Assignee
            </label>
            <Controller
              name="assigneeId"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                  }}
                  value={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Assignee" />
                  </SelectTrigger>
                  <SelectContent>
                    {users?.map((user) => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />

            {errors.assigneeId && (
              <p className="text-red-500 text-sm mt-1">
                {errors.assigneeId.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium mb-1"
            >
              Description
            </label>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <MDEditor value={field.value} onChange={field.onChange} />
              )}
            />

            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>
          {error && (
            <p className="text-red-500 text-sm mt-2">{error.message}</p>
          )}
          <Button
            type="submit"
            disabled={createissueloading}
            className="w-full mt-2"
          >
            {createissueloading ? "Creating..." : "Create Issue"}
          </Button>
        </form>
      </DrawerContent>
    </Drawer>
  );
};

export default IssueCreateDrawer;
