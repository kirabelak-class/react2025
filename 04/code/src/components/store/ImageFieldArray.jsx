export default function ImageFieldArray({ fields, register, append, remove }) {
	return (
		<div>
			<label className="block text-sm font-medium mb-2">
				Imágenes (URLs) - Máximo 5
			</label>
            <div className="space-y-2">
			{fields.map((field, index) => (
				<div key={field.id} className="flex gap-2">
					<input
						{...register(`images.${index}`)}
						type="url"
						placeholder="https://example.com/image.jpg"
						className="border flex-1 rounded h-10 px-3"
					/>
					{fields.length > 1 && (
						<button
							type="button"
							onClick={() => remove(index)}
							className="bg-red-500 text-white px-3 rounded hover:bg-red-600"
						>
                            X
                        </button>
					)}
				</div>
			))}
            </div>
            {fields.length<5&&(
                <button type="button" onClick={()=>append("")} className="mt-2 text-blue-600 text-sm hover:underline">
                    + Añadir imagen
                </button>
            )}
		</div>
	);
}
