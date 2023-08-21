import React from 'react'
import { useUser, SignUpButton } from "@clerk/nextjs";

export const AboutSection = () => {
  const { isSignedIn } = useUser();

  return (
    <div className="relative flex h-fit min-h-[75vh] w-screen flex-col items-center justify-center">
      <h2 className="m-4 text-5xl font-bold">About</h2>
      <p className="w-6/12 text-xl text-center md:max-w-screen-md">
        IEEE (pronounced I-Triple-E), which stands for the Institute of
        Electrical and Electronics Engineers, is known as the world’s largest
        professional association for the advancement of technology. Here at the
        University of Illinois at Urbana-Champaign, IEEE represents the second
        largest student branch in the nation. Though it may seem from the name
        that we consist of students only from the Electrical and Computer
        Engineering department, we in fact encompass all different fields and
        welcome this diversity. Our organization strives to further students
        professional and educational development through a wide array of
        opportunities. Please take a look at what we have to offer, and come
        visit the office located at ECEB.
      </p>

      {!isSignedIn && <SignUpButton />}
    </div>
  );
};