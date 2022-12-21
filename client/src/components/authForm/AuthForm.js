import { useForm } from "react-hook-form";
import FormError from "./FormError";

function AuthForm({ authType, onSubmit, authError }) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    getValues,
    watch,
  } = useForm();
  const crntPassword = watch("password", "");
  const onFormSubmit = () => {
    const { email, password, name } = getValues();
    const data = {
      email,
      password,
      name,
    };
    onSubmit(data);
  };
  const checkPassword = (pw) => {
    if (crntPassword !== pw) {
      return "password not confirmed";
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <input
          id="email"
          type="email"
          placeholder="Email"
          {...register("email", {
            required: "Email is required",
          })}
        />
        <FormError text={errors.email?.message} />
        <input
          id="password"
          type="password"
          placeholder="Password"
          {...register("password", {
            required: "Password is required",
          })}
        />
        <FormError text={errors.password?.message} />
        {authType === "register" && (
          <>
            <input
              id="password_valid"
              type="password"
              placeholder="confirm password"
              {...register("password_valid", {
                required: "Password confirmation is required",
                validate: checkPassword,
              })}
            />

            <FormError text={errors.password_valid?.message} />
            <input
              id="name"
              type="name"
              placeholder="name"
              {...register("name", {
                required: "Name is required",
              })}
            />
            <FormError text={errors.name?.message} />
          </>
        )}
        <button type="submit" disabled={isSubmitting}>
          {authType === "login" ? "login" : "register"}
        </button>
      </form>
    </>
  );
}

export default AuthForm;
