import { writeFile, mkdir } from "fs/promises";
import path from "path";
import crypto from "crypto";

export async function saveFile(file: File, folder: string = "books"): Promise<string> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const hash = crypto.randomBytes(16).toString("hex");
  const ext = path.extname(file.name) || ".pdf";
  const fileName = `${hash}${ext}`;
  
  const uploadDir = path.join(process.cwd(), "public", "uploads", folder);
  
  try {
    await mkdir(uploadDir, { recursive: true });
  } catch (err) {
    // Directory might already exist
  }

  const filePath = path.join(uploadDir, fileName);
  await writeFile(filePath, buffer);

  return `/uploads/${folder}/${fileName}`;
}
