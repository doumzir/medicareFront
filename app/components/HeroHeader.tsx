import { useState } from 'react';
import { Link } from 'react-router';
import heroHeaderImg from '~/images/hero-header.png';
import { cn } from '~/lib/utils';
import { Slider } from './ui/slider';
import { Title } from './ui/Title';

export function HeroHeader({
  title,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { title: string }) {
  const [healthScore, setHealthScore] = useState([5]);
  return (
    <section
      className={cn(
        'bg-primary text-white flex flex-row gap-4 px-4',
        className
      )}
      {...props}
    >
      <div className='flex flex-col gap-[52px] pt-11 pb-14  items-start justify-start max-w-[325px] lg:max-w-[507px] mx-auto'>
        <Title className='text-white text-4xl font-extrabold text-center w-full '>
          {title}
        </Title>
        <div className='flex flex-col gap-[5px]'>
          <p className='text-white text-sm text-medium'>
            Notez votre santé sur {healthScore[0]} / 10
          </p>
          <Slider
            min={0}
            max={10}
            step={1}
            value={healthScore}
            onValueChange={value => setHealthScore(value)}
            className='w-full bg-white h-2 rounded-full'
          />
          <p className='pt-2 text-white/70 text-sm'>
            Note général de votre état physique et morale
          </p>

          <Link
            to={`/register?${new URLSearchParams({ healthScore: healthScore[0].toString() })}`}
            className='text-sm text-primary w-fit mt-4 bg-white px-4 py-2 rounded-md'
          >
            Commencer à suivre ma santé
          </Link>
        </div>
      </div>
      <img
        src={heroHeaderImg}
        alt="Image d'acceuil illustrant un coeur qui fait du sport pour votre santé"
        width={100}
        height={100}
        className='hidden lg:block'
      />
    </section>
  );
}
