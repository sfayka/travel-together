'use client'

import ActivityList from '@/components/ActivityList'
import CollaboratorList from '@/components/CollaboratorList'
import { useTripForm } from '@/hooks/useTripForm'

export default function NewTripPage() {
  const {
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
  } = useTripForm()

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h1 className="text-2xl font-semibold leading-6 text-gray-900 mb-6">Create a New Trip</h1>
            
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Trip Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                  Trip Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
                      errors.name ? 'ring-red-300' : 'ring-gray-300'
                    } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                    placeholder="Summer Vacation 2024"
                  />
                  {errors.name && (
                    <p className="mt-2 text-sm text-red-600">{errors.name}</p>
                  )}
                </div>
              </div>

              {/* Destination */}
              <div>
                <label htmlFor="destination" className="block text-sm font-medium leading-6 text-gray-900">
                  Destination
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="destination"
                    id="destination"
                    value={formData.destination}
                    onChange={handleChange}
                    className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
                      errors.destination ? 'ring-red-300' : 'ring-gray-300'
                    } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                    placeholder="Paris, France"
                  />
                  {errors.destination && (
                    <p className="mt-2 text-sm text-red-600">{errors.destination}</p>
                  )}
                </div>
              </div>

              {/* Date Range */}
              <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
                <div>
                  <label htmlFor="startDate" className="block text-sm font-medium leading-6 text-gray-900">
                    Start Date
                  </label>
                  <div className="mt-2">
                    <input
                      type="date"
                      name="startDate"
                      id="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                      className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
                        errors.startDate ? 'ring-red-300' : 'ring-gray-300'
                      } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                    />
                    {errors.startDate && (
                      <p className="mt-2 text-sm text-red-600">{errors.startDate}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="endDate" className="block text-sm font-medium leading-6 text-gray-900">
                    End Date
                  </label>
                  <div className="mt-2">
                    <input
                      type="date"
                      name="endDate"
                      id="endDate"
                      value={formData.endDate}
                      onChange={handleChange}
                      className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
                        errors.endDate ? 'ring-red-300' : 'ring-gray-300'
                      } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                    />
                    {errors.endDate && (
                      <p className="mt-2 text-sm text-red-600">{errors.endDate}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                  Description
                </label>
                <div className="mt-2">
                  <textarea
                    id="description"
                    name="description"
                    rows={3}
                    value={formData.description}
                    onChange={handleChange}
                    className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
                      errors.description ? 'ring-red-300' : 'ring-gray-300'
                    } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                    placeholder="Write a brief description of your trip..."
                  />
                  {errors.description && (
                    <p className="mt-2 text-sm text-red-600">{errors.description}</p>
                  )}
                </div>
              </div>

              {/* Activities */}
              <div className="border-t border-gray-200 pt-8">
                <ActivityList
                  activities={formData.activities}
                  startDate={formData.startDate}
                  endDate={formData.endDate}
                  errors={errors}
                  onAdd={handleActivityAdd}
                  onUpdate={handleActivityUpdate}
                  onRemove={handleActivityRemove}
                />
              </div>

              {/* Collaborators */}
              <div className="border-t border-gray-200 pt-8">
                <CollaboratorList
                  collaborators={formData.collaborators}
                  errors={errors}
                  onAdd={handleCollaboratorAdd}
                  onUpdate={handleCollaboratorUpdate}
                  onRemove={handleCollaboratorRemove}
                />
              </div>

              {/* Visibility and Budget */}
              <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
                <div>
                  <label htmlFor="visibility" className="block text-sm font-medium leading-6 text-gray-900">
                    Visibility
                  </label>
                  <div className="mt-2">
                    <select
                      id="visibility"
                      name="visibility"
                      value={formData.visibility}
                      onChange={handleChange}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    >
                      <option value="private">Private</option>
                      <option value="shared">Shared</option>
                      <option value="public">Public</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="budget" className="block text-sm font-medium leading-6 text-gray-900">
                    Budget
                  </label>
                  <div className="mt-2">
                    <div className="relative rounded-md shadow-sm">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <span className="text-gray-500 sm:text-sm">$</span>
                      </div>
                      <input
                        type="text"
                        name="budget"
                        id="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className={`block w-full rounded-md border-0 py-1.5 pl-7 text-gray-900 shadow-sm ring-1 ring-inset ${
                          errors.budget ? 'ring-red-300' : 'ring-gray-300'
                        } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                        placeholder="0.00"
                      />
                    </div>
                    {errors.budget && (
                      <p className="mt-2 text-sm text-red-600">{errors.budget}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-6 flex items-center justify-end gap-x-6">
                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Create Trip
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
} 