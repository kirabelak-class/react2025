import * as v from "valibot";

const UserSchema = v.object({
	name: v.pipe(
		v.string(),
		v.minLength(2, "Nombre es muy corto"),
		v.custom(
			(input) => !input.includes(" "),
			"El nombre no debe contener espacios"
		)
	),
	age: v.pipe(v.number(), v.minValue(18, "Debe ser mayor")),
});

// name:v.pipe(v.string(),v.minLength(2,"Nombre es muy corto"),v.regex(/^\S+$/,"El nombre no debe contener espacios")),
