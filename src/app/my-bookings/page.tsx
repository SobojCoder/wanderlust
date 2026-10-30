import UserTravelBookingCard from "@/components/bookingCard/UserTravelBookingCard";
import { auth } from "@/lib/auth";
import { getTokenFromServer } from "@/lib/getTokenFromSever";
import { IBooking } from "@/type/bookingType";
import { headers } from "next/headers";

const MyBookingPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;
  const token = await getTokenFromServer()
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/my-booking/${user?.email}`,{
    headers: {
      authorization: `Bearer ${token}`
    }
  });
  const bookings = await res.json();

  return (
    <main className="min-h-screen bg-[#f7f9fc]">
      {/* Page content */}
      <section className="mx-auto max-w-7xl px-5 py-10 lg:px-8 lg:py-14">
        <div className="mb-9">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
            Your travel dashboard
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            My Bookings
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
            Keep track of your upcoming adventures in one place. View your trip
            details, check departure dates, and manage your reservations
            whenever you need.
          </p>

          <div className="mt-6 flex items-center gap-2 text-sm text-slate-500">
            <span className="flex size-8 items-center justify-center rounded-full bg-emerald-100 font-semibold text-emerald-700">
              {bookings.length}
            </span>
            {bookings.length} travel bookings
          </div>
        </div>

        {/* Booking cards */}
         <div className="space-y-6">

          {bookings.map((booking: IBooking) => (
            <UserTravelBookingCard booking={booking} key={booking._id} />
          ))}
          </div>
      </section>
    </main>
  );
};

export default MyBookingPage;
