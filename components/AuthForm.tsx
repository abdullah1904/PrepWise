"use client"

import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import Link from "next/link";
import { toast } from "sonner";
import FormField from "@/components/FormField";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/client";
import { signIn, signUp } from "@/lib/actions/auth.action";
import { useState } from "react";

type FormType = 'sign-up' | 'sign-in'

const authFormSchema = (type: FormType) => {
    return z.object({
        name: type === 'sign-up' ? z.string().min(3) : z.string().optional(),
        email: z.string().email(),
        password: z.string().min(3),
    })
}

type AuthFormProps = {
    type: FormType
}

const AuthForm = ({ type }: AuthFormProps) => {
    const isSignIn = type === 'sign-in'
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const formSchema = authFormSchema(type);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
            password: ''
        },
    })
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setIsLoading(true);
            if (type == 'sign-up') {
                const { name, email, password } = values;
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const result = await signUp({
                    uid: userCredential.user.uid,
                    name: name!,
                    email,
                    password,
                });
                if (!result?.success) {
                    toast.error(result?.message);
                    return;
                }
                toast.success('Account created successfully. Please sign in.');
                router.push('/sign-in');
            }
            else {
                const { email, password } = values;
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                const idToken = await userCredential.user.getIdToken();
                if (!idToken) {
                    toast.error('Sign in failed.');
                    return;
                }
                await signIn({
                    email,
                    idToken,
                });
                toast.success('Signed in successfully.')
                router.push('/');
            }
        }
        catch (error: unknown) {
            console.log(error)
            if (error instanceof Error) {
                toast.error(`An error occurred: ${error.message}`)
            } else {
                toast.error('An unknown error occurred')
            }
        }
        finally{
            setIsLoading(false);
        }
    }
    return (
        <div className="card-border lg:min-w-[566px] ">
            <div className="flex flex-col gap-6 card py-14 px-10">
                <div className="flex flex-row gap-2 justify-center">
                    <Image src="/logo.svg" alt="logo" height={32} width={38} />
                    <h2 className="text-primary-100">PrepWise</h2>
                </div>
                <h3>Practice job interview with AI</h3>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-4 form">
                        {!isSignIn && <FormField control={form.control} label="Name" name="name" placeholder="Your Name" />}
                        <FormField control={form.control} label="Email" name="email" placeholder="Your Email" type="email" />
                        <FormField control={form.control} label="Password" name="password" placeholder="Your Password" type="password" />
                        <Button disabled={isLoading} type="submit" className="btn">{isSignIn ? "Sign in" : "Create an Account"}</Button>
                    </form>
                </Form>
                <p className="text-center">
                    {isSignIn ? "No account yet?" : "Have an account already?"}
                    <Link href={!isSignIn ? "/sign-in" : "/sign-up"} className="font-bold text-user-primary ml-1">
                        {!isSignIn ? "Sign in" : "Sign up"}
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default AuthForm