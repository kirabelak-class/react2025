import { Card, CardHeader, CardContent, CardFooter } from "./ui/Card";
import Button from "./ui/Button"

export default function ProductCard ({product, onDelete}){
    return(
        <Card>
            <CardHeader className="flex items-start justify-between gap-4">
                <div>
                    <h3 className="font-medium text-zinc-900">{product.title}</h3>
                    <p className="text-sm bg-zinc-500">{product.category}</p>
                </div>
                <div className="text-right font-semibold">${product.price}</div>
            </CardHeader>
            <CardContent>
                <div className="aspect-video w-full overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50">
                    {product.thumbnail ?
                    <img src={product.thumbnail} alt={product.title} className="w-full h-full object-cover"/>
                    : <div className="flex h-full items-center justify-center text-zinc-400 text-sm">
                        Sin imagen
                    </div>
                }
                </div>
            </CardContent>
            <CardFooter className="flex justify-end">
            <Button className="bg-red-600 hover:bg-red-700" onClick={() => onDelete(product.id)}>
            Eliminar
                </Button>
            </CardFooter>
        </Card>
    )
}