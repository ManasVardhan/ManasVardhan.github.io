import type { User } from "@/features/portfolio/types/user";

export const USER: User = {
  firstName: "Manas",
  lastName: "Vardhan",
  displayName: "Manas Vardhan",
  username: "ManasVardhan",
  gender: "male",
  pronouns: "he/him",
  bio: "making LLM systems measurable",
  flipSentences: [
    "making LLM systems measurable",
    "ML & Infrastructure Engineer",
    "Agent memory, evaluation, inference efficiency",
  ],
  address: "Los Angeles, CA, USA",
  // Phone number intentionally omitted from the public site.
  phoneNumber: "",
  email: "bXZhcmRoYW5AdXNjLmVkdQ==", // base64 encoded
  website: "https://manasvardhan.com",
  jobTitle: "ML & Infrastructure Engineer",
  jobs: [
    {
      title: "AI Engineer",
      company: "FRIDAY.AI",
      website: "https://usefriday.ai/",
    },
    {
      title: "M.S. Computer Science",
      company: "University of Southern California",
      website: "https://www.usc.edu",
    },
  ],
  about: `
- **M.S. Computer Science at USC**, graduating December 2026. GPA 3.73.
- Two years at **JP Morgan Chase** building data and ML infrastructure.
- **TMLR-accepted** research; now on agent memory, evaluation, and abstention.
- Author of **7 PyPI packages** for LLM guardrails, tracing, and cost control.
- Writing [The Agent Stack](https://theagentstack.hashnode.dev/) on agent runtimes and evaluation.
- Contributor to **HuggingFace Transformers**, **lm-evaluation-harness**, **Axolotl**, and **MLflow**.
`,

  avatar: "/avatar.jpeg",
  ogImage: "/og-image.png",
  namePronunciationUrl: "",
  timeZone: "America/Los_Angeles",
  keywords: [
    "manas vardhan",
    "manasvardhan",
    "ml engineer",
    "llm evaluation",
    "agent memory",
    "usc",
    "reMem",
    "friday.ai",
    "the agent stack",
  ],
  dateCreated: "2026-08-15", // YYYY-MM-DD
};
