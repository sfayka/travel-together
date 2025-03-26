import { useState, FormEvent, ChangeEvent } from 'react'
import { v4 as uuidv4 } from 'uuid'

export interface Place {
  placeId: string
  name: string
  address: string
  location: {
    lat: number
    lng: number
  }
}

export interface Activity {
  id: string
  name: string
  date: string
  time: string
  location: string
  description: string
  category: 'sightseeing' | 'dining' | 'entertainment' | 'transportation' | 'accommodation' | 'other'
  estimatedCost?: string
}

export interface Collaborator {
  email: string
  role: 'viewer' | 'editor' | 'admin'
}

export interface TripFormData {
  name: string
  destination: Place | null
  startDate: string
  endDate: string
  description: string
  visibility: 'private' | 'shared' | 'public'
  budget: string
  activities: Activity[]
  collaborators: Collaborator[]
}

export interface TripFormErrors {
  name?: string
  destination?: string
  startDate?: string
  endDate?: string
  description?: string
  budget?: string
  [key: string]: string | undefined
}

const initialFormData: TripFormData = {
  name: '',
  destination: null,
  startDate: '',
  endDate: '',
  description: '',
  visibility: 'private',
  budget: '',
  activities: [],
  collaborators: []
}

export function useTripForm() {
  const [formData, setFormData] = useState<TripFormData>(initialFormData)
  const [errors, setErrors] = useState<TripFormErrors>({})

  const validateForm = (): boolean => {
    const newErrors: TripFormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Trip name is required'
    }

    if (!formData.destination) {
      newErrors.destination = 'Destination is required'
    }

    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required'
    }

    if (!formData.endDate) {
      newErrors.endDate = 'End date is required'
    }

    if (formData.startDate && formData.endDate && formData.startDate > formData.endDate) {
      newErrors.endDate = 'End date must be after start date'
    }

    if (formData.budget && !/^\d+(\.\d{0,2})?$/.test(formData.budget)) {
      newErrors.budget = 'Budget must be a valid number'
    }

    // Validate activities
    formData.activities.forEach((activity, index) => {
      if (!activity.name.trim()) {
        newErrors[`${index}-name`] = 'Activity name is required'
      }
      if (!activity.date) {
        newErrors[`${index}-date`] = 'Activity date is required'
      }
      if (activity.date && (activity.date < formData.startDate || activity.date > formData.endDate)) {
        newErrors[`${index}-date`] = 'Activity date must be within trip dates'
      }
    })

    // Validate collaborators
    formData.collaborators.forEach((collaborator, index) => {
      if (!collaborator.email.trim()) {
        newErrors[`${index}-email`] = 'Email is required'
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(collaborator.email)) {
        newErrors[`${index}-email`] = 'Invalid email address'
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof TripFormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      // TODO: Submit form data to the server
      console.log('Form submitted:', formData)
    }
  }

  // Activity management
  const handleActivityAdd = () => {
    const newActivity: Activity = {
      id: uuidv4(),
      name: '',
      date: '',
      time: '',
      location: '',
      description: '',
      category: 'sightseeing'
    }
    setFormData((prev) => ({
      ...prev,
      activities: [...prev.activities, newActivity]
    }))
  }

  const handleActivityUpdate = (index: number, field: keyof Activity, value: string) => {
    setFormData((prev) => ({
      ...prev,
      activities: prev.activities.map((activity, i) =>
        i === index ? { ...activity, [field]: value } : activity
      )
    }))
    if (errors[`${index}-${field}`]) {
      setErrors((prev) => ({ ...prev, [`${index}-${field}`]: undefined }))
    }
  }

  const handleActivityRemove = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      activities: prev.activities.filter((_, i) => i !== index)
    }))
    // Clear any errors related to this activity
    const newErrors = { ...errors }
    Object.keys(newErrors).forEach((key) => {
      if (key.startsWith(`${index}-`)) {
        delete newErrors[key]
      }
    })
    setErrors(newErrors)
  }

  // Collaborator management
  const handleCollaboratorAdd = () => {
    const newCollaborator: Collaborator = {
      email: '',
      role: 'viewer'
    }
    setFormData((prev) => ({
      ...prev,
      collaborators: [...prev.collaborators, newCollaborator]
    }))
  }

  const handleCollaboratorUpdate = (index: number, field: keyof Collaborator, value: string) => {
    setFormData((prev) => ({
      ...prev,
      collaborators: prev.collaborators.map((collaborator, i) =>
        i === index ? { ...collaborator, [field]: value } : collaborator
      )
    }))
    if (errors[`${index}-${field}`]) {
      setErrors((prev) => ({ ...prev, [`${index}-${field}`]: undefined }))
    }
  }

  const handleCollaboratorRemove = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      collaborators: prev.collaborators.filter((_, i) => i !== index)
    }))
    // Clear any errors related to this collaborator
    const newErrors = { ...errors }
    Object.keys(newErrors).forEach((key) => {
      if (key.startsWith(`${index}-`)) {
        delete newErrors[key]
      }
    })
    setErrors(newErrors)
  }

  return {
    formData,
    errors,
    handleChange,
    handleSubmit,
    handleActivityAdd,
    handleActivityUpdate,
    handleActivityRemove,
    handleCollaboratorAdd,
    handleCollaboratorUpdate,
    handleCollaboratorRemove
  }
} 