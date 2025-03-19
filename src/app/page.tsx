'use client';
import Slider from '@/components/Home/Slider/Slider';
import FeaturedItem from '@/components/Home/FeaturedItem/FeaturedItem';
import Topseller from '@/components/Home/Topseller/Topseller';
import DiscoverItem from '@/components/Home/DiscoverItem/DiscoverItem';
import TopCollector from '@/components/Home/TopCollector/TopCollector';
import Topcollections from '@/components/Home/Topcollections/Topcollections';
import Createsell from '@/components/Home/Createsell/Createsell';
import Action from '@/components/Home/Action/Action';
const HomePage = () => {
  return (
    <>
      <Slider />
      <FeaturedItem />
      <Topseller />
      <DiscoverItem />
      <TopCollector />
      <Topcollections />
      <Createsell />
      <Action />
    </>

  );
};

export default HomePage; 