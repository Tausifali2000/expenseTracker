import { useForm } from "react-hook-form";
import AuthLayout from '../../components/layouts/AuthLayout'
import Input from "../../components/Inputs/Input";
import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);


  const handleSignup = async (data) => {
    console.log("Form Data:", data);
    // handle actual login logic here
  };

  return (
    <AuthLayout>
      <div className='lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center'>
        <h3 className='text-xl font-semibold text-black'>Welcome Back</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'>Please enter your deatils to log in</p>

        <form onSubmit={handleSubmit(handleSignup)}>
          <label className="text-[13px] text-slate-800">Email Address</label>
          <div className="input-box">
            <input
              {...register("email",
                {
                  required: { value: true, message: "Email is required" },
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Invalid email address",
                  },
                })
              }
              type="email"
              className="w-full bg-transparent outline-none"
              placeholder="email@example.com"
            />
          </div>
          {errors.email && <p className="text-red-500 text-xs pb-2.5">{errors.email.message}</p>}

          <label className="text-[13px] text-slate-800">Password</label>
          <div className="input-box">
            <input
              {...register("password",
                {
                  required: { value: true, message: "Password is required" }
                })
              }
              type={showPassword ? "text" : "password"}
              className="w-full bg-transparent outline-none"
              placeholder="Min 8 characters"
            />
             

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-xs pb-2.5">{errors.password.message}</p>}

          <button type="Submit" className="btn-primary">
            LOGIN
          </button>

          <p className="text-[13px] text-slate-800 mt-3">
            Dont't have an account?{" "}
            <Link className="font-medium text-primary underline" to="/signup">
              SignUp
            </Link>
          </p>

        </form>
      </div>
    </AuthLayout>
  )
}

export default Login