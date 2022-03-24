import { BaseObject } from '@/common/models';

export const MODULE_NAME = 'app';

class GetterClass extends BaseObject {
  ACTIVE_EDITION = 'activeEdition';

  constructor(props) {
    super(props);
    this._set(props);
  }
}

const _GETTERS = new GetterClass();

export const GETTERS = new GetterClass(
  prefixObjectValue(_GETTERS, MODULE_NAME)
);

class MutationClass extends BaseObject {
  SET_ACTIVE_EDITION = 'setActiveEdition';

  constructor(props) {
    super(props);
    this._set(props);
  }
}

const _MUTATES = new MutationClass();

export const MUTATES = new MutationClass(
  prefixObjectValue(_MUTATES, MODULE_NAME)
);

export default {
  _GETTERS,
  _MUTATES
};
