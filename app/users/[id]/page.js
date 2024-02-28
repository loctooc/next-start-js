import EditUserItem from "@/app/components/user-edit";

export default function EditUserPage({ params }) {
  const id = params.id;

  return (
    <EditUserItem key={id} id={id}/>
  );
}
