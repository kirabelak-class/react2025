// Skeleto
export default function Skeleton({ width = "100%", height = "1rem" }) {
    return (
      <div
        style={{
          backgroundColor: "#e5e7eb", 
          borderRadius: "4px",
          width,
          height,
        }}
      />
    );
  }
  