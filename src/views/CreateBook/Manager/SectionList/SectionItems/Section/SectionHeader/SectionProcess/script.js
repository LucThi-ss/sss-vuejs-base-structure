import ButtonDelete from '@/components/Menu/ButtonDelete';
import ButtonAdd from '@/components/Menu/ButtonAdd';
import ProcessBar from '@/components/BarProcesses/ProcessBar';
import Action from '@/containers/Menu/Action';

import { useBook, useModal } from '@/hooks';
import { useSectionActionMenu } from '@/views/CreateBook/Manager/composables';

import { ICON_LOCAL, MODAL_TYPES } from '@/common/constants';

export default {
  components: {
    ProcessBar,
    Action,
    ButtonDelete,
    ButtonAdd
  },
  props: {
    section: {
      type: Object,
      require: true
    }
  },
  data() {
    return {
      menuX: 0,
      menuY: 0,
      currentMenuHeight: 0,
      menuClass: 'pp-menu section-menu',
      summaryEl: null,
      componentKey: true,
      isOpenMenu: false
    };
  },
  setup() {
    const { totalInfo, sections, addSheet, maxPage } = useBook();
    const { sectionSelected, setSectionSelected } = useSectionActionMenu();
    const { toggleModal } = useModal();

    return {
      toggleModal,
      totalInfo,
      sections,
      addSheet,
      maxPage,
      sectionSelected,
      setSectionSelected
    };
  },
  computed: {
    isShowAdd() {
      let index = this.sections.findIndex(item => item.id === this.section.id);

      return !(this.totalInfo.totalPages >= this.maxPage || !index);
    },
    isShowDelete() {
      const index = this.sections.findIndex(
        item => item.id === this.section.id
      );

      const isCover = index === 0;
      const isHalfSheet = index === 1 || index === this.sections.length - 1;

      return !isCover && !isHalfSheet;
    }
  },
  watch: {
    sectionSelected(id) {
      this.isOpenMenu = id === this.section.id;
    }
  },
  created() {
    this.moreIcon = ICON_LOCAL.MORE_ICON;
  },
  mounted() {
    this.$root.$on('summary', data => {
      this.summaryEl = data;
    });
  },
  methods: {
    onAddSheet() {
      this.setSectionSelected('');

      this.addSheet(this.section.id);
    },
    onOpenModal() {
      this.toggleModal({
        isOpenModal: true,
        modalData: {
          type: MODAL_TYPES.DELETE_SECTION,
          props: { sectionId: this.section.id, sectionName: this.section.name }
        }
      });
    },
    /**
     * Set open menu by mutate selected section id
     */
    setIsOpenMenu() {
      if (!this.sectionSelected || this.sectionSelected !== this.section.id) {
        this.setSectionSelected({ sectionSelected: this.section.id });

        this.componentKey = !this.componentKey;

        return;
      }

      if (this.sectionSelected && this.sectionSelected === this.section.id) {
        this.setSectionSelected({ sectionSelected: '' });
      }
    },
    toggleMenu(event) {
      const element = event.target;
      const windowHeight = window.innerHeight;
      const elementY = event.y;

      const { x, y } = element.getBoundingClientRect();
      this.menuX = x - 80;

      const dataToggle = this.summaryEl?.getAttribute('data-toggle');
      if (dataToggle && dataToggle === 'collapse') {
        this.menuClass = `${this.menuClass} collapsed-summary`;
      } else {
        this.menuClass = 'pp-menu section-menu';
      }
      this.menuY = y;
      setTimeout(() => {
        if (windowHeight - elementY < this.currentMenuHeight) {
          this.menuY = y - this.currentMenuHeight - 50;
          this.menuClass = `${this.menuClass} section-menu-top`;
        } else {
          this.menuClass = `${this.menuClass} section-menu-bottom`;
          this.menuY = y;
        }
      }, 100);
      this.setIsOpenMenu();
    },
    /**
     * set section selected is empty and close menu
     */
    onCloseMenu() {
      this.setSectionSelected({ sectionSelected: '' });
    },
    /**
     * Set current menu height
     */
    onMenuLoaded(event) {
      setTimeout(() => {
        this.currentMenuHeight = event.$el.clientHeight;
      }, 10);
    }
  }
};
