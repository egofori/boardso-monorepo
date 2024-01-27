"use client"

import Link from "next/link"
import { UIButton, UICard } from "ui"

export default function Content() {
  return (
    <main className="layout-wrapper">
      <UICard className="mx-auto my-5 max-w-3xl p-5 sm:p-10 bg-white">
        <article className="prose prose-slate mx-auto lg:prose-lg">
          <h1 className="text-center">About Boardso</h1>
          <p>
            Boardso is a website with billboard listings from billboard owners, providing billboard
            seekers an easy way to find billboard sites on the internet. It is a cutting-edge
            platform that can significantly increase the exposure of your billboard sites on the
            internet. At Boardso we understand the importance of creating awareness for your
            products and services in today&apos;s competitive business environment.
          </p>
          <h2>How to add a billboard site</h2>
          <ol>
            <li>
              <p>
                You first need to <Link href="/signup">register</Link> using your email address or
                Google account.
              </p>
            </li>
            <li>
              <p>
                On the home page click on the <strong>Add billboard</strong> button
              </p>
            </li>
            <li>
              <p>
                Upload photos of your billboard site and fill out other details such as the title,
                rate, dimension, description and the precise Google map location. Make sure the details
                are correct and hit Submit. Done.
              </p>
              <blockquote>
                <p>
                  Note that standard accounts are only allowed to add up to 3 billboard sites for free and can
                  only upload 5 images to their billboard per listing. Upgrade to post unlimited
                  billboard sites and upload up to 10 images of your billboard per listing.
                </p>
              </blockquote>
            </li>
            <li>
              <p>Your billboard site can now be seen by all billboard seekers on the internet.</p>
            </li>
          </ol>
          <h2>How to find a billboard site</h2>
          <ol>
            <li>
              <p>
                On the homepage of Boardso click on the <strong>ALL</strong> button inside the
                search box.
              </p>
            </li>
            <li>
              <p>
                This will take you to the page with the list of all the available billboard sites.
              </p>
            </li>
            <li>
              <p>
                To refine the search choose a location, select the billboard type(digital, static),
                click on the <strong>More filters</strong> button to define a price range and enter
                specific billboard dimensions. And then click on search. You should find exactly what you are looking for.
              </p>
            </li>
            <li>
              <p>
                Entering a search text will search for matching billboard listings with the text in
                their title or description.
              </p>
            </li>
          </ol>
          <hr />
          <section className="flex flex-col justify-center items-center">
            <h3 className="text-center">Do you have billboard sites that the world should know about? Register now and let&apos;s get it sorted.</h3>
            <Link href="/signup">
              <UIButton>Sign Up</UIButton>
            </Link>
          </section>
        </article>
      </UICard>
    </main>
  )
}
