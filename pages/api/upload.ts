import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs';
import pdfParse from 'pdf-parse';

export const config = {
  api: { bodyParser: false },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const form = formidable({ uploadDir: '/tmp', keepExtensions: true });

  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ error: 'Upload error' });

    const file = Array.isArray(files.file) ? files.file[0] : files.file;
    if (!file || !file.filepath) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    try {
      const buffer = fs.readFileSync(file.filepath);
      const parsed = await pdfParse(buffer);
      res.status(200).json({ text: parsed.text });
    } catch (error) {
      res.status(500).json({ error: 'PDF parsing failed' });
    }
  });
}
