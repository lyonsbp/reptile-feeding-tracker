import { Input } from "@nextui-org/react";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/cloudflare";
import { Form } from "@remix-run/react";

export async function action({ context, request }: ActionFunctionArgs) {
  const data = await request.formData();

  return null;
}

export function loader({ context, request }: LoaderFunctionArgs) {
  return null;
}

export default function AddFeeder() {
  return (
    <div>
      <Form method="post">
        <Input name="feederName" placeholder="Feeder Name" />
      </Form>
    </div>
  );
}
