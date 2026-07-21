import { spawn } from "node:child_process";

const repository = process.env.GITHUB_REPOSITORY ?? "DeronQi/waic-2026-aftershow-guide";
const [owner, repositoryName] = repository.split("/");
const siteUrl = `https://${owner.toLowerCase()}.github.io/${repositoryName}/`;
const isWindows = process.platform === "win32";

const child = spawn("npx", ["next", "build"], {
  stdio: "inherit",
  shell: isWindows,
  env: {
    ...process.env,
    GITHUB_PAGES: "true",
    GITHUB_REPOSITORY: repository,
    NEXT_PUBLIC_SITE_URL: siteUrl,
  },
});

child.on("exit", (code) => process.exit(code ?? 1));
child.on("error", (error) => {
  console.error(error);
  process.exit(1);
});
