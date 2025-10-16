const [value, setValue] = useState("")
<input value={value} onChange={(e)=>setValue(e.target.value)} />

 const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });


curl --location 'https://fakestoreapi.com/products' \
--header 'Content-Type: application/json' \
--data '{
          "title": "result.output.title",
          "price": 20,
          "description": "result.output.description",
          "image": "result.output.image",
          "category": "result.output.category"
        }'