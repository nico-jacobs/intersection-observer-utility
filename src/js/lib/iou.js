// import dependencies
import 'intersection-observer';
import 'events-polyfill';
import {mergeDeep} from '../util/mergeDeep';
import iouFunctions from './iouDefaultFunctions';

// return UserList class


export class Iou {

  /**
   * construct Class
   */
  constructor(customOptions) {
    let settings = this.mergeCustomDefaultOptions(customOptions, this);

    this.elementTrigger = settings.elementTrigger;
    this.strings = settings.strings;
    this.functions = settings.functions;
    this.initialized = false;
    this.pageHasScrolled = false;
  }

  mergeCustomDefaultOptions(customOptions, self) {

    // set the defaults
    const defaults = {
      elementTrigger: '[data-iou-trigger]', // note you can use all kinds of selectors css classes, Ids & data-attributes
                                            // also multiple selectors separated by comma.
      strings: {
        attributeTarget: 'data-iou-target', // this has to be a data-attribute
        attributeVisible: 'data-iou-visible', // this has to be a data-attribute
        attributeVisibleTrue: 'true', // this has to be a data-attribute

        attributeVisibleTop: 'visible-top', // this has to be a data-attribute value
        attributeVisibleBottom: 'visible-bottom', // this has to be a data-attribute value
        attributeInVisibleTop: 'invisible-top', // this has to be a data-attribute value
        attributeInVisibleBottom: 'invisible-bottom', // this has to be a data-attribute value

        attributeVisibleFalse: 'false', // this has to be a data-attribute
        attributeDirection: 'data-iou-direction', // this has to be a data-attribute
        attributeRelation: 'data-iou-relation', // this has to be a data-attribute
        attributeRelationCurrent: 'current', // this has to be a data-attribute
        attributeRelationPrev: 'prev', // this has to be a data-attribute
        attributeRelationNext: 'next', // this has to be a data-attribute
        siblingsFilter: 'iou-section',
      },
      functions: {
        setVisible(entryCurrents, entryPrevs, entryNexts,) {
          iouFunctions.setVisible(entryCurrents, entryPrevs, entryNexts, self);
        },
        setInVisible(entryCurrents, entryPrevs, entryNexts) {
          iouFunctions.setInVisible(entryCurrents, entryPrevs, entryNexts, self);
        },
        setDirection(entryCurrents, posVal) {
          iouFunctions.setDirection(entryCurrents, posVal, self);
        },

        setRelation(entryPrevs, entryNexts,) {
          iouFunctions.setRelation(entryPrevs, entryNexts, self);
        },

        dispatchIouOut(entry) {
          let eventIouOut = new CustomEvent('iouOut', {
            bubbles: true,
            cancelable: true,
            detail: {
              entryObj: entry
            }
          });

          document.dispatchEvent(eventIouOut);
        },

        dispatchIouIn(entry) {
          let eventIouIn = new CustomEvent('iouIn', {
            bubbles: true,
            cancelable: true,
            detail: {
              entryObj: entry
            }
          });

          document.dispatchEvent(eventIouIn);
        }
      },


      siblingsNext: '',
      siblingsPrev: '',
    };

    // merge the customOptions with the default Options
    let settings = mergeDeep(defaults, customOptions);
    return settings;
  };


  /**
   * initialize plugin
   */

  init() {

    this.IntersectionWatcher();

    // this.userHasScrolled();

    // set initialized to `true`
    this.initialized = true;
  };

  setEntryRelation(el) {
    let IouInstance = this;
    let targetString = el.getAttribute(IouInstance.strings.attributeTarget);

    if (targetString.indexOf(',') !== -1) {
      // the target string contains a comma and ist therefore most likely an array
      let re = /,\s/; // split on colon space or comma space
      let targetArray = targetString.split(re);

      targetArray.forEach(function (targetSel) {
        let currentEls = document.querySelectorAll(targetSel);
        currentEls.forEach(function (currentEl) {
          el.siblingsNext = iouFunctions.getNextSiblings(currentEl);
          el.siblingsPrev = iouFunctions.getPreviousSiblings(currentEl);

        });
        el.targetEls = currentEls;
      })
    } else {
      let currentEls = document.querySelectorAll(targetString);
      currentEls.forEach(function (currentEl) {
        el.siblingsNext = iouFunctions.getNextSiblings(currentEl);
        el.siblingsPrev = iouFunctions.getPreviousSiblings(currentEl);
      });
      el.targetEls = currentEls;
    }

  };

  IntersectionWatcher() {
    let elements = document.querySelectorAll(this.elementTrigger);
    const config = {
      root: null, // avoiding 'root' or setting it to 'null' sets it to default value: viewport
      rootMargin: '0px',
      threshold: [0]
      // threshold: [0, 0.25, 0.5, 0.75, 1]
    };
    let observer;

    observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        console.log(entry.target.targetEls);
        this.entryLogicIn(entry);
        this.entryLogicOut(entry);
      });
    },config);

    elements.forEach(element => {
      this.setEntryRelation(element);
      observer.observe(element);
    });
  };

  entryLogicIn(entry) {
    if (entry.isIntersecting === true) {
      let self = this;
      let entryCurrents = entry.target.targetEls;
      let entryNexts = entry.target.siblingsNext;
      let entryPrevs = entry.target.siblingsPrev;

      // entry.intersectionRatio => is visible
      let yPos = entry.boundingClientRect.top;

      let eventIouIn = new CustomEvent('iouIn', {
        bubbles: true,
        cancelable: true,
        detail: {
          entryObj: entry,
        }
      });
      document.dispatchEvent(eventIouIn);

      // this.functions.setRelation(entryPrevs, entryNexts);
      this.functions.setVisible(entryCurrents, entryPrevs, entryNexts);
      // debugger;

      // here we check if the Element comes in from top or bottom
      if (yPos < 0) {
        // yPos < 0 means the element comes in from top

        // generell function
        this.functions.setDirection(entryCurrents, self.strings.attributeVisibleTop);

      } else {
        // yPos > 0 means the element comes in from bottom
        this.functions.setDirection(entryCurrents, self.strings.attributeVisibleBottom);
      }
    }
  }

  entryLogicOut(entry) {
    if (entry.isIntersecting === false) {
      let self = this;
      let entryCurrents = entry.target.targetEls;
      let entryNexts = entry.target.siblingsNext;
      let entryPrevs = entry.target.siblingsPrev;

      // element is out of view
      this.functions.setInVisible(entryCurrents, entryPrevs, entryNexts);

      // this.functions.setRelation(entry);
      let yPos = entry.boundingClientRect.top;

      let eventIouOut = new CustomEvent('iouOut', {
        bubbles: true,
        cancelable: true,
        detail: {
          entryObj: entry
        }
      });
      document.dispatchEvent(eventIouOut);

      // here we check if the Element leaves at top or bottom
      if (yPos < 0) {
        // yPos < 0 means the element leaves at top
        this.functions.setDirection(entryCurrents, self.strings.attributeInVisibleTop);
      } else {
        // yPos > 0 means the element leaves at bottom
        this.functions.setDirection(entryCurrents, self.strings.attributeInVisibleBottom);
      }
    }
  }

  // attach scrollevent listener once user has scrolled
  userHasScrolled(setHasScrolled) {
    let self = this;

    if (self.pageHasScrolled === false) {
      setTimeout(function () {
        document.addEventListener('scroll', function () {
          self.pageHasScrolled = true;
          return true;
        }, {once: true});
      }, 2000);
    }
    return false;
  }
}
