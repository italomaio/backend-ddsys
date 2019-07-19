import { CommonService } from './common.service';

export const commonProviders = [
    {
        provide: 'CommonProvider',
        useValue: CommonService
    }
];