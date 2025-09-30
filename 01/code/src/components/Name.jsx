export default function Name({name,setName}){
console.log("el nombre es",name)
return(
    <div>
        <input type="text" value={name} onChange={(e)=> setName(e.target.value)} />
    </div>
)
}