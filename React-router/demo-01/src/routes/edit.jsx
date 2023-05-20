import {
  Form,
  useLoaderData,
  redirect,
  useNavigate,
} from "react-router-dom";
import { updateContact } from "../contacts";

export async function action({ request, params }) {
  // 获取表单数据
  const formData = await request.formData();
  // 这里可以直接取出表单中的属性
  // const firstName = formData.get("first");
  // const lastName = formData.get("last");
  // 获取更新数据（这里把属性全部取出来了）
  const updates = Object.fromEntries(formData);
  // 异步更新联系人数据
  await updateContact(params.contactId, updates);
  // 更新联系人的操作，并重定向到当前编辑人的页面
  return redirect(`/contacts/${params.contactId}`);
}

export default function EditContact() {
  const { contact } = useLoaderData();
  const navigate = useNavigate();
  return (
    <Form method="post" id="contact-form">
      <p>
        <span>Name</span>
        <input
          placeholder="First"
          aria-label="First name"
          type="text"
          name="first"
          defaultValue={contact.first}
        />
        <input
          placeholder="Last"
          aria-label="Last name"
          type="text"
          name="last"
          defaultValue={contact.last}
        />
      </p>
      <label>
        <span>Twitter</span>
        <input
          type="text"
          name="twitter"
          placeholder="@jack"
          defaultValue={contact.twitter}
        />
      </label>
      <label>
        <span>Avatar URL</span>
        <input
          placeholder="https://example.com/avatar.jpg"
          aria-label="Avatar URL"
          type="text"
          name="avatar"
          defaultValue={contact.avatar}
        />
      </label>
      <label>
        <span>Notes</span>
        <textarea
          name="notes"
          defaultValue={contact.notes}
          rows={6}
        />
      </label>
      <p>
        <button type="submit">Save</button>
        {/* 点击取消按钮，nav 减少1，回退到上一个界面 */}
        <button type="button"
          onClick={() => {
            navigate(-1);
          }}
        >Cancel</button>
         {/* Why is there no event.preventDefault on the button? */}
        {/* A <button type="button">, while seemingly redundant, is the HTML way of preventing a button from submitting its form. */}
      </p>
    </Form>
  );
}
