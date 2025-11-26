import Image from "next/image";
import { parseReadme, Tool } from "@/lib/parseReadme";

const REPO_URL = "https://github.com/ohong/awesome-coding-ai";

function Tag({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide border border-neutral-400 text-neutral-600 bg-neutral-100">
      {label}
    </span>
  );
}

function ToolRow({ tool }: { tool: Tool }) {
  return (
    <a
      href={tool.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative grid grid-cols-[minmax(140px,200px)_1fr_auto] items-center gap-6 py-5 border-t border-neutral-300 transition-all hover:border-dashed [&:hover+a]:border-dashed"
    >
      {/* Tags column */}
      <div className="flex flex-wrap gap-1.5">
        {tool.tags.length > 0 ? (
          tool.tags.map((tag) => <Tag key={tag} label={tag} />)
        ) : (
          <span className="text-neutral-400 text-sm">—</span>
        )}
      </div>

      {/* Name & Notes column */}
      <div className="flex flex-col gap-0.5">
        <span className="text-[15px] font-medium text-neutral-900 group-hover:text-accent transition-colors">
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
        <span className="inline-flex items-center justify-center px-4 py-1.5 text-[13px] font-medium border border-neutral-300 text-neutral-700 transition-all group-hover:bg-accent group-hover:border-accent group-hover:text-white">
          Try →
        </span>
      </div>
    </a>
  );
}

export default function Home() {
  const tools = parseReadme();

  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-5xl px-6 py-16">
        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
              Awesome Coding AI
            </h1>
            <a
              href={REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-600 hover:text-neutral-900 transition-colors"
              aria-label="View on GitHub"
            >
              <Image
                src="/github.svg"
                alt="GitHub"
                width={24}
                height={24}
                className="opacity-70 hover:opacity-100 transition-opacity"
              />
            </a>
          </div>
          <p className="text-neutral-500 text-[15px] font-mono whitespace-nowrap">
            Hit the usage limit on your AI coding tool again? Give one of these a shot!
          </p>
        </header>

        {/* Tool list */}
        <div className="flex flex-col">
          {tools.map((tool) => (
            <ToolRow key={tool.name} tool={tool} />
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-neutral-200">
          <p className="text-neutral-400 text-sm">
            Please{" "}
            <a
              href="https://github.com/ohong/awesome-coding-ai/pulls"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline hover:text-orange-700 transition-colors"
            >
              open a PR
            </a>{" "}
            if you&apos;d like to add a new AI coding tool you&apos;ve been
            enjoying or to propose a correction!
          </p>
        </footer>
      </main>
    </div>
  );
}
