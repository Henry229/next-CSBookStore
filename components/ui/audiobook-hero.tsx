import Image from 'next/image';

export default function AudioBooksHero() {
  return (
    <div className='p-4 overflow-hidden sm:p-6 lg:p-8 rounded-xl'>
      <div className='rounded-xl relative aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover'>
        <Image
          src='/audiobook-section.svg'
          layout='fill'
          objectFit='cover'
          className='rounded-xl'
          alt='Background'
        />
        <div className='absolute inset-0 flex flex-col items-center justify-center w-full h-full text-center gap-y-8'>
          <div
            className='max-w-xs text-3xl font-bold text-slate-800/80 sm:text-5xl lg:text-6xl sm:max-w-xl'
            style={{
              textShadow:
                '1px 1px 0px #fff, -1px -1px 0px #fff, 1px -1px 0px #fff, -1px 1px 0px #fff',
            }}
          >
            Diving Into Audiobook Worlds!
          </div>
        </div>
      </div>
    </div>
  );
}
