import { EDITION } from '@/common/constants';
import { isEmpty } from '@/common/utils';
import APP from './const';

export const getters = {
  [APP._GETTERS.ACTIVE_EDITION]: ({ activeEdition }) => activeEdition,
};
