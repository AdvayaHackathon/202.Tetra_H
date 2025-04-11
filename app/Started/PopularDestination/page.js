import { places } from "../../data/country"
import Card from "../../_components/Card"

export default function Started(){
    return (
        <div className="min-h-screen w-screen bg-white p-8">
            <h1 className="text-4xl font-bold text-center mb-8">Popular Destinations</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
                {places.map((place, index) => (
                    <Card key={index} place={place} />
                ))}
            </div>
        </div>
    )
}