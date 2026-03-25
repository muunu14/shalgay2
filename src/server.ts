import express from "express";
import type { Request, Response } from "express";
import * as cors from "cors";    
import * as dotenv from "dotenv"; 

dotenv.config();

const app = express();
app.use(cors()); 

app.use(express.json());

app.post("/api/bolor-suggest", async (req: Request, res: Response) => {
  try {
    const { text } = req.body;
    if (!text || !text.trim()) return res.status(400).json([]);

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
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));