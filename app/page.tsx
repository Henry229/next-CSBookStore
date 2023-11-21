import Image from 'next/image';

export default async function HomePage() {
  const heroBackgroundImage = '/testbank-hero.svg';

  const items = [
    {
      type: 'Paperback',
      imageUrl: '/section3_paperback_bookstore.png',
    },
    {
      type: 'Test Papers',
      imageUrl: '/section3_testpapers_bookstore.png',
    },
    {
      type: 'Audio Books',
      imageUrl: '/section3_audiobook_bookstore.png',
    },
  ];

  return (
    <main className='min-h-screen'>
      {/* <main className='flex flex-col items-center justify-between min-h-screen'> */}
      {/* Hero Section */}
      <section className='container relative px-8 py-12 mx-auto md:py-16'>
        <div className='relative w-full min-h-[calc(100vh-64px)]'>
          <Image
            src={heroBackgroundImage}
            layout='fill'
            // width={1249}
            // height={768}
            className='object-cover object-center'
            alt='Background'
            priority // 페이지 로드 시 이미지가 우선적으로 로딩되도록 함
          />
        </div>
        {/* Content Section */}
        <div className='absolute bottom-0 left-0 right-0 z-10 flex flex-col justify-center pl-4 top-16 md:pl-16 lg:pl-24'>
          <div className='max-w-md'>
            <h1 className='mb-6 text-4xl font-bold text-white lg:text-5xl'>
              Bright Minds, Brighter Futures Learning Made Fun!
            </h1>
            <p className='mb-4 text-lg text-white lg:text-xl'>
              Explore our wide selection of books, test papers, and audio books
              designed for primary students. Stay ahead in learning and have
              fun!
            </p>
            <button className='px-6 py-2 text-white transition bg-black rounded-lg shadow-lg hover:bg-opacity-70'>
              Shop
            </button>
          </div>
        </div>
      </section>
      <section className='container px-8 py-12 mx-auto md:py-16'>
        <div className='flex flex-col items-center md:flex-row'>
          {/* Image content */}
          <div className='mb-8 md:w-1/2 md:pr-8 md:mb-0'>
            <Image
              src='/section2_bookstore.png' // 실제 이미지 경로로 변경하세요
              alt='Academic materials'
              width={504} // 이미지의 실제 너비
              height={298} // 이미지의 실제 높이
              layout='responsive'
              className='rounded-lg shadow-lg'
            />
          </div>
          {/* Text content */}
          <div className='md:w-1/2'>
            <h2 className='mb-4 text-3xl font-bold'>
              Unlock Academic Excellence: Prime Tests and Strategies
            </h2>
            <p className='mb-4'>
              Welcome to our TestBank, online bookstore, where you can find a
              wide range of educational materials specifically designed for
              primary students. Elevate your child's learning experience with
              our comprehensive exam preparation materials, perfect for primary
              geniuses.
            </p>
            <ul className='mb-6 list-disc list-inside'>
              <li>Ignite Your Passion for Learning with Strategy Books</li>
              <li>Boost Academic Performance with Comprehensive Test Papers</li>
              <li>Enhance Listening Skills with Captivating Audio Books</li>
            </ul>
            <button className='px-6 py-2 text-white transition duration-300 bg-black rounded-lg shadow-lg hover:bg-opacity-70'>
              Shop
            </button>
          </div>
        </div>
      </section>
      <section className='container px-8 py-12 mx-auto'>
        <h2 className='mb-8 text-3xl font-bold text-center'>
          Premire Study Collection
        </h2>
        <p className='mb-12 text-center'>
          Featuring a curated library of study materials that lead the way in
          learning and innovation.
        </p>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
          {items.map((item) => (
            <div
              key={item.type}
              className='p-4 text-center bg-white rounded-lg shadow-md'
            >
              <Image
                src={item.imageUrl}
                alt={item.type}
                width={250}
                height={150}
                layout='responsive'
                className='rounded-lg shadow-lg'
              />
              <h3 className='mt-4 font-semibold'>{item.type}</h3>
            </div>
          ))}
        </div>
        <div className='mt-12 text-center'>
          <button className='px-6 py-2 text-white transition duration-300 bg-black rounded-lg shadow-lg hover:bg-opacity-70'>
            Shop
          </button>
        </div>
      </section>
      <section className='container flex flex-col items-center px-8 py-12 mx-auto md:py-16 md:flex-row'>
        {/* Image container */}
        <div className='flex-1'>
          <Image
            src='/section4_benefit_bookstore.png'
            alt='Educational Tools'
            width={1006}
            height={598}
            layout='responsive'
            className='rounded-lg shadow-lg'
          />
        </div>
        {/* Text content */}
        <div className='flex-1 ml-4 md:ml-12'>
          <h2 className='mb-4 text-4xl font-bold'>
            Transformative Educational Tools
          </h2>
          <p className='mb-6'>
            With the Testbank Advantage, focusing on how choosing Testbank
            elevates students' success in exams and studies
          </p>
          <div className='mb-4'>
            <h3 className='text-xl font-semibold'>Convenient</h3>
            <p className='mt-2'>
              Shop anytime, anywhere, and have your purchases delivered right to
              your doorstep.
            </p>
          </div>
          <div className='mb-6'>
            <h3 className='text-xl font-semibold'>Immediate</h3>
            <p className='mt-2'>
              Get immediate feedback on test performances, accelerating your
              learning curve.
            </p>
          </div>
          <button className='px-6 py-2 text-white transition duration-300 bg-black rounded-lg shadow-lg hover:bg-opacity-70'>
            Learn More
          </button>
          {/* 다른 버튼이 필요하면 여기에 추가 */}
        </div>
      </section>
    </main>
  );
}
