import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

const Join: React.FC = (): JSX.Element => {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const { push } = useRouter();

    useEffect(() => {
        push("/");
    }, [push]);

    return <p></p>;
};


export default Join;

