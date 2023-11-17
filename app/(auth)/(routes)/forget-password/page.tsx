'use client';

import React, { SyntheticEvent, useState } from 'react';
import { useSignIn } from '@clerk/nextjs';
import type { NextPage } from 'next';

const SignInPage: NextPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [successfulCreation, setSuccessfulCreation] = useState(false);
  const [complete, setComplete] = useState(false);
  const [secondFactor, setSecondFactor] = useState(false);

  const { isLoaded, signIn, setActive } = useSignIn();

  if (!isLoaded) {
    return null;
  }

  async function create(e: SyntheticEvent) {
    e.preventDefault();
    await signIn
      ?.create({
        strategy: 'reset_password_email_code',
        identifier: email,
      })
      .then((_) => {
        setSuccessfulCreation(true);
      })
      .catch((err) => console.error('error', err.errors[0].longMessage));
  }

  async function reset(e: SyntheticEvent) {
    e.preventDefault();
    await signIn
      ?.attemptFirstFactor({
        strategy: 'reset_password_email_code',
        code,
        password,
      })
      .then((result) => {
        if (result.status === 'needs_second_factor') {
          setSecondFactor(true);
        } else if (result.status === 'complete') {
          setActive({ session: result.createdSessionId });
          setComplete(true);
        } else {
          console.log(result);
        }
      })
      .catch((err) => console.error('error', err.errors[0].longMessage));
  }

  return (
    <div className='container flex justify-center h-screen p-4 mx-auto mt-[15rem] '>
      <div className='w-full max-w-md'>
        <form
          className='px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md'
          onSubmit={!successfulCreation ? create : reset}
        >
          <div className='mb-4'>
            <h1 className='mb-2 text-xl font-bold'>Forgot Password?</h1>
            {!successfulCreation && !complete && (
              <>
                <label
                  className='block mb-2 text-sm font-bold text-gray-700'
                  htmlFor='email'
                >
                  Please provide identifier
                </label>
                <input
                  className='w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                  type='email'
                  id='email'
                  placeholder='e.g john@doe.com'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  className='w-full px-4 py-2 mt-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline'
                  type='submit'
                >
                  Send Reset Email
                </button>
              </>
            )}

            {successfulCreation && !complete && (
              <>
                <label
                  className='block mb-2 text-sm font-bold text-gray-700'
                  htmlFor='password'
                >
                  New password
                </label>
                <input
                  className='w-full px-3 py-2 mb-3 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                  type='password'
                  id='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <label
                  className='block mb-2 text-sm font-bold text-gray-700'
                  htmlFor='code'
                >
                  Reset password code
                </label>
                <input
                  className='w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                  type='text'
                  id='code'
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
                <button
                  className='w-full px-4 py-2 mt-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline'
                  type='submit'
                >
                  Reset Password
                </button>
              </>
            )}
          </div>

          {complete && (
            <p className='text-green-500'>
              You successfully changed your password
            </p>
          )}
          {secondFactor && (
            <p className='text-red-500'>
              2FA is required, this UI does not handle that
            </p>
          )}
        </form>
        <p className='text-xs text-center text-gray-500'>
          &copy;2023 CS-BookStore. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default SignInPage;

{
  /* <div
      style={{
        margin: 'auto',
        maxWidth: '500px',
      }}
    >
      <h1>Forgot Password ?</h1>
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1em',
        }}
        onSubmit={!successfulCreation ? create : reset}
      >
        {!successfulCreation && !complete && (
          <>
            <label htmlFor='email'>Please provide identifier</label>
            <input
              type='email'
              placeholder='e.g john@doe.com'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button>Sign in</button>
          </>
        )}

        {successfulCreation && !complete && (
          <>
            <label htmlFor='password'>New password</label>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <label htmlFor='password'>Reset password code</label>
            <input
              type='text'
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />

            <button>Reset</button>
          </>
        )}

        {complete && 'You successfully changed you password'}
        {secondFactor && '2FA is required, this UI does not handle that'}
      </form>
    </div> */
}
