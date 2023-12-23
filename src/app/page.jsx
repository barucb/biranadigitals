// pages/index.js

import React from 'react';
import Featured from "@/components/featured/Featured";
import CategoryList from "@/components/categoryList/CategoryList";
import CardList from "@/components/cardList/CardList";
import Menu from "@/components/Menu/Menu";
import Testimonials from "@/components/testimonials/testimonials";
import Services from "@/components/services/services";
import Blogs from "@/components/blogs/blogs";
import Footer from '@/components/footer/Footer';



export default function Home({ searchParams }) {
  const page = parseInt(searchParams.page) || 1;
  return (
    <div>
      <Featured />
      <Services />
      <Blogs num = {4} />
      <CategoryList />
      <Testimonials />
      <Footer />
    </div>
  );
}
