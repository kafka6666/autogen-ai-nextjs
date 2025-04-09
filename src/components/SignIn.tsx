import { doSignIn } from "@/actions";
import Form from "next/form";

const SignIn = () => {
  return (
    <Form action={doSignIn}>
      <button 
        type="submit"
        className='bg-blue-700 text-white rounded-sm'
      >
          Sign In With Google
      </button>
    </Form>
  )
}
export default SignIn;