/*******************************************************************************
 * IMPORTS
 *******************************************************************************/


/*******************************************************************************
 * CE MENU
 *******************************************************************************/
export function setVisible(entryCurrents, entryPrevs, entryNexts, IouInstance) {
  let dataVisible = IouInstance.strings.attributeVisible;
  let dataVisibleTrue = IouInstance.strings.attributeVisibleTrue;
  let dataRelation = IouInstance.strings.attributeRelation;
  let dataRelationCurrent = IouInstance.strings.attributeRelationCurrent;

  let dataRelationNext = IouInstance.strings.attributeRelationNext;
  let dataRelationPrev = IouInstance.strings.attributeRelationPrev;


  entryCurrents.forEach(function (targetEl) {
    targetEl.setAttribute(dataVisible, dataVisibleTrue);
    targetEl.setAttribute(dataRelation, dataRelationCurrent);
  });

  entryPrevs.forEach(function (prevEl) {
    prevEl.setAttribute(dataRelation, dataRelationPrev);
  });

  entryNexts.forEach(function (nextEl) {
    nextEl.setAttribute(dataRelation, dataRelationNext);
  });

}


export function setInVisible(entryCurrents, entryPrevs, entryNexts, IouInstance) {
  let dataVisible = IouInstance.strings.attributeVisible;
  let dataVisibleFalse = IouInstance.strings.attributeVisibleFalse;
  let dataVisibleTrue = IouInstance.strings.attributeVisibleTrue;

  let dataRelation = IouInstance.strings.attributeRelation;
  let dataRelationCurrent = IouInstance.strings.attributeRelationCurrent;

  if (entryPrevs) {
    entryCurrents.forEach(function (targetEl) {
      targetEl.setAttribute(dataVisible, dataVisibleFalse);
    });
  }

  if (entryPrevs) {
    entryPrevs.forEach(function (prevEl) {
      if (prevEl.getAttribute(dataVisible) === dataVisibleTrue) {
        prevEl.setAttribute(dataRelation, dataRelationCurrent);
      }
    });
  }

  if (entryNexts) {
    entryNexts.forEach(function (nextEl) {
      if (nextEl.getAttribute(dataVisible) === dataVisibleTrue) {
        nextEl.setAttribute(dataRelation, dataRelationCurrent);
      }
    });
  }
}

export function setDirection(entryCurrents, posVal, IouInstance) {
  let dataAttr = IouInstance.strings.attributeDirection;

  entryCurrents.forEach(function (targetEl) {
    targetEl.setAttribute(dataAttr, posVal);
  });


}

export function setRelation(entryPrevs, entryNexts, IouInstance) {
  let dataRelation = IouInstance.strings.attributeRelation;
  let dataRelationNext = IouInstance.strings.attributeRelationNext;
  let dataRelationPrev = IouInstance.strings.attributeRelationPrev;
  if (entryNexts) {
    entryNexts.forEach(function (nextEl) {
      nextEl.setAttribute(dataRelation, dataRelationNext);
    });
  }

  if (entryPrevs) {
    entryPrevs.forEach(function (prevEl) {
      prevEl.setAttribute(dataRelation, dataRelationPrev);
    });
  }

}


function getNextSiblings(elem) {
  let tagNameMain = elem.tagName;
  let siblings = [];
  while (elem = elem.nextSibling) {
    if (elem.tagName !== tagNameMain) continue; // text node
    siblings.push(elem);
  }
  return siblings;

}

function getPreviousSiblings(elem) {
  let tagNameMain = elem.tagName;
  let siblings = [];
  while (elem = elem.previousSibling) {
    if (elem.tagName !== tagNameMain) continue; // text node
    siblings.push(elem);
  }
  return siblings;
}


/*******************************************************************************
 * INIT
 *******************************************************************************/

export default {setVisible, setInVisible, setDirection, setRelation, getNextSiblings, getPreviousSiblings};

