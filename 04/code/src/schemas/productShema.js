import * as v from "valibot"

export const ProductSchema = v.object({
  title: v.pipe(v.string(), v.minLength(3, "Mínimo 3 caracteres")),
  price: v.pipe(
    v.string(),
    v.regex(/^\d+(\.\d{1,2})?$/, "Precio inválido"),
    v.transform(Number),
    v.minValue(0.01, "Debe ser mayor a 0")
  ),
  category: v.pipe(v.string(), v.minLength(1, "Categoría requerida")),
  stock: v.pipe(
    v.string(),
    v.regex(/^\d+$/, "Solo números"),
    v.transform(Number),
    v.minValue(0, "No puede ser negativo")
  ),
  images: v.optional(
    v.pipe(
      v.array(v.pipe(v.string(), v.url("URL inválida"))),
      v.maxLength(5, "Máximo 5 imágenes")
    )
  ),
});