"use client";

import { useState } from "react";
import { Card } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "./ui/calendar";

const TodoList = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [open, setOpen] = useState(false);

  const tasks = [
    {
      id: "task1",
      label: "Verify 'Luxury Beachfront Villa' listing",
      checked: true,
    },
    {
      id: "task2",
      label: "Review new category proposal: 'Co-working Spaces'",
      checked: true,
    },
    {
      id: "task3",
      label: "Approve business owner verification for 'Zen Spa'",
      checked: false,
    },
    {
      id: "task4",
      label: "Check reported listing: 'Cheap iPhone Shop'",
      checked: false,
    },
    {
      id: "task5",
      label: "Update SEO keywords for 'Real Estate' category",
      checked: false,
    },
    {
      id: "task6",
      label: "Moderation: Review 12 new comments on 'The Golden Fork'",
      checked: false,
    },
    {
      id: "task7",
      label: "Newsletter: Draft weekly featured listings",
      checked: false,
    },
  ];

  return (
    <div className="">
      <h1 className="text-lg font-medium mb-6">Pending Tasks</h1>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button className="w-full">
            <CalendarIcon />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-auto">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(date) => {
              setDate(date);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
      {/* LIST */}
      <ScrollArea className="max-h-[400px] mt-4 overflow-y-auto">
        <div className="flex flex-col gap-4">
          {tasks.map((task) => (
            <Card key={task.id} className="p-4">
              <div className="flex items-center gap-4">
                <Checkbox id={task.id} checked={task.checked} />
                <label
                  htmlFor={task.id}
                  className="text-sm text-muted-foreground"
                >
                  {task.label}
                </label>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default TodoList;
