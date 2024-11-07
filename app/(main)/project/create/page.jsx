"use client";

import OrgSwitcher from "@/components/OrgSwitcher";
import { useOrganization, useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectSchema } from "@/app/lib/validators";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import useFetch from "@/hooks/use-fetch";
import { createProject } from "@/actions/projects";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const CreateProject = () => {
  const { isLoaded: isorgloaded, membership } = useOrganization();
  const { isLoaded: isuserloaded } = useUser();
  const [isadmin, setIsAdmin] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(projectSchema),
  });

  useEffect(() => {
    if (isorgloaded && isuserloaded && membership) {
      setIsAdmin(membership.role === "org:admin");
    }
  }, [isorgloaded, isuserloaded, membership]);
  const {
    data: project,
    error,
    fn: createprojectfn,
    setData,
    loading,
  } = useFetch(createProject);

  useEffect(() => {
    if (project) {
      toast.success("Project Created Successfully");
      router.push(`/project/${project.id}`);
    }
  }, [loading]);

  if (!isorgloaded && !isuserloaded) {
    return null;
  }

  const onSubmit = async (data) => {
    createprojectfn(data);
  };

  if (!isadmin) {
    return (
      <div className="flex flex-col gap-2 items-center">
        <span className="text-2xl gradient-title ">
          Oops! only admin can create Project
        </span>
        <OrgSwitcher />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-6xl text-center font-bold mb-8 gradient-title">
        Create New Project
      </h1>
      <form
        className="flex flex-col space-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <Input
            id="name"
            placeholder="Project Name"
            className="bg-slate-950"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>
        <div>
          <Input
            id="key"
            placeholder="Project Key (ex: RHCY)"
            className="bg-slate-950"
            {...register("key")}
          />
          {errors.key && (
            <p className="text-red-500 text-sm mt-1">{errors.key.message}</p>
          )}
        </div>
        <div>
          <Textarea
            id="description"
            placeholder="Project description"
            className="bg-slate-950"
            {...register("description")}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>
        <Button
          disabled={loading}
          type="submit"
          size="lg"
          className="bg-blue-500 text-white"
        >
          {loading ? "Creating..." : "Create Project"}
        </Button>
        {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
      </form>
    </div>
  );
};

export default CreateProject;
