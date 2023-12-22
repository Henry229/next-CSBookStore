import Image from 'next/image';

export default function ContactHero() {
  return (
    <div className='p-4 overflow-hidden sm:p-6 lg:p-8 rounded-xl'>
      <div className='rounded-xl relative aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover'>
        <Image
          src='/contact_section.svg'
          layout='fill'
          objectFit='cover'
          className='rounded-xl'
          alt='Background'
        />
      </div>
    </div>
  );
}
