'use client'
import React, { useState } from 'react';
import { Button, Description, FieldError, Form, Input, InputGroup, Label, TextField } from "@heroui/react";
import { authClient } from '@/lib/auth-client';
import { Eye, EyeSlash } from '@gravity-ui/icons';

const LoginPage = () => {

    const [isVisible, setIsVisible] = useState(false);

    const onSubmit = async (e) => {

        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const userData = Object.fromEntries(formData.entries());

        const { data, error } = await authClient.signIn.email({
            ...userData,
            rememberMe: true,
            callbackURL: '/dashboard'
        })

        console.log('Login response: ', { data, error })
    }

    return (


        <div>
            <h2 className='text-4xl font-bold text-center mb-10'>LogIn</h2>
            <div className='flex justify-center items-center'>
                <Form
                    className="flex w-96 flex-col gap-4"
                    render={(props) => <form {...props} data-custom="foo" />}
                    onSubmit={onSubmit}
                >
                    <TextField
                        isRequired
                        name="email"
                        type="email"
                        validate={(value) => {
                            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                                return "Please enter a valid email address";
                            }
                            return null;
                        }}
                    >
                        <Label>Email</Label>
                        <Input name="email" placeholder="john@example.com" />
                        <FieldError />
                    </TextField>
                    <TextField className="w-full" name="password">
                        <Label>Password</Label>
                        <InputGroup>
                            <InputGroup.Input
                                className=""
                                type={isVisible ? "text" : "password"}
                                name='password'
                                placeholder='Enter your Password'
                            />
                            <InputGroup.Suffix className="pr-0">
                                <Button
                                    isIconOnly
                                    aria-label={isVisible ? "Hide password" : "Show password"}
                                    size="sm"
                                    variant="ghost"
                                    onPress={() => setIsVisible(!isVisible)}
                                >
                                    {isVisible ? <Eye className="size-4" /> : <EyeSlash className="size-4" />}
                                </Button>
                            </InputGroup.Suffix>
                        </InputGroup>
                    </TextField>
                    <div className="flex gap-2">
                        <Button type="submit">
                            Login
                        </Button>
                        <Button type="reset" variant="secondary">
                            Reset
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default LoginPage;