import { useRef, useEffect } from "react";

export default function SpendingCategoryChart({ data }) {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = ref.current.getContext("2d");
    const total = data.reduce((t, d) => t + d.value, 0) || 1;
    let start = 0;

    data.forEach((d, i) => {
      const angle = (d.value / total) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(160, 160);
      ctx.arc(160, 160, 140, start, start + angle);
      ctx.closePath();
      ctx.fillStyle = `hsl(${i * 45}, 70%, 50%)`;
      ctx.fill();
      start += angle;
    });
  }, [data]);

  return <canvas ref={ref} width="320" height="320" />;
}
