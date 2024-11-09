import { useState } from "react";

type Errors = {
  email?: string;
  password?: string;
};

const Form = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<Errors>({});

  const validate = (): boolean => {
    const validationErrors: Errors = {};
    if (!/\S+@\S+\.\S+/.test(email))
      validationErrors.email = "Invalid email address";
    if (password.length < 6)
      validationErrors.password = "Password must be at least 6 characters";
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (validate()) {
      alert("Form submitted successfully!");
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    const validationErrors = { ...errors };
    if (!/\S+@\S+\.\S+/.test(e.target.value)) {
      validationErrors.email = "Invalid email address";
    } else {
      delete validationErrors.email;
    }
    setErrors(validationErrors);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    const validationErrors = { ...errors };
    if (e.target.value.length < 6) {
      validationErrors.password = "Password must be at least 6 characters";
    } else {
      delete validationErrors.password;
    }
    setErrors(validationErrors);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="mb-4">
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Email"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email}</p>
        )}
      </div>

      <div className="mb-4">
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Password"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
        Submit
      </button>
    </form>
  );
};

export default Form;
