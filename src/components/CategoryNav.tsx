"use client";

import { motion } from "framer-motion";
import { Category } from "@/data/menu";
import { cn } from "@/lib/utils";
import * as Icons from "lucide-react";

interface CategoryNavProps {
  readonly categories: Category[];
  readonly activeCategory: string;
  readonly onCategoryChange: (categoryId: string) => void;
}

export function CategoryNav({
  categories,
  activeCategory,
  onCategoryChange,
}: Readonly<CategoryNavProps>) {
  return (
    <div className="sticky top-14 sm:top-16 z-40 bg-[#F8F8F8]/95 backdrop-blur-sm border-b border-[#EFEDEB] overflow-hidden">
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-1.5 sm:gap-2 px-3 sm:px-4 py-3 min-w-max">
          {categories.map((category) => {
            const Icon = Icons[category.icon as keyof typeof Icons] as any;
            const isActive = activeCategory === category.id;

            return (
              <motion.button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-full",
                  "font-medium text-xs sm:text-sm transition-all duration-300 touch-target",
                  "whitespace-nowrap relative flex-shrink-0",
                  isActive
                    ? "bg-[#3B2A28] text-white shadow-[0_4px_12px_rgba(59,42,40,0.15)]"
                    : "bg-[#EFEDEB] text-[#3B2A28] hover:bg-[#E8E5E2]"
                )}
              >
                {Icon && <Icon size={16} className="sm:w-[18px] sm:h-[18px]" />}
                <span>{category.name}</span>
                
                {isActive && (
                  <motion.div
                    layoutId="activeCategory"
                    className="absolute inset-0 bg-amber-700 rounded-full -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
