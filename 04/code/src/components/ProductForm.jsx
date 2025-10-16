import { useState } from "react";
import * as v from "valibot";
import { mapIssues } from "../utils/mapIssues";

const Schema= v.object({
    name: v.pipe(v.string(),v.minLength(3,"nombre muy corto")),
    price: v.pipe(v.string(),v.regex(/^\d+$/,"solo numeros"))
})