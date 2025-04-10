import { useForm } from "react-hook-form";
import AuthLayout from '../../components/layouts/AuthLayout'
import Input from "../../components/Inputs/Input";
import { useState } from "react";
import { Link } from "react-router-dom";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";

const Signup = () => {

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const password = watch("password");
  const [showPassword, setShowPassword] = useState(false);
  // const [profilePic, setProfilePic] = useState()


  const handleLogin = async (data) => {
    console.log("Form Data:", data);
    // handle actual login logic here
  };

  return (
    <AuthLayout>
      <div className='lg:w-[100%] h-3/4 md:h-full flex flex-col justify-center'>
        <h3 className='text-xl font-semibold text-black'>Create an Account</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'>Join us today bt entering your details below</p>

        <form onSubmit={handleSubmit(handleLogin)}>
          {/* <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} /> */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-[13px] text-slate-800">Full Name</label>
              <div className="input-box">
                <input
                  {...register("fullName",
                    {
                      required: { value: true, message: "Full Name is required" },

                    })
                  }
                  type="text"
                  className="w-full bg-transparent outline-none"
                  placeholder="Xavier"
                />
              </div>
              {errors.fullName && <p className="text-red-500 text-xs pb-2.5">{errors.fullName.message}</p>}
            </div>

            <div>
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
            </div>

            <div>
              <label className="text-[13px] text-slate-800">Password</label>
              <div className="input-box">
                <input
                  {...register("password",
                    {
                      required: { value: true, message: "Password is required" },
                      minLength: { value: 8, message: "Password must be at least 8 characters" },
                      pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/,
                        message: "Password must include uppercase, lowercase, number, and special character (!@#$%^&*)"
                      }
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
            </div>

            <div>
              <label className="text-[13px] text-slate-800">Confirm Password</label>
              <div className="input-box">
                <input
                  {...register("confirmPassword",
                    {
                      required: { value: true, message: "Confirm Password is required" },
                      validate: (value) =>
                        value === password || "The password you entered does not match",
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
              {errors.confirmPassword && <p className="text-red-500 text-xs pb-2.5">{errors.confirmPassword.message}</p>}
            </div>




          </div>


          <button type="Submit" className="btn-primary">
            SIGNUP
          </button>

          <p className="text-[13px] text-slate-800 mt-3">
            ALready have an account?{" "}
            <Link className="font-medium text-primary underline" to="/login">
              Login
            </Link>
          </p>

        </form>
      </div>
    </AuthLayout>
  )
}

export default Signup