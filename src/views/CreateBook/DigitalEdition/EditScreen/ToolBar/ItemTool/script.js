import ToolButton from '@/components/Buttons/ToolButton';

import { isToolActivated } from '@/common/utils';

export default {
  components: {
    ToolButton
  },
  props: {
    items: {
      type: Array,
      default: () => []
    },
    selectedToolName: {
      type: String
    },
    propertiesType: {
      type: String
    },
    isPrompt: {
      type: Boolean,
      default: false
    },
    disabledItems: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    /**
     * Emit event click when click on icon
     * @param  {object} item Icon's object selected
     */
    onClick(item) {
      this.$emit('click', item);
    },
    /**
     * Check if item is disabled
     *
     * @param   {String}  name  name of item
     * @returns {Boolean}       item is disabled
     */
    isDisabledItem({ name }) {
      return this.disabledItems.includes(name);
    },
    /**
     * Check whether icon tool active or not
     * @param   {Object}  item  The name of icon be clicked
     * @return  {Boolean}       Active current icon clicked and inactive icon before
     */
    isActive(item) {
      return isToolActivated(item, this.propertiesType, this.selectedToolName);
    }
  }
};
