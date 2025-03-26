import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"

type Step = 'account' | 'profile' | 'preferences' | 'tutorial'

export function RegistrationForm() {
  const [step, setStep] = useState<Step>('account')
  const [formData, setFormData] = useState({
    // Account details
    email: '',
    password: '',
    confirmPassword: '',
    
    // Profile details
    name: '',
    username: '',
    bio: '',
    
    // Preferences
    emailNotifications: true,
    theme: 'light',
    language: 'en',
  })

  const steps: Step[] = ['account', 'profile', 'preferences', 'tutorial']
  const currentStepIndex = steps.indexOf(step)
  const progress = ((currentStepIndex + 1) / steps.length) * 100

  const updateFormData = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (step === 'account') {
      // Validate passwords match
      if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match')
        return
      }
      setStep('profile')
    } else if (step === 'profile') {
      setStep('preferences')
    } else if (step === 'preferences') {
      setStep('tutorial')
    } else {
      // Final submission
      try {
        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        })
        
        if (!response.ok) throw new Error('Registration failed')
        
        // Redirect to dashboard or show success message
        window.location.href = '/dashboard'
      } catch (error) {
        console.error('Registration error:', error)
        alert('Registration failed. Please try again.')
      }
    }
  }

  const renderAccountForm = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => updateFormData('email', e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={formData.password}
          onChange={(e) => updateFormData('password', e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          id="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={(e) => updateFormData('confirmPassword', e.target.value)}
          required
        />
      </div>
    </div>
  )

  const renderProfileForm = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          type="text"
          value={formData.name}
          onChange={(e) => updateFormData('name', e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          type="text"
          value={formData.username}
          onChange={(e) => updateFormData('username', e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Input
          id="bio"
          type="text"
          value={formData.bio}
          onChange={(e) => updateFormData('bio', e.target.value)}
        />
      </div>
    </div>
  )

  const renderPreferencesForm = () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="emailNotifications"
          checked={formData.emailNotifications}
          onChange={(e) => updateFormData('emailNotifications', e.target.checked)}
        />
        <Label htmlFor="emailNotifications">Receive email notifications</Label>
      </div>
      <div className="space-y-2">
        <Label htmlFor="theme">Theme</Label>
        <select
          id="theme"
          value={formData.theme}
          onChange={(e) => updateFormData('theme', e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="system">System</option>
        </select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="language">Language</Label>
        <select
          id="language"
          value={formData.language}
          onChange={(e) => updateFormData('language', e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
        </select>
      </div>
    </div>
  )

  const renderTutorialStep = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Quick Tutorial</h3>
      <div className="space-y-2">
        <p>Here's how to get started with Travel Together:</p>
        <ol className="list-decimal list-inside space-y-2">
          <li>Create your first trip by clicking "New Trip"</li>
          <li>Add destinations and activities to your itinerary</li>
          <li>Invite friends to collaborate on trip planning</li>
          <li>Track expenses and share costs</li>
        </ol>
      </div>
    </div>
  )

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Progress value={progress} className="w-full" />
      
      <div className="space-y-4">
        {step === 'account' && renderAccountForm()}
        {step === 'profile' && renderProfileForm()}
        {step === 'preferences' && renderPreferencesForm()}
        {step === 'tutorial' && renderTutorialStep()}
      </div>

      <div className="flex justify-between">
        {step !== 'account' && (
          <Button
            type="button"
            variant="outline"
            onClick={() => setStep(steps[currentStepIndex - 1])}
          >
            Back
          </Button>
        )}
        <Button type="submit">
          {step === 'tutorial' ? 'Complete' : 'Continue'}
        </Button>
      </div>
    </form>
  )
} 