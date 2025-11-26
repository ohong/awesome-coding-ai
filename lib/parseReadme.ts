import fs from "fs";
import path from "path";

export interface Tool {
  name: string;
  url: string;
  tags: string[];
  notes: string;
}

export function parseReadme(): Tool[] {
  const readmePath = path.join(process.cwd(), "README.md");
  const content = fs.readFileSync(readmePath, "utf-8");

  // Find the markdown table
  const lines = content.split("\n");
  const tools: Tool[] = [];

  let inTable = false;
  let headerPassed = false;

  for (const line of lines) {
    // Detect table start (header row)
    if (line.startsWith("| Name") && line.includes("Tags")) {
      inTable = true;
      continue;
    }

    // Skip separator row
    if (inTable && line.startsWith("|---") || line.startsWith("| ---")) {
      headerPassed = true;
      continue;
    }

    // Parse table rows
    if (inTable && headerPassed && line.startsWith("|")) {
      const cells = line
        .split("|")
        .map((cell) => cell.trim())
        .filter((cell) => cell !== "");

      if (cells.length >= 2) {
        const nameCell = cells[0];
        const tagsCell = cells[1] || "";
        const notesCell = cells[2] || "";

        // Parse markdown link: [Name](url)
        const linkMatch = nameCell.match(/\[([^\]]+)\]\(([^)]+)\)/);

        if (linkMatch) {
          const name = linkMatch[1];
          const url = linkMatch[2];

          // Parse tags (comma-separated)
          const tags = tagsCell
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag !== "");

          tools.push({
            name,
            url,
            tags,
            notes: notesCell,
          });
        }
      }
    }

    // End of table
    if (inTable && headerPassed && !line.startsWith("|") && line.trim() !== "") {
      break;
    }
  }

  return tools;
}
