import {trigger,state,style,animate,transition,} from '@angular/animations';

export const onInitProcutsAnimate =
trigger('showItem', [
    state('shown', style({
      opacity: 1,
    })),
    state('hidden', style({
      opacity: 0,
      transform:('translateY(50px)'),
    })),
    state('hiddenLeft', style({
      opacity: 0,
      transform:('translateX(-100%)'),
    })),
    state('hiddenTop', style({
      opacity: 0,
      transform:('translateY(-100%)'),
    })),
    state('hiddenBottom', style({
      opacity: 0,
      transform:('translateY(100%)'),
    })),
    state('hiddenRight', style({
      opacity: 0,
      transform:('translateX(100%)'),
    })),
    transition('hiddenRight => shown', [
      animate('0.5s')
    ]),
    transition('hiddenBottom => shown', [
      animate('0.5s')
    ]),
    transition('hiddenTop => shown', [
      animate('0.7s')
    ]),
    transition('hiddenLeft => shown', [
      animate('0.3s')
    ]),
    transition('hidden => shown', [
      animate('0.3s')
    ]),
  ]);
export const onInitPromotionsAnimate =
trigger('showItem', [
    state('shown', style({
      opacity: 1,
    })),
    state('hiddenRight', style({
      opacity: 0,
      transform:('translateX(-100px)'),
    })),
    state('hiddenLeft', style({
      opacity: 0,
      transform:('translate(100px)'),
    })),
    transition('hiddenRight => shown', [
      animate('0.5s')
    ]),
    transition('hiddenLeft => shown', [
      animate('0.5s')
    ])
  ]);