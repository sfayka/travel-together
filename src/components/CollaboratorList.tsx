import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline'

interface Collaborator {
  email: string
  role: 'viewer' | 'editor' | 'admin'
}

interface Props {
  collaborators: Collaborator[]
  errors?: { [key: string]: string | undefined }
  onAdd: () => void
  onUpdate: (index: number, field: keyof Collaborator, value: string) => void
  onRemove: (index: number) => void
}

const roles = [
  { value: 'viewer', label: 'Viewer' },
  { value: 'editor', label: 'Editor' },
  { value: 'admin', label: 'Admin' },
]

export default function CollaboratorList({ collaborators, errors = {}, onAdd, onUpdate, onRemove }: Props) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-base font-semibold leading-6 text-gray-900">Collaborators</h3>
        <button
          type="button"
          onClick={onAdd}
          className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <PlusIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
          Add Collaborator
        </button>
      </div>

      <div className="space-y-4">
        {collaborators.map((collaborator, index) => (
          <div key={index} className="rounded-lg bg-white shadow">
            <div className="px-4 py-5 sm:p-6">
              <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label htmlFor={`collaborator-email-${index}`} className="block text-sm font-medium leading-6 text-gray-900">
                    Email Address
                  </label>
                  <div className="mt-2">
                    <input
                      type="email"
                      name={`collaborator-email-${index}`}
                      id={`collaborator-email-${index}`}
                      value={collaborator.email}
                      onChange={(e) => onUpdate(index, 'email', e.target.value)}
                      className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
                        errors[`${index}-email`] ? 'ring-red-300' : 'ring-gray-300'
                      } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                      placeholder="collaborator@example.com"
                    />
                    {errors[`${index}-email`] && (
                      <p className="mt-2 text-sm text-red-600">{errors[`${index}-email`]}</p>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor={`collaborator-role-${index}`} className="block text-sm font-medium leading-6 text-gray-900">
                    Role
                  </label>
                  <div className="mt-2">
                    <select
                      id={`collaborator-role-${index}`}
                      name={`collaborator-role-${index}`}
                      value={collaborator.role}
                      onChange={(e) => onUpdate(index, 'role', e.target.value)}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    >
                      {roles.map((role) => (
                        <option key={role.value} value={role.value}>
                          {role.label}
                        </option>
                      ))}
                    </select>
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

        {collaborators.length === 0 && (
          <p className="text-sm text-gray-500 text-center py-4">No collaborators added yet.</p>
        )}
      </div>
    </div>
  )
} 