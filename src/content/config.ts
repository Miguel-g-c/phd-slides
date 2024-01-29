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

const moopCollection = defineCollection({
  type: "data",
  schema: moopSchema,
});

export const collections = {
  moops: moopCollection,
};
