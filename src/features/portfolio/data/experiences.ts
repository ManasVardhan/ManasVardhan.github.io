import type { Experience } from "../types/experiences";

export const EXPERIENCES: Experience[] = [
  {
    id: "friday-ai",
    companyName: "FRIDAY.AI",
    companyLogo: "/company-logos/friday.svg",
    positions: [
      {
        id: "friday-founder",
        title: "Founder",
        employmentPeriod: {
          start: "12.2025",
        },
        employmentType: "Full-time",
        icon: "idea",
        description: `- Permissioned workflow agents running inside customer infrastructure on approved open models.
- Connector ingestion across Slack, GitHub, Jira, Notion, Gmail, Drive, and Asana.
- Evaluation-gated releases: production failures become replayable tests.
- Cut inference cost by routing to smaller specialist models with caching.
- Governance throughout: allowlisted tools, approval gates, and audit trails.`,
        skills: [
          "Agent Orchestration",
          "RAG",
          "Model Routing",
          "Evaluation",
          "FastAPI",
          "MCP",
          "vLLM",
        ],
        isExpanded: true,
      },
    ],
    isCurrentEmployer: true,
  },
  {
    id: "usc",
    companyName: "University of Southern California",
    companyLogo: "/company-logos/usc.svg",
    positions: [
      {
        id: "usc-cpg",
        title: "Researcher, Computational Physics Group",
        employmentPeriod: {
          start: "07.2025",
        },
        employmentType: "Research",
        icon: "education",
        description: `- Multi-physics pretraining across PDE families to replace expensive FEM runs.
- Scaled training with **PyTorch DDP** and deterministic multi-GPU seeding.
- Cut data generation from 20 minutes to 15 seconds per sample (**80x**).
- Matched FEM within **2.1%** L2 error, inference from minutes to milliseconds.`,
        skills: ["PyTorch", "DDP", "Distributed Training", "Scientific ML"],
        isExpanded: true,
      },
      {
        id: "usc-dill",
        title: "Volunteer Researcher, DILL Lab",
        employmentPeriod: {
          start: "06.2025",
        },
        employmentType: "Research",
        icon: "education",
        description: `- Model alignment and grounding for large language models.
- Built the perturbation pipeline and harness for a 4-model, 6-benchmark study.`,
        skills: ["Alignment", "Grounding", "Evaluation Harnesses"],
      },
    ],
  },
  {
    id: "jpmorgan-chase",
    companyName: "JP Morgan Chase & Co.",
    companyLogo: "/company-logos/jpmorgan.svg",
    positions: [
      {
        id: "jpmc-sde",
        title: "Software Development Engineer",
        employmentPeriod: {
          start: "08.2023",
          end: "05.2025",
        },
        employmentType: "Full-time",
        icon: "code",
        description: `- Shipped **6+ production services** used by **40+ internal teams**.
- Built PySpark, Kafka, and Airflow pipelines ingesting **15TB per day**.
- Modeled curated tables on **Snowflake** and **Databricks Delta Lake**.
- AWS infrastructure as code via **Terraform**; cut deploy time **45%**.
- Fine-tuned **T5-Large** for code summarization; cut review time **20%**.
- **MiniLM** triage service: 8K+ daily tickets, 14 classes, **92%** accuracy.
- Cut infrastructure incidents **30%** with observability and auto-remediation.`,
        skills: [
          "Python",
          "PySpark",
          "Kafka",
          "Airflow",
          "Snowflake",
          "Databricks",
          "Terraform",
          "AWS",
          "SQL",
        ],
        isExpanded: true,
      },
    ],
  },
];
