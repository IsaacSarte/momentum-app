import { getData } from "@/actions/todo-actions";
import FocusList from "@/components/focus-list";

export default async function Home() {
  const data = await getData();

  return <FocusList todos={data} />;
}
