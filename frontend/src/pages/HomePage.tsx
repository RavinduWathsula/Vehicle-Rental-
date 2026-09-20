import { CinematicSequence } from '../components/home/CinematicSequence';
import { VehicleScene } from '../components/3d/VehicleScene';
import { ExperienceSection } from '../components/home/ExperienceSection';
import { BookingWidget } from '../components/booking/BookingWidget';

export const HomePage = () => {
  return (
    <>
      <VehicleScene />
      <CinematicSequence />
      
      {/* Position the Booking Widget strategically at the end of the cinematic sequence */}
      <div className="relative bg-[#08090B] w-full z-30 pb-20">
        <BookingWidget />
      </div>

      <ExperienceSection />
    </>
  );
};
