import { ReactNode } from 'react';

const Container = ({ children }: { children: ReactNode }) => {
  return (
    <div className="responsive-space-x my-12 container mx-auto">{children}</div>
  );
};

export default Container;
