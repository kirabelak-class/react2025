import Skeleton from "./Skeleton";
import Shimmer from "./Shimmer";
import Loading from "./Loading";

export default function Demo() {
  return (
    <div style={{ display: "grid", gap: "16px", maxWidth: "200px" }}>
      <h3>Skeleton</h3>
      <Skeleton width="100%" height="20px" />
      <Skeleton width="70%" height="20px" />

      <h3>Shimmer</h3>
      <Shimmer width="100%" height="20px" />
      <Shimmer width="70%" height="20px" />

      <h3>Loading Spinner</h3>
      <Loading size="40px" />
    </div>
  );
}
