import Image from 'next/image';

export default async function HomePage() {
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
      {/* Content Section */}
      <section className='container flex flex-col-reverse items-center px-8 py-12 mx-auto bg-gradient-to-r from-yellow-900 to-yellow-400 md:py-16 md:flex-row '>
        <div className='w-full px-4 md:flex-1 '>
          <h1 className='mb-6 text-5xl font-bold text-white lg:text-6xl'>
            <p>Bright Minds, Brighter Futures</p>
            <p>Learning Made Fun!</p>
          </h1>
          <p className='mb-4 text-lg lg:text-xl text-zinc-300'>
            Explore our wide selection of books, test papers, and audio books
            designed for primary students. Stay ahead in learning and have fun!
          </p>
          <button className='px-6 py-2 text-white transition bg-black rounded-lg shadow-lg hover:bg-opacity-50'>
            Shop
          </button>
        </div>
        <div className='w-full mb-8 ml-6 md:mt-0 md:flex-1'>
          <Image
            src='/hero_bookstore.png'
            layout='responsive'
            width={1024}
            height={1024}
            className='object-cover object-center rounded-lg shadow-2xl'
            alt='Hero Image'
            priority
          />
        </div>
      </section>
      <section className='container flex flex-col items-center px-8 py-12 mx-auto md:py-16 md:flex-row'>
        {/* Image content */}
        <div className='w-full pr-8 mb-8 md:flex-1 md:mb-0'>
          <Image
            src='/section2_bookstore.png'
            alt='Academic materials'
            width={504}
            height={298}
            layout='responsive'
            className='rounded-lg shadow-lg'
          />
        </div>
        {/* Text content */}
        <div className='w-full md:flex-1'>
          <h2 className='mb-4 text-3xl font-bold'>
            Unlock Academic Excellence: Prime Tests and Strategies
          </h2>
          <p className='mb-4'>
            Welcome to our TestBank, online bookstore, where you can find a wide
            range of educational materials specifically designed for primary
            students. Elevate your child's learning experience with our
            comprehensive exam preparation materials, perfect for primary
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
        <div className='w-full md:flex-1'>
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
        <div className='w-full mt-8 ml-4 md:flex-1 md:ml-12'>
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
        </div>
      </section>
    </main>
  );
}
