import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";
import React, { useEffect, useState } from "react";

const priorityoptions = ["LOW", "MEDIUM", "HIGH", "URGENT"];

const BoardFilters = ({ issues, onFilterChange }) => {
  const [serchterm, setserchterm] = useState("");
  const [selectedassignee, setselectedassignee] = useState([]);
  const [selectedpriority, setselectedpriority] = useState("");

  const assigness = issues
    .map((issue) => issue.assignee)
    .filter(
      (item, index, self) => index === self.findIndex((o) => o.id === item.id)
    );

  const isfilterapplied =
    serchterm !== "" || selectedassignee.length > 0 || selectedpriority !== "";

  const clearFilters = () => {
    setserchterm("");
    setselectedassignee([]);
    setselectedpriority("");
  };

  useEffect(() => {
    const filteredissues = issues.filter(
      (issue) =>
        issue.title.toLowerCase().includes(serchterm.toLowerCase()) &&
        (selectedassignee.length === 0 ||
          selectedassignee.includes(issue.assignee.id)) &&
        (selectedpriority === "" || issue.priority === selectedpriority)
    );
    onFilterChange(filteredissues);
  }, [serchterm, selectedassignee, selectedpriority, issues]);

  const toggleassignee = (assigneeId) => {
    setselectedassignee((prev) =>
      prev.includes(assigneeId)
        ? prev.filter((id) => id !== assigneeId)
        : [...prev, assigneeId]
    );
  };

  return (
    <div>
      <div className="flex flex-col pr-2 sm:flex-row gap-4 sm:gap-6 mt-6">
        <Input
          className="w-full sm:w-72"
          placeholder="Search issues"
          value={serchterm}
          onChange={(e) => setserchterm(e.target.value)}
        />
        <div className="flex-shrink-0">
          <div className="flex gap-2 flex-wrap">
            {assigness.map((a, i) => {
              const selected = selectedassignee.includes(a.id);
              return (
                <div
                  key={i}
                  className={`rounded-full ring ${
                    selected ? "ring-blue-600" : "ring-black"
                  } ${i > 0 ? "-ml-6" : ""}`}
                  style={{
                    zIndex: i,
                  }}
                  onClick={() => toggleassignee(a.id)}
                >
                  <Avatar className="h-10 w-10 cursor-pointer">
                    <AvatarImage src={a.imageUrl} alt={a.name} />
                    <AvatarFallback>{a.name[0]}</AvatarFallback>
                  </Avatar>
                </div>
              );
            })}
          </div>
        </div>
        <Select value={selectedpriority} onValueChange={setselectedpriority}>
          <SelectTrigger className="w-full sm:w-52">
            <SelectValue placeholder="select Priority" />
          </SelectTrigger>
          <SelectContent>
            {priorityoptions.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {isfilterapplied && (
          <Button
            variant="ghost"
            onClick={clearFilters}
            className="flex items-center"
          >
            <X className=" h-4 w-4" /> Clear Filters
          </Button>
        )}
      </div>
    </div>
  );
};

export default BoardFilters;
