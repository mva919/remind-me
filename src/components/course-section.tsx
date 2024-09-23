import { useEffect, useRef, useState } from "react";
import autoAnimate from "@formkit/auto-animate";
import { ChevronLast } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import CourseList from "~/components/course-list";

const CourseSection = () => {
  const parent = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  return (
    <div
      ref={parent}
      className={`${
        isExpanded ? "w-80" : "px-1"
      } flex h-full flex-col overflow-y-scroll border-r border-r-slate-300 p-1 dark:border-r-slate-600`}
    >
      {!isExpanded ? (
        <div>
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  onClick={() => setIsExpanded((prev) => !prev)}
                >
                  <ChevronLast size={24} />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Expand course list</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      ) : (
        <CourseList setIsExpanded={setIsExpanded} />
      )}
    </div>
  );
};

export default CourseSection;
