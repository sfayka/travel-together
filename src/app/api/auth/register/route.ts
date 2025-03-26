import { NextResponse } from 'next/server'
import { hash } from 'bcrypt'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email, password, name, username, bio, emailNotifications, theme, language } = body

    // Basic validation
    if (!email || !password || !name || !username) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await hash(password, 10)

    // Store user data (in-memory for now)
    // In a real app, you would store this in a database
    const user = {
      id: Math.random().toString(36).slice(2),
      email,
      password: hashedPassword,
      name,
      username,
      bio,
      preferences: {
        emailNotifications,
        theme,
        language,
      },
      createdAt: new Date().toISOString(),
    }

    // For now, we'll just return success
    // In a real app, you would:
    // 1. Store the user in a database
    // 2. Send a verification email
    // 3. Create a session
    // 4. Return the session token

    return NextResponse.json({
      message: 'Registration successful',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        username: user.username,
      }
    })
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 