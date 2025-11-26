"use client";

import { motion } from "framer-motion";

export interface Tool {
  name: string;
  url: string;
  tags: string[];
  notes: string;
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const rowVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

function Tag({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide border border-neutral-400 text-neutral-600 bg-neutral-100">
      {label}
    </span>
  );
}

function ToolRow({ tool }: { tool: Tool }) {
  return (
    <motion.a
      href={tool.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col gap-3 py-5 border-t border-neutral-300 md:grid md:grid-cols-[minmax(140px,200px)_1fr_auto] md:items-center md:gap-6 md:transition-all md:hover:border-dashed md:[&:hover+a]:border-dashed"
      variants={rowVariants}
    >
      {/* Tags column */}
      <div className="flex flex-wrap gap-1.5">
        {tool.tags.length > 0 ? (
          tool.tags.map((tag) => <Tag key={tag} label={tag} />)
        ) : (
          <span className="text-neutral-400 text-sm md:block hidden">—</span>
        )}
      </div>

      {/* Name & Notes column */}
      <div className="flex flex-col gap-0.5">
        <span className="text-[15px] font-medium text-neutral-900 md:group-hover:text-accent transition-colors">
          {tool.name}
        </span>
        {tool.notes && (
          <span className="text-[13px] text-neutral-500 font-mono">
            {tool.notes}
          </span>
        )}
      </div>

      {/* Try button */}
      <div className="flex items-center">
        <span className="inline-flex items-center justify-center px-4 py-1.5 text-[13px] font-medium border border-neutral-300 text-neutral-700 transition-all md:group-hover:bg-accent md:group-hover:border-accent md:group-hover:text-white">
          Try →
        </span>
      </div>
    </motion.a>
  );
}

export function ToolList({ tools }: { tools: Tool[] }) {
  return (
    <motion.div
      className="flex flex-col"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {tools.map((tool) => (
        <ToolRow key={tool.name} tool={tool} />
      ))}
    </motion.div>
  );
}
