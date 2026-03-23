import { useState } from "react";

export default function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");

  const handleCheck = async () => {
    if (!text.trim()) {
      setResult("Текст оруулна уу!");
      return;
    }

    setResult("Шалгаж байна...");

    try {
      const res = await fetch("http://localhost:3000/api/spell", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      if (!res.ok) throw new Error("API алдаа");

      const data = await res.json();

      setResult(`Үндсэн:\n${data.original}\n\nЗассан:\n${data.corrected}`);
    } catch (err: any) {
      setResult("Алдаа: " + err.message);
    }
  };

  return (
    <div
      style={{
        width: "320px",
        padding: "16px",
        fontFamily: "Arial, sans-serif",
        background: "black",
      }}
    >

      <div style={{ textAlign: "center", marginBottom: "12px" }}>
        <h1 style={{ margin: 0, fontSize: "20px",color:"#eca51fff" }}>shalgay.mn</h1>
        <p
          style={{
            margin: "4px 0 0",
            fontSize: "12px",
            letterSpacing: "2px",
            color: "#666",
          }}
        >
          MONGOLIAN SPELLING
        </p>
      </div>


      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Текстээ энд бичнэ үү..."
        style={{
          width: "300px",
          height: "90px",
          resize: "none",
          borderRadius: "8px",
          border: "1px solid #ddd",
          padding: "10px",
          fontSize: "14px",
          outline: "none",
        }}
      />


      <button
        onClick={handleCheck}
        style={{
          width: "100%",
          marginTop: "10px",
          padding: "10px",
          borderRadius: "8px",
          border: "none",
          background: "#eca51fff",
          color: "#fff",
          fontSize: "14px",
          cursor: "pointer",
        }}
      >
        Шалгах
      </button>


      <div
        style={{
          marginTop: "10px",
          padding: "10px",
          borderRadius: "8px",
          background: "#f3f4f6",
          fontSize: "14px",
          minHeight: "40px",
          whiteSpace: "pre-line",
        }}
      >
        {result || " Текстээ шалгахын тулд дээрх талбарт бичээд 'Шалгах' товчийг дарна уу."}
      </div>
    </div>
  );
}