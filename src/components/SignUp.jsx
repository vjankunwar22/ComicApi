import { TextInput, Box, PasswordInput } from '@mantine/core'
import React, { useState } from 'react'

const SignUp = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Signing up with:', firstName, lastName, email, password, confirmPassword)
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-red-500 pt-20">
      <Box shadow="md" p="xl" className="w-full max-w-md border rounded-md bg-white">
        <h1 className='bg-black text-white text-2xl flex justify-center items-center font-bold p-4 rounded-t-md'>Sign Up</h1>
        <form onSubmit={handleSubmit} className="space-y-6 p-6">
          <TextInput
            required
            label="First Name"
            placeholder="Enter your first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextInput
            required
            label="Last Name"
            placeholder="Enter your last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
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
          <PasswordInput
            required
            label="Confirm Password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Accept terms and conditions
            </label>
          </div>
          <button 
            type="submit"
            className='w-full bg-red-500 hover:bg-red-600 transition-colors text-white p-3 rounded-md font-semibold'
          >
            Sign Up
          </button>
          <p className="text-center text-gray-600">
            Already have an account?{' '}
            <a href="/signin" className="text-red-500 hover:text-red-600">Sign in</a>
          </p>
        </form>
      </Box>
    </div>
  )
}

export default SignUp