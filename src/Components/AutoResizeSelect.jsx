import { useEffect, useRef, useState } from "react";

export default function AutoResizeSelect() {
  const selectRef = useRef(null);
  const spanRef = useRef(null);

  // ✅ initialize with the actual default option
  const [value, setValue] = useState("Economy");

  useEffect(() => {
    if (spanRef.current && selectRef.current) {
      spanRef.current.textContent = value;
      selectRef.current.style.width = spanRef.current.offsetWidth + 30 + "px";
    }
  }, [value]);

  return (
    <div>
      <select
        ref={selectRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      >
        <option>Economy</option>
        <option>Premium economy</option>
        <option>Business</option>
        <option>First Class</option>
      </select>

      <span ref={spanRef} className="hidden-span"></span>

      <style>{`
        select {
          border: none;
          outline: none;
          background: transparent;
          font-size: 15px;
          padding-bottom:2px;
          margin-right:10px;
        }
        .hidden-span {
          position: absolute;
          visibility: hidden;
          white-space: nowrap;
          font-size: 15px;
        }
      `}</style>
    </div>
  );
}
