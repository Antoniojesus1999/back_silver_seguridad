import type { UserConfig } from "@commitlint/types";

const config: UserConfig = {
  extends: ["@commitlint/config-conventional"],
  "subject-case": [0], // Desactiva la restricción de mayúsculas/minúsculas
};

export default config;
