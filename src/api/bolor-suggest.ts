import type { Request, Response } from "express";

export async function suggestWithBolorServer(req: Request, res: Response) {
  try {
    const { text } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json([]);
    }

    const response = await fetch("https://api.bolorspell.mn/suggest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.VITE_BOLORSPELL_API_KEY}`,
      },
      body: JSON.stringify({ text }),
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json([]);
  }
}