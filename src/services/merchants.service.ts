import { ServiceSchema } from 'moleculer';
import NSService from '@ns/sdk';
// import _ from 'lodash';
// import moment from 'moment-timezone';


const MerchantsService: ServiceSchema = {
  name: 'worker-report',
  mixins: [NSService],
  settings: {

  },
  actions: {
    /**
     * add merchant
     */
  },
};

export = MerchantsService;
