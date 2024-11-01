'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@ds-project/components';
import { useSelectedLayoutSegment } from 'next/navigation';

export function BreadcrumbNav() {
  const connectionGroup = useSelectedLayoutSegment('connections');

  if (!connectionGroup) {
    return null;
  }

  const connectionPage = {
    sources: 'Figma',
    destinations: 'GitHub',
  }[connectionGroup];

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="hidden capitalize md:block">
          Connections
        </BreadcrumbItem>
        <BreadcrumbSeparator className="hidden md:block" />
        <BreadcrumbItem>
          <BreadcrumbPage>{connectionPage}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
