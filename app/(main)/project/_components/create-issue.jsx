"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import React from "react";

const IssueCreateDrawer = ({
  isopen,
  onclose,
  sprintId,
  status,
  projectId,
  onIssueCreated,
  orgId,
}) => {
  return (
    <Drawer open={isopen} onClose={onclose}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Create New Issue</DrawerTitle>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
};

export default IssueCreateDrawer;
