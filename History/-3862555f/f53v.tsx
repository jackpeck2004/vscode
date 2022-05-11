import { useRouter } from "next/router";

export default function EditPr() {
  const router = useRouter();
  const { slug } = router.query;

  return <p>Edit: {slug}</p>;
};

