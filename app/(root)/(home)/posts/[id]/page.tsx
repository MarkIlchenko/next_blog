/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import { getResourcesPlaylist } from '@/sanity/action';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import ResourceCard from '@/components/ResourceCard';

interface Resource {
  _id: string;
  title: string;
  image: string;
  text?: string;
  category: string
}

interface PlaylistItem {
  _id: string;
  title: string;
  resources: Resource[];
}

const page = async({ params }: { params: { id: string }}) => {
  try {
    const resourcesPlaylist: PlaylistItem[] = await getResourcesPlaylist();
    const { id } = params;
    const selectedResource = resourcesPlaylist
      .flatMap(item => item.resources)
      .find(resource => resource._id === id);

    let selectedText;
    if(selectedResource?.title) {
      selectedText = selectedResource.text;
    }

    const similarResources = resourcesPlaylist.flatMap(item => item.resources.filter(resource => resource.category === selectedResource?.category && resource._id !== id));

    if (!selectedResource) {
      return <div>Resource not found</div>;
    }

    return (
      <main className="flex-start text-slate-50 paddings mx-auto w-full max-w-screen-2xl flex-col">
        {/* {selectedResource.title} */}
        <section className='flex justify-between w-full items-center'>
          <div>
            <p className='text-gradient_blue uppercase'>
              {selectedResource.category}
            </p>
            <h1 className='heading1 w-[70%] mb-4'>
              {selectedResource.title}
            </h1>
            {selectedText ? (
              <p className='text-cyan-200 mb-16 lg:w-[70%] sm:w-full'>{selectedText}</p>
            ) : (
              <p className='text-cyan-200 mb-16 lg:w-[70%] sm:w-full'>Explore this comprehensive guide, designed to provide you with valuable insights and practical knowledge.

              Whether you're a beginner or an experienced developer, this resource covers key concepts, tips, and best practices to enhance your skills.
              Dive in now and take your expertise to the next level!</p>
            )}
            <Button className='gradient_purple rounded-xl py-6 px-12'>
              <Link href="/">Download the Guide</Link>
            </Button>
          </div>
          <Image 
            src={selectedResource.image}
            className='lg:rotate-12 sm:rotate-0'
            alt='image'
            width={500}
            height={800}
          />
        </section>

        {resourcesPlaylist.slice(0,1).map((item: any) => (
          <section key={item._id} className="flex-center mt-6 w-full flex-col sm:mt-20">
            <h1 className="heading3 self-start text-white">{item.title}</h1>
            <div className="mt-12 flex w-full flex-wrap justify-center gap-16 sm:justify-start">
              {similarResources.map((resource: Resource) => (
                <ResourceCard
                  key={resource._id}
                  title={resource.title}
                  id={resource._id}
                  image={resource.image}
                  postLink={`${resource._id}`}
                />
              ))}
            </div>
          </section>
        ))}
      </main>
    );
  } catch (error: any) {
    console.error('An error occurred', error);
    return <div>{error}</div>;
  }
}

export default page