'use client';

export default function GoogleMapComponent() {
  return (
    <div className='px-8' style={{ width: '100%', height: '400px' }}>
      <iframe
        className='rounded-lg'
        width='100%'
        height='100%'
        src={`https://www.google.com/maps/embed/v1/place?key=${
          process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBEDED_API_KEY
        }&q=${encodeURIComponent('CS Education Bella Vista')}a&zoom=15`}
      />
    </div>
  );
}
