const [value, setValue] = useState("")
<input value={value} onChange={(e)=>setValue(e.target.value)} />

 const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });
