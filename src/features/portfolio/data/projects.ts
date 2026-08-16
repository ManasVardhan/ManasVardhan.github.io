import type { Project } from "../types/projects";

export const PROJECTS: Project[] = [
  {
    id: "remem",
    title: "reMem",
    period: {
      start: "12.2025",
    },
    link: "https://github.com/ManasVardhan",
    image: "/projects/remem.svg",
    skills: ["Agent Memory", "FAISS", "LLM-as-Judge", "TypeScript"],
    description: `Belief-consolidation memory for AI agents.
- Distills conversations into durable, updatable beliefs
- Sub-100ms recall over 10K+ entries via **FAISS** and reranking
- Beats Mem0 on its own harness: **77.1%** vs. 73.2%
- Temporal reasoning **40.0%** vs. 21.1%
- **66–72%** on PrefEval against a 45–49% baseline`,
    isExpanded: true,
  },
  {
    id: "idek",
    title: "idek",
    period: {
      start: "07.2026",
    },
    link: "https://github.com/ManasVardhan",
    image: "/projects/idek.svg",
    skills: ["Abstention", "Selective Prediction", "Evaluation", "Python"],
    description: `The abstention track for reMem: when to say "I don't know".
- Kept separate so the accuracy loop cannot train abstention away
- Signal from belief confidence, evidence count, and supersession
- Beats a scalar similarity threshold, more so on hard negatives
- **AURC**, risk-coverage, and McNemar implemented and tested`,
    isExpanded: true,
  },
  {
    id: "friday-ai",
    title: "FRIDAY.AI",
    period: {
      start: "12.2025",
      end: "04.2026",
    },
    link: "https://usefriday.ai/",
    image: "/projects/friday.jpg",
    skills: ["Agent Orchestration", "RAG", "MCP", "Evaluation"],
    description: `Enterprise agent platform running inside customer infrastructure.
- Permissioned agents on approved open models, zero retention
- Ingestion across Slack, GitHub, Jira, Notion, Gmail, and Drive
- Evaluation-gated releases on quality, latency, and cost
- Allowlisted tools, approval gates, and audit trails`,
    isExpanded: true,
  },
  {
    id: "llm-agent-infra-suite",
    title: "LLM & Agent Infrastructure Suite",
    period: {
      start: "02.2026",
      end: "05.2026",
    },
    link: "https://pypi.org/user/ManasVardhan/",
    image: "/projects/pypi.svg",
    skills: ["Python", "OpenTelemetry", "Guardrails", "Observability"],
    description: `Seven published packages for running LLM systems in production.
- \`llm-shelter\`: PII redaction and prompt-injection detection
- \`agent-trace-replay\`: deterministic replay and OTel export
- \`ai-agent-sentry\`: failure classification and reliability scoring
- \`llm-cost-guardian\`, \`bench-my-llm\`: cost metering and benchmarks
- \`llm-promptdiff\`, \`mcp-server-forge\`: prompt CI and MCP scaffolding`,
    isExpanded: true,
  },
  {
    id: "alignment-rl-measurement",
    title: "Alignment & RL Measurement",
    period: {
      start: "01.2026",
    },
    link: "https://github.com/ManasVardhan",
    image: "/projects/alignment.svg",
    skills: ["RLHF", "Reward Models", "Probing", "PyTorch"],
    description: `Probe suite auditing reward-model bias across six axes.
- **4,800** paired probes across 5 open reward models
- **+0.31** reward per 100 tokens at constant quality
- Sycophancy wins **68%** of pairs against correct disagreement
- RLHF cost: HumanEval **−6.3pp** against **+31pp** harmlessness
- Failure mode predicted at **87%** within the first 15% of steps`,
    isExpanded: true,
  },
  {
    id: "proactive-intent",
    title: "Proactive Intent Prediction",
    period: {
      start: "04.2026",
    },
    link: "https://usefriday.ai/",
    image: "/projects/proactive-intent.svg",
    skills: ["Multimodal", "OCR", "MCP", "Classification"],
    description: `Predicting user needs before an explicit query.
- Screen context and history through a head over LLM embeddings
- Screenshot OCR and layout detection with MCP app metadata
- Evaluated on acceptance rate and LLM-judged relevance`,
    isExpanded: true,
  },
  {
    id: "editable-3d-scenes",
    title: "Editable 3D Scenes",
    period: {
      start: "07.2026",
    },
    link: "https://www.youtube.com/watch?v=c6djgtN2Pa0",
    image: "/projects/editable-3d.jpg",
    skills: ["TripoSR", "Latent Editing", "3D Reconstruction", "CLIP"],
    description: `SIGGRAPH demo for editing 3D scenes frozen after generation.
- Localized latent edits over TripoSR codes, re-decoding only masks
- Insert, move, relight, and swap materials from text or a click
- Edit latency **94s → 1.8s** (**52x**), geometry held at SSIM 0.97
- **83%** of edits rated at or above regeneration by 12 evaluators`,
    isExpanded: true,
  },
  {
    id: "mlx-air",
    title: "mlx-air",
    period: {
      start: "05.2026",
    },
    link: "https://github.com/ManasVardhan/mlx-air",
    image: "/projects/mlx-air.svg",
    skills: ["MLX", "Apple Silicon", "Inference", "Systems"],
    description: `Layer-streaming inference for memory-constrained Apple Silicon.
- Loads, runs, and evicts transformer layers sequentially from disk
- Peak memory **35GB → 1.5GB**: a 70B 4-bit model on an 8GB Air
- Unified memory makes weights usable the moment they land`,
    isExpanded: true,
  },
];
