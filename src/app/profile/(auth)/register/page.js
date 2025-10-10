"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import styles from "@/styles/Profile.module.css";

const schema = yup.object().shape({
  firstName: yup
    .string()
    .required("First name is required")
    .min(4, "Minimum 4 characters")
    .max(20, "Maximum 20 characters"),
  lastName: yup
    .string()
    .required("Last name is required")
    .min(4, "Minimum 4 characters")
    .max(20, "Maximum 20 characters"),
  age: yup
    .number()
    .typeError("Age must be a number")
    .required("Age is required")
    .min(13, "Minimum age is 13")
    .max(120, "Maximum age is 120"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Minimum 6 characters")
    .max(12, "Maximum 12 characters")
    .matches(/[A-Z]/, "Must contain at least one uppercase letter")
    .matches(/[a-z]/, "Must contain at least one lowercase letter")
    .matches(/\d/, "Must contain at least one number"),
  phone: yup
    .string()
    .required("Phone is required")
    .matches(/^[0-9]+$/, "Only digits allowed")
    .min(10, "Minimum 10 digits")
    .max(100, "Maximum 100 digits"),
});

function RegisterPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) throw new Error("Registration failed");

      const newUser = await response.json();
      console.log(" Registered user:", newUser);

      reset();
      alert("Registration successful!");
      router.push("/profile/login");
    } catch (error) {
      console.error(" Error:", error);
      alert("Something went wrong, please try again.");
    }
  };

  return (
    <main className={styles.main}>
      <h2>Register</h2>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <input
          type="text"
          placeholder="First Name"
          {...register("firstName")}
          maxLength={20}
          minLength={4}
        />
        {errors.firstName && (
          <p className={styles.error}>{errors.firstName.message}</p>
        )}

        <input
          type="text"
          placeholder="Last Name"
          {...register("lastName")}
          maxLength={20}
          minLength={4}
        />
        {errors.lastName && (
          <p className={styles.error}>{errors.lastName.message}</p>
        )}

        <input
          type="number"
          placeholder="Age"
          {...register("age")}
          min={13}
          max={120}
        />
        {errors.age && <p className={styles.error}>{errors.age.message}</p>}

        <input
          type="email"
          placeholder="Email"
          {...register("email")}
          maxLength={50}
        />
        {errors.email && <p className={styles.error}>{errors.email.message}</p>}

        <input
          type="password"
          placeholder="Password"
          {...register("password")}
          minLength={6}
          maxLength={12}
        />
        {errors.password && (
          <p className={styles.error}>{errors.password.message}</p>
        )}

        <input
          type="text"
          placeholder="Phone"
          {...register("phone")}
          maxLength={100}
          inputMode="numeric"
        />
        {errors.phone && <p className={styles.error}>{errors.phone.message}</p>}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Registering..." : "Register"}
        </button>
      </form>

      <p className={styles.registerPrompt}>
        Already have an account?{" "}
        <span
          onClick={() => router.push("/profile/login")}
          className={styles.registerLink}
        >
          Go to login
        </span>
      </p>
    </main>
  );
}

export default RegisterPage;
