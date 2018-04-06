export * from './tour.model';
export * from './tour.data';
export * from './tour-attachment.model';
export * from './tour-sub-category.model';
export * from './tour.service';

import { HostTourService } from './tour.service';


export const services: any[] = [
  HostTourService
];

