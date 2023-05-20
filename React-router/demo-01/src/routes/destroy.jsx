import { redirect } from "react-router-dom";
import { deleteContact } from "../contacts";

export async function action({ params }) {
  // 模拟执行 action 抛出错误，这样默认会造成全局崩溃，模拟一些潜在的代码错误
  // throw new Error("oh dang!");
  await deleteContact(params.contactId);
  return redirect("/");
}
