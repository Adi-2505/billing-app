import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { FcGoogle } from "react-icons/fc";
import { useAuth } from "@/Providers/AuthProvider";

const Landing = () => {
  const handleLogin = () => {
    window.open("http://localhost:5000/auth/google", "_self");
  };

  const auth = useAuth();

  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen">
      <div className="font-bold text-3xl mb-4">
        Welcome to billing application
      </div>

      <div>
        {auth.isAuthenticated ? (
          <Link to='/v/dashboard'>Go to Dashboard</Link>
        ) : (
          <Card className="flex flex-col justify-center items-center">
            <CardHeader className="text-center">
              <CardTitle>Sign in to continue</CardTitle>
              <CardDescription>Sign in with google</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                className="h-7 w-48 bg-white hover:bg-slate-300 hover:shadow-slate-400 hover:shadow-sm text-black border-gray-300 border-[1px]"
                onClick={handleLogin}
              >
                <FcGoogle />
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Landing;
