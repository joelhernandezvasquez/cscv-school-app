import { fetchStudent } from "@/lib/actions/students";

interface StudentPageProps {
  params: { id: string }
}

const StudentPage = async ({params}:StudentPageProps) => {
  const {id} = params;
  const studentInfo = await fetchStudent(id);
  console.log(studentInfo);

  return (
    <div>StudentPage</div>
  )
}

export default StudentPage