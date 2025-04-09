import { doSignOut } from "@/actions";
import Form from "next/form";

const SignOut = () => {
  return (
    <Form action={doSignOut}>
      <button 
        type="submit"
        className='bg-blue-700 text-white rounded-sm'
      >
          Sign Out
      </button>
    </Form>
  )
}

export default SignOut;