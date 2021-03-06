import XUnit from './XUnit';

import { isEmpty } from '@/common/utils';

export default {
  components: {
    XUnit
  },
  props: {
    pageSize: {
      type: Object,
      default: null
    },
    canvasSize: {
      type: Object,
      default: null
    }
  },
  computed: {
    config() {
      if (!this.pageSize || !this.canvasSize) {
        return {
          count: 0,
          width: 0,
          canvasWidth: 0,
          double: false
        };
      }
      const {
        inches: { pdfWidth, spineWidth }
      } = this.pageSize;
      const { width } = this.canvasSize;
      return {
        count: Math.ceil(pdfWidth / (spineWidth > 0 ? 1 : 2)) - 1,
        width: width / pdfWidth,
        canvasWidth: width,
        double: spineWidth === 0
      };
    },
    unitArray() {
      const { count, width, double } = this.config;
      if (!width) return [];
      const units = [];
      let i = double ? -count : 0;
      while (i <= count) {
        const unitData = {
          number: Math.abs(i),
          leftBorder: units.length !== 0,
          rightBorder: i === count,
          hideNumber: false,
          isEnd: i < 0
        };
        if (!double || i !== 0) {
          units.push(unitData);
        } else {
          units.push({ ...unitData, hideNumber: true }); // first zero don't show value
          units.push(unitData); // second zero
        }
        i++;
      }
      return units;
    },
    containerStyle() {
      const { canvasWidth, width, double } = this.config;
      if (!width) {
        return { width: 0 };
      }
      const containerWidth = Math.ceil(this.unitArray.length * width);
      const left = double ? canvasWidth * 0.5 : 0;
      const translateX = double ? 'translateX(-50%)' : 'none';
      return {
        width: containerWidth + 'px',
        left: left + 'px',
        transform: translateX
      };
    }
  },
  watch: {
    containerStyle: {
      deep: true,
      handler(newValue, oldValue) {
        if (isEmpty(newValue)) {
          return;
        }

        if (newValue.width !== oldValue.width) {
          this.$emit('change', newValue.width);
        }
      }
    }
  }
};
