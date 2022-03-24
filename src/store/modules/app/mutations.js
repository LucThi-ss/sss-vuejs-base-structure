import APP from './const';

import { cloneDeep } from 'lodash';
import { isEmpty } from '@/common/utils';

export const mutations = {
  [APP._MUTATES.SET_ACTIVE_EDITION](state, { edition }) {
    state.activeEdition = edition;
  },
};
