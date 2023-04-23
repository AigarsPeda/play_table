import Button from "components/elements/Button/Button";
import Input from "components/elements/Input/Input";
import Logo from "components/elements/Logo/Logo";
import type { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import { FcCheckmark } from "react-icons/fc";
import { api } from "utils/api";

const Forgot: NextPage = () => {
  const [email, setEmail] = useState("");
  const { mutate, isSuccess } = api.resetPassword.getResetToken.useMutation();

  return (
    <>
      <div className="mb-10 transition-all md:mb-20 lg:mb-40">
        <Logo />
      </div>
      <div className="mt-32 md:mt-64">
        <div>
          <h1 className="mb-10 text-5xl">Reset your password</h1>
          <div className="items-center md:flex">
            <div className="w-72">
              <Input
                type="email"
                name="email"
                value={email}
                label="Email"
                isDisabled={isSuccess}
                handleInputChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div>
            {isSuccess ? (
              <FcCheckmark className="h-10 w-10" />
            ) : (
              <Button
                btnTitle="Send"
                btnSize="small"
                btnClass="md:mt-8 mt-4"
                onClick={() => {
                  mutate({ email });
                }}
              />
            )}
          </div>
          <div className="mt-4">
            <Link href="/login" className="text-gray-500">
              Return to login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Forgot;