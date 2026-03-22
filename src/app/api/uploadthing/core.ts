import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .onUploadComplete(async ({ file }) => {
      return { url: file.url };
    }),

  videoUploader: f({ video: { maxFileSize: "16MB" } })
    .onUploadComplete(async ({ file }) => {
      return { url: file.url };
    }),

} satisfies FileRouter;

console.log("SECRET:", process.env.UPLOADTHING_SECRET);
export type OurFileRouter = typeof ourFileRouter;