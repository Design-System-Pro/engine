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
  const groupKey = useSelectedLayoutSegment('connections');

  const groupName = {
    null: 'Getting Started',
    quickstart: 'Getting Started',
    sources: 'Sources',
    destinations: 'Destinations',
  }[String(groupKey)];

  const pageName = {
    null: 'Quickstart',
    sources: 'Figma',
    destinations: 'GitHub',
    quickstart: 'Quickstart',
  }[String(groupKey)];

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="hidden capitalize md:block">
          {groupName}
        </BreadcrumbItem>
        <BreadcrumbSeparator className="hidden md:block" />
        <BreadcrumbItem>
          <BreadcrumbPage>{pageName}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
