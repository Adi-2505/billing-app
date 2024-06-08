import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/Providers/AuthProvider";

import axios from 'axios'


import React, { useEffect, useState } from "react";

const Billing = () => {

  const auth = useAuth();

  const [bill, setBill] = useState(null)
  const [usage, setUsage] = useState(null)


  useEffect(()=>{
    const getBilling = async () => {
      // console.log(auth.user.emails[0].value)
      const bill = await axios.get(`http://localhost:5000/api/billing/${auth.user.emails[0].value}`)

      const usage = await axios.get(`http://localhost:5000/api/usage/${auth.user.emails[0].value}`)

      const sdate = new Date(bill.data.start)
      const edate = new Date(bill.data.end)
      
      const options = {
        day: "2-digit",
        month: "long",
        year: "numeric"
      };

      bill.data.start = sdate.toLocaleDateString(undefined, options);
      bill.data.end = edate.toLocaleDateString(undefined, options);

      setBill(bill);
      setUsage(usage);
      
    }

    getBilling();

  },[])


  if(!bill || !usage){
    return (
      <div>Loading</div>
    )
  }


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Billing Cycle</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Current Billing Period
            </p>
            <p className="text-2xl font-bold">
              {bill.data.start}
            </p>
          </div>
          <Separator />
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Next Billing Date
            </p>
            <p className="text-2xl font-bold">{bill.data.end}</p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Billing Information</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Total payable amount
            </p>
            <p className="text-2xl font-bold">{bill.data.amount}</p>
          </div>
          
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Cumulative Usage</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              API Calls (type 1)
            </p>
            <p className="text-2xl font-bold">
              {usage.data.matrix1}
              <span className="text-sm font-normal">(out of 20,000)</span>
            </p>
            <Progress value={(usage.data.matrix1/20000)*100} max={100} className="mt-2" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              API Calls (type 2)
            </p>
            <p className="text-2xl font-bold">
              {usage.data.matrix2}
              <span className="text-sm font-normal">(out of 20,000)</span>
            </p>
            <Progress value={(usage.data.matrix2/20000)*100} max={100} className="mt-2" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              API Calls (type 3)
            </p>
            <p className="text-2xl font-bold">
              {usage.data.matrix3}
              <span className="text-sm font-normal">(out of 20,000)</span>
            </p>
            <Progress value={(usage.data.matrix3/20000)*100} max={100} className="mt-2" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Billing;
