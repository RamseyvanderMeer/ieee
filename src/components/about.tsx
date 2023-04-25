import React from 'react'
import { useUser, SignUpButton } from "@clerk/nextjs";

export const About = () => {
  const { user, isSignedIn } = useUser();

    return(
        <div className="relative w-screen h-fit min-h-screen flex flex-col items-center justify-center">

            <h2>About</h2>
            <p className="w-6/12 md:max-w-screen-md">Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti, odit? Repudiandae eveniet numquam beatae molestias rerum vel, nisi quibusdam sint hic aliquid laborum id cum cumque voluptatibus? Omnis, recusandae ab!</p>

            {!isSignedIn && (
                <SignUpButton />
            )}
        </div>
    )
}