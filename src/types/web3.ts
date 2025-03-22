import { z } from "zod";

export const ImageTokenizationSchema = z.object({
  image_id: z.number().describe("The image id."),
  recipient: z
    .string()
    .describe(
      "The recipient of the NFT, it should be an ethereum address, starting at 0x, length 42."
    ),
});

export const JobStateSchema = z.object({
  job_id: z.string().describe("The job id."),
  job_type: z
    .enum(["image_tokenization_queue"])
    .default("image_tokenization_queue")
    .describe("The type of job."),
});
