import { useState, useEffect } from 'react'
import { Combobox } from '@headlessui/react'
import { MapPinIcon } from '@heroicons/react/24/outline'
import { Place } from '@/hooks/useTripForm'

interface Props {
  selectedPlace: Place | null
  onPlaceSelect: (place: Place) => void
}

interface GooglePlace extends google.maps.places.PlaceResult {
  place_id: string
  name: string
  formatted_address: string
  geometry: {
    location: google.maps.LatLng
  }
}

export default function DestinationAutocomplete({ selectedPlace, onPlaceSelect }: Props) {
  const [query, setQuery] = useState('')
  const [places, setPlaces] = useState<Place[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Check if Google Maps API is available
  useEffect(() => {
    if (!window.google?.maps?.places) {
      if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
        setError('Google Maps API key is not configured. Please add it to your environment variables.')
      } else {
        setError('Google Maps API failed to load. Please check your internet connection and try again.')
      }
    }
  }, [])

  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    const searchPlaces = async () => {
      if (!query.trim()) {
        setPlaces([])
        return
      }

      if (!window.google?.maps?.places) {
        setError('Google Maps API is not available')
        setIsLoading(false)
        return
      }

      setIsLoading(true)
      setError(null)

      try {
        const service = new google.maps.places.AutocompleteService()
        const predictions = await new Promise<google.maps.places.AutocompletePrediction[]>((resolve, reject) => {
          service.getPlacePredictions(
            {
              input: query,
              types: ['(cities)']
            },
            (results, status) => {
              if (status === google.maps.places.PlacesServiceStatus.OK && results) {
                resolve(results)
              } else if (status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
                resolve([])
              } else {
                reject(new Error(`Places service failed with status: ${status}`))
              }
            }
          )
        })

        const placesService = new google.maps.places.PlacesService(document.createElement('div'))
        const detailedPlaces = await Promise.all(
          predictions.map(
            (prediction) =>
              new Promise<Place>((resolve, reject) => {
                placesService.getDetails(
                  {
                    placeId: prediction.place_id,
                    fields: ['place_id', 'name', 'formatted_address', 'geometry']
                  },
                  (result, status) => {
                    if (status === google.maps.places.PlacesServiceStatus.OK && result) {
                      const place = result as GooglePlace
                      resolve({
                        placeId: place.place_id,
                        name: place.name,
                        address: place.formatted_address,
                        location: {
                          lat: place.geometry.location.lat(),
                          lng: place.geometry.location.lng()
                        }
                      })
                    } else {
                      reject(new Error(`Place details failed with status: ${status}`))
                    }
                  }
                )
              })
          )
        )

        setPlaces(detailedPlaces)
      } catch (error) {
        console.error('Error fetching places:', error)
        setError('Failed to fetch places. Please try again.')
        setPlaces([])
      } finally {
        setIsLoading(false)
      }
    }

    timeoutId = setTimeout(searchPlaces, 300)

    return () => clearTimeout(timeoutId)
  }, [query])

  return (
    <div>
      <Combobox as="div" value={selectedPlace} onChange={onPlaceSelect}>
        <div className="relative">
          <Combobox.Input
            className="w-full rounded-md border-0 bg-white py-1.5 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            onChange={(event) => setQuery(event.target.value)}
            displayValue={(place: Place | null) => place?.name ?? ''}
            placeholder="Search for a city..."
          />
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <MapPinIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
        </div>

        {(isLoading || places.length > 0 || error) && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {isLoading && (
              <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                Loading...
              </div>
            )}
            {error && (
              <div className="relative cursor-default select-none px-4 py-2 text-red-600">
                {error}
              </div>
            )}
            {!isLoading && !error && places.length === 0 && query !== '' && (
              <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                No places found.
              </div>
            )}
            {places.map((place) => (
              <Combobox.Option
                key={place.placeId}
                value={place}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-3 pr-9 ${
                    active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                  }`
                }
              >
                {({ active, selected }) => (
                  <>
                    <div className="flex flex-col">
                      <span className={`truncate ${selected ? 'font-semibold' : ''}`}>{place.name}</span>
                      <span className={`truncate text-sm ${active ? 'text-indigo-200' : 'text-gray-500'}`}>
                        {place.address}
                      </span>
                    </div>
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </Combobox>
      {error && (
        <p className="mt-2 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  )
} 