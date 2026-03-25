import { useState } from "react";

export default function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<any[]>([]);

  const handleCheck = async () => {
    if (!text.trim()) {
      setResult([]);
      return;
    }

    try {
      const res = await fetch("/api/bolor-suggest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setResult([]);
    }
  };

  const words = text.split(/\s+/);

  return (
    <div style={{ padding: 10, width: 300 }}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ width: "100%", height: 100 }}
      />

      <button
        onClick={handleCheck}
        style={{
          marginTop: 10,
          width: "100%",
          padding: 10,
          background: "#facc15",
          border: "none",
          borderRadius: 8,
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        Шалгах
      </button>

      <div style={{ marginTop: 10 }}>
        {words.map((word, i) => {
          const cleanWord = word.replace(/[.,!?]/g, "");
          const found = result.find((r: any) => r.word === cleanWord);
          const suggestion = found?.suggestion || "";
          const isError = suggestion !== "";

          return (
            <span
              key={i}
              title={isError ? `Зөв: ${suggestion}` : ""}
              style={{
                color: isError ? "red" : "green",
                textDecoration: isError ? "underline" : "none",
                marginRight: 4,
              }}
            >
              {word}
            </span>
          );
        })}
      </div>
    </div>
  );
}