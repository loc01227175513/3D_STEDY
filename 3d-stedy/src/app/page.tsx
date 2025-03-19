'use client';
import Slider from '@/components/Slider/Slider';
import FeaturedItem from '@/components/FeaturedItem/FeaturedItem';
import Topseller from '@/components/Topseller/Topseller';
import DiscoverItem from '@/components/DiscoverItem/DiscoverItem';
const HomePage = () => {
  return (
    <>
      <Slider />
      <FeaturedItem />
      <Topseller />
      <DiscoverItem />
    </>

  );
};

export default HomePage; 