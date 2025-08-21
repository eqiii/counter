import React, { useState, useLayoutEffect } from "react";

export default function ScrollPosition() {
  const [scrollY, setScrollY] = useState(0);

  useLayoutEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    // Pasang event listener
    window.addEventListener("scroll", handleScroll);

    // Jalankan sekali di awal
    handleScroll();

    // Cleanup listener ketika komponen unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Posisi Scroll Halaman</h2>
      <p>Scroll Y: {scrollY}px</p>

      {/* Konten panjang biar bisa di-scroll */}
      <div style={{ height: "200vh", background: "linear-gradient(white, lightblue)" }}>
        <p style={{ position: "fixed", bottom: "10px", right: "10px", background: "white", padding: "5px 10px", border: "1px solid gray", borderRadius: "5px" }}>
          Scroll Y: {scrollY}px
        </p>
      </div>
    </div>
  );
}
