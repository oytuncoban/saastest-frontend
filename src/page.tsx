import React, { useEffect } from 'react';

export type PageProps = {
  title: string;
  children: React.ReactNode;
};

export default function Page({ title, children }: PageProps) {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return children;
}
