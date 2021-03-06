import ThumbnailItem from '@/components/Thumbnail/ThumbnailItem';
import Action from '@/containers/Menu/Action';

import { useUser, useGetterDigitalSection } from '@/hooks';

import { getSectionsWithAccessible } from '@/common/utils';

import { useBookDigitalInfo } from './composables';

export default {
  components: {
    ThumbnailItem,
    Action
  },
  setup() {
    const { currentUser } = useUser();
    const { getBookDigitalInfo } = useBookDigitalInfo();
    const { sections: bookSections } = useGetterDigitalSection();

    return { currentUser, getBookDigitalInfo, bookSections };
  },
  data() {
    return {
      selectedSheet: null,
      currentMenuHeight: 0,
      menuX: 0,
      menuY: 0,
      menuClass: 'pp-menu section-menu'
    };
  },
  computed: {
    bookId() {
      return this.$route.params.bookId;
    },
    sections() {
      return getSectionsWithAccessible(this.bookSections, this.currentUser);
    }
  },
  async created() {
    await this.getBookDigitalInfo(this.$route.params.bookId);
  },
  methods: {
    /**
     * Get name of page of selected sheet
     *
     * @param   {String}  pageName  name of page of selected sheet
     * @returns {Object}            name of page
     */
    getPageName({ pageName }) {
      return { left: pageName };
    },
    /**
     * Toggle menu by set sheet selected id
     * @param  {Object} event fired event
     * @param  {String} sheetId  sheet's id selected
     */
    toggleMenu(event, sheetId) {
      this.setPositionMenu(event);

      if (!this.selectedSheet || this.selectedSheet !== sheetId) {
        this.selectedSheet = sheetId;
        return;
      }

      if (this.selectedSheet && this.selectedSheet === sheetId) {
        this.onCloseMenu();
      }
    },
    /**
     * set sheet selected is null and close menu
     */
    onCloseMenu() {
      this.selectedSheet = null;
    },
    /**
     * Set current menu height
     * @param  {Object} event fired event
     */
    onMenuLoaded(event) {
      setTimeout(() => {
        this.currentMenuHeight = event.$el.clientHeight;
      }, 10);
    },
    /**
     * Set position for menu
     * @param  {Object} event fired event
     */
    setPositionMenu(event) {
      const element = event.target;
      const windowHeight = window.innerHeight;
      const elementY = event.y;

      const { x, y } = element.getBoundingClientRect();
      this.menuX = x - 82;
      this.menuY = y;
      this.menuClass = 'pp-menu section-menu';

      setTimeout(() => {
        if (windowHeight - elementY < this.currentMenuHeight) {
          this.menuY = y - this.currentMenuHeight - 45;
          this.menuClass = `${this.menuClass} section-menu-top`;
        } else {
          this.menuClass = `${this.menuClass} section-menu-bottom`;
          this.menuY = y;
        }
      }, 100);
    }
  }
};
