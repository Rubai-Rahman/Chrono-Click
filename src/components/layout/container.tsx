import { ReactNode } from 'react';

const Container = (children: ReactNode) => {
  return <div className="px-6  space-y-3">{children}</div>;
};

export default Container;
