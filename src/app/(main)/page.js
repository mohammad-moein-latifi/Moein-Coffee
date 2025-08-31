import Header from '@/components/templates/header/Header';
import Contact from '@/components/templates/contact/Contact';
import Category from '@/components/templates/category/Category';
import Products from '@/components/templates/products/Products';
import Services from '@/components/templates/services/Services';
import Articles from '@/components/templates/articles/Articles';
import PopularProducts from '@/components/templates/popularProducts/popularProducts';

export default function Home() {
  return (
    <>
      <Header />
      <Products />
      <Category />
      <PopularProducts />
      <Articles />
      <Contact />
      <Services />
    </>
  );
}
