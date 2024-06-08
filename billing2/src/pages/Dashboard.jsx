import { Button } from "@/components/ui/button";
import { useAuth } from "@/Providers/AuthProvider";
import axios from 'axios'


function Dashboard() {


  const auth = useAuth();

  const updateUsage = async (type) => {
    const usage = await axios.get(`http://localhost:5000/api/usage/${auth.user.emails[0].value}`)

   

    if(type==1){
      usage.data.matrix1 += 1;
    }else if(type==2){
      usage.data.matrix2 += 1;
    }else{
      usage.data.matrix3 += 1;
    }

    await axios.post('http://localhost:5000/api/usage', {
      usage: usage.data
    })

  }

  const generateInvoice = async () =>{
    await axios.post('http://localhost:5000/api/invoice',{
      email: auth.user.emails[0].value,
    });


  }


  return (
    <div className='space-y-5'>
      <ul className="space-y-5">
        <li>
          <Button onClick={()=>updateUsage(1)}>Call API 1</Button>
        </li>
        <li>
          <Button onClick={()=>updateUsage(2)}>Call API 2</Button>
        </li>
        <li>
          <Button onClick={()=>updateUsage(3)}>Call API 3</Button>
        </li>
      </ul>
      <div>
        <Button onClick={generateInvoice}>Generate invoice</Button>
      </div>
    </div>
  )
}

export default Dashboard
