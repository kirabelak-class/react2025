import { useParams } from "react-router-dom";

export default function Post() {
  const { id } = useParams();
  return <p>Mostrando post #{id}</p>;
}