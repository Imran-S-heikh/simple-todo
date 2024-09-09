"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { atom, useRecoilState, useRecoilValue } from "recoil";
import { nanoid } from "nanoid";
import { IconAlarm } from "@/assets/icons";
import { use, useEffect, useState } from "react";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { CircleX, Cross, Plus, X } from "lucide-react";
import { Button } from "./ui/button";
import IconCross from "@/assets/icons/IconCross";

enum SuggestionType {
  MINUTE = "MINUTE",
  HOUR = "HOUR",
  DAY = "DAY",
}

interface Suggestion {
  id: string;
  label: string;
  value: number;
  type: SuggestionType;
}

const SUGGESTION_KEY = "SUGGESTION_STATE";
const SuggestionState = atom<Suggestion[]>({
  key: SUGGESTION_KEY,
  default: (() => {
    const storedValue = localStorage.getItem(SUGGESTION_KEY);

    if (storedValue) {
      return JSON.parse(storedValue);
    }

    return [
      {
        id: nanoid(),
        label: "15 Minutes",
        value: 15 * 60 * 1000,
      },
      {
        id: nanoid(),
        label: "30 Minutes",
        value: 30 * 60 * 1000,
      },
      {
        id: nanoid(),
        label: "60 Minutes",
        value: 60 * 60 * 1000,
      },
    ];
  })(),
  effects: [
    ({ onSet }) => {
      onSet((newVal) => {
        localStorage.setItem(SUGGESTION_KEY, JSON.stringify(newVal));
      });
    },
  ],
});

function createLabel(value: number, singular: string) {
  const text = singular[0] + singular.toLowerCase().slice(1);
  return value === 1 ? `${value} ${text}` : `${value} ${text}s`;
}

function getTimeValue(value: number, type: SuggestionType) {
  switch (type) {
    case SuggestionType.MINUTE:
      return value * 60 * 1000;
    case SuggestionType.HOUR:
      return value * 60 * 60 * 1000;
    case SuggestionType.DAY:
      return value * 24 * 60 * 60 * 1000;
  }
}

function TimePicker({
  onSelect,
}: {
  onSelect?: (value: number | null) => void;
}) {
  const [suggestions, setSuggestions] = useRecoilState(SuggestionState);
  const [addOpen, setAddOpen] = useState(false);
  const [selected, setSelected] = useState<Suggestion | null>(null);
  const [newEntry, setNewEntry] = useState<{
    value: number;
    type: SuggestionType;
  } | null>(null);

  useEffect(() => {
    if (selected) {
      onSelect?.(selected.value + Date.now());
    } else {
      onSelect?.(null);
    }
  }, [selected]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = parseInt(e.target.value, 10);

    if (isNaN(value)) {
      return;
    }

    setNewEntry({
      value,
      type: newEntry?.type || SuggestionType.MINUTE,
    });
  }

  function handleAddNew() {
    if (!newEntry) {
      return;
    }

    const newSuggestion: Suggestion = {
      id: nanoid(),
      label: createLabel(newEntry.value, newEntry.type),
      value: getTimeValue(newEntry.value, newEntry.type),
      type: newEntry.type,
    };

    setSuggestions((pre) => [newSuggestion, ...pre]);
    setSelected(newSuggestion);
    setNewEntry(null);
    setAddOpen(false);
  }

  function deleteSuggestion(e: React.MouseEvent, id: string) {
    e.preventDefault();
    e.stopPropagation();

    if (selected?.id === id) {
      setSelected(null);
    }

    setSuggestions((pre) => [...pre.filter((s) => s.id !== id)]);
    setSelected(null);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="mr-3 outline-none">
        <IconAlarm className={cn("w-5 h-5", selected && "text-primary")} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <Popover open={addOpen} onOpenChange={setAddOpen}>
          <PopoverTrigger className="w-full flex justify-center">
            <Plus className="text-card-foreground" size={22} />
          </PopoverTrigger>
          <PopoverContent>
            <div className="flex gap-2">
              <Input
                value={newEntry?.value || 0}
                type="number"
                className=""
                onChange={handleChange}
              />
              <Select
                value={newEntry?.type || SuggestionType.MINUTE}
                onValueChange={(item) =>
                  setNewEntry((pre) => ({
                    value: pre?.value || 0,
                    type: item as SuggestionType,
                  }))
                }
              >
                <SelectTrigger className=" focus:ring-0 focus:ring-offset-0">
                  <SelectValue placeholder="Minutes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={SuggestionType.MINUTE}>Minutes</SelectItem>
                  <SelectItem value={SuggestionType.HOUR}>Hours</SelectItem>
                  <SelectItem value={SuggestionType.DAY}>Days</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="block w-full mt-2" onClick={handleAddNew}>
              Okay
            </Button>
          </PopoverContent>
        </Popover>

        <DropdownMenuSeparator />
        {suggestions.map((suggestion) => (
          <DropdownMenuItem
            key={suggestion.id}
            onClick={() => setSelected(suggestion)}
            className={cn(
              "flex justify-between",
              selected?.id === suggestion.id && "bg-primary"
            )}
          >
            <span>{suggestion.label}</span>
            <button onClick={(e) => deleteSuggestion(e, suggestion.id)}>
              <CircleX className="w-4 h-4 text-card-foreground" />
            </button>
          </DropdownMenuItem>
        ))}
        <DropdownMenuItem onClick={() => setSelected(null)}>
          No Timer
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default TimePicker;
