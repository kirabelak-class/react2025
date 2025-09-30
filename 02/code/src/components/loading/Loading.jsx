import "./loading.css";

export default function Loading({ size = "40px" }) {
  return (
    <div
      className="spinner"
      style={{ width: size, height: size }}
    />
  );
}