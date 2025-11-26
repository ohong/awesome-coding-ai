import Image from "next/image";
import { parseReadme } from "@/lib/parseReadme";
import { ToolList } from "./components/ToolList";

const REPO_URL = "https://github.com/ohong/awesome-coding-ai";

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
          <p className="text-neutral-500 text-[15px] font-mono md:whitespace-nowrap">
            Hit the usage limit on your AI coding tool again? Give one of these a shot!
          </p>
        </header>

        {/* Tool list */}
        <ToolList tools={tools} />

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
