import { TextInput, Box, PasswordInput } from '@mantine/core'
import React, { useState } from 'react'

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Signing in with:', email, password)
  }

  return (
    <div className="flex justify-center items-center min-h-screen pt-10 bg-red-500">
      <Box shadow="md" p="xl" className="w-full max-w-md border rounded-md bg-white">
        <h1 className='bg-black text-white text-2xl flex justify-center items-center font-bold p-4 rounded-t-md'>Sign In</h1>
        <form onSubmit={handleSubmit} className="space-y-6 p-6">
          <TextInput
            required
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
          <PasswordInput
            required
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Remember me
            </label>
            <a href="/forgotpassword" className="text-red-500 hover:text-red-600">Forgot password?</a>
          </div>
          <button 
            type="submit"
            className='w-full bg-red-500 hover:bg-red-600 transition-colors text-white p-3 rounded-md font-semibold'
          >
            Sign In
          </button>
          <p className="text-center text-gray-600">
            Don't have an account?{' '}
            <a href="/signup" className="text-red-500 hover:text-red-600">Sign up</a>
          </p>
        </form>
      </Box>
    </div>
  )
}

export default SignIn