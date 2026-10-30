import DestinationCard from "@/components/destination/destinationCard"

export interface IDestinations {
  _id: string
  name: string
  country: string
  category: string
  price: string
  duration: string
  departureDate: string
  imageUrl: string
  description: string
}

const AllDestinationPage = async() => {
    const res = await fetch('http://localhost:5000/destinations');
    const data = await res.json();
    console.log(data);
    return (
        <div>
            <div className="mx-auto max-w-7xl px-4 pt-24 pb-10 md:px-6">

            <h2 className="font-semiBold text-2xl">Explore All Destinations</h2>
            <p className="mb-9">Find your perfect travel experience from our curated collection</p>
            <div className="grid grid-cols-3 gap-4">
                {
                    data.slice(4).map((d:IDestinations)=> <DestinationCard key={d._id} destination={d} />)
                }
            </div>
            </div>
        </div>
    );
};

export default AllDestinationPage;