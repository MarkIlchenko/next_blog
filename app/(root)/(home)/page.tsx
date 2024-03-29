import React from 'react';
import SearchForm from "@/components/SearchForm";
import Filters from "@/components/Filters";
import {getResources, getResourcesPlaylist} from "@/sanity/action";
import ResourceCard from "@/components/ResourceCard";
import Header from "@/components/Header";

export const revalidate = 900;

interface Props {
  searchParams: { [key: string]: string | undefined }
}

async function Page({ searchParams }: Props) {
  const resources = await getResources({
    // query: '',
    // category: '',
    // page: '1'

    query: searchParams?.query || '',
    category: searchParams?.category || '',
    page: '1'
  })

  const resourcesPlaylist = await getResourcesPlaylist();

  return (
    <main className="flex-center paddings mx-auto w-full max-w-screen-2xl flex-col">
      <section className="nav-padding w-full">
        <div className="flex-center relative min-h-[274px] w-full flex-col rounded-xl my-banner bg-cover bg-center text-center">
          <h1 className="sm:heading1 heading2 mb-6 text-center text-white">JavaScript Mastery Resources !</h1>
        </div>
        <SearchForm />
      </section>

      <Filters />

      <section className="flex-center mt-6 w-full flex-col sm:mt-20">
        <Header
          title="Resources"
          query={searchParams?.query || ''}
          category={searchParams?.category || ''}
        />

        <div className="mt-12 flex w-full flex-wrap justify-center gap-16 sm:justify-start">
          {resources && resources.length > 0 ? (
            resources.map((resource: any) => (
              <ResourceCard
                key={resource._id}
                title={resource.title}
                id={resource._id}
                image={resource.image}
                downloadNumber={resource.views}
                downloadLink={resource.downloadLink}
                postLink={`posts/${resource._id}`}
              />
            ))
          ) : (
            <p className="body-regular text-white">
              No resources found
            </p>
          )}
        </div>
      </section>

      {resourcesPlaylist.slice(1,2).map((item: any) => (
        <section key={item._id} className="flex-center mt-6 w-full flex-col sm:mt-20">
          <h1 className="heading3 self-start text-white">{item.title}</h1>
          <div className="mt-12 flex w-full flex-wrap justify-center gap-16 sm:justify-start">
            {item.resources.map((resource: any) => (
              <ResourceCard
                key={resource._id}
                title={resource.title}
                id={resource._id}
                image={resource.image}
                downloadNumber={resource.views}
                downloadLink={resource.downloadLink}
                postLink={`posts/${resource._id}`}
              />
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}

export default Page; 
