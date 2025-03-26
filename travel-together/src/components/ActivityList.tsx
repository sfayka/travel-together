import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline'

interface Activity {
  id: string
  name: string
  date: string
  time: string
  location: string
  description: string
  category: 'sightseeing' | 'dining' | 'entertainment' | 'transportation' | 'accommodation' | 'other'
  estimatedCost?: string
}

interface Props {
  activities: Activity[]
  startDate: string
  endDate: string
  errors?: { [key: string]: string }
  onAdd: () => void
  onUpdate: (index: number, field: keyof Activity, value: string) => void
  onRemove: (index: number) => void
}

const categories = [
  { value: 'sightseeing', label: 'Sightseeing' },
  { value: 'dining', label: 'Dining' },
  { value: 'entertainment', label: 'Entertainment' },
  { value: 'transportation', label: 'Transportation' },
  { value: 'accommodation', label: 'Accommodation' },
  { value: 'other', label: 'Other' },
]

export default function ActivityList({ activities, startDate, endDate, errors = {}, onAdd, onUpdate, onRemove }: Props) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-base font-semibold leading-6 text-gray-900">Activities</h3>
        <button
          type="button"
          onClick={onAdd}
          className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <PlusIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
          Add Activity
        </button>
      </div>

      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={activity.id} className="rounded-lg bg-white shadow">
            <div className="px-4 py-5 sm:p-6">
              <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label htmlFor={`activity-name-${index}`} className="block text-sm font-medium leading-6 text-gray-900">
                    Activity Name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name={`activity-name-${index}`}
                      id={`activity-name-${index}`}
                      value={activity.name}
                      onChange={(e) => onUpdate(index, 'name', e.target.value)}
                      className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
                        errors[`${index}-name`] ? 'ring-red-300' : 'ring-gray-300'
                      } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                    />
                    {errors[`${index}-name`] && (
                      <p className="mt-2 text-sm text-red-600">{errors[`${index}-name`]}</p>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor={`activity-category-${index}`} className="block text-sm font-medium leading-6 text-gray-900">
                    Category
                  </label>
                  <div className="mt-2">
                    <select
                      id={`activity-category-${index}`}
                      name={`activity-category-${index}`}
                      value={activity.category}
                      onChange={(e) => onUpdate(index, 'category', e.target.value)}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    >
                      {categories.map((category) => (
                        <option key={category.value} value={category.value}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor={`activity-date-${index}`} className="block text-sm font-medium leading-6 text-gray-900">
                    Date
                  </label>
                  <div className="mt-2">
                    <input
                      type="date"
                      name={`activity-date-${index}`}
                      id={`activity-date-${index}`}
                      value={activity.date}
                      min={startDate}
                      max={endDate}
                      onChange={(e) => onUpdate(index, 'date', e.target.value)}
                      className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
                        errors[`${index}-date`] ? 'ring-red-300' : 'ring-gray-300'
                      } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                    />
                    {errors[`${index}-date`] && (
                      <p className="mt-2 text-sm text-red-600">{errors[`${index}-date`]}</p>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor={`activity-time-${index}`} className="block text-sm font-medium leading-6 text-gray-900">
                    Time
                  </label>
                  <div className="mt-2">
                    <input
                      type="time"
                      name={`activity-time-${index}`}
                      id={`activity-time-${index}`}
                      value={activity.time}
                      onChange={(e) => onUpdate(index, 'time', e.target.value)}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label htmlFor={`activity-location-${index}`} className="block text-sm font-medium leading-6 text-gray-900">
                    Location
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name={`activity-location-${index}`}
                      id={`activity-location-${index}`}
                      value={activity.location}
                      onChange={(e) => onUpdate(index, 'location', e.target.value)}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor={`activity-cost-${index}`} className="block text-sm font-medium leading-6 text-gray-900">
                    Estimated Cost
                  </label>
                  <div className="mt-2">
                    <div className="relative rounded-md shadow-sm">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <span className="text-gray-500 sm:text-sm">$</span>
                      </div>
                      <input
                        type="text"
                        name={`activity-cost-${index}`}
                        id={`activity-cost-${index}`}
                        value={activity.estimatedCost || ''}
                        onChange={(e) => onUpdate(index, 'estimatedCost', e.target.value)}
                        className="block w-full rounded-md border-0 py-1.5 pl-7 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <label htmlFor={`activity-description-${index}`} className="block text-sm font-medium leading-6 text-gray-900">
                    Description
                  </label>
                  <div className="mt-2">
                    <textarea
                      name={`activity-description-${index}`}
                      id={`activity-description-${index}`}
                      rows={3}
                      value={activity.description}
                      onChange={(e) => onUpdate(index, 'description', e.target.value)}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => onRemove(index)}
                  className="inline-flex items-center gap-x-1.5 rounded-md bg-red-100 px-2.5 py-1.5 text-sm font-semibold text-red-600 hover:bg-red-200"
                >
                  <TrashIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}

        {activities.length === 0 && (
          <p className="text-sm text-gray-500 text-center py-4">No activities added yet.</p>
        )}
      </div>
    </div>
  )
} 