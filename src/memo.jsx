import React, { useState, useMemo } from "react";

// Fungsi helper factorial dengan BigInt agar bisa handle angka besar
function factorial(num number): bigint {
  if (num < 0) return BigInt(0);
  let result = BigInt(1);
  for (let i = 2; i <= num; i++) {
    result *= BigInt(i);
  }
  return result;
}

export default function FactorialCalculator() {
  const [n, setN] = useState(10);
  const [note, setNote] = useState(""); // input lain untuk menguji useMemo

  // Hanya dihitung ulang ketika n berubah
  const result = useMemo(() => {
    console.log("Menghitung factorial...");
    return factorial(n);
  }, [n]);

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>Factorial Calculator</h2>

      <div style={{ marginBottom: "10px" }}>
        <label>
          Masukkan angka:{" "}
          <input
            type="number"
            value={n}
            onChange={(e) => setN(Number(e.target.value))}
          />
        </label>
      </div>

      <p>
        <b>{n}!</b> = {result.toString()}
      </p>

      <div style={{ marginTop: "20px" }}>
        <label>
          Catatan tambahan (tidak memicu perhitungan ulang factorial):{" "}
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </label>
        <p>Catatan: {note}</p>
      </div>
    </div>
  );
}
