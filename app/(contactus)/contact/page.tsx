import ContactHero from '@/components/ui/contact-hero';
import Container from '@/components/ui/container';
import ContactForm from './components/contact-form';
import { Home, Mail, Phone } from 'lucide-react';
import Footer from '@/components/footer';

export default function ContactPage() {
  return (
    <div className='bg-white dark:bg-black'>
      <Container>
        <ContactHero />
        <section className='container p-4 py-10 sm:p-6 lg:p-8'>
          <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
            <div>
              <h2 className='mb-4 text-3xl font-semibold'>
                We&apos;d Love To Hear From You
              </h2>
              <p className='mb-2'>
                Send a message and we&apos;ll respond as soon as possible
              </p>
              <ContactForm />
            </div>
            <div className='md:ml-4'>
              <div className='flex items-center'>
                <Home />
                <h2 className='mb-2 ml-2 text-3xl font-semibold'>Reach Us</h2>
              </div>
              <p className='mb-4'>
                Unit 118, 14 Lexington Dr. Bella Vista NSW 2153
              </p>
              <div className='flex items-center'>
                <Mail />
                <h2 className='mb-2 ml-2 text-3xl font-semibold'>
                  Drop A Mail
                </h2>
              </div>
              <p className='mb-4'>info@cseducation.com.au</p>
              <div className='flex items-center'>
                <Phone />
                <h2 className='mb-2 ml-2 text-3xl font-semibold'>
                  Make A Call
                </h2>
              </div>
              <p className='mb-4'>+61 1300 133 795</p>
            </div>
          </div>
        </section>
        <Footer />
      </Container>
    </div>
  );
}
