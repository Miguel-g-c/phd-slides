import { z, defineCollection } from "astro:content";

const decisionVariablesSchema = z.object({
  names: z.array(z.string()),
  units: z.array(z.string()),
  values: z.array(z.array(z.union([z.number(), z.string()]))),
});

const objectivesSchema = z.object({
  names: z.array(z.string()),
  units: z.array(z.string()),
  values: z.array(z.array(z.number())),
});

const moopSchema = z.object({
  decisionVariables: decisionVariablesSchema,
  objectives: objectivesSchema,
});

const moops = defineCollection({
  type: "data",
  schema: moopSchema,
});

const snippets = defineCollection({
  type: "content",
  schema: z.object({
    language: z.string(),
    highlightLines: z.string().optional(),
  }),
});

export const collections = { moops, snippets };
