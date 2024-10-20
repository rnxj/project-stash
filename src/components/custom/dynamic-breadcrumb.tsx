'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

export default function DynamicBreadcrumbs({ pathname }: { pathname: string }) {
  const generateBreadcrumbs = () => {
    const paths = pathname.split('/').filter((path) => path);
    let currentPath = '';

    return paths.map((path, index) => {
      currentPath += `/${path}`;
      const isLast = index === paths.length - 1;

      return (
        <BreadcrumbItem key={path}>
          {isLast ? (
            <BreadcrumbPage>{formatPathSegment(path)}</BreadcrumbPage>
          ) : (
            <>
              <BreadcrumbLink href={currentPath}>{formatPathSegment(path)}</BreadcrumbLink>
              <BreadcrumbSeparator />
            </>
          )}
        </BreadcrumbItem>
      );
    });
  };

  const formatPathSegment = (segment: string) => {
    return segment
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          {pathname === '/' ? (
            <BreadcrumbPage>Home</BreadcrumbPage>
          ) : (
            <>
              <BreadcrumbLink href='/'>Home</BreadcrumbLink>
              <BreadcrumbSeparator />
            </>
          )}
        </BreadcrumbItem>
        {generateBreadcrumbs()}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
