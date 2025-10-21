import { useForm } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import * as v from "valibot";

const LoginSchema = v.object({
  email: v.pipe(v.string(), v.email("Email inválido")),
  password: v.pipe(v.string(), v.minLength(6, "Mínimo 6 caracteres")),
});

export default function LoginForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting, isSubmitSuccessful }, reset } =
    useForm({ resolver: valibotResolver(LoginSchema), defaultValues: { email: "", password: "" } });

  const onSubmit = async (data) => {
    await new Promise(r => setTimeout(r, 800));
    reset();
  };

  return (
    <main className="max-w-md mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Login (RHF + Valibot)</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <label className="block">
          Email
          <input className="border w-full h-10 px-3 rounded" {...register("email")} />
          {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
        </label>
        <label className="block">
          Contraseña
          <input type="password" className="border w-full h-10 px-3 rounded" {...register("password")} />
          {errors.password && <p className="text-red-600 text-sm">{errors.password.message}</p>}
        </label>
        <button disabled={isSubmitting} className="bg-emerald-600 text-white px-4 py-2 rounded w-full">
          {isSubmitting ? "Validando..." : "Entrar"}
        </button>
      </form>
      {isSubmitSuccessful && <p className="text-emerald-600 text-center">✅ Login correcto</p>}
    </main>
  );
}
