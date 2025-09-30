import "./shimmer.css"; 
export default function Shimmer({ width = "100%", height = "1rem" }) {
    return (
      <div
        className="shimmer"
        style={{
          width,
          height,
        }}
      />
    );
  }